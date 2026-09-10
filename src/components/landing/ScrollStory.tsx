import {
  ArrowDown,
  ArrowRight,
  Check,
  CreditCard,
  PiggyBank,
  TrendingUp,
  Wallet,
} from "lucide-react";

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
      className="border-t border-[#24262A] bg-[#070708]"
    >
      <div className="mx-auto max-w-6xl px-8 py-28">

        {/* HEADER */}

        <div className="max-w-2xl">

          <p className="mb-6 text-[10px] font-medium uppercase tracking-[0.22em] text-[#777B84]">
            How it works
          </p>

          <h2 className="font-space text-[42px] font-medium leading-[1.03] tracking-[-0.045em] text-[#F1F1F2] sm:text-[50px]">
            From payday
            <br />
            to progress.
          </h2>

          <p className="mt-7 max-w-[500px] text-[13px] leading-[1.7] text-[#A7ABB4] sm:text-sm">
            A month of money, made easier to understand.
            Aurora turns the movement of your money into a
            simple visual story.
          </p>

        </div>

        {/* STORY */}

        <div className="mt-20">

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
    <div className="relative grid gap-10 pb-20 lg:grid-cols-[220px_1fr]">

      {/* ================================================= */}
      {/* CONTINUOUS TIMELINE LINE */}
      {/* ================================================= */}

      {!isLast && (
        <div
          className="
            absolute
            left-[17px]
            top-[100px]
            bottom-0
            z-0
            w-px
            bg-[#292B30]
          "
        />
      )}

      {/* ================================================= */}
      {/* LEFT SIDE */}
      {/* ================================================= */}

      <div className="relative z-10">

        {/* TITLE ABOVE CIRCLE */}

        <div className="mb-5">

          <p className="text-[8px] uppercase tracking-[0.14em] text-[#777B84]">
            Step {step.number}
          </p>

          <h3 className="mt-2 font-space text-[22px] font-medium leading-none text-[#F1F1F2]">
            {step.title}
          </h3>

        </div>

        {/* CIRCLE */}

        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#34373D] bg-[#0F1012]">

          <span className="font-space text-[9px] text-[#A7ABB4]">
            {step.number}
          </span>

        </div>

      </div>

      {/* ================================================= */}
      {/* RIGHT CONTENT */}
      {/* ================================================= */}

      <div className="relative z-10">

        <p className="max-w-[470px] text-[11px] leading-6 text-[#777B84]">
          {step.description}
        </p>

        <div className="mt-8">

          {index === 0 && <PaydayVisual />}

          {index === 1 && <SplitVisual />}

          {index === 2 && <LeaksVisual />}

          {index === 3 && <GrowthVisual />}

          {index === 4 && <FreedomVisual />}

        </div>

      </div>

    </div>
  );
}

/* ================================================= */
/* PAYDAY */
/* ================================================= */

