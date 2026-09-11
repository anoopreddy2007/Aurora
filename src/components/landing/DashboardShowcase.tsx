import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Target,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";

import { useFinance } from "../../context/FinanceContext";
import {
  formatCurrency,
  type BudgetBucket,
} from "../../data/finance";

type DashboardTab =
  | "Overview"
  | "Spending"
  | "Budget"
  | "Goals";

const tabs: DashboardTab[] = [
  "Overview",
  "Spending",
  "Budget",
  "Goals",
];

const bucketColors: Record<
  BudgetBucket,
  string
> = {
  needs: "#52B788",
  wants: "#666CC7",
  savings: "#7C83FF",
};

const bucketLabels: Record<
  BudgetBucket,
  string
> = {
  needs: "Needs",
  wants: "Wants",
  savings: "Savings",
};

function MetricCard({
  label,
  value,
  detail,
  icon,
}: {
  label: string;
  value: string;
  detail?: string;
  icon: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45 }}
      className="min-w-0 rounded-[14px] border border-[#292B30] bg-[#111214] p-4 sm:p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-[8px] uppercase tracking-[0.15em] text-[#777B84]">
          {label}
        </p>

        <span className="text-[#666CC7]">
          {icon}
        </span>
      </div>

      <p className="mt-4 truncate font-space text-[21px] font-medium tracking-[-0.03em] text-[#F1F1F2] sm:text-[24px]">
        {value}
      </p>

      {detail && (
        <p className="mt-1 truncate text-[8px] text-[#777B84]">
          {detail}
        </p>
      )}
    </motion.div>
  );
}

function SectionCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`min-w-0 rounded-[14px] border border-[#292B30] bg-[#111214] ${className}`}
    >
      {children}
    </div>
  );
}

function ProgressBar({
  value,
  color,
}: {
  value: number;
  color: string;
}) {
  return (
    <div className="h-[5px] w-full overflow-hidden rounded-full bg-[#24262A]">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{
          width: `${Math.max(
            0,
            Math.min(100, value)
          )}%`,
        }}
        viewport={{ once: true }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
      />
    </div>
  );
}

