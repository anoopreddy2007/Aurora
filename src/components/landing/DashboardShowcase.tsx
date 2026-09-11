import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  fadeUp,
  staggerContainer,
  viewportOnce,
  springTransition,
} from "../../lib/motion";

type DashboardTab = "Overview" | "Spending" | "Budget" | "Goals";

const tabs: DashboardTab[] = [
  "Overview",
  "Spending",
  "Budget",
  "Goals",
];

const transactions = [
  {
    name: "Rent",
    category: "Housing",
    amount: "₹18,000",
  },
  {
    name: "Swiggy",
    category: "Food",
    amount: "₹420",
  },
  {
    name: "Spotify",
    category: "Subscriptions",
    amount: "₹119",
  },
  {
    name: "Uber",
    category: "Transport",
    amount: "₹280",
  },
];

const spending = [
  {
    label: "Rent",
    amount: "₹18,000",
    percentage: 56,
    color: "#7C83FF",
  },
  {
    label: "Food",
    amount: "₹7,200",
    percentage: 22,
    color: "#7C83FF",
  },
  {
    label: "Fun",
    amount: "₹4,200",
    percentage: 13,
    color: "#7C83FF",
  },
  {
    label: "Other",
    amount: "₹2,600",
    percentage: 8,
    color: "#7C83FF",
  },
];

const goals = [
  {
    name: "New laptop",
    current: "₹72,000",
    target: "₹1,50,000",
    progress: 48,
  },
  {
    name: "Goa trip",
    current: "₹18,000",
    target: "₹30,000",
    progress: 60,
  },
];

const chartValues = [
  42,
  58,
  48,
  76,
  55,
  88,
  68,
  94,
  62,
  78,
  72,
  86,
];

