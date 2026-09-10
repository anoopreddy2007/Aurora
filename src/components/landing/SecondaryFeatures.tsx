import {
  BarChart3,
  Bell,
  Check,
  CircleDollarSign,
  PiggyBank,
  Repeat,
  Tags,
  TrendingUp,
} from "lucide-react";

const features = [
  {
    title: "Auto-categorize",
    description:
      "Your spending falls into clear categories automatically, so you spend less time sorting and more time understanding.",
    icon: Tags,
    visual: "categories",
  },
  {
    title: "Goal jars",
    description:
      "Give your savings a destination. Watch each contribution move you closer to something you actually want.",
    icon: PiggyBank,
    visual: "goal",
  },
  {
    title: "Weekly insights",
    description:
      "Get a simple view of what changed this week and where your spending is heading.",
    icon: TrendingUp,
    visual: "insights",
  },
  {
    title: "Subscription awareness",
    description:
      "Recurring payments stay visible so forgotten subscriptions don't quietly drain your month.",
    icon: Repeat,
    visual: "subscriptions",
  },
  {
    title: "Spending patterns",
    description:
      "See the shape of your spending across the month and spot patterns before they become habits.",
    icon: BarChart3,
    visual: "patterns",
  },
  {
    title: "Savings visualization",
    description:
      "Turn an abstract savings number into visible progress you can actually feel.",
    icon: CircleDollarSign,
    visual: "savings",
  },
];

export function SecondaryFeatures() {
  return (
    <section
      id="features"
      className="border-t border-[#24262A] bg-[#070708]"
    >
      <div className="mx-auto max-w-6xl px-8 py-28">

        {/* HEADER */}

        <div className="max-w-2xl">

          <p className="mb-6 text-[10px] font-medium uppercase tracking-[0.22em] text-[#777B84]">
            More clarity
          </p>

          <h2 className="font-space text-[42px] font-medium leading-[1.03] tracking-[-0.045em] text-[#F1F1F2] sm:text-[50px]">
            The little things
            <br />
            that make money easier.
          </h2>

          <p className="mt-7 max-w-[500px] text-[13px] leading-[1.7] text-[#A7ABB4] sm:text-sm">
            Aurora handles the details quietly, giving you more
            context without making your finances feel complicated.
          </p>

        </div>

        {/* FEATURE GRID */}

        <div className="mt-20 grid gap-4 md:grid-cols-2 lg:grid-cols-3">

          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              {...feature}
            />
          ))}

        </div>

      </div>
    </section>
  );
}

/* ================================================= */
/* FEATURE CARD */
/* ================================================= */

