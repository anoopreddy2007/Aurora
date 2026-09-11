# Aurora Finance & Authentication

This document explains Aurora's frontend authentication and personal finance systems.

---

## 1. Authentication

Aurora uses a frontend-only authentication system built with React Context and browser `localStorage`.

The authentication state is managed by:

```text
src/context/AuthContext.tsx
```

It provides:

```text
user
isAuthenticated
isLoading
signUp()
signIn()
signOut()
```

> This authentication system is for demonstration purposes and is not production-secure.

---

## 2. User Storage

Registered users are stored under:

```text
aurora-users
```

The active session is stored under:

```text
aurora-session
```

A stored user contains:

```text
User
├── id
├── name
├── email
└── password
```

The active session only stores the non-password user information.

---

## 3. Sign Up Flow

```text
User enters name, email, password
              ↓
        Form validation
              ↓
      Check existing email
              ↓
         Create user
              ↓
       Save user locally
              ↓
       Create session
              ↓
          Dashboard
```

Validation includes:

- Name required
- Email required
- Basic email format
- Password minimum length
- Duplicate email detection

---

## 4. Sign In Flow

```text
Email + Password
       ↓
    Validate
       ↓
Find matching local user
       ↓
 Create session
       ↓
   Dashboard
```

Invalid credentials produce an error message instead of granting access.

---

## 5. Sign Out

Signing out:

1. Removes `aurora-session`
2. Clears the current authentication state
3. Navigates the user back to the landing page

---

## 6. Protected Dashboard

The dashboard is only rendered for authenticated users.

```text
/dashboard
     ↓
Authentication check
     ↓
 ┌───┴───┐
 ↓       ↓
Valid   Invalid
 ↓       ↓
Show    /signin
dashboard
```

This provides frontend route protection for the MVP.

---

# Finance System

## 7. Finance Context

Financial state is managed by:

```text
src/context/FinanceContext.tsx
```

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

Components access this state using:

```ts
useFinance()
```

---

## 8. Finance Data Model

The main structure is:

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

## 9. Transaction Management

Users can:

- Add transactions
- Edit transactions
- Delete transactions
- Set transaction categories
- Set transaction amounts
- Set dates
- Mark transactions as recurring

Transaction actions are provided by `FinanceContext`:

```text
addTransaction()
updateTransaction()
deleteTransaction()
```

---

## 10. Goal Management

Users can:

- Create goals
- Update progress
- Edit goals
- Delete goals

Available actions:

```text
addGoal()
updateGoal()
deleteGoal()
```

Goal progress is derived from the current and target values.

---

## 11. Budget Allocation

Aurora divides the user's budget into:

```text
Needs
Wants
Savings
```

The allocation can be changed through the budget interface.

The current allocation is stored as part of `FinanceData`.

---

## 12. Dynamic Financial Calculations

Financial values are derived from the current transaction and income state.

### Spending

```text
Total Spending
= Sum of all transactions
```

### Savings

```text
Savings
= Income - Total Spending
```

### Savings Rate

```text
Savings Rate
= Savings / Income × 100
```

Category totals and budget-bucket totals are also calculated dynamically.

Therefore, when a user changes their financial data:

```text
User Input
   ↓
Finance State
   ↓
Calculations
   ↓
Charts / Cards / Progress
   ↓
Updated UI
```

No manual refresh is required.

---

## 13. Demo Data Isolation

The public landing page uses demo financial data.

Its storage key is:

```text
aurora-finance-demo
```

The landing page creates a separate finance provider using demo mode.

This allows visitors to interact with the budget and financial components without affecting authenticated user data.

---

## 14. Personal Finance Storage

Authenticated users receive their own finance storage key:

```text
aurora-finance-{userId}
```

For example:

```text
aurora-finance-user-123
```

This means different accounts maintain separate financial data.

```text
User A
  ↓
aurora-finance-user-A

User B
  ↓
aurora-finance-user-B
```

---

## 15. Persistence

Finance data is written to `localStorage` whenever the finance state changes.

When the user returns to the application, the stored finance data is loaded again.

This provides persistence for:

- Income
- Transactions
- Goals
- Budget allocation

Authentication persistence is handled separately through the session storage key.

---

## 16. Resetting Finance Data

`FinanceContext` provides:

```text
resetFinance()
```

This restores the default finance structure.

The reset functionality is useful for returning the application to its initial state during testing or demonstrations.

---

## 17. Security Scope

Aurora deliberately uses a frontend-only architecture.

### Included

- Basic form validation
- Local session handling
- Protected dashboard route
- Sign out
- User-specific finance storage
- No real financial credentials

### Not Included

- OAuth
- Backend authentication
- Password hashing
- Database authentication
- Email verification
- Password recovery
- Bank credentials
- Real financial data

Passwords are stored locally for the demo and should never be treated as securely stored production credentials.

---

## 18. Overall Data Flow

```text
                    Aurora
                       │
              ┌────────┴────────┐
              │                 │
          AuthContext     FinanceContext
              │                 │
          User/Session     Financial State
              │                 │
              └────────┬────────┘
                       │
                 React Components
                       │
                 Dynamic Calculations
                       │
                   localStorage
```

The system is intentionally simple and frontend-focused while still providing a complete interactive personal finance experience.