export function DashboardShowcase() {
  const [activeTab, setActiveTab] =
    useState<DashboardTab>("Overview");

  return (
    <section
      id="showcase"
      className="w-full overflow-hidden border-t border-[#24262A] bg-[#070708]"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-8 sm:py-28">

        {/* ================= SECTION HEADING ================= */}

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="w-full max-w-2xl"
        >
          <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.22em] text-[#777B84] sm:mb-6">
            Inside Aurora
          </p>

          <h2 className="font-space text-[36px] font-medium leading-[1.03] tracking-[-0.045em] text-[#F1F1F2] sm:text-[50px]">
            Your money,
            <br />
            at a glance.
          </h2>

          <p className="mt-6 w-full max-w-[500px] break-words text-[12px] leading-[1.7] text-[#A7ABB4] sm:mt-7 sm:text-sm">
            One place to understand your balance, spending,
            budget and progress without digging through
            spreadsheets.
          </p>
        </motion.div>

        {/* ================= DASHBOARD ================= */}

        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={viewportOnce}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-12 w-full min-w-0 overflow-hidden rounded-[18px] border border-[#292B30] bg-[#17181B] sm:mt-16 sm:rounded-[20px]"
        >

          {/* ================= DASHBOARD HEADER ================= */}

          <div className="flex min-w-0 flex-col gap-4 border-b border-[#292B30] px-4 py-4 sm:gap-5 sm:px-7 sm:py-5 lg:flex-row lg:items-center lg:justify-between">

            <div className="min-w-0">
              <p className="font-space text-[13px] font-medium text-[#F1F1F2]">
                Aurora
              </p>

              <p className="mt-1 text-[8px] text-[#777B84]">
                Personal finance overview
              </p>
            </div>

            {/* Tabs */}

            <div className="w-full min-w-0 overflow-x-auto rounded-[9px] border border-[#292B30] bg-[#0F1012] p-1 lg:w-auto">
              <div className="flex min-w-max items-center gap-1">
                {tabs.map((tab) => {
                  const isActive = activeTab === tab;

                  return (
                    <motion.button
                      key={tab}
                      type="button"
                      onClick={() => setActiveTab(tab)}
                      whileTap={{ scale: 0.96 }}
                      transition={springTransition}
                      className={`whitespace-nowrap rounded-[6px] px-3 py-2 text-[8px] font-medium transition-colors ${
                        isActive
                          ? "bg-[#292B30] text-[#F1F1F2]"
                          : "text-[#777B84] hover:text-[#A7ABB4]"
                      }`}
                    >
                      {tab}
                    </motion.button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* ================= DASHBOARD CONTENT ================= */}

          <div className="min-w-0 p-4 sm:p-7">

            <AnimatePresence mode="wait">

              {/* ================= OVERVIEW ================= */}

              {activeTab === "Overview" && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                  className="min-w-0"
                >

                  {/* Financial metrics */}

                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="grid min-w-0 gap-3 grid-cols-2 lg:grid-cols-4"
                  >
                    <MetricCard
                      label="Total balance"
                      value="₹80,000"
                    />

                    <MetricCard
                      label="Monthly income"
                      value="₹80,000"
                    />

                    <MetricCard
                      label="Spent this month"
                      value="₹32,000"
                    />

                    <MetricCard
                      label="Savings"
                      value="₹47,600"
                      accent
                    />
                  </motion.div>

                  {/* Main row */}

                  <div className="mt-3 grid min-w-0 gap-3 lg:grid-cols-[1.2fr_0.8fr]">

                    {/* Spending overview */}

                    <motion.div
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.12,
                      }}
                      className="min-w-0 rounded-[14px] border border-[#292B30] bg-[#0F1012] p-4 sm:p-5"
                    >
                      <div className="flex items-start justify-between gap-3">

                        <div className="min-w-0">
                          <p className="text-[9px] text-[#777B84]">
                            Spending overview
                          </p>

                          <p className="mt-1 font-space text-[13px] font-medium text-[#F1F1F2]">
                            ₹32,000
                          </p>
                        </div>

                        <span className="shrink-0 text-[8px] text-[#777B84]">
                          This month
                        </span>

                      </div>

                      {/* Chart */}

                      <div className="mt-6 w-full min-w-0 sm:mt-7">

                        <div className="relative flex h-[150px] min-w-0 items-end gap-1.5 border-b border-[#292B30] px-1 sm:h-[180px] sm:gap-3">

                          {chartValues.map(
                            (height, index) => (
                              <div
                                key={index}
                                className="flex h-full min-w-0 flex-1 items-end"
                              >
                                <motion.div
                                  initial={{
                                    height: 0,
                                    opacity: 0,
                                  }}
                                  animate={{
                                    height: `${height}%`,
                                    opacity: 1,
                                  }}
                                  transition={{
                                    duration: 0.65,
                                    delay:
                                      0.05 +
                                      index * 0.045,
                                    ease: [
                                      0.22,
                                      1,
                                      0.36,
                                      1,
                                    ],
                                  }}
                                  className="w-full rounded-t-[3px]"
                                  style={{
                                    minHeight: "8px",
                                    backgroundColor:
                                      index === 7
                                        ? "#8D83B8"
                                        : "#555B68",
                                  }}
                                />
                              </div>
                            )
                          )}

                        </div>

                        {/* Chart labels */}

                        <div className="mt-3 flex justify-between text-[6px] text-[#777B84] sm:text-[7px]">
                          <span>1 Oct</span>
                          <span>7 Oct</span>
                          <span>14 Oct</span>
                          <span>21 Oct</span>
                          <span>31 Oct</span>
                        </div>

                      </div>
                    </motion.div>

                    {/* Budget breakdown */}

                    <motion.div
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.2,
                      }}
                      className="min-w-0 rounded-[14px] border border-[#292B30] bg-[#0F1012] p-4 sm:p-5"
                    >
                      <div className="flex items-start justify-between gap-3">

                        <div>
                          <p className="text-[9px] text-[#777B84]">
                            Budget breakdown
                          </p>

                          <p className="mt-1 font-space text-[13px] font-medium text-[#F1F1F2]">
                            ₹80,000
                          </p>
                        </div>

                        <span className="shrink-0 text-[8px] text-[#777B84]">
                          Allocated
                        </span>

                      </div>

                      <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="mt-6 space-y-4"
                      >
                        {spending.map((item) => (
                          <motion.div
                            key={item.label}
                            variants={fadeUp}
                          >
                            <div className="mb-2 flex items-center justify-between gap-3">

                              <div className="flex min-w-0 items-center gap-2">

                                <span
                                  className="h-1.5 w-1.5 shrink-0 rounded-full"
                                  style={{
                                    backgroundColor:
                                      item.color,
                                  }}
                                />

                                <span className="text-[8px] text-[#A7ABB4]">
                                  {item.label}
                                </span>

                              </div>

                              <span className="shrink-0 text-[8px] text-[#777B84]">
                                {item.percentage}%
                              </span>

                            </div>

                            <div className="h-1 overflow-hidden rounded-full bg-[#25272C]">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{
                                  width: `${item.percentage}%`,
                                }}
                                transition={{
                                  duration: 0.65,
                                  ease: "easeOut",
                                }}
                                className="h-full rounded-full"
                                style={{
                                  backgroundColor:
                                    item.color,
                                }}
                              />
                            </div>

                          </motion.div>
                        ))}
                      </motion.div>
                    </motion.div>

                  </div>

                  {/* Bottom row */}

                  <div className="mt-3 grid min-w-0 gap-3 lg:grid-cols-2">

                    {/* Transactions */}

                    <motion.div
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.28,
                      }}
                      className="min-w-0 rounded-[14px] border border-[#292B30] bg-[#0F1012] p-4 sm:p-5"
                    >
                      <div className="flex items-center justify-between gap-3">

                        <p className="text-[9px] font-medium text-[#F1F1F2]">
                          Recent transactions
                        </p>

                        <button
                          type="button"
                          className="shrink-0 text-[8px] text-[#777B84] hover:text-[#A7ABB4]"
                        >
                          View all
                        </button>

                      </div>

                      <div className="mt-4">
                        {transactions.map(
                          (transaction, index) => (
                            <motion.div
                              key={transaction.name}
                              initial={{
                                opacity: 0,
                                x: -10,
                              }}
                              animate={{
                                opacity: 1,
                                x: 0,
                              }}
                              transition={{
                                duration: 0.35,
                                delay:
                                  0.3 + index * 0.06,
                              }}
                              className={`flex items-center justify-between gap-4 py-3 ${
                                index !==
                                transactions.length - 1
                                  ? "border-b border-[#292B30]"
                                  : ""
                              }`}
                            >
                              <div className="min-w-0">
                                <p className="truncate text-[9px] text-[#A7ABB4]">
                                  {transaction.name}
                                </p>

                                <p className="mt-0.5 truncate text-[7px] text-[#777B84]">
                                  {transaction.category}
                                </p>
                              </div>

                              <span className="shrink-0 font-space text-[9px] text-[#F1F1F2]">
                                {transaction.amount}
                              </span>
                            </motion.div>
                          )
                        )}
                      </div>
                    </motion.div>

                    {/* Goals */}

                    <motion.div
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.34,
                      }}
                      className="min-w-0 rounded-[14px] border border-[#292B30] bg-[#0F1012] p-4 sm:p-5"
                    >
                      <div className="flex items-center justify-between gap-3">

                        <p className="text-[9px] font-medium text-[#F1F1F2]">
                          Goals
                        </p>

                        <span className="shrink-0 text-[8px] text-[#777B84]">
                          2 active
                        </span>

                      </div>

                      <div className="mt-4 space-y-5">

                        {goals.map((goal, index) => (
                          <div key={goal.name}>

                            <div className="flex items-center justify-between gap-3">

                              <p className="min-w-0 truncate text-[9px] text-[#A7ABB4]">
                                {goal.name}
                              </p>

                              <p className="shrink-0 text-[8px] text-[#777B84]">
                                {goal.progress}%
                              </p>

                            </div>

                            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#25272C]">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{
                                  width: `${goal.progress}%`,
                                }}
                                transition={{
                                  duration: 0.7,
                                  delay:
                                    0.35 +
                                    index * 0.1,
                                  ease: "easeOut",
                                }}
                                className="h-full rounded-full"
                                style={{
                                  backgroundColor:
                                    "#52B788",
                                }}
                              />
                            </div>

                            <div className="mt-2 flex justify-between text-[7px] text-[#777B84]">
                              <span>{goal.current}</span>
                              <span>{goal.target}</span>
                            </div>

                          </div>
                        ))}

                      </div>
                    </motion.div>

                  </div>

                  {/* Insight */}

                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.4,
                    }}
                    className="mt-3 min-w-0 rounded-[14px] border border-[#292B30] bg-[#0F1012] p-4 sm:p-5"
                  >
                    <p className="text-[8px] uppercase tracking-[0.16em] text-[#777B84]">
                      Aurora insight
                    </p>

                    <p className="mt-2 font-space text-[12px] text-[#F1F1F2]">
                      Your spending is on track this month.
                    </p>

                    <p className="mt-1 text-[8px] leading-5 text-[#777B84]">
                      You're spending less on discretionary
                      categories while keeping your savings
                      rate healthy.
                    </p>
                  </motion.div>

                </motion.div>
              )}

              {/* ================= SPENDING TAB ================= */}

              {activeTab === "Spending" && (
                <motion.div
                  key="spending"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                  className="grid min-w-0 gap-3 lg:grid-cols-2"
                >

                  <div className="min-w-0 rounded-[14px] border border-[#292B30] bg-[#0F1012] p-4 sm:p-6">

                    <p className="text-[9px] text-[#777B84]">
                      Monthly spending
                    </p>

                    <p className="mt-2 font-space text-[27px] text-[#F1F1F2] sm:text-[30px]">
                      ₹32,000
                    </p>

                    <p className="mt-1 text-[8px] text-[#52B788]">
                      8% lower than last month
                    </p>

                    <div className="mt-7 space-y-5 sm:mt-8">
                      {spending.map((item, index) => (
                        <div key={item.label}>

                          <div className="flex items-center justify-between gap-3">
                            <span className="text-[9px] text-[#A7ABB4]">
                              {item.label}
                            </span>

                            <span className="shrink-0 text-[9px] text-[#F1F1F2]">
                              {item.amount}
                            </span>
                          </div>

                          <div className="mt-2 h-2 rounded-full bg-[#25272C]">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{
                                width: `${item.percentage}%`,
                              }}
                              transition={{
                                duration: 0.6,
                                delay: index * 0.08,
                              }}
                              className="h-full rounded-full"
                              style={{
                                backgroundColor:
                                  item.color,
                              }}
                            />
                          </div>

                        </div>
                      ))}
                    </div>

                  </div>

                  <div className="min-w-0 rounded-[14px] border border-[#292B30] bg-[#0F1012] p-4 sm:p-6">

                    <p className="text-[9px] text-[#777B84]">
                      Spending insight
                    </p>

                    <p className="mt-3 font-space text-[16px] leading-6 text-[#F1F1F2] sm:text-[17px]">
                      Food spending is your second largest
                      category.
                    </p>

                    <p className="mt-3 text-[9px] leading-5 text-[#777B84]">
                      You have spent ₹7,200 this month, which
                      is 22% of your total spending.
                    </p>

                    <div className="mt-7 rounded-[10px] border border-[#292B30] bg-[#17181B] p-4">

                      <p className="text-[8px] text-[#777B84]">
                        Largest category
                      </p>

                      <p className="mt-1 font-space text-[13px] text-[#F1F1F2]">
                        Rent · 56%
                      </p>

                    </div>

                  </div>

                </motion.div>
              )}

              {/* ================= BUDGET TAB ================= */}

              {activeTab === "Budget" && (
                <motion.div
                  key="budget"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                  className="min-w-0"
                >

                  <div className="grid min-w-0 gap-3 sm:grid-cols-3">

                    <BudgetSummary
                      label="Needs"
                      percentage={56}
                      amount="₹44,800"
                      color="#7C83FF"
                    />

                    <BudgetSummary
                      label="Wants"
                      percentage={22}
                      amount="₹17,600"
                      color="#7C83FF"
                    />

                    <BudgetSummary
                      label="Savings"
                      percentage={22}
                      amount="₹17,600"
                      color="#52B788"
                    />

                  </div>

                  <div className="mt-3 min-w-0 rounded-[14px] border border-[#292B30] bg-[#0F1012] p-4 sm:p-6">

                    <p className="text-[9px] text-[#777B84]">
                      Current allocation
                    </p>

                    <div className="mt-5 flex h-4 min-w-0 overflow-hidden rounded-full bg-[#25272C]">

                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "56%" }}
                        transition={{ duration: 0.6 }}
                        className="h-full shrink-0"
                        style={{
                          backgroundColor: "#7C83FF",
                        }}
                      />

                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "22%" }}
                        transition={{
                          duration: 0.5,
                          delay: 0.15,
                        }}
                        className="h-full shrink-0"
                        style={{
                          backgroundColor: "#666CC7",
                        }}
                      />

                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "22%" }}
                        transition={{
                          duration: 0.5,
                          delay: 0.25,
                        }}
                        className="h-full shrink-0"
                        style={{
                          backgroundColor: "#52B788",
                        }}
                      />

                    </div>

                    <div className="mt-5 grid grid-cols-3 gap-2">

                      <p className="text-[7px] text-[#777B84] sm:text-[8px]">
                        Needs · 56%
                      </p>

                      <p className="text-center text-[7px] text-[#777B84] sm:text-[8px]">
                        Wants · 22%
                      </p>

                      <p className="text-right text-[7px] text-[#777B84] sm:text-[8px]">
                        Savings · 22%
                      </p>

                    </div>

                  </div>

                </motion.div>
              )}

              {/* ================= GOALS TAB ================= */}

              {activeTab === "Goals" && (
                <motion.div
                  key="goals"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                  className="grid min-w-0 gap-3 lg:grid-cols-2"
                >

                  {goals.map((goal, index) => (
                    <motion.div
                      key={goal.name}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.45,
                        delay: index * 0.1,
                      }}
                      className="min-w-0 rounded-[14px] border border-[#292B30] bg-[#0F1012] p-4 sm:p-6"
                    >

                      <div className="flex items-start justify-between gap-4">

                        <div className="min-w-0">
                          <p className="text-[9px] text-[#777B84]">
                            Goal
                          </p>

                          <p className="mt-1 truncate font-space text-[16px] text-[#F1F1F2] sm:text-[17px]">
                            {goal.name}
                          </p>
                        </div>

                        <span className="shrink-0 font-space text-[12px] text-[#52B788]">
                          {goal.progress}%
                        </span>

                      </div>

                      <div className="mt-7 h-2 rounded-full bg-[#25272C]">

                        <motion.div
                          initial={{ width: 0 }}
                          animate={{
                            width: `${goal.progress}%`,
                          }}
                          transition={{
                            duration: 0.7,
                            delay:
                              0.15 + index * 0.1,
                          }}
                          className="h-full rounded-full"
                          style={{
                            backgroundColor: "#52B788",
                          }}
                        />

                      </div>

                      <div className="mt-3 flex justify-between text-[8px] text-[#777B84]">
                        <span>{goal.current}</span>
                        <span>{goal.target}</span>
                      </div>

                      <p className="mt-6 text-[8px] leading-5 text-[#777B84]">
                        Keep your current savings rate and this
                        goal stays within reach.
                      </p>

                    </motion.div>
                  ))}

                </motion.div>
              )}

            </AnimatePresence>

          </div>
        </motion.div>

      </div>
    </section>
  );
}

