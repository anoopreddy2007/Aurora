import { motion } from "framer-motion";
import {
  fadeUp,
  fadeIn,
  scaleIn,
  staggerContainer,
  viewportOnce,
  springTransition,
} from "../../lib/motion";

const spending = [
  {
    label: "Rent",
    percentage: "56%",
    amount: "₹18,000",
  },
  {
    label: "Food",
    percentage: "22%",
    amount: "₹7,200",
  },
  {
    label: "Fun",
    percentage: "13%",
    amount: "₹4,200",
  },
  {
    label: "Other",
    percentage: "8%",
    amount: "₹2,600",
  },
];

export function Introduction() {
  return (
    <section id="product" className="w-full overflow-hidden bg-background">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-4 py-20 sm:gap-20 sm:px-8 sm:py-28 lg:grid-cols-[1fr_1.15fr]">

        {/* LEFT CONTENT */}

        <motion.div
          className="w-full min-w-0 max-w-[480px]"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.p
            variants={fadeUp}
            className="mb-6 text-[10px] font-medium uppercase tracking-[0.22em] text-text-muted sm:mb-7"
          >
            Why Aurora
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="font-space text-[36px] font-medium leading-[1.03] tracking-[-0.045em] text-text-primary sm:text-[48px]"
          >
            Budgeting shouldn't
            <br />
            feel like homework.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-6 w-full max-w-full break-words text-[13px] leading-[1.7] text-text-secondary sm:mt-7 sm:max-w-[440px] sm:text-sm"
          >
            See where your money goes, understand what matters,
            <br className="hidden sm:block" />
            and build a plan that actually feels like yours.
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="mt-6 text-sm font-medium text-accent-green sm:mt-7"
          >
            Make spending visible. Make progress easier.
          </motion.p>
        </motion.div>

        {/* DASHBOARD */}

        <motion.div
          className="w-full min-w-0 lg:justify-self-end"
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.div
            whileHover={{ y: -3 }}
            transition={springTransition}
            className="box-border w-full min-w-0 overflow-hidden rounded-[18px] border border-border-aurora bg-surface p-4 sm:p-7"
          >

            {/* TOP METRICS */}

            <motion.div
              variants={fadeIn}
              className="flex w-full min-w-0 items-start justify-between gap-4"
            >
              <div className="min-w-0">
                <p className="text-[8px] text-text-muted sm:text-[9px]">
                  Balance
                </p>

                <p className="mt-2 truncate font-space text-[24px] font-medium tracking-[-0.03em] text-text-primary sm:text-[27px]">
                  ₹80,000
                </p>
              </div>

              <div className="min-w-0 text-right">
                <p className="text-[8px] text-text-muted sm:text-[9px]">
                  This month
                </p>

                <p className="mt-2 truncate font-space text-[17px] font-medium text-text-primary sm:text-[19px]">
                  ₹32K
                </p>

                <p className="mt-0.5 text-[8px] text-text-muted">
                  Spent
                </p>
              </div>
            </motion.div>

            {/* SPENDING BREAKDOWN */}

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="mt-8 grid min-w-0 gap-8 lg:mt-10 lg:grid-cols-[145px_minmax(0,1fr)] lg:items-center"
            >

              {/* DONUT */}

              <motion.div
                variants={scaleIn}
                className="flex justify-center"
              >
                <div
                  className="relative flex h-[130px] w-[130px] items-center justify-center rounded-full sm:h-[138px] sm:w-[138px]"
                  style={{
                    background:
                      "conic-gradient(#56C7A0 0deg 202deg, #438D76 202deg 282deg, #72B9AA 282deg 329deg, #263A34 329deg 360deg)",
                  }}
                >
                  <div className="flex h-[94px] w-[94px] flex-col items-center justify-center rounded-full bg-surface sm:h-[101px] sm:w-[101px]">
                    <span className="font-space text-[17px] text-text-primary sm:text-[18px]">
                      ₹32K
                    </span>

                    <span className="mt-1 text-[8px] text-text-muted">
                      Spent
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* CATEGORIES */}

              <motion.div
                variants={fadeUp}
                className="min-w-0"
              >
                <div className="mb-5 flex items-center justify-between gap-3">
                  <h3 className="font-space text-[12px] font-semibold text-text-primary">
                    Spending breakdown
                  </h3>

                  <span className="shrink-0 text-[8px] text-text-muted">
                    This month
                  </span>
                </div>

                <div className="w-full min-w-0">
                  {spending.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={viewportOnce}
                      transition={{
                        duration: 0.45,
                        delay: index * 0.08,
                      }}
                      className={`flex w-full min-w-0 items-center justify-between gap-4 py-3 ${
                        index !== spending.length - 1
                          ? "border-b border-border-aurora"
                          : ""
                      }`}
                    >
                      <div className="min-w-0">
                        <p className="text-[10px] text-text-secondary">
                          {item.label}
                        </p>

                        <p className="mt-0.5 text-[9px] text-text-muted">
                          {item.percentage}
                        </p>
                      </div>

                      <span className="shrink-0 font-space text-[10px] text-text-primary">
                        {item.amount}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* MONEY FLOW */}

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="mt-7 rounded-[14px] border border-border-aurora bg-background-secondary p-4 sm:mt-8 sm:p-5"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-[10px] font-medium text-text-primary sm:text-[11px]">
                  Where your money goes
                </p>

                <span className="shrink-0 text-[7px] text-text-muted sm:text-[8px]">
                  Monthly flow
                </span>
              </div>

              {/* Progress bar */}

              <div className="mt-5 flex h-3 w-full overflow-hidden rounded-full bg-[#202326]">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "56%" }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="h-full bg-accent-green"
                />

                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "22%" }}
                  viewport={viewportOnce}
                  transition={{
                    duration: 0.7,
                    delay: 0.1,
                    ease: "easeOut",
                  }}
                  className="h-full bg-[#438D76]"
                />

                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "22%" }}
                  viewport={viewportOnce}
                  transition={{
                    duration: 0.7,
                    delay: 0.2,
                    ease: "easeOut",
                  }}
                  className="h-full bg-accent-primary"
                />
              </div>

              {/* Flow labels */}

              <div
                className="mt-4 grid w-full min-w-0"
                style={{
                  gridTemplateColumns: "56% 22% 22%",
                }}
              >
                <div className="min-w-0 text-left">
                  <p className="text-[7px] text-text-muted sm:text-[8px]">
                    Needs
                  </p>

                  <p className="mt-1 font-space text-[10px] text-text-primary sm:text-[11px]">
                    56%
                  </p>
                </div>

                <div className="min-w-0 text-left">
                  <p className="text-[7px] text-text-muted sm:text-[8px]">
                    Wants
                  </p>

                  <p className="mt-1 font-space text-[10px] text-text-primary sm:text-[11px]">
                    22%
                  </p>
                </div>

                <div className="min-w-0 text-left">
                  <p className="text-[7px] text-text-muted sm:text-[8px]">
                    Savings
                  </p>

                  <p className="mt-1 font-space text-[10px] text-accent-primary sm:text-[11px]">
                    22%
                  </p>
                </div>
              </div>
            </motion.div>

          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}