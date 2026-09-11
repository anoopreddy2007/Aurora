import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  Check,
  CreditCard,
  PiggyBank,
  TrendingUp,
  Wallet,
} from "lucide-react";
import {
  fadeUp,
  staggerContainer,
  viewportOnce,
  springTransition,
} from "../../lib/motion";

const steps = [
  {
    number: "01",
    title: "Payday",
    description:
      "Your income arrives. Aurora gives you a clear starting point before the month begins.",
  },
  {
    number: "02",
    title: "Split",
    description:
      "Your money gets a purpose — needs, wants and savings — instead of disappearing into one account.",
  },
  {
    number: "03",
    title: "Leaks",
    description:
      "Recurring payments and unnecessary spending become visible before they quietly add up.",
  },
  {
    number: "04",
    title: "Growth",
    description:
      "Savings move toward something meaningful while your goals get closer.",
  },
  {
    number: "05",
    title: "Freedom",
    description:
      "You finish the month knowing where your money went and where it's going next.",
  },
];

export function ScrollStory() {
  return (
    <section
      id="story"
      className="w-full overflow-hidden border-t border-[#24262A] bg-[#070708]"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-8 sm:py-28">
        {/* HEADER */}

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="w-full max-w-2xl"
        >
          <p className="mb-5 text-[9px] font-medium uppercase tracking-[0.22em] text-[#777B84] sm:mb-6 sm:text-[10px]">
            How it works
          </p>

          <h2 className="font-space text-[36px] font-medium leading-[1.03] tracking-[-0.045em] text-[#F1F1F2] sm:text-[50px]">
            From payday
            <br />
            to progress.
          </h2>

          <p className="mt-6 w-full max-w-[500px] text-[12px] leading-[1.7] text-[#A7ABB4] sm:mt-7 sm:text-sm">
            A month of money, made easier to understand. Aurora turns the
            movement of your money into a simple visual story.
          </p>
        </motion.div>

        {/* STORY */}

        <div className="mt-14 w-full sm:mt-20">
          {steps.map((step, index) => (
            <StoryStep
              key={step.number}
              step={step}
              index={index}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================= */
/* STORY STEP */
/* ================================================= */

function StoryStep({
  step,
  index,
  isLast,
}: {
  step: (typeof steps)[number];
  index: number;
  isLast: boolean;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="relative grid min-w-0 gap-8 pb-14 sm:gap-10 sm:pb-20 lg:grid-cols-[220px_1fr]"
    >
      {/* CONTINUOUS TIMELINE LINE */}

      {!isLast && (
        <motion.div
          initial={{
            scaleY: 0,
            opacity: 0,
          }}
          whileInView={{
            scaleY: 1,
            opacity: 1,
          }}
          viewport={viewportOnce}
          transition={{
            duration: 0.9,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            transformOrigin: "top",
          }}
          className="
            absolute
            left-[17px]
            top-[92px]
            bottom-0
            z-0
            w-px
            bg-[#292B30]
            sm:top-[100px]
            lg:left-[17px]
          "
        />
      )}

      {/* LEFT SIDE */}

      <motion.div
        variants={fadeUp}
        transition={{
          duration: 0.7,
          delay: 0.05,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative z-10 min-w-0"
      >
        {/* TITLE ABOVE CIRCLE */}

        <div className="mb-4 sm:mb-5">
          <p className="text-[8px] uppercase tracking-[0.14em] text-[#777B84]">
            Step {step.number}
          </p>

          <motion.h3
            initial={{
              opacity: 0,
              x: -12,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={viewportOnce}
            transition={{
              duration: 0.5,
              delay: 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-2 font-space text-[21px] font-medium leading-none text-[#F1F1F2] sm:text-[22px]"
          >
            {step.title}
          </motion.h3>
        </div>

        {/* CIRCLE */}

        <motion.div
          initial={{
            scale: 0.6,
            opacity: 0,
          }}
          whileInView={{
            scale: 1,
            opacity: 1,
          }}
          viewport={viewportOnce}
          transition={{
            type: "spring",
            stiffness: 180,
            damping: 16,
            delay: 0.18,
          }}
          whileHover={{
            scale: 1.08,
          }}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#34373D] bg-[#0F1012]"
        >
          <span className="font-space text-[9px] text-[#A7ABB4]">
            {step.number}
          </span>
        </motion.div>
      </motion.div>

      {/* RIGHT CONTENT */}

      <motion.div
        variants={fadeUp}
        transition={{
          duration: 0.75,
          delay: 0.12,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative z-10 min-w-0"
      >
        <motion.p
          initial={{
            opacity: 0,
            y: 10,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={viewportOnce}
          transition={{
            duration: 0.5,
            delay: 0.2,
          }}
          className="w-full max-w-[470px] text-[11px] leading-6 text-[#777B84]"
        >
          {step.description}
        </motion.p>

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
            scale: 0.985,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          viewport={viewportOnce}
          transition={{
            duration: 0.7,
            delay: 0.25,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-6 w-full min-w-0 sm:mt-8"
        >
          {index === 0 && <PaydayVisual />}
          {index === 1 && <SplitVisual />}
          {index === 2 && <LeaksVisual />}
          {index === 3 && <GrowthVisual />}
          {index === 4 && <FreedomVisual />}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/* ================================================= */
/* PAYDAY */
/* ================================================= */

function PaydayVisual() {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={springTransition}
      className="w-full min-w-0 rounded-[16px] border border-[#292B30] bg-[#17181B] p-4 sm:rounded-[18px] sm:p-8"
    >
      <div className="flex min-w-0 items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[8px] text-[#777B84]">Monthly income</p>

          <p className="mt-2 truncate font-space text-[26px] tracking-[-0.03em] text-[#F1F1F2] sm:text-[30px]">
            ₹80,000
          </p>
        </div>

        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[9px] border border-[#292B30] bg-[#0F1012] sm:h-10 sm:w-10">
          <Wallet
            size={17}
            strokeWidth={1.5}
            className="text-[#A7ABB4]"
          />
        </div>
      </div>

      <div className="mt-6 rounded-[11px] border border-[#292B30] bg-[#0F1012] p-4 sm:mt-8 sm:rounded-[12px] sm:p-5">
        <div className="flex min-w-0 items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-[#1B1D21]">
              <ArrowDown
                size={13}
                strokeWidth={1.5}
                className="text-[#A7ABB4]"
              />
            </div>

            <div className="min-w-0">
              <p className="truncate text-[9px] text-[#F1F1F2]">
                Salary received
              </p>

              <p className="mt-1 text-[7px] text-[#777B84]">
                1 October
              </p>
            </div>
          </div>

          <p className="shrink-0 font-space text-[10px] text-[#F1F1F2] sm:text-[11px]">
            +₹80,000
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 sm:mt-5">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={viewportOnce}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
          }}
          className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#52B788]"
        />

        <span className="text-[8px] text-[#777B84]">
          A clean starting point for the month.
        </span>
      </div>
    </motion.div>
  );
}

/* ================================================= */
/* SPLIT */
/* ================================================= */

function SplitVisual() {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={springTransition}
      className="w-full min-w-0 rounded-[16px] border border-[#292B30] bg-[#17181B] p-4 sm:rounded-[18px] sm:p-8"
    >
      <div className="flex items-center justify-between gap-4">
        <p className="min-w-0 text-[9px] text-[#777B84]">
          Where your money goes
        </p>

        <p className="shrink-0 text-[8px] text-[#777B84]">
          ₹80,000
        </p>
      </div>

      <div className="mt-6 sm:mt-7">
        <div className="h-3 overflow-hidden rounded-full bg-[#25272C]">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={viewportOnce}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex h-full"
          >
            <div
              className="h-full"
              style={{
                width: "56%",
                backgroundColor: "#7C83FF",
              }}
            />

            <div
              className="h-full"
              style={{
                width: "22%",
                backgroundColor: "#666CC7",
              }}
            />

            <div
              className="h-full"
              style={{
                width: "22%",
                backgroundColor: "#52B788",
              }}
            />
          </motion.div>
        </div>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mt-5 grid grid-cols-3 gap-2 sm:mt-6 sm:gap-3"
      >
        <StoryAllocation
          label="Needs"
          value="56%"
          color="#7C83FF"
        />

        <StoryAllocation
          label="Wants"
          value="22%"
          color="#666CC7"
        />

        <StoryAllocation
          label="Savings"
          value="22%"
          color="#52B788"
        />
      </motion.div>
    </motion.div>
  );
}

/* ================================================= */
/* LEAKS */
/* ================================================= */

function LeaksVisual() {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={springTransition}
      className="w-full min-w-0 rounded-[16px] border border-[#292B30] bg-[#17181B] p-4 sm:rounded-[18px] sm:p-8"
    >
      <div className="flex min-w-0 items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[8px] text-[#777B84]">
            Recurring spending
          </p>

          <p className="mt-1 truncate font-space text-[17px] text-[#F1F1F2] sm:text-[19px]">
            ₹1,067 / month
          </p>
        </div>

        <CreditCard
          size={17}
          strokeWidth={1.5}
          className="shrink-0 text-[#777B84]"
        />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mt-5 space-y-2 sm:mt-6"
      >
        <LeakRow
          name="Netflix"
          amount="₹649"
          warning
        />

        <LeakRow
          name="Spotify"
          amount="₹119"
        />

        <LeakRow
          name="Prime"
          amount="₹299"
        />
      </motion.div>

      <motion.div
        initial={{
          opacity: 0,
          y: 10,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={viewportOnce}
        transition={{
          duration: 0.5,
          delay: 0.35,
        }}
        className="mt-4 rounded-[10px] border border-[#493A3A] bg-[#151315] p-3 sm:mt-5 sm:p-4"
      >
        <div className="flex items-start gap-3">
          <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C87575]" />

          <div className="min-w-0">
            <p className="text-[8px] text-[#F1F1F2]">
              One subscription stands out.
            </p>

            <p className="mt-1 text-[7px] leading-4 text-[#777B84]">
              Netflix was used twice this month. That's worth a second look.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ================================================= */
/* GROWTH */
/* ================================================= */

function GrowthVisual() {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={springTransition}
      className="w-full min-w-0 rounded-[16px] border border-[#292B30] bg-[#17181B] p-4 sm:rounded-[18px] sm:p-8"
    >
      <div className="flex min-w-0 items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[8px] text-[#777B84]">
            Savings progress
          </p>

          <p className="mt-1 font-space text-[20px] text-[#52B788] sm:text-[22px]">
            ₹47,600
          </p>
        </div>

        <PiggyBank
          size={18}
          strokeWidth={1.5}
          className="shrink-0 text-[#777B84]"
        />
      </div>

      <div className="mt-6 sm:mt-7">
        <div className="flex items-center justify-between gap-4">
          <p className="text-[8px] text-[#A7ABB4]">
            New laptop
          </p>

          <p className="text-[8px] text-[#777B84]">
            48%
          </p>
        </div>

        <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#292B30]">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "48%" }}
            viewport={viewportOnce}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="h-full rounded-full bg-[#52B788]"
          />
        </div>

        <div className="mt-2 flex justify-between text-[7px] text-[#777B84]">
          <span>₹72,000</span>
          <span>₹1,50,000</span>
        </div>
      </div>

      <motion.div
        initial={{
          opacity: 0,
          y: 8,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={viewportOnce}
        transition={{
          delay: 0.45,
          duration: 0.4,
        }}
        className="mt-6 flex items-center gap-2 sm:mt-7"
      >
        <TrendingUp
          size={13}
          strokeWidth={1.5}
          className="shrink-0 text-[#52B788]"
        />

        <span className="text-[8px] text-[#777B84]">
          Your goal is getting closer.
        </span>
      </motion.div>
    </motion.div>
  );
}

/* ================================================= */
/* FREEDOM */
/* ================================================= */

function FreedomVisual() {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={springTransition}
      className="w-full min-w-0 rounded-[16px] border border-[#292B30] bg-[#17181B] p-4 sm:rounded-[18px] sm:p-8"
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid gap-2 sm:grid-cols-3 sm:gap-3"
      >
        <FreedomMetric
          label="Balance"
          value="₹80,000"
        />

        <FreedomMetric
          label="Savings"
          value="₹47,600"
          green
        />

        <FreedomMetric
          label="Goal progress"
          value="48%"
          purple
        />
      </motion.div>

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.98,
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
        }}
        viewport={viewportOnce}
        transition={{
          duration: 0.5,
          delay: 0.3,
        }}
        className="mt-4 rounded-[11px] border border-[#292B30] bg-[#0F1012] p-4 sm:mt-5 sm:rounded-[12px] sm:p-5"
      >
        <div className="flex items-center gap-3">
          <motion.div
            initial={{
              scale: 0,
            }}
            whileInView={{
              scale: 1,
            }}
            viewport={viewportOnce}
            transition={{
              type: "spring",
              stiffness: 180,
              damping: 14,
              delay: 0.45,
            }}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#355342] bg-[#17241E]"
          >
            <Check
              size={14}
              strokeWidth={1.7}
              className="text-[#52B788]"
            />
          </motion.div>

          <div className="min-w-0">
            <p className="text-[9px] text-[#F1F1F2]">
              You're in control.
            </p>

            <p className="mt-1 text-[7px] text-[#777B84]">
              The month makes sense now.
            </p>
          </div>
        </div>
      </motion.div>

      <div className="mt-4 flex items-center justify-between gap-4 sm:mt-5">
        <span className="text-[8px] text-[#777B84]">
          Next month starts here
        </span>

        <motion.div
          whileHover={{
            x: 4,
          }}
          transition={springTransition}
          className="shrink-0"
        >
          <ArrowRight
            size={14}
            strokeWidth={1.5}
            className="text-[#777B84]"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ================================================= */
/* ALLOCATION */
/* ================================================= */

function StoryAllocation({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{
        y: -2,
      }}
      transition={springTransition}
      className="min-w-0 rounded-[9px] border border-[#292B30] bg-[#0F1012] p-3 sm:rounded-[10px] sm:p-4"
    >
      <div className="flex min-w-0 items-center gap-1.5 sm:gap-2">
        <span
          className="h-1.5 w-1.5 shrink-0 rounded-full"
          style={{
            backgroundColor: color,
          }}
        />

        <span className="truncate text-[7px] text-[#777B84] sm:text-[8px]">
          {label}
        </span>
      </div>

      <p className="mt-2 font-space text-[13px] text-[#F1F1F2] sm:text-[14px]">
        {value}
      </p>
    </motion.div>
  );
}

/* ================================================= */
/* LEAK ROW */
/* ================================================= */

function LeakRow({
  name,
  amount,
  warning = false,
}: {
  name: string;
  amount: string;
  warning?: boolean;
}) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{
        x: 3,
      }}
      transition={springTransition}
      className="flex min-w-0 items-center justify-between gap-3 rounded-[9px] border border-[#292B30] bg-[#0F1012] px-3 py-2.5 sm:rounded-[10px] sm:px-4 sm:py-3"
    >
      <div className="flex min-w-0 items-center gap-3">
        <div
          className={`h-1.5 w-1.5 shrink-0 rounded-full ${
            warning ? "bg-[#C87575]" : "bg-[#555B68]"
          }`}
        />

        <span className="truncate text-[8px] text-[#A7ABB4]">
          {name}
        </span>
      </div>

      <span className="shrink-0 font-space text-[9px] text-[#F1F1F2]">
        {amount}
      </span>
    </motion.div>
  );
}

/* ================================================= */
/* FREEDOM METRIC */
/* ================================================= */

function FreedomMetric({
  label,
  value,
  green = false,
  purple = false,
}: {
  label: string;
  value: string;
  green?: boolean;
  purple?: boolean;
}) {
  let valueClass = "text-[#F1F1F2]";

  if (green) {
    valueClass = "text-[#52B788]";
  }

  if (purple) {
    valueClass = "text-[#7C83FF]";
  }

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{
        y: -2,
      }}
      transition={springTransition}
      className="min-w-0 rounded-[10px] border border-[#292B30] bg-[#0F1012] p-3 sm:p-4"
    >
      <p className="text-[8px] text-[#777B84]">
        {label}
      </p>

      <p
        className={`mt-2 truncate font-space text-[16px] ${valueClass} sm:text-[17px]`}
      >
        {value}
      </p>
    </motion.div>
  );
}