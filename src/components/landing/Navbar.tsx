import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    ["Product", "#allocator"],
    ["How it works", "#story"],
    ["Features", "#features"],
  ];

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="relative z-50 border-b border-[#24262A] bg-[#070708]">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:h-20 sm:px-8">

        {/* Logo */}

        <a
          href="#"
          onClick={closeMenu}
          className="font-space text-[11px] font-medium text-[#F1F1F2]"
        >
          Aurora
        </a>

        {/* Desktop Navigation */}

        <div className="hidden items-center gap-10 md:flex">
          {links.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="text-[9px] text-[#A7ABB4] transition-colors duration-200 hover:text-[#F1F1F2]"
            >
              {label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}

        <button
          type="button"
          className="hidden rounded-[6px] bg-[#F1F1F2] px-4 py-2 text-[9px] font-medium text-[#0B0C0D] transition-transform duration-200 hover:scale-[1.02] hover:bg-white md:block"
        >
          Try the demo
        </button>

        {/* Mobile Menu Button */}

        <button
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#292B30] bg-[#111214] text-[#A7ABB4] transition-colors hover:text-[#F1F1F2] md:hidden"
        >
          {menuOpen ? <X size={15} /> : <Menu size={15} />}
        </button>
      </nav>

      {/* Mobile Navigation */}

      {menuOpen && (
        <div className="border-t border-[#24262A] bg-[#070708] px-5 py-5 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map(([label, href]) => (
              <a
                key={label}
                href={href}
                onClick={closeMenu}
                className="rounded-lg px-3 py-3 text-[11px] text-[#A7ABB4] transition-colors hover:bg-[#111214] hover:text-[#F1F1F2]"
              >
                {label}
              </a>
            ))}

            <button
              type="button"
              onClick={closeMenu}
              className="mt-2 h-10 rounded-lg bg-[#F1F1F2] text-[10px] font-medium text-[#0B0C0D] transition-transform duration-200 active:scale-[0.98]"
            >
              Try the demo
            </button>
          </div>
        </div>
      )}
    </header>
  );
}