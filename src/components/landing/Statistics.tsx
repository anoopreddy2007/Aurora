const statistics = [
  {
    value: "₹80K",
    label: "Monthly income",
    description: "Your starting point",
    accent: "neutral",
  },
  {
    value: "₹32K",
    label: "Monthly spending",
    description: "Money accounted for",
    accent: "neutral",
  },
  {
    value: "₹47.6K",
    label: "Current savings",
    description: "Moving toward your goals",
    accent: "green",
  },
  {
    value: "59.5%",
    label: "Income remaining",
    description: "Available after spending",
    accent: "purple",
  },
];

export function Statistics() {
  return (
    <section className="w-full overflow-hidden border-t border-[#24262A] bg-[#070708]">
      <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-8 sm:py-28">
        {/* HEADER */}

        <div className="flex w-full flex-col justify-between gap-7 md:flex-row md:items-end md:gap-8">
          <div className="w-full max-w-xl">
            <p className="mb-5 text-[9px] font-medium uppercase tracking-[0.22em] text-[#777B84] sm:mb-6 sm:text-[10px]">
              Your money, clearly
            </p>

            <h2 className="font-space text-[36px] font-medium leading-[1.04] tracking-[-0.045em] text-[#F1F1F2] sm:text-[50px]">
              A clearer picture
              <br />
              starts with numbers.
            </h2>
          </div>

          <p className="w-full max-w-[300px] text-[11px] leading-[1.7] text-[#777B84] sm:text-[12px] md:pb-1">
            Aurora turns your monthly activity into simple signals you can
            understand at a glance.
          </p>
        </div>

        {/* STATISTICS */}

        <div className="mt-12 grid w-full min-w-0 overflow-hidden rounded-[16px] border border-[#292B30] bg-[#111214] sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
          {statistics.map((stat, index) => (
            <StatisticCard
              key={stat.label}
              {...stat}
              isLast={index === statistics.length - 1}
            />
          ))}
        </div>

        {/* SMALL SUPPORTING LINE */}

        <div className="mt-5 flex w-full min-w-0 items-center justify-between gap-4 sm:mt-6">
          <p className="truncate text-[8px] text-[#555B68] sm:text-[9px]">
            Based on your current monthly plan
          </p>

          <div className="flex shrink-0 items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#52B788]" />

            <span className="text-[8px] text-[#777B84] sm:text-[9px]">
              On track
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatisticCard({
  value,
  label,
  description,
  accent,
  isLast,
}: {
  value: string;
  label: string;
  description: string;
  accent: string;
  isLast: boolean;
}) {
  const valueClass =
    accent === "green"
      ? "text-[#52B788]"
      : accent === "purple"
        ? "text-[#8D83B8]"
        : "text-[#F1F1F2]";

  return (
    <div
      className={`min-w-0 min-h-[175px] p-5 sm:min-h-[190px] sm:p-7 ${
        !isLast
          ? "border-b border-[#292B30] sm:border-r lg:border-b-0"
          : ""
      }`}
    >
      {/* NUMBER */}

      <p
        className={`truncate font-space text-[27px] font-medium tracking-[-0.035em] sm:text-[30px] ${valueClass}`}
      >
        {value}
      </p>

      {/* LABEL */}

      <p className="mt-4 text-[10px] font-medium text-[#A7ABB4] sm:mt-5 sm:text-[11px]">
        {label}
      </p>

      {/* DESCRIPTION */}

      <p className="mt-2 text-[8px] leading-4 text-[#555B68] sm:text-[9px]">
        {description}
      </p>

      {/* SMALL INDICATOR */}

      <div className="mt-7 h-px w-full bg-[#292B30] sm:mt-8">
        <div
          className={`h-px ${
            accent === "green"
              ? "w-3/4 bg-[#52B788]"
              : accent === "purple"
                ? "w-1/2 bg-[#8D83B8]"
                : "w-2/5 bg-[#555B68]"
          }`}
        />
      </div>
    </div>
  );
}