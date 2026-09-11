import { motion } from "framer-motion";
import { Link } from "react-router-dom";
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
    amount: "₹18,000",
    width: "100%",
  },
  {
    label: "Food",
    amount: "₹7,200",
    width: "72%",
  },
  {
    label: "Fun",
    amount: "₹4,200",
    width: "42%",
  },
  {
    label: "Other",
    amount: "₹3,000",
    width: "27%",
  },
];

export function Hero() {
  return (
    <section className="w-full overflow-x-hidden bg-background">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-8 sm:py-24 lg:grid lg:grid-cols-2 lg:items-center lg:gap-20 lg:py-28">
        {/* HERO COPY */}

        <motion.div
          className="w-[calc(100vw-2rem)] max-w-[500px] sm:w-full"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={fadeUp}
            className="w-full max-w-full font-space text-[34px] font-medium leading-[1.02] tracking-[-0.045em] text-text-primary sm:text-[48px] lg:text-[52px]"
          >
            Watch your money
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            behave
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 w-full max-w-full break-words text-[13px] leading-[1.65] text-text-secondary sm:mt-7 sm:max-w-[430px] sm:text-sm"
          >
            See where your money goes, understand what matters,
            <br className="hidden sm:block" />
            and build a plan that actually feels like yours.
          </motion.p>

          {/* BUTTONS */}

          <motion.div
            variants={staggerContainer}
            className="mt-8 flex w-[calc(100vw-2rem)] flex-col gap-3 sm:mt-9 sm:w-full sm:flex-row sm:items-center sm:gap-4"
          >
            <Link
              to="/signup"
              className="w-full sm:w-auto"
            >
              <motion.div
                variants={fadeUp}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={springTransition}
                className="box-border w-full rounded-[7px] bg-accent-primary px-4 py-3 text-center text-[11px] font-medium text-white transition-opacity hover:opacity-90 sm:py-2.5"
              >
                See your money clearly
              </motion.div>
            </Link>

            <a
              href="#allocator"
              className="w-full sm:w-auto"
            >
              <motion.div
                variants={fadeUp}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={springTransition}
                className="box-border w-full rounded-[7px] border border-border-aurora bg-transparent px-4 py-3 text-center text-[11px] font-medium text-text-primary transition-colors hover:bg-surface sm:py-2.5"
              >
                Try the live demo
              </motion.div>
            </a>
          </motion.div>
        </motion.div>

        {/* DASHBOARD */}

        <motion.div
          className="mt-12 w-[calc(100vw-2rem)] min-w-0 sm:w-full lg:mt-0"
          variants={scaleIn}
          initial="hidden"
          animate="visible"
          transition={{
            duration: 0.8,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <motion.div
            whileHover={{ y: -4 }}
            transition={springTransition}
            className="box-border w-full min-w-0 rounded-[15px] border border-border-aurora bg-surface p-4 sm:p-6"
          >
            {/* TOP METRICS */}

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="grid w-full min-w-0 grid-cols-3 gap-2 sm:gap-5"
            >
              <motion.div
                variants={fadeIn}
                className="min-w-0"
              >
                <p className="truncate text-[7px] text-text-muted sm:text-[8px]">
                  Current Balance
                </p>

                <p className="mt-1 truncate font-space text-[13px] font-medium text-text-primary sm:text-[16px]">
                  ₹80,000
                </p>
              </motion.div>

              <motion.div
                variants={fadeIn}
                className="min-w-0"
              >
                <p className="truncate text-[7px] text-text-muted sm:text-[8px]">
                  Spent this month
                </p>

                <p className="mt-1 truncate font-space text-[13px] font-medium text-text-primary sm:text-[16px]">
                  ₹32,000
                </p>
              </motion.div>

              <motion.div
                variants={fadeIn}
                className="min-w-0"
              >
                <p className="truncate text-[7px] text-text-muted sm:text-[8px]">
                  Savings
                </p>

                <p className="mt-1 truncate font-space text-[13px] font-medium text-accent-green sm:text-[16px]">
                  ₹47,600
                </p>
              </motion.div>
            </motion.div>

            {/* SPENDING */}

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="mt-7 w-full min-w-0 sm:mt-9"
            >
              <p className="mb-4 text-[9px] font-medium text-text-primary sm:mb-5">
                Monthly spending
              </p>

              <div className="w-full min-w-0 space-y-3.5">
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
                    className="flex w-full min-w-0 items-center gap-2"
                  >
                    <span className="w-7 shrink-0 text-[7px] text-text-secondary sm:w-10 sm:text-[8px]">
                      {item.label}
                    </span>

                    <div className="flex min-w-0 flex-1 items-center gap-2">
                      <div className="h-[4px] min-w-0 flex-1 overflow-hidden rounded-full bg-[#25262A]">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: item.width }}
                          viewport={viewportOnce}
                          transition={{
                            duration: 0.8,
                            delay: 0.15 + index * 0.08,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="h-full rounded-full bg-accent-primary"
                        />
                      </div>

                      <span className="w-[42px] shrink-0 text-right text-[7px] tabular-nums text-text-secondary sm:w-[48px] sm:text-[8px]">
                        {item.amount}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* STATUS */}

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="mt-6 sm:mt-7"
            >
              <p className="text-[8px] text-accent-green">
                You’re on track.
              </p>

              <p className="mt-1 text-[7px] text-text-muted">
                Saving 18% more than last month.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}