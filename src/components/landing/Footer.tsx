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
    <footer className="border-t border-[#24262A] bg-[#070708]">
      <div className="mx-auto max-w-6xl px-8">

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]"
        >

          {/* BRAND */}

          <motion.div variants={fadeUp}>
            <span className="font-space text-sm font-semibold tracking-[-0.02em] text-[#F1F1F2]">
              Aurora
            </span>

            <p className="mt-5 max-w-[260px] text-[11px] leading-[1.7] text-[#777B84]">
              A simpler way to understand your money,
              build better habits, and make progress.
            </p>
          </motion.div>

          {/* PRODUCT */}

          <motion.div variants={fadeUp}>
            <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-[#777B84]">
              Product
            </p>

            <div className="mt-5 space-y-3">
              {[
                ["Budget Allocator", "#allocator"],
                ["Dashboard", "#dashboard"],
                ["Features", "#features"],
                ["How it works", "#story"],
              ].map(([label, href]) => (
                <motion.a
                  key={label}
                  href={href}
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2 }}
                  className="block text-[11px] text-[#A7ABB4] transition-colors duration-200 hover:text-[#F1F1F2]"
                >
                  {label}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* COMPANY */}

          <motion.div variants={fadeUp}>
            <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-[#777B84]">
              Aurora
            </p>

            <div className="mt-5 space-y-3">
              {["About", "Privacy", "Terms"].map((label) => (
                <motion.a
                  key={label}
                  href="#"
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-1 text-[11px] text-[#A7ABB4] transition-colors duration-200 hover:text-[#F1F1F2]"
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

          <motion.div variants={fadeUp}>
            <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-[#777B84]">
              Connect
            </p>

            <div className="mt-5 flex gap-2">
              <motion.a
                href="#"
                aria-label="GitHub"
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={springTransition}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#292B30] bg-[#111214] text-[#777B84] transition-colors duration-200 hover:border-[#3A3D43] hover:text-[#F1F1F2]"
              >
                <Github size={13} />
              </motion.a>

              <motion.a
                href="#"
                aria-label="LinkedIn"
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={springTransition}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#292B30] bg-[#111214] text-[#777B84] transition-colors duration-200 hover:border-[#3A3D43] hover:text-[#F1F1F2]"
              >
                <Linkedin size={13} />
              </motion.a>

              <motion.a
                href="#"
                aria-label="Instagram"
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={springTransition}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#292B30] bg-[#111214] text-[#777B84] transition-colors duration-200 hover:border-[#3A3D43] hover:text-[#F1F1F2]"
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
          className="flex flex-col gap-3 border-t border-[#24262A] py-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="text-[9px] text-[#55585F]">
            © 2026 Aurora. Built for better money decisions.
          </p>

          <p className="text-[9px] text-[#55585F]">
            Free. Simple. Yours.
          </p>
        </motion.div>

      </div>
    </footer>
  );
}