# FoodRescue - Food Donation Platform

A production-ready web application that connects food donors (restaurants) with NGOs and volunteers to rescue surplus food and reduce waste.

## Features

- **Multi-role Authentication**: Donor, NGO, Admin roles with JWT-based security
- **Donation Management**: Donors can create and manage food donations
- **Real-time Updates**: Socket.io integration for live notifications
- **Beautiful UI**: Emerald green theme with glass-morphism effects and Framer Motion animations
- **Role-based Dashboards**: Customized interfaces for each user type
- **End-to-end Workflow**: Donation creation → NGO acceptance → Automatic task assignment

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- A modern web browser (Chrome, Firefox, Safari, Edge)

## Installation & Setup

### 1. Clone or Download the Project
```bash
# If you downloaded as ZIP, extract it first
unzip foodrescue.zip
cd foodrescue
```

### 2. Install Dependencies
```bash
npm install
```

This will install all required packages including:
- React, TypeScript, Vite (frontend)
- Express.js (backend)
- Drizzle ORM with Zod validation
- Socket.io for real-time features
- Tailwind CSS for styling

### 3. Set Environment Variables

Create a `.env` file in the root directory with:
```env
JWT_SECRET=your-secure-jwt-secret-key-here-change-this
SESSION_SECRET=your-session-secret-key-change-this
NODE_ENV=development
```

**Important**: Replace the secret values with strong random strings for production.

### 4. Start the Application

Run the development server:
```bash
npm run dev
```

The application will start on **http://localhost:5000**

You should see output like:
```
3:23:19 AM [express] serving on port 5000
[vite] connected.
```

## Using the Application

### Access the Website
Open your browser and go to: **http://localhost:5000**

### Test Accounts & Workflow

#### Step 1: Register as a Donor (Restaurant/Food Business)
1. Click "Get Started" or go to the Register page
2. Select role: **Donor**
3. Fill in:
   - Full Name: Your restaurant name
   - Email: Your email
   - Password: Create a strong password
   - Phone: Your phone number
   - Business Details: Restaurant name, type, address
4. Click "Register"

#### Step 2: Create a Food Donation
1. Login with your donor account
2. Go to Dashboard → "Create Donation" tab
3. Fill in food details:
   - Category: Select from dropdown (Cooked Meals, Bakery, etc.)
   - Food Name: e.g., "Biryani", "Bread", "Vegetables"
   - Quantity: e.g., 50
   - Unit: kg, liter, pieces, boxes
   - Expiry Time: When the food expires
   - Dietary Info: Vegetarian, Vegan, Gluten-Free, etc.
   - Location: Your restaurant address
4. Click "Create Donation"

#### Step 3: Register as an NGO
1. Logout from donor account
2. Register a new account with role: **NGO**
3. Fill in:
   - Organization Name: NGO name
   - Email: NGO email
   - Password: Strong password
   - Phone: Contact number
   - Registration Number: NGO registration ID
   - Address: NGO location
   - Capacity: How many meals you can accept
   - Accepted Categories: Which food types you accept

#### Step 4: Accept Donations (NGO)
1. Login as NGO
2. Go to Dashboard → "Browse Donations"
3. You'll see all available donations from donors
4. Click "Accept Donation" on any donation
5. A delivery task is automatically created

#### Step 5: View Settings & Help
- Click "Settings" to manage your account
- Click "Help" to view FAQs and contact information

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Donations
- `GET /api/donations` - Get user's donations
- `GET /api/donations/available` - Get all pending donations
- `POST /api/donations` - Create new donation
- `POST /api/donations/:id/accept` - Accept donation (NGO only)

### Notifications
- `GET /api/notifications` - Get user notifications
- `POST /api/notifications/:id/read` - Mark notification as read

### Admin
- `GET /api/admin/pending-users` - Get pending user approvals
- `POST /api/admin/users/:id/verify` - Verify user
- `DELETE /api/admin/users/:id` - Delete user

## Project Structure

```
foodrescue/
├── client/                 # React frontend
│   ├── src/
│   │   ├── pages/         # Page components (Landing, Login, Dashboards)
│   │   ├── components/    # Reusable UI components
│   │   ├── contexts/      # Auth and Notification contexts
│   │   ├── lib/           # Utilities and API client
│   │   └── index.css      # Tailwind and custom styles
│   └── vite.config.ts     # Vite configuration
│
├── server/                # Express.js backend
│   ├── routes.ts          # API endpoints
│   ├── storage.ts         # In-memory data storage
│   └── index-dev.ts       # Server entry point
│
├── shared/                # Shared code
│   └── schema.ts          # Data models and Zod schemas
│
├── package.json           # Dependencies
└── README.md              # This file
```

## Troubleshooting

### Port Already in Use
If port 5000 is in use:
```bash
# Find process using port 5000
sudo lsof -i :5000

# Kill the process
kill -9 <PID>

# Then restart
npm run dev
```

### Dependencies Not Installing
```bash
# Clear npm cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Can't See Donations
- Make sure you're logged in as NGO
- Donor must have created a donation first
- Check browser console for errors (F12)

### Login Issues
- Verify email and password are correct
- Check that the account was created successfully during registration
- Clear browser cache and try again

## Technologies Used

**Frontend:**
- React with TypeScript
- Vite (fast build tool)
- Tailwind CSS (styling)
- Framer Motion (animations)
- React Query (data fetching)
- Wouter (routing)
- Shadcn UI (component library)

**Backend:**
- Express.js
- Node.js
- Socket.io (real-time)
- JWT (authentication)
- Bcryptjs (password hashing)
- Zod (validation)

**Data:**
- In-memory storage (can be upgraded to PostgreSQL)

## Development Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run type-check
```

## Production Deployment

To deploy to production:

1. **Set strong secrets**:
   ```env
   JWT_SECRET=<very-long-random-string>
   SESSION_SECRET=<very-long-random-string>
   NODE_ENV=production
   ```

2. **Build the app**:
   ```bash
   npm run build
   npm start
   ```

3. **Set up database** (optional):
   - Currently uses in-memory storage
   - For persistence, migrate to PostgreSQL (Drizzle ORM is already configured)

4. **Deploy to hosting**:
   - Heroku
   - Vercel
   - Railway
   - Any Node.js hosting service

## Support & Issues

For bugs or questions:
1. Check the Help page in the app
2. Review browser console (F12) for error messages
3. Check server logs in terminal

## License

This project is provided as-is for educational and nonprofit purposes.

## Next Steps

- [ ] Add PostgreSQL database for data persistence
- [ ] Implement email notifications
- [ ] Add payment integration for premium features
- [ ] Build mobile app
- [ ] Add advanced analytics and reporting
- [ ] Implement volunteer task tracking with GPS

---

**Happy rescuing food and reducing waste!** 🍽️♻️
