<div align="center">

# Aurora

### Watch your money behave.

A modern, frontend-focused personal finance web application that turns budgeting into a clear, interactive experience.

[**Live Demo**](https://aurora-mu-neon.vercel.app/) · [**GitHub Repository**](https://github.com/anoopreddy2007/Aurora)

</div>

---

## Overview

Aurora helps users understand where their money goes, organize spending, set financial goals, and see the effect of budget changes in real time.

The project is intentionally built as a **frontend product experience**. Authentication and financial data persistence are implemented locally in the browser, so no bank account or real financial credentials are required.

### What Aurora lets you do

- Explore an interactive public demo
- Create an account and sign in
- Set monthly income
- Adjust needs, wants, and savings allocation
- Add, edit, and delete transactions
- Create, update, and delete savings goals
- View dynamically calculated spending and savings
- Persist user data locally in the browser
- Use the application across desktop, tablet, and mobile layouts

---

## Product Flow

```text
Landing Page
     │
     ├── Try Live Demo
     │
     └── Sign Up
           │
       Create Account
           │
         Sign In
           │
       Personal Dashboard
           │
     ┌─────┼──────────┐
     │     │          │
   Budget Transactions Goals
     │     │          │
     └─────┼──────────┘
           │
     Dynamic Updates
           │
        Sign Out
```

---

## Core Features

| Feature | Description |
|---|---|
| **Interactive Budgeting** | Adjust needs, wants, and savings and see financial values update dynamically. |
| **Dashboard** | View income, spending, savings, budget information, transactions, and goals in one place. |
| **Transactions** | Add, edit, and delete transactions with category, amount, date, bucket, and recurring status. |
| **Goals** | Create savings goals and track current progress against a target amount. |
| **Local Authentication** | Sign up, sign in, sign out, session persistence, and protected dashboard routing. |
| **Dynamic Calculations** | Spending, savings, savings rate, category totals, and budget values are derived from application state. |
| **Responsive UI** | Designed and tested for desktop, tablet, and mobile viewports. |
| **Motion & Interaction** | Framer Motion powers page transitions, chart movement, scroll storytelling, hover states, and micro-interactions. |
| **Cursor Interaction** | A subtle cursor follower adds responsive visual feedback on pointer-based devices. |

---

## Tech Stack

### Frontend

- **React** — component-based UI
- **TypeScript** — type-safe application code
- **Vite** — development server and production build tooling
- **Tailwind CSS v4** — utility-first styling
- **React Router** — client-side routing

### UI & Motion

- **Framer Motion** — animations and interaction states
- **Lucide React** — interface icons
- **Space Grotesk** — headings, branding, and major numbers
- **Inter** — body text, labels, and supporting content

### State & Data

- **React Context** — shared authentication and finance state
- **LocalStorage** — browser persistence for accounts, sessions, and finance data

### Deployment

- **GitHub** — source control
- **Vercel** — production deployment

---

## Architecture

Aurora uses a modular React architecture where UI, state, data models, and pages are separated by responsibility.

```text
src/
│
├── components/
│   ├── landing/
│   │   ├── Navbar
│   │   ├── Hero
│   │   ├── Introduction
│   │   ├── BudgetAllocator
│   │   ├── DashboardShowcase
│   │   ├── BentoFeatures
│   │   ├── ScrollStory
│   │   ├── SecondaryFeatures
│   │   ├── Statistics
│   │   ├── CTA
│   │   └── Footer
│   │
│   ├── dashboard/
│   │   ├── TransactionManager
│   │   └── GoalManager
│   │
│   └── ui/
│       └── CursorFollower
│
├── context/
│   ├── AuthContext
│   └── FinanceContext
│
├── data/
│   └── finance
│
├── pages/
│   ├── SignIn
│   ├── SignUp
│   └── Dashboard
│
├── lib/
│   └── utils
│
├── App.tsx
└── index.css
```

### State Architecture

```text
                    Aurora
                       │
             ┌─────────┴─────────┐
             │                   │
        AuthContext        FinanceContext
             │                   │
      User + Session       Income + Finance
             │                   │
             └─────────┬─────────┘
                       │
                React Components
                       │
                  LocalStorage
```

`AuthContext` handles the current user, authentication state, sign up, sign in, sign out, and session persistence.

`FinanceContext` handles income, budget allocation, transactions, goals, derived calculations, and finance persistence.

---

## Finance Data Model

Aurora keeps the core financial model intentionally small.

```ts
type Transaction = {
  id: string;
  name: string;
  category: string;
  amount: number;
  date: string;
  bucket: "needs" | "wants" | "savings";
  recurring?: boolean;
};

type Goal = {
  id: string;
  name: string;
  current: number;
  target: number;
};

type FinanceData = {
  income: number;
  transactions: Transaction[];
  goals: Goal[];
  allocation: {
    needs: number;
    wants: number;
    savings: number;
  };
};
```

Financial values are derived from the current state rather than being permanently displayed as static values.

```text
Income
  │
  ├── Transactions
  │       │
  │       └── Spending
  │
  └── Allocation
          │
          ├── Needs
          ├── Wants
          └── Savings
                  │
                  └── Goals / Projections
```

---

## Demo & Personal Data

The public landing page and authenticated dashboard use separate finance storage scopes.

```text
Public Demo
    │
    └── aurora-finance-demo

Authenticated User
    │
    └── aurora-finance-{userId}
```

This keeps the public demo independent from personal dashboard data and isolates finance data between local user accounts.

---

## Authentication

Aurora uses frontend/demo authentication rather than a production authentication server.

### Included

- Name, email, and password registration
- Email and password validation
- Sign in
- Password visibility toggle
- Sign out
- Local session persistence
- Protected dashboard route
- Duplicate account handling
- Invalid credential handling
- Loading and error states

### Important

Passwords and sessions are stored locally for demonstration purposes. This implementation is **not intended to provide production-grade authentication security**.

Aurora does not connect to banks, payment providers, investment platforms, or financial institutions.

---

## Design System

Aurora follows a dark, minimal visual language with restrained accents.

| Token | Value |
|---|---|
| Background | `#08090A` |
| Secondary Background | `#0F1012` |
| Surface | `#17181A` |
| Elevated Surface | `#1B1C1F` |
| Border | `#292A2E` |
| Primary Text | `#F2F2F3` |
| Secondary Text | `#A6A7AC` |
| Muted Text | `#6F7076` |
| Primary Accent | `#7C83FF` |
| Positive State | `#56C7A0` |
| Warning | `#D6A85F` |
| Error | `#C87575` |

The interface emphasizes subtle borders, strong typography, dark surfaces, controlled glow, and minimal visual noise.

---

## Animation & Interaction

Motion is used to communicate hierarchy and interaction rather than simply decorate the interface.

Aurora includes:

- Hero entrance animations
- Staggered content reveals
- Scroll-driven storytelling
- Parallax effects
- Animated charts
- Budget slider interactions
- Count-up effects
- Dashboard transitions
- Authentication transitions
- Hover states
- Micro-interactions
- Cursor-following interaction

Reduced-motion preferences are respected so the content remains usable without motion.

---

## Responsive & Accessibility

Aurora was tested across desktop, tablet, and mobile.

The implementation includes:

- Semantic HTML
- Accessible form labels
- Keyboard navigation
- Visible focus states
- Keyboard-operable controls
- Responsive navigation
- Touch-friendly controls
- Horizontal overflow prevention
- Reduced-motion support
- Accessible button and link semantics

---

## Performance

Performance work focused on keeping the application lightweight while preserving the visual experience.

The optimization work included:

- Production build verification
- Removing unused components
- Removing unused imports
- Dependency cleanup
- Bundle inspection
- CSS reduction
- Animation review
- `npm dedupe`
- Final production build testing

---

## Development Process

Aurora was developed as a product workflow rather than only a collection of screens.

```text
Product Idea
     ↓
PRD
     ↓
Visual Research
     ↓
Design Exploration
     ↓
Figma
     ↓
React + TypeScript + Vite
     ↓
Static UI
     ↓
Animation
     ↓
Interactive Finance
     ↓
Authentication
     ↓
Responsive Design
     ↓
Performance
     ↓
Testing
     ↓
Documentation
     ↓
GitHub
     ↓
Vercel
```

---

## Local Development

### Requirements

- Node.js
- npm
- Git

### Installation

```bash
git clone https://github.com/anoopreddy2007/Aurora.git
cd Aurora
npm install
```

### Start the development server

```bash
npm run dev
```

### Create a production build

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

---

## Deployment

Aurora is deployed on **Vercel** and connected to the GitHub repository.

**Production URL:** https://aurora-mu-neon.vercel.app/

Updates pushed to the `main` branch trigger a new production deployment through the existing Vercel integration.

---

<div align="center">

### Aurora

**Watch your money behave.**

[**Open the live app →**](https://aurora-mu-neon.vercel.app/)

</div>
