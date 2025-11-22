# Setting Up FoodRescue Locally with Persistent Database

## Option 1: SQLite (Easiest for Local Development)

### Step 1: Install SQLite
```bash
# On macOS
brew install sqlite3

# On Windows (with Chocolatey)
choco install sqlite

# On Linux (Ubuntu/Debian)
sudo apt-get install sqlite3
```

### Step 2: Update `.env` file
Create a `.env` file in the root directory:
```env
# Database (SQLite - local file)
DATABASE_URL="file:./data.db"

# JWT and Session (keep these)
JWT_SECRET="your-secret-key-change-in-production"
SESSION_SECRET="your-session-secret-key"
```

### Step 3: Update `drizzle.config.ts`
Replace the file content:
```typescript
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite",
  schema: "./shared/schema.ts",
  out: "./drizzle",
});
```

### Step 4: Run migrations
```bash
npm run db:push
```

This will create the SQLite database file automatically.

### Step 5: Update `server/db.ts`
Make sure it looks like this:
```typescript
import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "../shared/schema";

const dbPath = process.env.DATABASE_URL?.replace("file://", "") || "./data.db";
const sqlite = new Database(dbPath);
sqlite.pragma("journal_mode = WAL");

export const db = drizzle(sqlite, { schema });
```

### Step 6: Install additional packages
```bash
npm install better-sqlite3
```

---

## Option 2: PostgreSQL (Production-Ready)

### Step 1: Install PostgreSQL locally
```bash
# macOS
brew install postgresql@15

# Windows - Download from: https://www.postgresql.org/download/windows/

# Linux (Ubuntu/Debian)
sudo apt-get install postgresql postgresql-contrib
```

### Step 2: Create a local database
```bash
# Start PostgreSQL
brew services start postgresql  # macOS
# or
sudo service postgresql start   # Linux

# Create database
createdb foodrescue_local

# Check it's created
psql -l
```

### Step 3: Update `.env` file
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/foodrescue_local"
JWT_SECRET="your-secret-key-change-in-production"
SESSION_SECRET="your-session-secret-key"
```

### Step 4: Update `drizzle.config.ts`
```typescript
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./shared/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.DATABASE_URL || "",
  },
});
```

### Step 5: Update `server/db.ts`
```typescript
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "../shared/schema";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool, { schema });
```

### Step 6: Install packages
```bash
npm install pg
```

### Step 7: Run migrations
```bash
npm run db:push
```

---

## Step 7: Update `server/routes.ts` to use database

Replace the import at the top:
```typescript
// OLD:
// import { storage } from "./storage";

// NEW:
import { db } from "./db";
import * as schema from "../shared/schema";
import { eq, and } from "drizzle-orm";
```

Then update all storage calls to use Drizzle ORM queries instead.

**Example - Get user by email:**
```typescript
// OLD: await storage.getUserByEmail(email)
// NEW:
const user = await db.query.users.findFirst({
  where: eq(schema.users.email, email),
});
```

---

## Quick Start Summary

**For SQLite (Easiest):**
1. Create `.env` with `DATABASE_URL="file:./data.db"`
2. Update `drizzle.config.ts` to dialect "sqlite"
3. Update `server/db.ts` to use better-sqlite3
4. Run `npm install better-sqlite3 && npm run db:push`
5. Start app: `npm run dev`

**For PostgreSQL:**
1. Install PostgreSQL locally
2. Create database: `createdb foodrescue_local`
3. Create `.env` with PostgreSQL connection string
4. Update `drizzle.config.ts` to dialect "postgresql"
5. Update `server/db.ts` to use pg pool
6. Run `npm install pg && npm run db:push`
7. Start app: `npm run dev`

---

## Data Migration

If you have data in the current in-memory storage, it will NOT automatically transfer to the database. The data will be fresh/empty after switching to the database.

To preserve data, you'd need to export it and reimport it, which is beyond the scope of this guide.

---

## Troubleshooting

**Issue: "Module not found: better-sqlite3"**
- Run: `npm install better-sqlite3`

**Issue: "Cannot connect to PostgreSQL"**
- Make sure PostgreSQL is running: `brew services start postgresql`
- Check credentials in `.env` match your setup
- Verify database exists: `createdb foodrescue_local`

**Issue: "Migration failed"**
- Run with force flag: `npm run db:push --force`

---

## Running Locally

Once setup is complete:

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# App will run on http://localhost:5000
```

Visit the app and test the complete flow!
