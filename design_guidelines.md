# FoodRescue Platform Design Guidelines

## Design Approach
**Reference-Based**: Drawing inspiration from modern SaaS platforms with clean aesthetics and smooth interactions (Linear, Notion, Stripe). Focus on minimalist design with purposeful animations and card-based layouts.

## Color System

### Primary Palette
- **Primary Green**: `#10B981` (emerald - growth, sustainability)
- **Primary Dark**: `#059669` (hover states)
- **Primary Light**: `#D1FAE5` (backgrounds, subtle accents)

### Accent Colors
- **Orange**: `#F59E0B` (urgency indicators, warmth)
- **Red**: `#EF4444` (critical alerts)
- **Blue**: `#3B82F6` (in-transit status)

### Neutrals
- **50**: `#F9FAFB` (page backgrounds)
- **100**: `#F3F4F6` (card backgrounds)
- **200**: `#E5E7EB` (borders, dividers)
- **600**: `#4B5563` (secondary text)
- **900**: `#111827` (headings, primary text)

### Status Colors
- Success: `#10B981` | Warning: `#F59E0B` | Error: `#EF4444` | Info: `#3B82F6`

## Typography
**Font Family**: Inter (Google Fonts)
- **Headings**: Bold (700)
- **Body Text**: Regular (400)
- **Captions/Labels**: Medium (500)

**Scale**:
- H1: `text-4xl` to `text-5xl` (bold)
- H2: `text-3xl` (bold)
- H3: `text-2xl` (bold)
- Body: `text-base` (regular)
- Small: `text-sm` (medium)

## Layout System
**Spacing Units**: Tailwind spacing scale - primarily use `p-4`, `p-6`, `p-8`, `gap-4`, `gap-6`, `space-y-6`

**Container Widths**:
- Full-width sections: `w-full` with `max-w-7xl mx-auto px-6`
- Card content: Natural width with `p-6` padding
- Forms: `max-w-md` to `max-w-xl`

**Grid Patterns**:
- Stats cards: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6`
- Feature cards: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`
- Content grids: `grid-cols-1 lg:grid-cols-2 gap-8`

## Component Library

### Cards
- Border radius: `rounded-xl` (12px)
- Background: `bg-neutral-100` on `bg-neutral-50` pages
- Shadow: `shadow-md hover:shadow-lg` transition
- Padding: `p-6`
- Border: Optional `border border-neutral-200`

### Buttons
- Primary: `bg-primary-green hover:bg-primary-dark text-white`
- Secondary: `border-2 border-primary-green text-primary-green hover:bg-primary-light`
- Border radius: `rounded-lg` (8px)
- Padding: `px-6 py-3` (md), `px-4 py-2` (sm)
- Transitions: `transition-all duration-300`

### Inputs
- Border: `border-2 border-neutral-200 focus:border-primary-green`
- Border radius: `rounded-lg`
- Padding: `px-4 py-3`
- Background: `bg-white`

### Badges/Status
- Border radius: `rounded-full`
- Padding: `px-3 py-1`
- Font: `text-xs font-medium`
- Colors: Match status color system

### Modals
- Backdrop: `bg-black/50` with blur
- Container: `bg-white rounded-2xl shadow-2xl`
- Glass-morphism: `backdrop-blur-md bg-white/95`

## Animations (Framer Motion)

### Page Transitions
- Fade in + slide up on mount
- Duration: 300ms, ease-in-out

### Card Hover Effects
- Lift: `scale: 1.02`, `shadow-lg`
- Duration: 200ms

### Counter Animations
- Count-up for statistics
- Staggered reveals for dashboard cards

### Scroll Animations
- Fade in elements as they enter viewport
- Parallax effects on landing page hero

**Animation Principle**: Subtle and purposeful - enhance UX without overwhelming

## Page-Specific Layouts

### Landing Page
- Full-screen hero with gradient background (`bg-gradient-to-br from-primary-green to-primary-dark`)
- Animated floating food icons with parallax
- Statistics section with counter animations
- Feature cards grid with hover lifts
- Testimonials carousel
- Timeline for "How It Works"
- Large hero image showing food donation in action

### Dashboards
- Collapsible sidebar: Dark sidebar (`bg-neutral-900 text-white`) with icons
- Top navbar: White background, search bar, notification bell, profile dropdown
- Stats cards row at top
- Content area: White/light gray background with card-based sections
- Generous padding: `p-6` to `p-8`

### Forms
- Split-screen layouts for auth pages
- Form on left, gradient illustration/image on right
- Inline validation with error states
- Progress indicators for multi-step forms

## Images
- **Hero Section**: Large, vibrant image showing volunteers distributing food or restaurant staff packaging donations
- **Dashboard Cards**: Small icons for stats (use Lucide React icons)
- **Feature Sections**: Illustrative images showing platform features in action
- **Profile Areas**: Circular avatar images
- **Donation Cards**: Food item photos uploaded by donors (Cloudinary)

## Interaction Patterns
- Hover states on all interactive elements
- Loading spinners for async operations
- Toast notifications (React Hot Toast) in top-right
- Confirmation dialogs for destructive actions
- Real-time updates without page refresh (Socket.io)
- Smooth transitions between states

## Accessibility
- Focus states: `ring-2 ring-primary-green ring-offset-2`
- Sufficient contrast ratios
- Icon + text labels for clarity
- Keyboard navigation support