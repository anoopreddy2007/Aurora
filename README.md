Aurora
> Watch your money behave.
Aurora is a frontend-heavy interactive personal budgeting and money-tracking web application designed to make personal finance feel visual, intuitive, and engaging instead of spreadsheet-like.
The project combines a polished dark interface, interactive budgeting, financial visualizations, scroll-driven storytelling, smooth animations, local authentication, and a personalized dashboard.
Aurora is intentionally frontend-focused. It does not connect to real banks or use a production backend/database.
---
Live Demo

Live URL: https://aurora-mu-neon.vercel.app/
---

Planned showcase:
Landing page
Interactive budget allocator
Dashboard overview
Transactions
Goals
Sign In
Sign Up
Mobile responsive experience
---
Overview
Aurora was built around a simple idea:
Make money visible.
Traditional budgeting tools can feel dense, complicated, and difficult to maintain. Aurora turns financial information into interactive visualizations so users can understand spending, adjust their budget, and track progress toward financial goals.
The experience begins with a public interactive demo.
Users can then create an account and enter their own personalized dashboard, where their financial data is stored locally in the browser.
The core product concept is:
```text
                    Income
                       |
          +------------+------------+
          |            |            |
        Needs        Wants       Savings
          |            |            |
       Expenses     Lifestyle      Goals
```
Changing financial values updates the surrounding visualizations and calculations dynamically.
---
Goals
Aurora was built to demonstrate:
Premium frontend UI design
Interactive financial experiences
Reusable React architecture
TypeScript development
Responsive design
Framer Motion animations
Scroll-driven storytelling
Local authentication
Persistent user data
Dynamic financial calculations
Accessibility considerations
Performance optimization
Production deployment workflow
The project follows the philosophy:
> **Build a small product with a large visual impact.**
---
Features
Landing Experience
The public landing page includes:
Responsive navigation
Hero section
Financial dashboard visualization
Product introduction
Interactive budget allocator
Interactive financial showcase
Feature bento section
Scroll-driven product story
Secondary feature sections
Statistics
Final CTA
Footer
The public experience is designed to communicate the product visually before requiring an account.
---
Interactive Budget Allocator
The budget allocator allows users to experiment with financial allocation.
Users can adjust:
Needs
Wants
Savings
The interface responds dynamically to changes through:
Allocation percentages
Financial calculations
Visual charts
Savings values
Budget projections
Goal-related progress
This is one of the central interactive experiences in Aurora.
---
Authentication
Aurora includes a frontend authentication flow.
Users can:
Create an account
Sign in
Sign out
Persist their session locally
Access a protected dashboard
Sign Up collects:
Name
Email
Password
The forms include:
Required-field validation
Email validation
Password validation
Loading states
Error states
Successful registration
Dashboard redirection
---
Personalized Dashboard
Authenticated users receive their own dashboard.
The dashboard includes:
Overview
Budget
Transactions
Goals
Financial summaries
Dynamic calculations
Financial values are derived from the user's stored data rather than being permanently hardcoded into the dashboard.
---
Transactions
Users can manage financial transactions.
Each transaction can contain:
Merchant/name
Category
Amount
Date
Budget bucket
Recurring status
Users can:
Add transactions
Edit transactions
Delete transactions
Transaction changes immediately affect financial calculations.
---
Goals
Users can create and manage savings goals.
Each goal contains:
Goal name
Current progress
Target amount
Users can:
Add goals
Update goals
Delete goals
Goal progress is reflected in the dashboard experience.
---
Dynamic Financial Calculations
Aurora calculates financial values from the current transaction and income data.
Examples include:
Total spending
Remaining savings
Savings rate
Category spending
Needs spending
Wants spending
Savings allocation
This means changing the underlying financial data changes the corresponding interface instead of simply displaying static mock values.
---
Local Persistence
Aurora uses browser storage to persist application data.
User accounts and sessions are stored locally.
Financial data is stored separately for each user:
```text
aurora-finance-{userId}
```
The public demo uses a separate storage scope:
```text
aurora-finance-demo
```
This keeps the public demo completely independent from authenticated user data.
---
User Journey
The main user journey is:
```text
Landing Page
      |
      +----------------------+
      |                      |
 Try Live Demo           Sign Up
      |                      |
Interactive Demo        Create Account
                             |
                           Login
                             |
                         Dashboard
                             |
              +--------------+--------------+
              |              |              |
            Budget       Transactions     Goals
              |              |              |
              +--------------+--------------+
                             |
                      Dynamic Updates
                             |
                          Sign Out
                             |
                    Landing / Sign In
```
Users never need to connect a bank account.
---
Tech Stack
Core
React
TypeScript
Vite
Styling
Tailwind CSS v4
Custom Aurora design tokens
Space Grotesk
Inter
Animation
Framer Motion
Icons
Lucide React
Routing
React Router
Data
React Context
Browser LocalStorage
---
Architecture
Aurora follows a component-based React architecture.
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
│   └── dashboard/
│       ├── TransactionManager
│       └── GoalManager
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
---
Context Architecture
Aurora uses React Context for application-wide state.
AuthContext
`AuthContext` manages:
Current user
Authentication state
Loading state
Sign Up
Sign In
Sign Out
Session persistence
The authentication implementation is intentionally local because Aurora is a frontend mini-project.
---
FinanceContext
`FinanceContext` manages:
Income
Transactions
Goals
Budget allocation
Spending calculations
Savings calculations
Category calculations
Bucket calculations
It also provides operations for:
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
---
Demo vs Personal Data
Aurora deliberately separates public demo data from authenticated user data.
```text
                         Aurora
                            |
              +-------------+-------------+
              |                           |
        Public Landing              Dashboard
              |                           |
        Demo Finance               User Finance
              |                           |
 aurora-finance-demo       aurora-finance-{userId}
```
This means:
The public demo does not use personal dashboard data.
Authenticated users receive their own finance dataset.
Multiple users have isolated finance data.
Returning to the landing page does not expose personal dashboard values.
---
Data Model
User
```ts
type AuroraUser = {
  id: string;
  name: string;
  email: string;
};
```
---
Transaction
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
```
---
Goal
```ts
type Goal = {
  id: string;
  name: string;
  current: number;
  target: number;
};
```
---
Finance Data
```ts
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
---
Design System
Aurora uses a dark, minimal visual language with restrained accent colors.
The final implementation prioritizes:
Near-black backgrounds
Dark charcoal surfaces
Subtle borders
White primary typography
Muted secondary typography
Purple/indigo primary accents
Green reserved for positive financial states
Minimal glow
Soft depth
Rounded cards
Premium typography
The interface intentionally avoids excessive neon effects.
---
Typography
Space Grotesk
Used primarily for:
Headings
Major numbers
Product branding
Inter
Used primarily for:
Body text
Labels
Form fields
Supporting information
---
Core Colors
Approximate design tokens:
```text
Background       #08090A
Secondary BG     #0F1012
Surface          #17181A
Elevated         #1B1C1F
Border           #292A2E

Primary Text     #F2F2F3
Secondary Text   #A6A7AC
Muted Text       #6F7076

Primary Accent   #7C83FF
Positive Green   #56C7A0

Warning          #D6A85F
Error            #C87575
```
---
Animation System
Framer Motion is used for meaningful interface motion rather than animation for its own sake.
Aurora includes:
Hero animations
Entrance animations
Staggered content
Scroll-driven storytelling
Parallax effects
Chart animations
Slider interactions
Count-up animations
Dashboard transitions
Authentication transitions
Hover states
Micro-interactions
The animation system is designed to reinforce the financial story and provide feedback when users interact with the application.
---
Responsive Design
Aurora is designed for:
Desktop
Tablet
Mobile
Responsive work includes:
Flexible layouts
Mobile navigation
Responsive typography
Responsive dashboard cards
Horizontal navigation where appropriate
Mobile-friendly forms
Overflow prevention
Touch-friendly controls
The application was tested specifically for horizontal overflow and mobile layout issues.
---
Accessibility
Accessibility considerations include:
Semantic HTML
Proper button/link semantics
Accessible form labels
Keyboard navigation
Visible focus states
Keyboard-operable sliders
Sufficient contrast
Reduced-motion support
Chart accessibility considerations
Aurora also includes reduced-motion handling through CSS and animation behavior.
---
Performance
Performance work was completed before documentation.
The optimization process included:
Production build testing
Removing unused components
Removing unused imports
Dependency cleanup
Bundle inspection
Animation review
CSS reduction
Unused code removal
The final production build completed successfully.
Unused UI components removed during optimization included:
```text
Badge
Button
GlassCard
Input
Slider
Reveal
```
Dependency cleanup was also performed using npm deduplication.
---
Local Development
Requirements
You need:
Node.js
npm
Git
---
Installation
Clone the repository:
```bash
git clone <repository-url>
```
Enter the project:
```bash
cd aurora
```
Install dependencies:
```bash
npm install
```
---
Start Development Server
```bash
npm run dev
```
Vite will start the development server.
---
Production Build
```bash
npm run build
```
---
Preview Production Build
```bash
npm run preview
```
---
Authentication Scope
Aurora's authentication is intentionally a frontend/demo implementation.
Included:
Basic validation
Local account creation
Local session handling
Protected dashboard route
Sign out
Persistent browser session
Not included:
OAuth
Authentication server
Secure password hashing
Production session management
Email verification
Password recovery
Backend authorization
Passwords are stored locally for demonstration purposes and should not be considered production-secure authentication.
---
Financial Data Scope
Aurora does not connect to:
Bank accounts
Credit cards
Payment providers
Financial institutions
Investment platforms
There are no real financial credentials involved.
All financial information is simulated and stored locally in the browser.
---
Project Scope
Aurora intentionally excludes:
Real bank connections
Real bank APIs
Bank credentials
Payment processing
Complex backend infrastructure
Production databases
Real-time bank synchronization
Investment trading
Production-scale AI
Enterprise finance management
Admin dashboards
Native mobile applications
The project focuses on frontend engineering, interaction design, animation, responsiveness, and product experience.
---
Development Process
Aurora was developed through the following process:
```text
Product Idea
     ↓
PRD
     ↓
Visual Research
     ↓
Stitch Exploration
     ↓
Figma
     ↓
Frontend Foundation
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
Vercel Deployment
```
The implementation was organized into development phases:
```text
Phase 1  Concept & Planning
Phase 2  Design Exploration
Phase 3  Figma
Phase 4  Frontend Foundation
Phase 5  Static Implementation
Phase 6  Animation
Phase 7  Responsive & Accessibility
Phase 8  Performance + Functional Finance
Phase 9  Documentation
Phase 10 Deployment
```
---
Challenges
Making Financial Data Dynamic
The initial interface contained many static financial values.
The architecture was refactored so financial information is derived from actual application state.
For example:
```text
Income
  ↓
Transactions
  ↓
Spending
  ↓
Savings
  ↓
Savings Rate
  ↓
Charts / Goals / Dashboard
```
This allows user actions to propagate through the interface.
---
Per-User Data Isolation
A shared finance storage key would cause users to see the same data.
Aurora instead uses user-specific storage keys:
```text
aurora-finance-user-A
aurora-finance-user-B
```
This keeps each user's local financial state independent.
---
Public Demo Isolation
The landing page also contains interactive finance components.
The public demo therefore uses its own finance scope:
```text
aurora-finance-demo
```
This prevents authenticated personal data from appearing inside the public product demo.
---
Responsive Overflow
Complex financial visualizations and wide layouts can easily create horizontal overflow on smaller screens.
Responsive testing and root-level overflow handling were used to ensure the experience remains usable across viewport sizes.
---
Visual Consistency
The implementation was refined to stay close to the Figma direction.
The final visual language emphasizes:
Minimal dark surfaces
Restrained accents
Strong typography
Subtle borders
Controlled motion
Less visual noise
---
Testing
The following flows were manually tested:
Authentication
Sign Up
Sign In
Sign Out
Session persistence
Invalid credentials
Duplicate account handling
Finance
Income updates
Budget allocation
Transaction creation
Transaction editing
Transaction deletion
Goal creation
Goal updates
Goal deletion
Dynamic calculations
Local persistence
Data Isolation
User A data persistence
User B data isolation
User A data restoration
Public demo isolation
Responsive
Desktop
Tablet
Mobile
Navigation
Forms
Dashboard
Horizontal overflow
Production
```bash
npm run build
```
Production build completed successfully.
---
Current Status
Aurora's implementation is complete through Phase 9.
```text
Phase 1  Concept & Planning           ✅
Phase 2  Design Exploration           ✅
Phase 3  Figma                        ✅
Phase 4  Frontend Foundation          ✅
Phase 5  Static Implementation        ✅
Phase 6  Animation                    ✅
Phase 7  Responsive & Accessibility   ✅
Phase 8  Performance & Functionality  ✅
Phase 9  Documentation                🚧
Phase 10 Deployment                   ⏳
```
---
Future Improvements
Possible future versions could introduce:
Real authentication backend
Secure password handling
Database-backed user accounts
Real bank aggregation
Real-time financial synchronization
AI-powered spending insights
Investment tracking
Shared/household budgets
Advanced analytics
Native mobile application
These features are intentionally outside the current frontend MVP scope.
---
Portfolio Objective
Aurora is intended to demonstrate the complete frontend product-development workflow:
```text
Concept
   ↓
Product Requirements
   ↓
Design
   ↓
React Implementation
   ↓
Interaction
   ↓
Animation
   ↓
Responsive Design
   ↓
Performance
   ↓
Testing
   ↓
Documentation
   ↓
Deployment
```
The goal is not simply to build a landing page, but to demonstrate the ability to take a product idea from concept to a polished, interactive frontend experience.
---
License
This project was created as a frontend mini-project and portfolio piece.