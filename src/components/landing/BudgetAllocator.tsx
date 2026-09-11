import { useState } from "react";
import { motion } from "framer-motion";
import {
  fadeUp,
  scaleIn,
  staggerContainer,
  viewportOnce,
} from "../../lib/motion";
type Allocation = {
  needs: number;
  wants: number;
  savings: number;
};

const INCOME = 80000;

const initialAllocation: Allocation = {
  needs: 90,
  wants: 5,
  savings: 5,
};

const categories = [
  {
    key: "needs" as const,
    label: "Needs",
    color: "#52B788",
  },
  {
    key: "wants" as const,
    label: "Wants",
    color: "#666CC7",
  },
  {
    key: "savings" as const,
    label: "Savings",
    color: "#7C83FF",
  },
];

export function BudgetAllocator() {
  const [allocation, setAllocation] =
    useState<Allocation>(initialAllocation);

  const updateAllocation = (
    changedKey: keyof Allocation,
    newValue: number
  ) => {
    const value = Math.max(0, Math.min(100, newValue));

    const otherKeys = (
      Object.keys(allocation) as Array<keyof Allocation>
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
        firstValue = Math.floor(remaining / 2);
        secondValue = remaining - firstValue;
      } else {
        firstValue = Math.round(
          (firstCurrent / currentOtherTotal) * remaining
        );

        secondValue = remaining - firstValue;
      }
    }

    setAllocation({
      ...allocation,
      [changedKey]: value,
      [firstKey]: firstValue,
      [secondKey]: secondValue,
    });
  };

  const needsAmount = Math.round(
    (INCOME * allocation.needs) / 100
  );

  const wantsAmount = Math.round(
    (INCOME * allocation.wants) / 100
  );

  const savingsAmount = Math.round(
    (INCOME * allocation.savings) / 100
  );

  const totalAllocated =
    allocation.needs +
    allocation.wants +
    allocation.savings;

  return (
    <section
      id="allocator"
      className="border-t border-[#24262A] bg-[#070708]"
    >
      <div className="mx-auto max-w-6xl px-8 py-28">

        {/* HEADER */}

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="max-w-[620px]"
        >
          <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#777B84]">
            Budget allocator
          </p>

          <h2 className="mt-5 font-space text-[38px] font-medium leading-[1.05] tracking-[-0.04em] text-[#F1F1F2] sm:text-[50px]">
            Give every rupee
            <br />
            a place.
          </h2>

          <p className="mt-6 max-w-[480px] text-[12px] leading-[1.8] text-[#777B84] sm:text-[13px]">
            Adjust your budget and see how your money changes
            instantly. Move the sliders to find an allocation
            that feels right for you.
          </p>
        </motion.div>

        {/* MAIN CARD */}

        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 grid overflow-hidden rounded-[22px] border border-[#292B30] bg-[#111214] lg:grid-cols-2"
        >

          {/* LEFT — SLIDERS */}

          <motion.div
            variants={staggerContainer}
            className="border-b border-[#292B30] p-7 sm:p-9 lg:border-b-0 lg:border-r"
          >

            {/* MONTHLY INCOME */}

            <motion.div variants={fadeUp}>
              <p className="text-[9px] text-[#777B84]">
                Monthly income
              </p>

              <p className="mt-3 font-space text-[30px] font-medium tracking-[-0.04em] text-[#F1F1F2]">
                ₹80,000
              </p>
            </motion.div>

            {/* SLIDERS */}

            <div className="mt-12 space-y-8">
              {categories.map((category, index) => {
                const value = allocation[category.key];

                const amount = Math.round(
                  (INCOME * value) / 100
                );

                return (
                  <motion.div
                    key={category.key}
                    variants={fadeUp}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.08,
                    }}
                  >

                    {/* LABEL */}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{
                            backgroundColor: category.color,
                          }}
                        />

                        <span className="text-[10px] font-medium text-[#F1F1F2]">
                          {category.label}
                        </span>
                      </div>

                      <motion.span
                        key={value}
                        initial={{ opacity: 0.5 }}
                        animate={{ opacity: 1 }}
                        className="font-space text-[13px] font-semibold text-[#F1F1F2]"
                      >
                        {value}%
                      </motion.span>
                    </div>

                    {/* SLIDER */}

                    <div className="relative mt-5">

                      {/* TRACK */}

                      <div className="absolute left-0 right-0 top-1/2 h-[5px] -translate-y-1/2 rounded-full bg-[#24262A]" />

                      {/* FILLED TRACK */}

                      <motion.div
                        animate={{ width: `${value}%` }}
                        transition={{
                          duration: 0.2,
                          ease: "easeOut",
                        }}
                        className="absolute left-0 top-1/2 h-[5px] -translate-y-1/2 rounded-full"
                        style={{
                          backgroundColor: category.color,
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
                            Number(event.target.value)
                          )
                        }
                        aria-label={`${category.label} allocation`}
                        className="relative z-10 h-5 w-full cursor-pointer appearance-none bg-transparent"
                        style={{
                          accentColor: category.color,
                        }}
                      />
                    </div>

                    {/* RANGE INFORMATION */}

                    <div className="flex justify-between text-[7px] text-[#55585F]">
                      <span>0%</span>

                      <motion.span
                        key={`${category.key}-${amount}`}
                        initial={{ opacity: 0.5 }}
                        animate={{ opacity: 1 }}
                      >
                        ₹{amount.toLocaleString("en-IN")}
                      </motion.span>

                      <span>100%</span>
                    </div>

                  </motion.div>
                );
              })}
            </div>

            {/* TOTAL */}

            <motion.div
              variants={fadeUp}
              className="mt-10 flex items-center justify-between border-t border-[#292B30] pt-5"
            >
              <span className="text-[9px] text-[#777B84]">
                Total allocation
              </span>

              <motion.span
                key={totalAllocated}
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                className="font-space text-[11px] font-medium text-[#F1F1F2]"
              >
                {totalAllocated}%
              </motion.span>
            </motion.div>

          </motion.div>

          {/* RIGHT — CHART */}

          <motion.div
            variants={fadeUp}
            className="flex flex-col justify-center p-7 sm:p-9"
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

            <div className="mt-10 flex justify-center">
              <div className="relative h-[220px] w-[220px]">

                <svg
                  viewBox="0 0 220 220"
                  className="h-full w-full -rotate-90"
                >

                  {/* BACKGROUND RING */}

                  <circle
                    cx="110"
                    cy="110"
                    r="78"
                    fill="none"
                    stroke="#24262A"
                    strokeWidth="22"
                  />

                  {/* NEEDS */}

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
                          (allocation.needs / 100) * 490
                        } 490`,
                      }}
                      transition={{
                        duration: 0.35,
                        ease: "easeOut",
                      }}
                    />
                  )}

                  {/* WANTS */}

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
                          (allocation.wants / 100) * 490
                        } 490`,
                        strokeDashoffset: `${
                          -(allocation.needs / 100) * 490
                        }`,
                      }}
                      transition={{
                        duration: 0.35,
                        ease: "easeOut",
                      }}
                    />
                  )}

                  {/* SAVINGS */}

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
                          (allocation.savings / 100) * 490
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

                {/* CENTER */}

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="font-space text-[28px] font-medium tracking-[-0.04em] text-[#F1F1F2]">
                    ₹80K
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
              className="mt-10 space-y-4"
            >

              {/* NEEDS */}

              <motion.div
                variants={fadeUp}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#52B788]" />

                  <span className="text-[10px] text-[#A7ABB4]">
                    Needs
                  </span>
                </div>

                <div className="text-right">
                  <span className="font-space text-[10px] text-[#F1F1F2]">
                    ₹{needsAmount.toLocaleString("en-IN")}
                  </span>

                  <span className="ml-2 text-[9px] text-[#777B84]">
                    {allocation.needs}%
                  </span>
                </div>
              </motion.div>

              {/* WANTS */}

              <motion.div
                variants={fadeUp}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#666CC7]" />

                  <span className="text-[10px] text-[#A7ABB4]">
                    Wants
                  </span>
                </div>

                <div className="text-right">
                  <span className="font-space text-[10px] text-[#F1F1F2]">
                    ₹{wantsAmount.toLocaleString("en-IN")}
                  </span>

                  <span className="ml-2 text-[9px] text-[#777B84]">
                    {allocation.wants}%
                  </span>
                </div>
              </motion.div>

              {/* SAVINGS */}

              <motion.div
                variants={fadeUp}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#7C83FF]" />

                  <span className="text-[10px] text-[#A7ABB4]">
                    Savings
                  </span>
                </div>

                <div className="text-right">
                  <span className="font-space text-[10px] text-[#F1F1F2]">
                    ₹{savingsAmount.toLocaleString("en-IN")}
                  </span>

                  <span className="ml-2 text-[9px] text-[#777B84]">
                    {allocation.savings}%
                  </span>
                </div>
              </motion.div>

            </motion.div>

          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}