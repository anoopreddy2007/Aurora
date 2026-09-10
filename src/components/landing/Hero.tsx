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
        <div className="max-w-[500px]">
          <h1 className="font-space text-[42px] font-medium leading-[1.02] tracking-[-0.045em] text-text-primary sm:text-[48px] lg:text-[52px]">
            Watch your money
            <br />
            behave
          </h1>

          <p className="mt-7 max-w-[430px] text-[13px] leading-[1.65] text-text-secondary sm:text-sm">
            See where your money goes, understand what matters,
            <br className="hidden sm:block" />
            and build a plan that actually feels like yours.
          </p>

          <div className="mt-9 flex items-center gap-4">
            <button
              type="button"
              className="rounded-[7px] bg-accent-primary px-4 py-2.5 text-[11px] font-medium text-white transition-opacity hover:opacity-90"
            >
              See your money clearly
            </button>

            <button
              type="button"
              className="rounded-[7px] border border-border-aurora bg-transparent px-4 py-2.5 text-[11px] font-medium text-text-primary transition-colors hover:bg-surface"
            >
              Try the live demo
            </button>
          </div>
        </div>

        {/* Dashboard preview */}
        <div className="w-full">
          <div className="rounded-[15px] border border-border-aurora bg-surface p-6">
            {/* Top metrics */}
            <div className="grid grid-cols-3 gap-5">
              <div>
                <p className="text-[8px] text-text-muted">
                  Current Balance
                </p>

                <p className="mt-1 font-space text-[16px] font-medium text-text-primary">
                  ₹80,000
                </p>
              </div>

              <div>
                <p className="text-[8px] text-text-muted">
                  Spent this month
                </p>

                <p className="mt-1 font-space text-[16px] font-medium text-text-primary">
                  ₹32,000
                </p>
              </div>

              <div>
                <p className="text-[8px] text-text-muted">Savings</p>

                <p className="mt-1 font-space text-[16px] font-medium text-accent-green">
                  ₹47,600
                </p>
              </div>
            </div>

            {/* Spending */}
            <div className="mt-9">
              <p className="mb-5 text-[9px] font-medium text-text-primary">
                Monthly spending
              </p>

              <div className="space-y-3.5">
                {spending.map((item) => (
                  <div
                    key={item.label}
                    className="grid grid-cols-[42px_1fr_48px] items-center gap-3"
                  >
                    <span className="text-[8px] text-text-secondary">
                      {item.label}
                    </span>

                    <div className="h-[4px] overflow-hidden rounded-full bg-[#25262A]">
                      <div
                        className="h-full rounded-full bg-accent-primary"
                        style={{ width: item.width }}
                      />
                    </div>

                    <span className="text-right text-[8px] tabular-nums text-text-secondary">
                      {item.amount}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Status */}
            <div className="mt-7">
              <p className="text-[8px] text-accent-green">
                You’re on track.
              </p>

              <p className="mt-1 text-[7px] text-text-muted">
                Saving 18% more than last month.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}