export function DashboardShowcase() {
  const [activeTab, setActiveTab] =
    useState<DashboardTab>("Overview");

  const {
    finance,
    spending,
    savings,
    savingsRate,
    categorySpending,
    bucketSpending,
  } = useFinance();

  const {
    income,
    transactions,
    goals,
    allocation,
  } = finance;

  const largestCategory = useMemo(
    () => categorySpending[0],
    [categorySpending]
  );

  const previousMonthComparison = useMemo(() => {
    if (spending === 0) return 0;

    /*
     * There is currently no previous-month data in the
     * finance model, so we deliberately avoid inventing
     * a percentage comparison.
     */
    return null;
  }, [spending]);

  const activeGoals = goals.filter(
    (goal) => goal.current < goal.target
  );

  const completedGoals = goals.filter(
    (goal) => goal.current >= goal.target
  );

  const averageGoalProgress =
    goals.length > 0
      ? goals.reduce(
          (total, goal) =>
            total +
            Math.min(
              100,
              (goal.current / Math.max(1, goal.target)) *
                100
            ),
          0
        ) / goals.length
      : 0;

  const sortedTransactions = useMemo(
    () =>
      [...transactions]
        .sort(
          (a, b) =>
            new Date(b.date).getTime() -
            new Date(a.date).getTime()
        )
        .slice(0, 6),
    [transactions]
  );

  const bucketData = (
    Object.keys(bucketLabels) as BudgetBucket[]
  ).map((bucket) => ({
    bucket,
    label: bucketLabels[bucket],
    amount: bucketSpending[bucket],
    percentage:
      income > 0
        ? Math.round(
            (bucketSpending[bucket] / income) *
              100
          )
        : 0,
    allocation: allocation[bucket],
    color: bucketColors[bucket],
  }));

  const getTabDescription = () => {
    switch (activeTab) {
      case "Spending":
        return "See how your spending is distributed.";
      case "Budget":
        return "Compare your actual spending with your plan.";
      case "Goals":
        return "Track the progress you're making.";
      default:
        return "A live view of your money.";
    }
  };

  return (
    <section
      id="dashboard"
      className="w-full overflow-hidden border-t border-[#24262A] bg-[#08090A]"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-8 sm:py-28">

        {/* HEADER */}

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="max-w-[650px]"
        >
          <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#777B84]">
            Your dashboard
          </p>

          <h2 className="mt-5 font-space text-[36px] font-medium leading-[1.05] tracking-[-0.04em] text-[#F1F1F2] sm:text-[50px]">
            Everything important,
            <br />
            in one place.
          </h2>

          <p className="mt-6 max-w-[500px] text-[12px] leading-[1.8] text-[#777B84] sm:text-[13px]">
            {getTabDescription()}
          </p>
        </motion.div>

        {/* DASHBOARD */}

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.65, delay: 0.08 }}
          className="mt-12 min-w-0 overflow-hidden rounded-[20px] border border-[#292B30] bg-[#111214] sm:mt-16"
        >

          {/* TOP BAR */}

          <div className="flex min-w-0 flex-col gap-5 border-b border-[#292B30] px-4 py-4 sm:px-6 sm:py-5 lg:flex-row lg:items-center lg:justify-between">

            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-[#17181A]">
                <Wallet
                  size={14}
                  className="text-[#7C83FF]"
                  strokeWidth={1.8}
                />
              </div>

              <div className="min-w-0">
                <p className="truncate text-[10px] font-medium text-[#F1F1F2]">
                  Financial overview
                </p>

                <p className="mt-1 text-[7px] text-[#55585F]">
                  Updated from your transactions
                </p>
              </div>
            </div>

            {/* TABS */}

            <div className="flex max-w-full min-w-0 overflow-x-auto rounded-[9px] border border-[#292B30] bg-[#0F1012] p-1">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`shrink-0 rounded-[7px] px-3 py-2 text-[8px] font-medium transition-all sm:px-4 ${
                    activeTab === tab
                      ? "bg-[#1B1C1F] text-[#F1F1F2]"
                      : "text-[#777B84] hover:text-[#A7ABB4]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* CONTENT */}

          <div className="min-w-0 p-4 sm:p-6">

            {/* OVERVIEW */}

            {activeTab === "Overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
              >
                {/* METRICS */}

                <div className="grid min-w-0 grid-cols-2 gap-3 lg:grid-cols-4">
                  <MetricCard
                    label="Monthly income"
                    value={formatCurrency(income)}
                    detail="Your current income"
                    icon={
                      <CircleDollarSign
                        size={14}
                        strokeWidth={1.6}
                      />
                    }
                  />

                  <MetricCard
                    label="Spent this month"
                    value={formatCurrency(spending)}
                    detail={`${transactions.length} transactions`}
                    icon={
                      <ArrowDownRight
                        size={14}
                        strokeWidth={1.6}
                      />
                    }
                  />

                  <MetricCard
                    label="Savings"
                    value={formatCurrency(savings)}
                    detail={`${savingsRate.toFixed(1)}% of income`}
                    icon={
                      <TrendingUp
                        size={14}
                        strokeWidth={1.6}
                      />
                    }
                  />

                  <MetricCard
                    label="Remaining"
                    value={formatCurrency(
                      Math.max(
                        0,
                        income - spending
                      )
                    )}
                    detail="After current spending"
                    icon={
                      <Wallet
                        size={14}
                        strokeWidth={1.6}
                      />
                    }
                  />
                </div>

                {/* MIDDLE */}

                <div className="mt-3 grid min-w-0 gap-3 lg:grid-cols-[1.35fr_0.65fr]">

                  {/* SPENDING */}

                  <SectionCard className="p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[8px] uppercase tracking-[0.15em] text-[#777B84]">
                          Spending overview
                        </p>

                        <p className="mt-2 font-space text-[21px] font-medium text-[#F1F1F2]">
                          {formatCurrency(spending)}
                        </p>
                      </div>

                      <div className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-[#17181A]">
                        <TrendingDown
                          size={14}
                          className="text-[#777B84]"
                        />
                      </div>
                    </div>

                    {/* CATEGORY BARS */}

                    <div className="mt-7 space-y-5">
                      {categorySpending.length === 0 ? (
                        <div className="py-8 text-center">
                          <p className="text-[10px] text-[#777B84]">
                            No spending data yet.
                          </p>
                        </div>
                      ) : (
                        categorySpending
                          .slice(0, 5)
                          .map((item, index) => (
                            <div
                              key={item.label}
                            >
                              <div className="mb-2 flex items-center justify-between gap-3">
                                <div className="flex min-w-0 items-center gap-2">
                                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#7C83FF]" />

                                  <span className="truncate text-[9px] text-[#A7ABB4]">
                                    {item.label}
                                  </span>
                                </div>

                                <span className="shrink-0 font-space text-[9px] text-[#F1F1F2]">
                                  {formatCurrency(
                                    item.amount
                                  )}
                                </span>
                              </div>

                              <ProgressBar
                                value={
                                  item.percentage
                                }
                                color={
                                  index === 0
                                    ? "#7C83FF"
                                    : "#666CC7"
                                }
                              />
                            </div>
                          ))
                      )}
                    </div>
                  </SectionCard>

                  {/* INSIGHT */}

                  <SectionCard className="flex min-w-0 flex-col justify-between p-5 sm:p-6">
                    <div>
                      <p className="text-[8px] uppercase tracking-[0.15em] text-[#777B84]">
                        Aurora insight
                      </p>

                      <div className="mt-6 flex h-9 w-9 items-center justify-center rounded-[9px] border border-[#292B30] bg-[#17181A]">
                        <TrendingUp
                          size={15}
                          className="text-[#56C7A0]"
                        />
                      </div>

                      <h3 className="mt-5 font-space text-[18px] leading-[1.2] text-[#F1F1F2]">
                        {largestCategory
                          ? `${largestCategory.label} is your largest spending category.`
                          : "Start adding transactions to see insights."}
                      </h3>

                      {largestCategory && (
                        <p className="mt-4 text-[9px] leading-[1.7] text-[#777B84]">
                          You have spent{" "}
                          <span className="text-[#A7ABB4]">
                            {formatCurrency(
                              largestCategory.amount
                            )}
                          </span>{" "}
                          on{" "}
                          {largestCategory.label.toLowerCase()}
                          , representing{" "}
                          {largestCategory.percentage}
                          % of your current spending.
                        </p>
                      )}
                    </div>

                    <div className="mt-8 border-t border-[#292B30] pt-4">
                      <p className="text-[8px] text-[#55585F]">
                        {previousMonthComparison === null
                          ? "Add more monthly data to compare trends."
                          : "Compared with your previous month."}
                      </p>
                    </div>
                  </SectionCard>
                </div>

                {/* BOTTOM */}

                <div className="mt-3 grid min-w-0 gap-3 lg:grid-cols-2">

                  {/* TRANSACTIONS */}

                  <SectionCard>
                    <div className="flex items-center justify-between border-b border-[#292B30] px-5 py-4 sm:px-6">
                      <div>
                        <p className="text-[8px] uppercase tracking-[0.15em] text-[#777B84]">
                          Recent transactions
                        </p>

                        <p className="mt-1 text-[9px] text-[#55585F]">
                          Your latest activity
                        </p>
                      </div>

                      <ArrowUpRight
                        size={13}
                        className="text-[#777B84]"
                      />
                    </div>

                    <div>
                      {sortedTransactions.length === 0 ? (
                        <p className="px-5 py-8 text-center text-[9px] text-[#777B84]">
                          No transactions yet.
                        </p>
                      ) : (
                        sortedTransactions
                          .slice(0, 4)
                          .map((transaction) => (
                            <div
                              key={transaction.id}
                              className="flex min-w-0 items-center gap-3 border-b border-[#292B30] px-5 py-3.5 last:border-b-0 sm:px-6"
                            >
                              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[7px] bg-[#17181A]">
                                <span className="text-[9px] text-[#777B84]">
                                  {transaction.name
                                    .charAt(0)
                                    .toUpperCase()}
                                </span>
                              </div>

                              <div className="min-w-0 flex-1">
                                <p className="truncate text-[9px] font-medium text-[#F1F1F2]">
                                  {transaction.name}
                                </p>

                                <p className="mt-1 truncate text-[7px] text-[#55585F]">
                                  {transaction.category}
                                </p>
                              </div>

                              <p className="shrink-0 font-space text-[9px] text-[#F1F1F2]">
                                {formatCurrency(
                                  transaction.amount
                                )}
                              </p>
                            </div>
                          ))
                      )}
                    </div>
                  </SectionCard>

                  {/* GOALS */}

                  <SectionCard>
                    <div className="flex items-center justify-between border-b border-[#292B30] px-5 py-4 sm:px-6">
                      <div>
                        <p className="text-[8px] uppercase tracking-[0.15em] text-[#777B84]">
                          Goals
                        </p>

                        <p className="mt-1 text-[9px] text-[#55585F]">
                          {activeGoals.length} active
                        </p>
                      </div>

                      <Target
                        size={14}
                        className="text-[#7C83FF]"
                      />
                    </div>

                    <div className="p-5 sm:p-6">
                      {goals.length === 0 ? (
                        <div className="py-5 text-center">
                          <p className="text-[9px] text-[#777B84]">
                            No goals yet.
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-5">
                          {goals
                            .slice(0, 3)
                            .map((goal) => {
                              const progress =
                                Math.min(
                                  100,
                                  (goal.current /
                                    Math.max(
                                      1,
                                      goal.target
                                    )) *
                                    100
                                );

                              return (
                                <div
                                  key={goal.id}
                                >
                                  <div className="flex items-center justify-between gap-3">
                                    <p className="truncate text-[9px] font-medium text-[#F1F1F2]">
                                      {goal.name}
                                    </p>

                                    <p className="shrink-0 text-[8px] text-[#777B84]">
                                      {Math.round(
                                        progress
                                      )}
                                      %
                                    </p>
                                  </div>

                                  <div className="mt-3">
                                    <ProgressBar
                                      value={progress}
                                      color="#7C83FF"
                                    />
                                  </div>

                                  <div className="mt-2 flex justify-between gap-3">
                                    <span className="text-[7px] text-[#55585F]">
                                      {formatCurrency(
                                        goal.current
                                      )}
                                    </span>

                                    <span className="text-[7px] text-[#55585F]">
                                      {formatCurrency(
                                        goal.target
                                      )}
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      )}
                    </div>
                  </SectionCard>
                </div>
              </motion.div>
            )}

            {/* SPENDING */}

            {activeTab === "Spending" && (
              <motion.div
                key="spending"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
              >
                <div className="grid min-w-0 grid-cols-2 gap-3 sm:grid-cols-3">
                  <MetricCard
                    label="Total spending"
                    value={formatCurrency(spending)}
                    detail={`${transactions.length} transactions`}
                    icon={
                      <ArrowDownRight
                        size={14}
                      />
                    }
                  />

                  <MetricCard
                    label="Largest category"
                    value={
                      largestCategory
                        ? formatCurrency(
                            largestCategory.amount
                          )
                        : "₹0"
                    }
                    detail={
                      largestCategory?.label ??
                      "No category yet"
                    }
                    icon={
                      <TrendingDown
                        size={14}
                      />
                    }
                  />

                  <MetricCard
                    label="Average transaction"
                    value={
                      transactions.length > 0
                        ? formatCurrency(
                            spending /
                              transactions.length
                          )
                        : "₹0"
                    }
                    detail="Across all transactions"
                    icon={
                      <CircleDollarSign
                        size={14}
                      />
                    }
                  />
                </div>

                <div className="mt-3 grid min-w-0 gap-3 lg:grid-cols-[1.3fr_0.7fr]">

                  <SectionCard className="p-5 sm:p-6">
                    <p className="text-[8px] uppercase tracking-[0.15em] text-[#777B84]">
                      Spending by category
                    </p>

                    <div className="mt-7 space-y-6">
                      {categorySpending.length === 0 ? (
                        <p className="py-8 text-center text-[9px] text-[#777B84]">
                          Add transactions to see
                          category spending.
                        </p>
                      ) : (
                        categorySpending.map(
                          (item, index) => (
                            <div key={item.label}>
                              <div className="mb-2.5 flex items-center justify-between gap-3">
                                <div className="flex min-w-0 items-center gap-2">
                                  <span
                                    className="h-2 w-2 shrink-0 rounded-full"
                                    style={{
                                      backgroundColor:
                                        index === 0
                                          ? "#7C83FF"
                                          : "#666CC7",
                                    }}
                                  />

                                  <span className="truncate text-[9px] text-[#A7ABB4]">
                                    {item.label}
                                  </span>
                                </div>

                                <div className="flex shrink-0 items-center gap-3">
                                  <span className="font-space text-[9px] text-[#F1F1F2]">
                                    {formatCurrency(
                                      item.amount
                                    )}
                                  </span>

                                  <span className="w-7 text-right text-[8px] text-[#777B84]">
                                    {item.percentage}%
                                  </span>
                                </div>
                              </div>

                              <ProgressBar
                                value={item.percentage}
                                color={
                                  index === 0
                                    ? "#7C83FF"
                                    : "#666CC7"
                                }
                              />
                            </div>
                          )
                        )
                      )}
                    </div>
                  </SectionCard>

                  <SectionCard className="p-5 sm:p-6">
                    <p className="text-[8px] uppercase tracking-[0.15em] text-[#777B84]">
                      Top category
                    </p>

                    {largestCategory ? (
                      <>
                        <p className="mt-6 font-space text-[25px] text-[#F1F1F2]">
                          {largestCategory.label}
                        </p>

                        <p className="mt-2 font-space text-[18px] text-[#7C83FF]">
                          {formatCurrency(
                            largestCategory.amount
                          )}
                        </p>

                        <p className="mt-4 text-[9px] leading-[1.7] text-[#777B84]">
                          {largestCategory.percentage}%
                          of your total spending is
                          currently going toward this
                          category.
                        </p>

                        <div className="mt-6 border-t border-[#292B30] pt-5">
                          <p className="text-[8px] text-[#55585F]">
                            Keep adding transactions to
                            make this breakdown more
                            useful.
                          </p>
                        </div>
                      </>
                    ) : (
                      <p className="mt-6 text-[9px] leading-[1.7] text-[#777B84]">
                        Your largest spending category
                        will appear here once you add a
                        transaction.
                      </p>
                    )}
                  </SectionCard>
                </div>
              </motion.div>
            )}

            {/* BUDGET */}

            {activeTab === "Budget" && (
              <motion.div
                key="budget"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
              >
                <div className="grid min-w-0 grid-cols-2 gap-3 sm:grid-cols-3">
                  {bucketData.map((item) => (
                    <MetricCard
                      key={item.bucket}
                      label={item.label}
                      value={formatCurrency(
                        item.amount
                      )}
                      detail={`${item.percentage}% of income`}
                      icon={
                        <span
                          className="block h-2 w-2 rounded-full"
                          style={{
                            backgroundColor:
                              item.color,
                          }}
                        />
                      }
                    />
                  ))}
                </div>

                <SectionCard className="mt-3 p-5 sm:p-6">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="text-[8px] uppercase tracking-[0.15em] text-[#777B84]">
                        Budget allocation
                      </p>

                      <p className="mt-2 font-space text-[21px] text-[#F1F1F2]">
                        {formatCurrency(income)}
                      </p>

                      <p className="mt-1 text-[8px] text-[#55585F]">
                        Your planned monthly income
                      </p>
                    </div>

                    <div className="text-left sm:text-right">
                      <p className="text-[8px] text-[#777B84]">
                        Actual spending
                      </p>

                      <p className="mt-1 font-space text-[15px] text-[#F1F1F2]">
                        {formatCurrency(spending)}
                      </p>
                    </div>
                  </div>

                  {/* ALLOCATION BAR */}

                  <div className="mt-8 flex h-3 w-full overflow-hidden rounded-full bg-[#24262A]">
                    {(
                      Object.keys(
                        allocation
                      ) as BudgetBucket[]
                    ).map((bucket) => (
                      <motion.div
                        key={bucket}
                        initial={{ width: 0 }}
                        whileInView={{
                          width: `${allocation[bucket]}%`,
                        }}
                        viewport={{
                          once: true,
                        }}
                        transition={{
                          duration: 0.7,
                          ease: "easeOut",
                        }}
                        style={{
                          backgroundColor:
                            bucketColors[bucket],
                        }}
                      />
                    ))}
                  </div>

                  <div className="mt-7 grid gap-4 sm:grid-cols-3">
                    {bucketData.map((item) => (
                      <div
                        key={item.bucket}
                        className="min-w-0"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex min-w-0 items-center gap-2">
                            <span
                              className="h-2 w-2 shrink-0 rounded-full"
                              style={{
                                backgroundColor:
                                  item.color,
                              }}
                            />

                            <span className="truncate text-[9px] text-[#A7ABB4]">
                              {item.label}
                            </span>
                          </div>

                          <span className="shrink-0 text-[8px] text-[#777B84]">
                            {item.allocation}%
                          </span>
                        </div>

                        <p className="mt-2 font-space text-[12px] text-[#F1F1F2]">
                          {formatCurrency(
                            item.amount
                          )}
                        </p>

                        <p className="mt-1 text-[7px] text-[#55585F]">
                          Actual spending
                        </p>
                      </div>
                    ))}
                  </div>
                </SectionCard>

                <div className="mt-3 grid min-w-0 gap-3 lg:grid-cols-2">
                  <SectionCard className="p-5 sm:p-6">
                    <p className="text-[8px] uppercase tracking-[0.15em] text-[#777B84]">
                      Savings
                    </p>

                    <p className="mt-4 font-space text-[25px] text-[#56C7A0]">
                      {formatCurrency(savings)}
                    </p>

                    <p className="mt-2 text-[9px] text-[#777B84]">
                      {savingsRate.toFixed(1)}% of your
                      income remains after spending.
                    </p>
                  </SectionCard>

                  <SectionCard className="p-5 sm:p-6">
                    <p className="text-[8px] uppercase tracking-[0.15em] text-[#777B84]">
                      Remaining budget
                    </p>

                    <p className="mt-4 font-space text-[25px] text-[#F1F1F2]">
                      {formatCurrency(
                        Math.max(
                          0,
                          income - spending
                        )
                      )}
                    </p>

                    <p className="mt-2 text-[9px] text-[#777B84]">
                      Money currently unspent from
                      your monthly income.
                    </p>
                  </SectionCard>
                </div>
              </motion.div>
            )}

            {/* GOALS */}

            {activeTab === "Goals" && (
              <motion.div
                key="goals"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
              >
                <div className="grid min-w-0 grid-cols-2 gap-3 sm:grid-cols-3">
                  <MetricCard
                    label="Active goals"
                    value={String(activeGoals.length)}
                    detail={`${completedGoals.length} completed`}
                    icon={
                      <Target size={14} />
                    }
                  />

                  <MetricCard
                    label="Goals"
                    value={String(goals.length)}
                    detail="Total goals"
                    icon={
                      <CircleDollarSign
                        size={14}
                      />
                    }
                  />

                  <MetricCard
                    label="Average progress"
                    value={`${Math.round(
                      averageGoalProgress
                    )}%`}
                    detail="Across all goals"
                    icon={
                      <TrendingUp size={14} />
                    }
                  />
                </div>

                <SectionCard className="mt-3 p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[8px] uppercase tracking-[0.15em] text-[#777B84]">
                        Your goals
                      </p>

                      <p className="mt-1 text-[9px] text-[#55585F]">
                        Progress updates from your saved
                        goal data
                      </p>
                    </div>

                    <Target
                      size={14}
                      className="text-[#7C83FF]"
                    />
                  </div>

                  {goals.length === 0 ? (
                    <div className="py-14 text-center">
                      <p className="text-[10px] text-[#777B84]">
                        No goals yet.
                      </p>

                      <p className="mt-2 text-[8px] text-[#55585F]">
                        Add a goal to start tracking
                        progress.
                      </p>
                    </div>
                  ) : (
                    <div className="mt-8 grid gap-3 sm:grid-cols-2">
                      {goals.map((goal) => {
                        const progress = Math.min(
                          100,
                          (goal.current /
                            Math.max(
                              1,
                              goal.target
                            )) *
                            100
                        );

                        const complete =
                          progress >= 100;

                        return (
                          <div
                            key={goal.id}
                            className="min-w-0 rounded-[12px] border border-[#292B30] bg-[#0F1012] p-4"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="min-w-0">
                                <p className="truncate text-[10px] font-medium text-[#F1F1F2]">
                                  {goal.name}
                                </p>

                                <p className="mt-1 text-[8px] text-[#55585F]">
                                  {complete
                                    ? "Goal completed"
                                    : "In progress"}
                                </p>
                              </div>

                              {complete ? (
                                <CheckCircle2
                                  size={15}
                                  className="shrink-0 text-[#56C7A0]"
                                />
                              ) : (
                                <span className="shrink-0 font-space text-[10px] text-[#7C83FF]">
                                  {Math.round(
                                    progress
                                  )}
                                  %
                                </span>
                              )}
                            </div>

                            <div className="mt-5">
                              <ProgressBar
                                value={progress}
                                color={
                                  complete
                                    ? "#56C7A0"
                                    : "#7C83FF"
                                }
                              />
                            </div>

                            <div className="mt-3 flex items-center justify-between gap-3">
                              <span className="truncate text-[8px] text-[#777B84]">
                                {formatCurrency(
                                  goal.current
                                )}
                              </span>

                              <ChevronRight
                                size={12}
                                className="shrink-0 text-[#55585F]"
                              />

                              <span className="truncate text-right text-[8px] text-[#777B84]">
                                {formatCurrency(
                                  goal.target
                                )}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </SectionCard>
              </motion.div>
            )}

          </div>
        </motion.div>
      </div>
    </section>
  );
}