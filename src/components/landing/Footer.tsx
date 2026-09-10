import {
  ArrowUpRight,
  Github,
  Instagram,
  Linkedin,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[#24262A] bg-[#070708]">
      <div className="mx-auto max-w-6xl px-8">

        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">

          {/* BRAND */}

          <div>
            <span className="font-space text-sm font-semibold tracking-[-0.02em] text-[#F1F1F2]">
              Aurora
            </span>

            <p className="mt-5 max-w-[260px] text-[11px] leading-[1.7] text-[#777B84]">
              A simpler way to understand your money,
              build better habits, and make progress.
            </p>
          </div>

          {/* PRODUCT */}

          <div>
            <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-[#777B84]">
              Product
            </p>

            <div className="mt-5 space-y-3">
              <a
                href="#allocator"
                className="block text-[11px] text-[#A7ABB4] transition-colors hover:text-[#F1F1F2]"
              >
                Budget Allocator
              </a>

              <a
                href="#dashboard"
                className="block text-[11px] text-[#A7ABB4] transition-colors hover:text-[#F1F1F2]"
              >
                Dashboard
              </a>

              <a
                href="#features"
                className="block text-[11px] text-[#A7ABB4] transition-colors hover:text-[#F1F1F2]"
              >
                Features
              </a>

              <a
                href="#story"
                className="block text-[11px] text-[#A7ABB4] transition-colors hover:text-[#F1F1F2]"
              >
                How it works
              </a>
            </div>
          </div>

          {/* COMPANY */}

          <div>
            <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-[#777B84]">
              Aurora
            </p>

            <div className="mt-5 space-y-3">
              <a
                href="#"
                className="flex items-center gap-1 text-[11px] text-[#A7ABB4] transition-colors hover:text-[#F1F1F2]"
              >
                About
                <ArrowUpRight size={10} />
              </a>

              <a
                href="#"
                className="flex items-center gap-1 text-[11px] text-[#A7ABB4] transition-colors hover:text-[#F1F1F2]"
              >
                Privacy
                <ArrowUpRight size={10} />
              </a>

              <a
                href="#"
                className="flex items-center gap-1 text-[11px] text-[#A7ABB4] transition-colors hover:text-[#F1F1F2]"
              >
                Terms
                <ArrowUpRight size={10} />
              </a>
            </div>
          </div>

          {/* SOCIAL */}

          <div>
            <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-[#777B84]">
              Connect
            </p>

            <div className="mt-5 flex gap-2">
              <a
                href="#"
                aria-label="GitHub"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#292B30] bg-[#111214] text-[#777B84] transition-colors hover:text-[#F1F1F2]"
              >
                <Github size={13} />
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#292B30] bg-[#111214] text-[#777B84] transition-colors hover:text-[#F1F1F2]"
              >
                <Linkedin size={13} />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#292B30] bg-[#111214] text-[#777B84] transition-colors hover:text-[#F1F1F2]"
              >
                <Instagram size={13} />
              </a>
            </div>
          </div>

        </div>

        {/* BOTTOM */}

        <div className="flex flex-col gap-3 border-t border-[#24262A] py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[9px] text-[#55585F]">
            © 2026 Aurora. Built for better money decisions.
          </p>

          <p className="text-[9px] text-[#55585F]">
            Free. Simple. Yours.
          </p>
        </div>

      </div>
    </footer>
  );
}