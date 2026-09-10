const spending = [
  {
    label: "Rent",
    percentage: "56%",
    amount: "₹18,000",
  },
  {
    label: "Food",
    percentage: "22%",
    amount: "₹7,200",
  },
  {
    label: "Fun",
    percentage: "13%",
    amount: "₹4,200",
  },
  {
    label: "Other",
    percentage: "8%",
    amount: "₹2,600",
  },
];

export function Introduction() {
  return (
    <section id="product" className="bg-background">
      <div className="mx-auto grid max-w-6xl items-center gap-20 px-8 py-28 lg:grid-cols-[1fr_1.15fr]">
        {/* Left content */}
        <div className="max-w-[480px]">
          <p className="mb-7 text-[10px] font-medium uppercase tracking-[0.22em] text-text-muted">
            Why Aurora
          </p>

          <h2 className="font-space text-[42px] font-medium leading-[1.03] tracking-[-0.045em] text-text-primary sm:text-[48px]">
            Budgeting shouldn't
            <br />
            feel like homework.
          </h2>

          <p className="mt-7 max-w-[440px] text-[13px] leading-[1.7] text-text-secondary sm:text-sm">
            See where your money goes, understand what matters,
            <br className="hidden sm:block" />
            and build a plan that actually feels like yours.
          </p>

          <p className="mt-7 text-sm font-medium text-accent-green">
            Make spending visible. Make progress easier.
          </p>
        </div>

        {/* Dashboard */}
        <div className="w-full lg:justify-self-end">
          <div className="rounded-[18px] border border-border-aurora bg-surface p-7">
            {/* Top metrics */}
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[9px] text-text-muted">
                  Balance
                </p>

                <p className="mt-2 font-space text-[27px] font-medium tracking-[-0.03em] text-text-primary">
                  ₹80,000
                </p>
              </div>

              <div className="text-right">
                <p className="text-[9px] text-text-muted">
                  This month
                </p>

                <p className="mt-2 font-space text-[19px] font-medium text-text-primary">
                  ₹32K
                </p>

                <p className="mt-0.5 text-[8px] text-text-muted">
                  Spent
                </p>
              </div>
            </div>

            {/* Spending breakdown */}
            <div className="mt-10 grid grid-cols-[145px_1fr] items-center gap-8">
              {/* Donut */}
              <div className="flex justify-center">
                <div
                  className="relative flex h-[138px] w-[138px] items-center justify-center rounded-full"
                  style={{
                    background:
                      "conic-gradient(#56C7A0 0deg 202deg, #438D76 202deg 282deg, #72B9AA 282deg 329deg, #263A34 329deg 360deg)",
                  }}
                >
                  <div className="flex h-[101px] w-[101px] flex-col items-center justify-center rounded-full bg-surface">
                    <span className="font-space text-[18px] text-text-primary">
                      ₹32K
                    </span>

                    <span className="mt-1 text-[8px] text-text-muted">
                      Spent
                    </span>
                  </div>
                </div>
              </div>

              {/* Categories */}
              <div>
                <div className="mb-5 flex items-center justify-between">
                  <h3 className="font-space text-[12px] font-semibold text-text-primary">
                    Spending breakdown
                  </h3>

                  <span className="text-[8px] text-text-muted">
                    This month
                  </span>
                </div>

                <div>
                  {spending.map((item, index) => (
                    <div
                      key={item.label}
                      className={`flex items-center justify-between py-3 ${
                        index !== spending.length - 1
                          ? "border-b border-border-aurora"
                          : ""
                      }`}
                    >
                      <div>
                        <p className="text-[10px] text-text-secondary">
                          {item.label}
                        </p>

                        <p className="mt-0.5 text-[9px] text-text-muted">
                          {item.percentage}
                        </p>
                      </div>

                      <span className="font-space text-[10px] text-text-primary">
                        {item.amount}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Money flow */}
            <div className="mt-8 rounded-[14px] border border-border-aurora bg-background-secondary p-5">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-medium text-text-primary">
                  Where your money goes
                </p>

                <span className="text-[8px] text-text-muted">
                  Monthly flow
                </span>
              </div>

              {/* Progress bar */}
              <div className="mt-5 flex h-3 overflow-hidden rounded-full bg-[#202326]">
                {/* Needs — 56% */}
                <div
                  className="h-full bg-accent-green"
                  style={{ width: "56%" }}
                />

                {/* Wants — 22% */}
                <div
                  className="h-full bg-[#438D76]"
                  style={{ width: "22%" }}
                />

                {/* Savings — 22% purple */}
                <div
                  className="h-full bg-accent-primary"
                  style={{ width: "22%" }}
                />
              </div>

              {/* Flow labels aligned to bar segments */}
              <div
                className="mt-4 grid"
                style={{
                  gridTemplateColumns: "56% 22% 22%",
                }}
              >
                {/* Needs */}
                <div className="text-left">
                  <p className="text-[8px] text-text-muted">
                    Needs
                  </p>

                  <p className="mt-1 font-space text-[11px] text-text-primary">
                    56%
                  </p>
                </div>

                {/* Wants */}
                <div className="text-left">
                  <p className="text-[8px] text-text-muted">
                    Wants
                  </p>

                  <p className="mt-1 font-space text-[11px] text-text-primary">
                    22%
                  </p>
                </div>

                {/* Savings */}
                <div className="text-left">
                  <p className="text-[8px] text-text-muted">
                    Savings
                  </p>

                  <p className="mt-1 font-space text-[11px] text-accent-primary">
                    22%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}