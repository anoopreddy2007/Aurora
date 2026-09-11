import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import {
  fadeUp,
  fadeIn,
  scaleIn,
  staggerContainer,
  viewportOnce,
  springTransition,
} from "../../lib/motion";

export function CTA() {
  return (
    <section
      id="cta"
      className="border-t border-[#24262A] bg-[#070708]"
    >
      <div className="mx-auto max-w-6xl px-8 py-32">

        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          whileHover={{ y: -2 }}
          transition={springTransition}
          className="relative overflow-hidden rounded-[24px] border border-[#292B30] bg-[#111214] px-7 py-16 text-center sm:px-12 sm:py-20"
        >

          {/* Subtle background detail */}

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="pointer-events-none absolute left-1/2 top-0 h-[260px] w-[500px] -translate-x-1/2 rounded-full bg-[#8D83B8]/[0.035] blur-[100px]"
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="relative"
          >

            {/* LABEL */}

            <motion.p
              variants={fadeUp}
              className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#777B84]"
            >
              Start today
            </motion.p>

            {/* HEADLINE */}

            <motion.h2
              variants={fadeUp}
              className="mx-auto mt-6 max-w-[700px] font-space text-[42px] font-medium leading-[1.02] tracking-[-0.045em] text-[#F1F1F2] sm:text-[56px]"
            >
              Your money doesn't need
              <br />
              to feel complicated.
            </motion.h2>

            {/* DESCRIPTION */}

            <motion.p
              variants={fadeUp}
              className="mx-auto mt-7 max-w-[480px] text-[12px] leading-[1.7] text-[#777B84] sm:text-[13px]"
            >
              See where your money goes, build a plan that
              feels like yours, and start making better decisions.
            </motion.p>

            {/* CTA */}

            <motion.div
              variants={fadeUp}
              className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >

              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="group flex h-11 items-center gap-3 rounded-full bg-[#F1F1F2] px-6 text-[10px] font-medium text-[#0B0C0D] transition-colors duration-200 hover:bg-white"
              >
                Start using Aurora

                <motion.span
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2 }}
                  className="flex"
                >
                  <ArrowRight
                    size={14}
                    strokeWidth={1.8}
                  />
                </motion.span>
              </motion.button>

              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="flex h-11 items-center rounded-full border border-[#34373D] bg-[#17181B] px-6 text-[10px] font-medium text-[#A7ABB4] transition-colors duration-200 hover:border-[#4A4D54] hover:text-[#F1F1F2]"
              >
                Try the live demo
              </motion.button>

            </motion.div>

            {/* FREE */}

            <motion.div
              variants={fadeIn}
              className="mt-7 flex items-center justify-center gap-2"
            >

              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={viewportOnce}
                transition={springTransition}
              >
                <Check
                  size={12}
                  strokeWidth={1.7}
                  className="text-[#52B788]"
                />
              </motion.div>

              <span className="text-[8px] text-[#777B84]">
                Free to use. No paid plans.
              </span>

            </motion.div>

          </motion.div>

        </motion.div>

      </div>
    </section>
  );
}