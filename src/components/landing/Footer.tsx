import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Github,
  Instagram,
  Linkedin,
} from "lucide-react";
import {
  fadeUp,
  staggerContainer,
  viewportOnce,
  springTransition,
} from "../../lib/motion";

export function Footer() {
  return (
    <footer className="w-full overflow-hidden border-t border-[#24262A] bg-[#070708]">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid w-full min-w-0 gap-10 py-14 sm:grid-cols-2 sm:gap-12 sm:py-16 lg:grid-cols-[1.5fr_1fr_1fr_1fr]"
        >
          {/* BRAND */}

          <motion.div variants={fadeUp} className="min-w-0">
            <span className="font-space text-sm font-semibold tracking-[-0.02em] text-[#F1F1F2]">
              Aurora
            </span>

            <p className="mt-4 w-full max-w-[260px] text-[10px] leading-[1.7] text-[#777B84] sm:mt-5 sm:text-[11px]">
              A simpler way to understand your money,
              build better habits, and make progress.
            </p>
          </motion.div>

          {/* PRODUCT */}

          <motion.div variants={fadeUp} className="min-w-0">
            <p className="text-[8px] font-medium uppercase tracking-[0.18em] text-[#777B84] sm:text-[9px]">
              Product
            </p>

            <div className="mt-4 space-y-3 sm:mt-5">
              {[
                ["Budget Allocator", "#allocator"],
                ["Dashboard", "#showcase"],
                ["Features", "#features"],
                ["How it works", "#story"],
              ].map(([label, href]) => (
                <motion.a
                  key={label}
                  href={href}
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2 }}
                  className="block text-[10px] text-[#A7ABB4] transition-colors duration-200 hover:text-[#F1F1F2] sm:text-[11px]"
                >
                  {label}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* COMPANY */}

          <motion.div variants={fadeUp} className="min-w-0">
            <p className="text-[8px] font-medium uppercase tracking-[0.18em] text-[#777B84] sm:text-[9px]">
              Aurora
            </p>

            <div className="mt-4 space-y-3 sm:mt-5">
              {["About", "Privacy", "Terms"].map((label) => (
                <motion.a
                  key={label}
                  href="#"
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-1 text-[10px] text-[#A7ABB4] transition-colors duration-200 hover:text-[#F1F1F2] sm:text-[11px]"
                >
                  {label}

                  <motion.span
                    whileHover={{ x: 2, y: -2 }}
                    transition={{ duration: 0.2 }}
                    className="flex"
                  >
                    <ArrowUpRight size={10} />
                  </motion.span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* SOCIAL */}

          <motion.div variants={fadeUp} className="min-w-0">
            <p className="text-[8px] font-medium uppercase tracking-[0.18em] text-[#777B84] sm:text-[9px]">
              Connect
            </p>

            <div className="mt-4 flex gap-2 sm:mt-5">
              <motion.a
                href="#"
                aria-label="GitHub"
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={springTransition}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#292B30] bg-[#111214] text-[#777B84] transition-colors duration-200 hover:border-[#3A3D43] hover:text-[#F1F1F2]"
              >
                <Github size={13} />
              </motion.a>

              <motion.a
                href="#"
                aria-label="LinkedIn"
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={springTransition}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#292B30] bg-[#111214] text-[#777B84] transition-colors duration-200 hover:border-[#3A3D43] hover:text-[#F1F1F2]"
              >
                <Linkedin size={13} />
              </motion.a>

              <motion.a
                href="#"
                aria-label="Instagram"
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={springTransition}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#292B30] bg-[#111214] text-[#777B84] transition-colors duration-200 hover:border-[#3A3D43] hover:text-[#F1F1F2]"
              >
                <Instagram size={13} />
              </motion.a>
            </div>
          </motion.div>
        </motion.div>

        {/* BOTTOM */}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex w-full min-w-0 flex-col gap-3 border-t border-[#24262A] py-5 sm:flex-row sm:items-center sm:justify-between sm:py-6"
        >
          <p className="text-[8px] text-[#55585F] sm:text-[9px]">
            © 2026 Aurora. Built for better money decisions.
          </p>

          <p className="text-[8px] text-[#55585F] sm:text-[9px]">
            Free. Simple. Yours.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}