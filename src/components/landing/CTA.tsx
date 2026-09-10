import { ArrowRight, Check } from "lucide-react";

export function CTA() {
  return (
    <section
      id="cta"
      className="border-t border-[#24262A] bg-[#070708]"
    >
      <div className="mx-auto max-w-6xl px-8 py-32">

        <div className="relative overflow-hidden rounded-[24px] border border-[#292B30] bg-[#111214] px-7 py-16 text-center sm:px-12 sm:py-20">

          {/* Subtle background detail */}

          <div className="pointer-events-none absolute left-1/2 top-0 h-[260px] w-[500px] -translate-x-1/2 rounded-full bg-[#8D83B8]/[0.035] blur-[100px]" />

          <div className="relative">

            {/* LABEL */}

            <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#777B84]">
              Start today
            </p>

            {/* HEADLINE */}

            <h2 className="mx-auto mt-6 max-w-[700px] font-space text-[42px] font-medium leading-[1.02] tracking-[-0.045em] text-[#F1F1F2] sm:text-[56px]">
              Your money doesn't need
              <br />
              to feel complicated.
            </h2>

            {/* DESCRIPTION */}

            <p className="mx-auto mt-7 max-w-[480px] text-[12px] leading-[1.7] text-[#777B84] sm:text-[13px]">
              See where your money goes, build a plan that
              feels like yours, and start making better decisions.
            </p>

            {/* CTA */}

            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">

              <button
                type="button"
                className="group flex h-11 items-center gap-3 rounded-full bg-[#F1F1F2] px-6 text-[10px] font-medium text-[#0B0C0D] transition-transform duration-200 hover:scale-[1.02]"
              >
                Start using Aurora

                <ArrowRight
                  size={14}
                  strokeWidth={1.8}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />

              </button>

              <button
                type="button"
                className="flex h-11 items-center rounded-full border border-[#34373D] bg-[#17181B] px-6 text-[10px] font-medium text-[#A7ABB4] transition-colors duration-200 hover:border-[#4A4D54] hover:text-[#F1F1F2]"
              >
                Try the live demo
              </button>

            </div>

            {/* FREE */}

            <div className="mt-7 flex items-center justify-center gap-2">

              <Check
                size={12}
                strokeWidth={1.7}
                className="text-[#52B788]"
              />

              <span className="text-[8px] text-[#777B84]">
                Free to use. No paid plans.
              </span>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}