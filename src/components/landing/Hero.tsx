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
    <section className="bg-background">
      <div className="mx-auto grid max-w-6xl items-center gap-20 px-8 py-24 lg:grid-cols-[1fr_1fr] lg:py-28">
        {/* Hero copy */}
        <motion.div
          className="max-w-[500px]"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={fadeUp}
            className="font-space text-[42px] font-medium leading-[1.02] tracking-[-0.045em] text-text-primary sm:text-[48px] lg:text-[52px]"
          >
            Watch your money
            <br />
            behave
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-7 max-w-[430px] text-[13px] leading-[1.65] text-text-secondary sm:text-sm"
          >
            See where your money goes, understand what matters,
            <br className="hidden sm:block" />
            and build a plan that actually feels like yours.
          </motion.p>

          <motion.div
            variants={staggerContainer}
            className="mt-9 flex items-center gap-4"
          >
            <motion.button
              type="button"
              variants={fadeUp}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={springTransition}
              className="rounded-[7px] bg-accent-primary px-4 py-2.5 text-[11px] font-medium text-white transition-opacity hover:opacity-90"
            >
              See your money clearly
            </motion.button>

            <motion.button
              type="button"
              variants={fadeUp}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={springTransition}
              className="rounded-[7px] border border-border-aurora bg-transparent px-4 py-2.5 text-[11px] font-medium text-text-primary transition-colors hover:bg-surface"
            >
              Try the live demo
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Dashboard preview */}
        <motion.div
          className="w-full"
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
            className="rounded-[15px] border border-border-aurora bg-surface p-6"
          >
            {/* Top metrics */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="grid grid-cols-3 gap-5"
            >
              <motion.div variants={fadeIn}>
                <p className="text-[8px] text-text-muted">
                  Current Balance
                </p>

                <p className="mt-1 font-space text-[16px] font-medium text-text-primary">
                  ₹80,000
                </p>
              </motion.div>

              <motion.div variants={fadeIn}>
                <p className="text-[8px] text-text-muted">
                  Spent this month
                </p>

                <p className="mt-1 font-space text-[16px] font-medium text-text-primary">
                  ₹32,000
                </p>
              </motion.div>

              <motion.div variants={fadeIn}>
                <p className="text-[8px] text-text-muted">Savings</p>

                <p className="mt-1 font-space text-[16px] font-medium text-accent-green">
                  ₹47,600
                </p>
              </motion.div>
            </motion.div>

            {/* Spending */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="mt-9"
            >
              <p className="mb-5 text-[9px] font-medium text-text-primary">
                Monthly spending
              </p>

              <div className="space-y-3.5">
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
                    className="grid grid-cols-[42px_1fr_48px] items-center gap-3"
                  >
                    <span className="text-[8px] text-text-secondary">
                      {item.label}
                    </span>

                    <div className="h-[4px] overflow-hidden rounded-full bg-[#25262A]">
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

                    <span className="text-right text-[8px] tabular-nums text-text-secondary">
                      {item.amount}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Status */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="mt-7"
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