function PaydayVisual() {
  return (
    <div className="rounded-[18px] border border-[#292B30] bg-[#17181B] p-6 sm:p-8">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-[8px] text-[#777B84]">
            Monthly income
          </p>

          <p className="mt-2 font-space text-[30px] tracking-[-0.03em] text-[#F1F1F2]">
            ₹80,000
          </p>

        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-[#292B30] bg-[#0F1012]">

          <Wallet
            size={17}
            strokeWidth={1.5}
            className="text-[#A7ABB4]"
          />

        </div>

      </div>

      <div className="mt-8 rounded-[12px] border border-[#292B30] bg-[#0F1012] p-5">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-[#1B1D21]">

              <ArrowDown
                size={13}
                strokeWidth={1.5}
                className="text-[#A7ABB4]"
              />

            </div>

            <div>

              <p className="text-[9px] text-[#F1F1F2]">
                Salary received
              </p>

              <p className="mt-1 text-[7px] text-[#777B84]">
                1 October
              </p>

            </div>

          </div>

          <p className="font-space text-[11px] text-[#F1F1F2]">
            +₹80,000
          </p>

        </div>

      </div>

      <div className="mt-5 flex items-center gap-2">

        <div className="h-1.5 w-1.5 rounded-full bg-[#52B788]" />

        <span className="text-[8px] text-[#777B84]">
          A clean starting point for the month.
        </span>

      </div>

    </div>
  );
}

/* ================================================= */
/* SPLIT */
/* ================================================= */

function SplitVisual() {
  return (
    <div className="rounded-[18px] border border-[#292B30] bg-[#17181B] p-6 sm:p-8">

      <div className="flex items-center justify-between">

        <p className="text-[9px] text-[#777B84]">
          Where your money goes
        </p>

        <p className="text-[8px] text-[#777B84]">
          ₹80,000
        </p>

      </div>

      <div className="mt-7">

        <div className="h-3 overflow-hidden rounded-full bg-[#25272C]">

          <div className="flex h-full">

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

          </div>

        </div>

      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">

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

      </div>

    </div>
  );
}

/* ================================================= */
/* LEAKS */
/* ================================================= */

function LeaksVisual() {
  return (
    <div className="rounded-[18px] border border-[#292B30] bg-[#17181B] p-6 sm:p-8">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-[8px] text-[#777B84]">
            Recurring spending
          </p>

          <p className="mt-1 font-space text-[19px] text-[#F1F1F2]">
            ₹1,067 / month
          </p>

        </div>

        <CreditCard
          size={17}
          strokeWidth={1.5}
          className="text-[#777B84]"
        />

      </div>

      <div className="mt-6 space-y-2">

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

      </div>

      <div className="mt-5 rounded-[10px] border border-[#493A3A] bg-[#151315] p-4">

        <div className="flex items-start gap-3">

          <div className="mt-1 h-1.5 w-1.5 rounded-full bg-[#C87575]" />

          <div>

            <p className="text-[8px] text-[#F1F1F2]">
              One subscription stands out.
            </p>

            <p className="mt-1 text-[7px] leading-4 text-[#777B84]">
              Netflix was used twice this month.
              That's worth a second look.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

/* ================================================= */
/* GROWTH */
/* ================================================= */

function GrowthVisual() {
  return (
    <div className="rounded-[18px] border border-[#292B30] bg-[#17181B] p-6 sm:p-8">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-[8px] text-[#777B84]">
            Savings progress
          </p>

          <p className="mt-1 font-space text-[22px] text-[#52B788]">
            ₹47,600
          </p>

        </div>

        <PiggyBank
          size={18}
          strokeWidth={1.5}
          className="text-[#777B84]"
        />

      </div>

      <div className="mt-7">

        <div className="flex items-center justify-between">

          <p className="text-[8px] text-[#A7ABB4]">
            New laptop
          </p>

          <p className="text-[8px] text-[#777B84]">
            48%
          </p>

        </div>

        <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#292B30]">

          <div
            className="h-full rounded-full bg-[#52B788]"
            style={{
              width: "48%",
            }}
          />

        </div>

        <div className="mt-2 flex justify-between text-[7px] text-[#777B84]">

          <span>₹72,000</span>

          <span>₹1,50,000</span>

        </div>

      </div>

      <div className="mt-7 flex items-center gap-2">

        <TrendingUp
          size={13}
          strokeWidth={1.5}
          className="text-[#52B788]"
        />

        <span className="text-[8px] text-[#777B84]">
          Your goal is getting closer.
        </span>

      </div>

    </div>
  );
}

/* ================================================= */
/* FREEDOM */
/* ================================================= */

function FreedomVisual() {
  return (
    <div className="rounded-[18px] border border-[#292B30] bg-[#17181B] p-6 sm:p-8">

      <div className="grid gap-3 sm:grid-cols-3">

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

      </div>

      <div className="mt-5 rounded-[12px] border border-[#292B30] bg-[#0F1012] p-5">

        <div className="flex items-center gap-3">

          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#355342] bg-[#17241E]">

            <Check
              size={14}
              strokeWidth={1.7}
              className="text-[#52B788]"
            />

          </div>

          <div>

            <p className="text-[9px] text-[#F1F1F2]">
              You're in control.
            </p>

            <p className="mt-1 text-[7px] text-[#777B84]">
              The month makes sense now.
            </p>

          </div>

        </div>

      </div>

      <div className="mt-5 flex items-center justify-between">

        <span className="text-[8px] text-[#777B84]">
          Next month starts here
        </span>

        <ArrowRight
          size={14}
          strokeWidth={1.5}
          className="text-[#777B84]"
        />

      </div>

    </div>
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
    <div className="rounded-[10px] border border-[#292B30] bg-[#0F1012] p-4">

      <div className="flex items-center gap-2">

        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{
            backgroundColor: color,
          }}
        />

        <span className="text-[8px] text-[#777B84]">
          {label}
        </span>

      </div>

      <p className="mt-2 font-space text-[14px] text-[#F1F1F2]">
        {value}
      </p>

    </div>
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
    <div className="flex items-center justify-between rounded-[10px] border border-[#292B30] bg-[#0F1012] px-4 py-3">

      <div className="flex items-center gap-3">

        <div
          className={`h-1.5 w-1.5 rounded-full ${
            warning
              ? "bg-[#C87575]"
              : "bg-[#555B68]"
          }`}
        />

        <span className="text-[8px] text-[#A7ABB4]">
          {name}
        </span>

      </div>

      <span className="font-space text-[9px] text-[#F1F1F2]">
        {amount}
      </span>

    </div>
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
    <div className="rounded-[12px] border border-[#292B30] bg-[#0F1012] p-4">

      <p className="text-[8px] text-[#777B84]">
        {label}
      </p>

      <p
        className={`mt-2 font-space text-[17px] ${valueClass}`}
      >
        {value}
      </p>

    </div>
  );
}