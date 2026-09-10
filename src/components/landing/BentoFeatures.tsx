import {
  ArrowUpRight,
  Bell,
  Check,
  CircleDollarSign,
  CreditCard,
  TrendingUp,
  Utensils,
} from "lucide-react";

export function BentoFeatures() {
  return (
    <section
      id="features"
      className="border-t border-[#24262A] bg-[#070708]"
    >
      <div className="mx-auto max-w-6xl px-8 py-28">

        {/* Section heading */}

        <div className="max-w-2xl">
          <p className="mb-6 text-[10px] font-medium uppercase tracking-[0.22em] text-[#777B84]">
            Everything in one place
          </p>

          <h2 className="font-space text-[42px] font-medium leading-[1.03] tracking-[-0.045em] text-[#F1F1F2] sm:text-[50px]">
            Small details.
            <br />
            Better decisions.
          </h2>

          <p className="mt-7 max-w-[500px] text-[13px] leading-[1.7] text-[#A7ABB4] sm:text-sm">
            Aurora turns the little things you usually overlook
            into information you can actually use.
          </p>
        </div>

        {/* Bento grid */}

        <div className="mt-16 grid gap-3 lg:grid-cols-3">

          {/* ================================================= */}
          {/* SUBSCRIPTION TRACKER — LARGE */}
          {/* ================================================= */}

          <div className="group relative overflow-hidden rounded-[18px] border border-[#292B30] bg-[#17181B] p-6 lg:col-span-2">

            <div className="relative z-10">

              <div className="flex items-start justify-between">

                <div>
                  <p className="text-[9px] uppercase tracking-[0.12em] text-[#777B84]">
                    Subscriptions
                  </p>

                  <h3 className="mt-2 font-space text-[20px] text-[#F1F1F2]">
                    Know what you're paying for.
                  </h3>
                </div>

                <CreditCard
                  size={17}
                  strokeWidth={1.5}
                  className="text-[#777B84]"
                />

              </div>

              <p className="mt-3 max-w-[380px] text-[9px] leading-5 text-[#777B84]">
                Keep recurring expenses visible and spot
                subscriptions you don't really use.
              </p>

              {/* Subscription chips */}

              <div className="mt-8 grid gap-2 sm:grid-cols-3">

                <Subscription
                  name="Netflix"
                  amount="₹649"
                  warning
                />

                <Subscription
                  name="Spotify"
                  amount="₹119"
                />

                <Subscription
                  name="Prime"
                  amount="₹299"
                />

              </div>

              {/* Total */}

              <div className="mt-5 flex items-center justify-between border-t border-[#292B30] pt-4">

                <span className="text-[8px] text-[#777B84]">
                  Monthly subscriptions
                </span>

                <span className="font-space text-[12px] text-[#F1F1F2]">
                  ₹1,067
                </span>

              </div>

            </div>

          </div>

          {/* ================================================= */}
          {/* SAVINGS GOALS */}
          {/* ================================================= */}

          <div className="relative overflow-hidden rounded-[18px] border border-[#292B30] bg-[#17181B] p-6">

            <div className="flex items-start justify-between">

              <div>
                <p className="text-[9px] uppercase tracking-[0.12em] text-[#777B84]">
                  Savings goals
                </p>

                <h3 className="mt-2 font-space text-[19px] text-[#F1F1F2]">
                  Give your savings somewhere to go.
                </h3>
              </div>

              <CircleDollarSign
                size={17}
                strokeWidth={1.5}
                className="text-[#777B84]"
              />

            </div>

            <div className="mt-8 space-y-5">

              <Goal
                name="Goa trip"
                amount="₹18,000"
                target="₹30,000"
                progress={60}
              />

              <Goal
                name="New laptop"
                amount="₹72,000"
                target="₹1,50,000"
                progress={48}
              />

              <Goal
                name="Emergency fund"
                amount="₹24,000"
                target="₹50,000"
                progress={48}
              />

            </div>

          </div>

          {/* ================================================= */}
          {/* AUTO CATEGORIZE */}
          {/* ================================================= */}

          <div className="relative overflow-hidden rounded-[18px] border border-[#292B30] bg-[#17181B] p-6">

            <div className="flex items-start justify-between">

              <div>
                <p className="text-[9px] uppercase tracking-[0.12em] text-[#777B84]">
                  Auto-categorize
                </p>

                <h3 className="mt-2 font-space text-[19px] text-[#F1F1F2]">
                  Less sorting. More clarity.
                </h3>
              </div>

              <Utensils
                size={17}
                strokeWidth={1.5}
                className="text-[#777B84]"
              />

            </div>

            {/* Transaction */}

            <div className="mt-8 rounded-[12px] border border-[#292B30] bg-[#0F1012] p-4">

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <div className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-[#1D2024]">
                    <Utensils
                      size={13}
                      strokeWidth={1.5}
                      className="text-[#A7ABB4]"
                    />
                  </div>

                  <div>
                    <p className="text-[9px] text-[#F1F1F2]">
                      Swiggy
                    </p>

                    <p className="mt-0.5 text-[7px] text-[#777B84]">
                      ₹420
                    </p>
                  </div>

                </div>

                <ArrowUpRight
                  size={13}
                  className="text-[#777B84]"
                />

              </div>

              {/* Category */}

              <div className="mt-4 flex items-center justify-between">

                <span className="text-[8px] text-[#777B84]">
                  Category
                </span>

                <span className="rounded-full border border-[#34373D] bg-[#1B1D21] px-2.5 py-1 text-[7px] text-[#A7ABB4]">
                  Food
                </span>

              </div>

            </div>

            <div className="mt-4 flex items-center gap-2">

              <Check
                size={12}
                className="text-[#52B788]"
              />

              <span className="text-[8px] text-[#777B84]">
                Automatically categorized
              </span>

            </div>

          </div>

          {/* ================================================= */}
          {/* WEEKLY INSIGHT */}
          {/* ================================================= */}

          <div className="relative overflow-hidden rounded-[18px] border border-[#292B30] bg-[#17181B] p-6">

            <div className="flex items-start justify-between">

              <div>
                <p className="text-[9px] uppercase tracking-[0.12em] text-[#777B84]">
                  Weekly insight
                </p>

                <h3 className="mt-2 font-space text-[19px] text-[#F1F1F2]">
                  A little context goes a long way.
                </h3>
              </div>

              <TrendingUp
                size={17}
                strokeWidth={1.5}
                className="text-[#777B84]"
              />

            </div>

            <div className="mt-8 rounded-[12px] border border-[#292B30] bg-[#0F1012] p-5">

              <p className="text-[8px] text-[#777B84]">
                This week
              </p>

              <p className="mt-3 font-space text-[24px] text-[#F1F1F2]">
                23%
              </p>

              <p className="mt-1 text-[9px] text-[#A7ABB4]">
                less spent on food
              </p>

              <div className="mt-6 flex items-end gap-1.5">

                {[35, 48, 42, 65, 52, 72, 88].map(
                  (height, index) => (
                    <div
                      key={index}
                      className="flex-1 rounded-t-[2px]"
                      style={{
                        height: `${height}px`,
                        backgroundColor:
                          index === 6
                            ? "#52B788"
                            : "#444A54",
                      }}
                    />
                  ),
                )}

              </div>

            </div>

          </div>

          {/* ================================================= */}
          {/* SPENDING ALERT */}
          {/* ================================================= */}

          <div className="relative overflow-hidden rounded-[18px] border border-[#292B30] bg-[#17181B] p-6">

            <div className="flex items-start justify-between">

              <div>
                <p className="text-[9px] uppercase tracking-[0.12em] text-[#777B84]">
                  Spending alert
                </p>

                <h3 className="mt-2 font-space text-[19px] text-[#F1F1F2]">
                  Catch overspending early.
                </h3>
              </div>

              <Bell
                size={17}
                strokeWidth={1.5}
                className="text-[#777B84]"
              />

            </div>

            <div className="mt-8 rounded-[12px] border border-[#383333] bg-[#151315] p-5">

              <div className="flex items-start gap-3">

                <div className="mt-0.5 h-2 w-2 rounded-full bg-[#D6A85F]" />

                <div>

                  <p className="text-[9px] text-[#F1F1F2]">
                    Dining out
                  </p>

                  <p className="mt-1 text-[8px] leading-4 text-[#777B84]">
                    You've used 80% of this month's
                    dining budget.
                  </p>

                </div>

              </div>

              <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-[#292B30]">

                <div
                  className="h-full rounded-full bg-[#D6A85F]"
                  style={{
                    width: "80%",
                  }}
                />

              </div>

              <div className="mt-2 flex justify-between">

                <span className="text-[7px] text-[#777B84]">
                  ₹4,000 spent
                </span>

                <span className="text-[7px] text-[#777B84]">
                  ₹5,000 budget
                </span>

              </div>

            </div>

          </div>

          {/* ================================================= */}
          {/* NET WORTH TREND — LARGE */}
          {/* ================================================= */}

          <div className="relative overflow-hidden rounded-[18px] border border-[#292B30] bg-[#17181B] p-6 lg:col-span-2">

            <div className="flex items-start justify-between">

              <div>

                <p className="text-[9px] uppercase tracking-[0.12em] text-[#777B84]">
                  Net worth
                </p>

                <h3 className="mt-2 font-space text-[20px] text-[#F1F1F2]">
                  See the direction, not just the number.
                </h3>

                <p className="mt-3 max-w-[380px] text-[9px] leading-5 text-[#777B84]">
                  Track how your financial position changes
                  over time and understand whether you're
                  moving in the right direction.
                </p>

              </div>

              <div className="text-right">

                <p className="text-[8px] text-[#777B84]">
                  Current
                </p>

                <p className="mt-1 font-space text-[18px] text-[#52B788]">
                  ₹2,84,600
                </p>

                <p className="mt-1 text-[7px] text-[#52B788]">
                  +12.4% this year
                </p>

              </div>

            </div>

            {/* Chart */}

            <div className="mt-8">

              <div className="relative h-[150px] border-b border-[#292B30]">

                {/* Grid lines */}

                <div className="absolute left-0 right-0 top-1/4 border-t border-[#202226]" />

                <div className="absolute left-0 right-0 top-2/4 border-t border-[#202226]" />

                <div className="absolute left-0 right-0 top-3/4 border-t border-[#202226]" />

                {/* Line */}

                <svg
                  viewBox="0 0 1000 150"
                  className="absolute inset-0 h-full w-full overflow-visible"
                  preserveAspectRatio="none"
                >
                  <polyline
                    points="0,126 100,119 200,123 300,100 400,105 500,82 600,88 700,65 800,71 900,44 1000,25"
                    fill="none"
                    stroke="#7C83FF"
                    strokeWidth="2"
                    vectorEffect="non-scaling-stroke"
                  />

                  <circle
                    cx="1000"
                    cy="25"
                    r="4"
                    fill="#7C83FF"
                  />
                </svg>

              </div>

              <div className="mt-3 flex justify-between text-[7px] text-[#777B84]">
                <span>Jan</span>
                <span>Mar</span>
                <span>May</span>
                <span>Jul</span>
                <span>Sep</span>
                <span>Oct</span>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

/* ================================================= */
/* SUBSCRIPTION */
/* ================================================= */

function Subscription({
  name,
  amount,
  warning = false,
}: {
  name: string;
  amount: string;
  warning?: boolean;
}) {
  return (
    <div
      className={`rounded-[10px] border p-4 ${
        warning
          ? "border-[#493A3A] bg-[#171416]"
          : "border-[#292B30] bg-[#0F1012]"
      }`}
    >
      <div className="flex items-center justify-between">

        <p className="text-[9px] text-[#F1F1F2]">
          {name}
        </p>

        <span
          className={`h-1.5 w-1.5 rounded-full ${
            warning
              ? "bg-[#C87575]"
              : "bg-[#52B788]"
          }`}
        />

      </div>

      <p className="mt-3 font-space text-[13px] text-[#A7ABB4]">
        {amount}
      </p>

      {warning && (
        <p className="mt-2 text-[7px] leading-4 text-[#C87575]">
          Used twice this month
        </p>
      )}

    </div>
  );
}

/* ================================================= */
/* GOAL */
/* ================================================= */

function Goal({
  name,
  amount,
  target,
  progress,
}: {
  name: string;
  amount: string;
  target: string;
  progress: number;
}) {
  return (
    <div>

      <div className="flex items-center justify-between">

        <p className="text-[8px] text-[#A7ABB4]">
          {name}
        </p>

        <p className="text-[7px] text-[#777B84]">
          {amount} / {target}
        </p>

      </div>

      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#292B30]">

        <div
          className="h-full rounded-full bg-[#52B788]"
          style={{
            width: `${progress}%`,
          }}
        />

      </div>

    </div>
  );
}