/* ================= METRIC CARD ================= */

function MetricCard({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -3 }}
      transition={springTransition}
      className="min-w-0 rounded-[14px] border border-[#292B30] bg-[#0F1012] p-4 sm:p-5"
    >
      <p className="truncate text-[8px] text-[#777B84]">
        {label}
      </p>

      <p
        className={`mt-2 truncate font-space text-[17px] font-medium tracking-[-0.02em] sm:text-[20px] ${
          accent
            ? "text-[#52B788]"
            : "text-[#F1F1F2]"
        }`}
      >
        {value}
      </p>
    </motion.div>
  );
}

/* ================= BUDGET SUMMARY ================= */

function BudgetSummary({
  label,
  percentage,
  amount,
  color,
}: {
  label: string;
  percentage: number;
  amount: string;
  color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      transition={springTransition}
      className="min-w-0 rounded-[14px] border border-[#292B30] bg-[#0F1012] p-4 sm:p-5"
    >
      <div className="flex items-center gap-2">

        <span
          className="h-2 w-2 shrink-0 rounded-full"
          style={{
            backgroundColor: color,
          }}
        />

        <p className="text-[9px] text-[#777B84]">
          {label}
        </p>

      </div>

      <p className="mt-3 truncate font-space text-[18px] text-[#F1F1F2] sm:text-[19px]">
        {amount}
      </p>

      <p className="mt-1 text-[8px] text-[#777B84]">
        {percentage}% of income
      </p>
    </motion.div>
  );
}