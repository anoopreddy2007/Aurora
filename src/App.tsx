import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import {
  AuthProvider,
  useAuth,
} from "./context/AuthContext";

import {
  FinanceProvider,
} from "./context/FinanceContext";

import { Navbar } from "./components/landing/Navbar";
import { Hero } from "./components/landing/Hero";
import { Introduction } from "./components/landing/Introduction";
import { BudgetAllocator } from "./components/landing/BudgetAllocator";
import { TransactionManager } from "./components/dashboard/TransactionManager";
import { GoalManager } from "./components/dashboard/GoalManager";
import { DashboardShowcase } from "./components/landing/DashboardShowcase";
import { BentoFeatures } from "./components/landing/BentoFeatures";
import { ScrollStory } from "./components/landing/ScrollStory";
import { SecondaryFeatures } from "./components/landing/SecondaryFeatures";
import { Statistics } from "./components/landing/Statistics";
import { CTA } from "./components/landing/CTA";
import { Footer } from "./components/landing/Footer";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";

function LandingPage() {
  return (
    <FinanceProvider demoMode>
      <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#070708] text-[#F1F1F2]">
        <Navbar />

        <main className="w-full max-w-full overflow-x-hidden">
          <Hero />

          <Introduction />

          <BudgetAllocator />

          <TransactionManager />

          <GoalManager />

          <DashboardShowcase />

          <BentoFeatures />

          <ScrollStory />

          <SecondaryFeatures />

          <Statistics />

          <CTA />
        </main>

        <Footer />
      </div>
    </FinanceProvider>
  );
}

function ProtectedDashboard() {
  const {
    isAuthenticated,
    isLoading,
  } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#08090A] text-sm text-[#777B84]">
        Loading Aurora...
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/signin"
        replace
      />
    );
  }

  return (
    <FinanceProvider>
      <Dashboard />
    </FinanceProvider>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={<LandingPage />}
      />

      <Route
        path="/signin"
        element={<SignIn />}
      />

      <Route
        path="/signup"
        element={<SignUp />}
      />

      <Route
        path="/dashboard"
        element={<ProtectedDashboard />}
      />

      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}