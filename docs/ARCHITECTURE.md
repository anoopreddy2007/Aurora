# Aurora Architecture

This document explains the main technical structure of Aurora and how data moves through the application.

---

## 1. Application Structure

Aurora is built with React, TypeScript, Vite, Tailwind CSS, and React Router.

The application is divided into:

```text
src/
├── components/
│   ├── landing/
│   └── dashboard/
├── context/
│   ├── AuthContext.tsx
│   └── FinanceContext.tsx
├── data/
│   └── finance.ts
├── pages/
│   ├── SignIn.tsx
│   ├── SignUp.tsx
│   └── Dashboard.tsx
├── App.tsx
└── index.css
```

The structure separates reusable UI components, application state, financial logic, and route-level pages.

---

## 2. Routing

React Router controls navigation between the public landing page, authentication pages, and dashboard.

```text
/              → Landing page
/signin        → Sign in
/signup        → Create account
/dashboard     → Protected dashboard
```

Unknown routes are redirected to `/`.

---

## 3. Authentication Architecture

Authentication is handled by `AuthContext`.

```text
AuthContext
│
├── user
├── isAuthenticated
├── signUp()
├── signIn()
└── signOut()
```

User accounts are stored in:

```text
aurora-users
```

The current session is stored in:

```text
aurora-session
```

The application restores the session when it loads.

### Authentication Flow

```text
Sign Up
  ↓
Validate form
  ↓
Create user
  ↓
Save user locally
  ↓
Create session
  ↓
Dashboard
```

```text
Sign In
  ↓
Validate credentials
  ↓
Find stored user
  ↓
Create session
  ↓
Dashboard
```

Signing out removes the active session and returns the user to the landing page.

> Aurora authentication is intended for demonstration purposes only. It is not production authentication.

---

## 4. Protected Dashboard

The dashboard is protected through `ProtectedDashboard` in `App.tsx`.

```text
User requests /dashboard
        ↓
Check authentication
        ↓
   ┌────┴────┐
   │         │
Authenticated  Not authenticated
   │         │
Dashboard   /signin
```

This prevents unauthenticated users from accessing the personal dashboard.

---

## 5. Finance Architecture

Financial state is managed by `FinanceContext`.

It provides:

- Income
- Budget allocation
- Transactions
- Goals
- Spending
- Savings
- Savings rate
- Category spending
- Bucket spending

Main actions include:

```text
setIncome()
setAllocation()

addTransaction()
updateTransaction()
deleteTransaction()

addGoal()
updateGoal()
deleteGoal()

resetFinance()
```

Components consume this state through:

```ts
useFinance()
```

---

## 6. Financial Data Model

The main financial structure is:

```text
FinanceData
├── income
├── transactions[]
├── goals[]
└── allocation
    ├── needs
    ├── wants
    └── savings
```

### Transaction

```text
Transaction
├── id
├── name
├── category
├── amount
├── date
├── bucket
└── recurring
```

### Goal

```text
Goal
├── id
├── name
├── current
└── target
```

---

## 7. Dynamic Calculations

Aurora does not rely on hardcoded financial results inside the dashboard.

Values are calculated from the current finance state.

For example:

```text
Total Spending
    ↓
Sum of transactions
    ↓
Savings = Income - Spending
    ↓
Savings Rate
    ↓
Charts / Statistics / Progress
```

Category and budget-bucket totals are also derived from transactions.

Adding, editing, or deleting a transaction automatically updates dependent financial values.

---

## 8. Demo Data vs User Data

Aurora separates the public demo from authenticated users.

### Public Demo

```text
aurora-finance-demo
```

The landing page runs its own `FinanceProvider` in demo mode.

### Authenticated Users

```text
aurora-finance-{userId}
```

Each user receives an independent finance storage key.

```text
                 Finance
                    │
          ┌─────────┴─────────┐
          │                   │
       Demo Mode          User Mode
          │                   │
aurora-finance-demo   aurora-finance-{userId}
```

This prevents changes made in the public demo from affecting a user's personal dashboard.

---

## 9. Local Persistence

Aurora uses browser `localStorage` for the frontend MVP.

Stored information includes:

```text
aurora-users
aurora-session
aurora-finance-demo
aurora-finance-{userId}
```

Finance data is saved whenever the finance state changes.

When the application loads, stored data is restored automatically.

---

## 10. Component Architecture

Landing sections are implemented as reusable components.

```text
Navbar
Hero
Introduction
BudgetAllocator
DashboardShowcase
BentoFeatures
ScrollStory
SecondaryFeatures
Statistics
CTA
Footer
```

Dashboard-specific functionality is separated into:

```text
TransactionManager
GoalManager
```

This keeps large pages from containing all UI logic themselves.

---

## 11. Dashboard Data Flow

The dashboard follows this general flow:

```text
User Input
    ↓
FinanceContext action
    ↓
Finance state update
    ↓
Derived calculations
    ↓
React re-render
    ↓
Updated UI
    ↓
localStorage persistence
```

For example:

```text
User adds ₹5,000 transaction
        ↓
addTransaction()
        ↓
transactions updated
        ↓
spending recalculated
        ↓
savings recalculated
        ↓
charts/statistics update
        ↓
data persisted
```

---

## 12. Styling Architecture

Aurora uses Tailwind CSS for component-level styling.

Global design tokens and typography are defined in:

```text
src/index.css
```

The interface follows a dark minimal design system with:

- Near-black backgrounds
- Dark elevated surfaces
- Subtle borders
- White primary typography
- Muted secondary typography
- Purple/indigo primary accent
- Green for positive financial states

The design intentionally avoids excessive neon effects.

---

## 13. Animation Architecture

Framer Motion handles application animations.

Animations are primarily used for:

- Section entrances
- Hero movement
- Scroll storytelling
- Parallax
- Chart animation
- Count-up effects
- Dashboard transitions
- Authentication transitions
- Micro-interactions

Animations respect the user's reduced-motion preference.

---

## 14. Responsive Architecture

Aurora uses Tailwind responsive utilities to adapt layouts across:

```text
Mobile
Tablet
Desktop
```

Important responsive considerations include:

- Mobile navigation
- Flexible dashboard grids
- Responsive typography
- Horizontal navigation scrolling
- Responsive financial cards
- Preventing horizontal page overflow

---

## 15. Application Boundaries

Aurora intentionally keeps its scope frontend-focused.

### Included

- Local authentication
- Local sessions
- Protected routes
- Personal financial data
- Dynamic calculations
- Transactions
- Goals
- Budget allocation
- Responsive UI
- Animations

### Not Included

- Backend authentication
- OAuth
- Database
- Bank integrations
- Real financial accounts
- Payment processing
- Production password security

These boundaries keep the project suitable for a frontend-focused mini-project while still demonstrating a realistic product architecture.

---

## 16. Overall Architecture

```text
                    Aurora
                       │
          ┌────────────┴────────────┐
          │                         │
       Public                    Authenticated
       Landing                     User
          │                         │
   Demo Finance              AuthContext
          │                         │
          │                  FinanceContext
          │                         │
          └────────────┬────────────┘
                       │
                 React Components
                       │
                Dynamic UI State
                       │
                  localStorage
```

The architecture is intentionally simple: React handles the interface, Context manages shared state, utility functions calculate financial values, and browser storage provides persistence for the frontend MVP.