function FeatureCard({
  title,
  description,
  icon: Icon,
  visual,
}: {
  title: string;
  description: string;
  icon: typeof Tags;
  visual: string;
}) {
  return (
    <article className="group flex min-h-[360px] flex-col rounded-[18px] border border-[#292B30] bg-[#111214] p-6 transition-colors duration-300 hover:border-[#3A3D44]">

      {/* ICON */}

      <div className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-[#292B30] bg-[#0D0E10]">

        <Icon
          size={16}
          strokeWidth={1.5}
          className="text-[#A7ABB4]"
        />

      </div>

      {/* TEXT */}

      <div className="mt-6">

        <h3 className="font-space text-[20px] font-medium tracking-[-0.02em] text-[#F1F1F2]">
          {title}
        </h3>

        <p className="mt-3 text-[10px] leading-5 text-[#777B84]">
          {description}
        </p>

      </div>

      {/* VISUAL */}

      <div className="mt-auto pt-8">

        {visual === "categories" && <CategoriesVisual />}

        {visual === "goal" && <GoalVisual />}

        {visual === "insights" && <InsightsVisual />}

        {visual === "subscriptions" && <SubscriptionsVisual />}

        {visual === "patterns" && <PatternsVisual />}

        {visual === "savings" && <SavingsVisual />}

      </div>

    </article>
  );
}

/* ================================================= */
/* AUTO CATEGORIES */
/* ================================================= */

function CategoriesVisual() {
  return (
    <div className="space-y-2">

      <MiniCategory
        name="Rent"
        amount="₹18,000"
        percentage="56%"
      />

      <MiniCategory
        name="Food"
        amount="₹7,200"
        percentage="22%"
      />

      <MiniCategory
        name="Fun"
        amount="₹4,200"
        percentage="13%"
      />

      <MiniCategory
        name="Other"
        amount="₹2,600"
        percentage="8%"
      />

    </div>
  );
}

/* ================================================= */
/* GOAL */
/* ================================================= */

function GoalVisual() {
  return (
    <div className="rounded-[12px] border border-[#292B30] bg-[#0D0E10] p-4">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-[7px] text-[#777B84]">
            Saving for
          </p>

          <p className="mt-1 font-space text-[12px] text-[#F1F1F2]">
            New laptop
          </p>

        </div>

        <p className="font-space text-[10px] text-[#8D83B8]">
          48%
        </p>

      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#292B30]">

        <div
          className="h-full rounded-full bg-[#8D83B8]"
          style={{
            width: "48%",
          }}
        />

      </div>

      <div className="mt-2 flex justify-between text-[7px] text-[#777B84]">

        <span>₹72,000 saved</span>

        <span>₹1,50,000</span>

      </div>

    </div>
  );
}

/* ================================================= */
/* INSIGHTS */
/* ================================================= */

function InsightsVisual() {
  return (
    <div className="rounded-[12px] border border-[#292B30] bg-[#0D0E10] p-4">

      <div className="flex items-start gap-3">

        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] bg-[#17191C]">

          <TrendingUp
            size={13}
            strokeWidth={1.5}
            className="text-[#52B788]"
          />

        </div>

        <div>

          <p className="text-[8px] text-[#F1F1F2]">
            Your spending is improving.
          </p>

          <p className="mt-1 text-[7px] leading-4 text-[#777B84]">
            Food spending is 12% lower than
            your previous week.
          </p>

        </div>

      </div>

      <div className="mt-4 flex items-end gap-1">

        <InsightBar height="35%" />
        <InsightBar height="52%" />
        <InsightBar height="43%" />
        <InsightBar height="68%" />
        <InsightBar height="57%" />
        <InsightBar height="78%" />

      </div>

    </div>
  );
}

function InsightBar({
  height,
}: {
  height: string;
}) {
  return (
    <div className="flex h-12 flex-1 items-end">

      <div
        className="w-full rounded-t-[3px] bg-[#34383F]"
        style={{
          height,
        }}
      />

    </div>
  );
}

/* ================================================= */
/* SUBSCRIPTIONS */
/* ================================================= */

function SubscriptionsVisual() {
  return (
    <div className="space-y-2">

      <SubscriptionRow
        name="Netflix"
        amount="₹649"
        warning
      />

      <SubscriptionRow
        name="Spotify"
        amount="₹119"
      />

      <SubscriptionRow
        name="Prime"
        amount="₹299"
      />

    </div>
  );
}

function SubscriptionRow({
  name,
  amount,
  warning = false,
}: {
  name: string;
  amount: string;
  warning?: boolean;
}) {
  return (
    <div className="flex items-center justify-between rounded-[10px] border border-[#292B30] bg-[#0D0E10] px-3 py-2.5">

      <div className="flex items-center gap-2">

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

      <span className="font-space text-[8px] text-[#F1F1F2]">
        {amount}
      </span>

    </div>
  );
}

/* ================================================= */
/* SPENDING PATTERNS */
/* ================================================= */

function PatternsVisual() {
  return (
    <div className="rounded-[12px] border border-[#292B30] bg-[#0D0E10] p-4">

      <div className="flex items-center justify-between">

        <p className="text-[7px] text-[#777B84]">
          October spending
        </p>

        <p className="text-[7px] text-[#777B84]">
          ₹32K
        </p>

      </div>

      <div className="mt-5 flex h-20 items-end gap-1">

        <PatternBar height="25%" />
        <PatternBar height="42%" />
        <PatternBar height="32%" />
        <PatternBar height="55%" />
        <PatternBar height="72%" />
        <PatternBar height="48%" />
        <PatternBar height="65%" />
        <PatternBar height="38%" />
        <PatternBar height="76%" />
        <PatternBar height="52%" />
        <PatternBar height="62%" />
        <PatternBar height="44%" />

      </div>

      <div className="mt-3 flex justify-between text-[6px] text-[#555B68]">

        <span>1 Oct</span>

        <span>31 Oct</span>

      </div>

    </div>
  );
}

function PatternBar({
  height,
}: {
  height: string;
}) {
  return (
    <div className="flex h-full flex-1 items-end">

      <div
        className="w-full rounded-t-[2px] bg-[#454952]"
        style={{
          height,
        }}
      />

    </div>
  );
}

/* ================================================= */
/* SAVINGS */
/* ================================================= */

function SavingsVisual() {
  return (
    <div className="rounded-[12px] border border-[#292B30] bg-[#0D0E10] p-4">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-[7px] text-[#777B84]">
            Total savings
          </p>

          <p className="mt-1 font-space text-[18px] text-[#52B788]">
            ₹47,600
          </p>

        </div>

        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#31503F] bg-[#162019]">

          <Check
            size={13}
            strokeWidth={1.7}
            className="text-[#52B788]"
          />

        </div>

      </div>

      <div className="mt-5">

        <div className="flex items-end gap-1">

          <SavingsBar height="28%" />
          <SavingsBar height="39%" />
          <SavingsBar height="46%" />
          <SavingsBar height="57%" />
          <SavingsBar height="65%" />
          <SavingsBar height="76%" />
          <SavingsBar height="88%" />

        </div>

      </div>

    </div>
  );
}

function SavingsBar({
  height,
}: {
  height: string;
}) {
  return (
    <div className="flex h-14 flex-1 items-end">

      <div
        className="w-full rounded-t-[3px] bg-[#52B788]"
        style={{
          height,
        }}
      />

    </div>
  );
}

/* ================================================= */
/* CATEGORY ROW */
/* ================================================= */

function MiniCategory({
  name,
  amount,
  percentage,
}: {
  name: string;
  amount: string;
  percentage: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-[9px] border border-[#292B30] bg-[#0D0E10] px-3 py-2.5">

      <div className="flex items-center gap-2">

        <div className="h-1.5 w-1.5 rounded-full bg-[#7C83FF]" />

        <span className="text-[8px] text-[#A7ABB4]">
          {name}
        </span>

      </div>

      <div className="flex items-center gap-3">

        <span className="text-[7px] text-[#555B68]">
          {percentage}
        </span>

        <span className="font-space text-[8px] text-[#F1F1F2]">
          {amount}
        </span>

      </div>

    </div>
  );
}