import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  fadeUp,
  scaleIn,
  staggerContainer,
  viewportOnce,
} from "../../lib/motion";
import { useFinance } from "../../context/FinanceContext";
import { formatCurrency } from "../../data/finance";

type AllocationKey = "needs" | "wants" | "savings";

const categories: {
  key: AllocationKey;
  label: string;
  color: string;
}[] = [
  {
    key: "needs",
    label: "Needs",
    color: "#52B788",
  },
  {
    key: "wants",
    label: "Wants",
    color: "#666CC7",
  },
  {
    key: "savings",
    label: "Savings",
    color: "#7C83FF",
  },
];

export function BudgetAllocator() {
  const {
    finance,
    setIncome,
    setAllocation,
  } = useFinance();

  const { income, allocation } = finance;

  const totalAllocated =
    allocation.needs +
    allocation.wants +
    allocation.savings;

  const amounts = useMemo(
    () => ({
      needs: Math.round(
        (income * allocation.needs) / 100
      ),
      wants: Math.round(
        (income * allocation.wants) / 100
      ),
      savings: Math.round(
        (income * allocation.savings) / 100
      ),
    }),
    [income, allocation]
  );

  const updateAllocation = (
    changedKey: AllocationKey,
    newValue: number
  ) => {
    const value = Math.max(
      0,
      Math.min(100, newValue)
    );

    const otherKeys = (
      Object.keys(allocation) as AllocationKey[]
    ).filter((key) => key !== changedKey);

    const remaining = 100 - value;

    const firstKey = otherKeys[0];
    const secondKey = otherKeys[1];

    const firstCurrent = allocation[firstKey];
    const secondCurrent = allocation[secondKey];

    const currentOtherTotal =
      firstCurrent + secondCurrent;

    let firstValue = 0;
    let secondValue = 0;

    if (remaining > 0) {
      if (currentOtherTotal === 0) {
        firstValue = Math.floor(
          remaining / 2
        );
        secondValue =
          remaining - firstValue;
      } else {
        firstValue = Math.round(
          (firstCurrent / currentOtherTotal) *
            remaining
        );

        secondValue =
          remaining - firstValue;
      }
    }

    setAllocation({
      ...allocation,
      [changedKey]: value,
      [firstKey]: firstValue,
      [secondKey]: secondValue,
    });
  };

  return (
    <section
      id="allocator"
      className="w-full overflow-hidden border-t border-[#24262A] bg-[#070708]"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-8 sm:py-28">

        {/* HEADER */}

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="w-full max-w-[620px]"
        >
          <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#777B84]">
            Budget allocator
          </p>

          <h2 className="mt-5 font-space text-[36px] font-medium leading-[1.05] tracking-[-0.04em] text-[#F1F1F2] sm:text-[50px]">
            Give every rupee
            <br />
            a place.
          </h2>

          <p className="mt-6 w-full max-w-[480px] break-words text-[12px] leading-[1.8] text-[#777B84] sm:text-[13px]">
            Set your income and adjust your budget
            to see how your money changes instantly.
          </p>
        </motion.div>

        {/* MAIN CARD */}

        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-12 grid w-full min-w-0 overflow-hidden rounded-[22px] border border-[#292B30] bg-[#111214] sm:mt-16 lg:grid-cols-2"
        >

          {/* LEFT */}

          <motion.div
            variants={staggerContainer}
            className="min-w-0 border-b border-[#292B30] p-5 sm:p-9 lg:border-b-0 lg:border-r"
          >

            {/* MONTHLY INCOME */}

            <motion.div variants={fadeUp}>
              <p className="text-[9px] text-[#777B84]">
                Monthly income
              </p>

              <div className="mt-3 flex items-center gap-2">
                <span className="font-space text-[24px] text-[#F1F1F2]">
                  ₹
                </span>

                <input
                  type="number"
                  min="0"
                  step="500"
                  value={income}
                  onChange={(event) =>
                    setIncome(
                      Number(event.target.value)
                    )
                  }
                  aria-label="Monthly income"
                  className="w-full min-w-0 bg-transparent font-space text-[27px] font-medium tracking-[-0.04em] text-[#F1F1F2] outline-none placeholder:text-[#55585F] sm:text-[30px]"
                />
              </div>

              <p className="mt-2 text-[7px] text-[#55585F]">
                Enter your monthly take-home income.
              </p>
            </motion.div>

            {/* SLIDERS */}

            <div className="mt-10 space-y-7 sm:mt-12 sm:space-y-8">
              {categories.map(
                (category, index) => {
                  const value =
                    allocation[category.key];

                  const amount =
                    amounts[category.key];

                  return (
                    <motion.div
                      key={category.key}
                      variants={fadeUp}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.08,
                      }}
                      className="min-w-0"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex min-w-0 items-center gap-2">
                          <span
                            className="h-2 w-2 shrink-0 rounded-full"
                            style={{
                              backgroundColor:
                                category.color,
                            }}
                          />

                          <span className="text-[10px] font-medium text-[#F1F1F2]">
                            {category.label}
                          </span>
                        </div>

                        <motion.span
                          key={value}
                          initial={{
                            opacity: 0.5,
                          }}
                          animate={{
                            opacity: 1,
                          }}
                          className="shrink-0 font-space text-[13px] font-semibold text-[#F1F1F2]"
                        >
                          {value}%
                        </motion.span>
                      </div>

                      <div className="relative mt-5 w-full">
                        <div className="absolute left-0 right-0 top-1/2 h-[5px] -translate-y-1/2 rounded-full bg-[#24262A]" />

                        <motion.div
                          animate={{
                            width: `${value}%`,
                          }}
                          transition={{
                            duration: 0.2,
                            ease: "easeOut",
                          }}
                          className="absolute left-0 top-1/2 h-[5px] -translate-y-1/2 rounded-full"
                          style={{
                            backgroundColor:
                              category.color,
                          }}
                        />

                        <input
                          type="range"
                          min="0"
                          max="100"
                          step="1"
                          value={value}
                          onChange={(event) =>
                            updateAllocation(
                              category.key,
                              Number(
                                event.target.value
                              )
                            )
                          }
                          aria-label={`${category.label} allocation`}
                          className="relative z-10 h-6 w-full cursor-pointer appearance-none bg-transparent"
                          style={{
                            accentColor:
                              category.color,
                          }}
                        />
                      </div>

                      <div className="flex items-center justify-between gap-2 text-[7px] text-[#55585F]">
                        <span>0%</span>

                        <motion.span
                          key={`${category.key}-${amount}`}
                          initial={{
                            opacity: 0.5,
                          }}
                          animate={{
                            opacity: 1,
                          }}
                          className="truncate"
                        >
                          {formatCurrency(amount)}
                        </motion.span>

                        <span>100%</span>
                      </div>
                    </motion.div>
                  );
                }
              )}
            </div>

            {/* TOTAL */}

            <motion.div
              variants={fadeUp}
              className="mt-9 flex items-center justify-between gap-4 border-t border-[#292B30] pt-5 sm:mt-10"
            >
              <span className="text-[9px] text-[#777B84]">
                Total allocation
              </span>

              <motion.span
                key={totalAllocated}
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                className={`shrink-0 font-space text-[11px] font-medium ${
                  totalAllocated === 100
                    ? "text-[#F1F1F2]"
                    : "text-[#D6A85F]"
                }`}
              >
                {totalAllocated}%
              </motion.span>
            </motion.div>

          </motion.div>

          {/* RIGHT */}

          <motion.div
            variants={fadeUp}
            className="flex min-w-0 flex-col justify-center p-5 sm:p-9"
          >
            <div>
              <p className="text-[9px] uppercase tracking-[0.16em] text-[#777B84]">
                Where your money goes
              </p>

              <p className="mt-2 font-space text-[18px] font-medium text-[#F1F1F2]">
                Monthly allocation
              </p>
            </div>

            {/* DONUT */}

            <div className="mt-8 flex justify-center sm:mt-10">
              <div className="relative h-[190px] w-[190px] sm:h-[220px] sm:w-[220px]">
                <svg
                  viewBox="0 0 220 220"
                  className="h-full w-full -rotate-90"
                >
                  <circle
                    cx="110"
                    cy="110"
                    r="78"
                    fill="none"
                    stroke="#24262A"
                    strokeWidth="22"
                  />

                  {allocation.needs > 0 && (
                    <motion.circle
                      cx="110"
                      cy="110"
                      r="78"
                      fill="none"
                      stroke="#52B788"
                      strokeWidth="22"
                      strokeLinecap="round"
                      animate={{
                        strokeDasharray: `${
                          (allocation.needs /
                            100) *
                          490
                        } 490`,
                      }}
                      transition={{
                        duration: 0.35,
                        ease: "easeOut",
                      }}
                    />
                  )}

                  {allocation.wants > 0 && (
                    <motion.circle
                      cx="110"
                      cy="110"
                      r="78"
                      fill="none"
                      stroke="#666CC7"
                      strokeWidth="22"
                      strokeLinecap="round"
                      animate={{
                        strokeDasharray: `${
                          (allocation.wants /
                            100) *
                          490
                        } 490`,
                        strokeDashoffset: `${
                          -(
                            allocation.needs /
                            100
                          ) * 490
                        }`,
                      }}
                      transition={{
                        duration: 0.35,
                        ease: "easeOut",
                      }}
                    />
                  )}

                  {allocation.savings > 0 && (
                    <motion.circle
                      cx="110"
                      cy="110"
                      r="78"
                      fill="none"
                      stroke="#7C83FF"
                      strokeWidth="22"
                      strokeLinecap="round"
                      animate={{
                        strokeDasharray: `${
                          (allocation.savings /
                            100) *
                          490
                        } 490`,
                        strokeDashoffset: `${
                          -(
                            (allocation.needs +
                              allocation.wants) /
                            100
                          ) * 490
                        }`,
                      }}
                      transition={{
                        duration: 0.35,
                        ease: "easeOut",
                      }}
                    />
                  )}
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="font-space text-[25px] font-medium tracking-[-0.04em] text-[#F1F1F2] sm:text-[28px]">
                    {formatCurrency(income)}
                  </p>

                  <p className="mt-1 text-[8px] uppercase tracking-[0.15em] text-[#777B84]">
                    monthly
                  </p>
                </div>
              </div>
            </div>

            {/* LEGEND */}

            <motion.div
              variants={staggerContainer}
              className="mt-8 space-y-4 sm:mt-10"
            >
              {categories.map(
                (category) => (
                  <motion.div
                    key={category.key}
                    variants={fadeUp}
                    className="flex items-center justify-between gap-4"
                  >
                    <div className="flex min-w-0 items-center gap-2">
                      <span
                        className="h-2 w-2 shrink-0 rounded-full"
                        style={{
                          backgroundColor:
                            category.color,
                        }}
                      />

                      <span className="text-[10px] text-[#A7ABB4]">
                        {category.label}
                      </span>
                    </div>

                    <div className="shrink-0 text-right">
                      <span className="font-space text-[10px] text-[#F1F1F2]">
                        {formatCurrency(
                          amounts[category.key]
                        )}
                      </span>

                      <span className="ml-2 text-[9px] text-[#777B84]">
                        {
                          allocation[
                            category.key
                          ]
                        }%
                      </span>
                    </div>
                  </motion.div>
                )
              )}
            </motion.div>

          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}