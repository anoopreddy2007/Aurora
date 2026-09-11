import { useState } from "react";
import {
  ArrowLeft,
  BarChart3,
  CircleDollarSign,
  LogOut,
  Menu,
  Target,
  Wallet,
  X,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useFinance } from "../context/FinanceContext";
import { BudgetAllocator } from "../components/landing/BudgetAllocator";
import { DashboardShowcase } from "../components/landing/DashboardShowcase";
import { GoalManager } from "../components/dashboard/GoalManager";
import { TransactionManager } from "../components/dashboard/TransactionManager";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { finance, spending, savingsRate } = useFinance();

  const handleSignOut = () => {
    signOut();
    navigate("/", { replace: true });
  };

  if (!user) {
    return null;
  }

  const navigation = [
    {
      id: "overview",
      label: "Overview",
      icon: BarChart3,
    },
    {
      id: "budget",
      label: "Budget",
      icon: Wallet,
    },
    {
      id: "transactions",
      label: "Transactions",
      icon: CircleDollarSign,
    },
    {
      id: "goals",
      label: "Goals",
      icon: Target,
    },
  ];

  return (
    <div className="min-h-screen bg-[#08090A] text-[#F2F2F3]">
      <header className="sticky top-0 z-50 border-b border-[#292A2E] bg-[#08090A]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-7 lg:px-10">
          <div className="flex items-center gap-7">
            <Link
              to="/"
              className="font-[Space_Grotesk] text-xl font-semibold tracking-tight"
            >
              aurora
            </Link>

            <span className="hidden h-5 w-px bg-[#292A2E] sm:block" />

            <p className="hidden text-sm text-[#777B84] sm:block">
              Personal dashboard
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-[#6F7076]">{user.email}</p>
            </div>

            <button
              type="button"
              onClick={handleSignOut}
              className="hidden items-center gap-2 rounded-xl border border-[#292A2E] px-3.5 py-2 text-sm text-[#A6A7AC] transition hover:border-[#3A3C42] hover:text-[#F2F2F3] sm:flex"
            >
              <LogOut size={15} />
              Sign out
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((current) => !current)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              className="rounded-xl border border-[#292A2E] p-2.5 text-[#A6A7AC] sm:hidden"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-[#292A2E] px-5 py-4 sm:hidden">
            <div className="mb-4">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-[#6F7076]">{user.email}</p>
            </div>

            <button
              type="button"
              onClick={handleSignOut}
              className="flex w-full items-center gap-2 rounded-xl border border-[#292A2E] px-4 py-3 text-sm text-[#A6A7AC]"
            >
              <LogOut size={15} />
              Sign out
            </button>
          </div>
        )}
      </header>

      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-7 lg:px-10 lg:py-10">
        <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <Link
              to="/"
              className="mb-4 inline-flex items-center gap-2 text-sm text-[#777B84] transition hover:text-[#F2F2F3]"
            >
              <ArrowLeft size={15} />
              Back to Aurora
            </Link>

            <p className="mb-2 text-sm text-[#7C83FF]">Your money, clearly.</p>

            <h1 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Good to see you, {user.name.split(" ")[0]}.
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-[#A6A7AC]">
              Everything here updates from the financial data you've entered.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <div className="rounded-xl border border-[#292A2E] bg-[#111214] px-3 py-3 sm:px-4">
              <p className="text-[11px] uppercase tracking-wider text-[#6F7076]">
                Income
              </p>
              <p className="mt-1 text-sm font-semibold sm:text-base">
                ₹{Math.round(finance.income).toLocaleString("en-IN")}
              </p>
            </div>

            <div className="rounded-xl border border-[#292A2E] bg-[#111214] px-3 py-3 sm:px-4">
              <p className="text-[11px] uppercase tracking-wider text-[#6F7076]">
                Spent
              </p>
              <p className="mt-1 text-sm font-semibold sm:text-base">
                ₹{Math.round(spending).toLocaleString("en-IN")}
              </p>
            </div>

            <div className="rounded-xl border border-[#292A2E] bg-[#111214] px-3 py-3 sm:px-4">
              <p className="text-[11px] uppercase tracking-wider text-[#6F7076]">
                Savings
              </p>
              <p className="mt-1 text-sm font-semibold text-[#56C7A0] sm:text-base">
                {Math.round(savingsRate)}%
              </p>
            </div>
          </div>
        </div>

        <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="flex shrink-0 items-center gap-2 rounded-xl border border-[#292A2E] bg-[#111214] px-4 py-2.5 text-sm text-[#A6A7AC] transition hover:border-[#3A3C42] hover:text-[#F2F2F3]"
              >
                <Icon size={15} />
                {item.label}
              </a>
            );
          })}
        </div>

        <section id="overview" className="scroll-mt-24">
          <DashboardShowcase />
        </section>

        <section id="budget" className="scroll-mt-24">
          <BudgetAllocator />
        </section>

        <section id="transactions" className="scroll-mt-24">
          <TransactionManager />
        </section>

        <section id="goals" className="scroll-mt-24">
          <GoalManager />
        </section>
      </main>
    </div>
  );
}