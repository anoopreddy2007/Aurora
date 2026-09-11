import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

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

        <Link
          to="/"
          onClick={closeMenu}
          className="font-space text-[11px] font-medium text-[#F1F1F2]"
        >
          Aurora
        </Link>

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

        {/* Desktop Actions */}

        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/signin"
            className="rounded-[6px] px-3 py-2 text-[9px] font-medium text-[#A7ABB4] transition-colors hover:text-[#F1F1F2]"
          >
            Sign In
          </Link>

          <Link
            to="/signup"
            className="rounded-[6px] border border-[#292B30] px-3 py-2 text-[9px] font-medium text-[#A7ABB4] transition-colors hover:border-[#3A3C42] hover:text-[#F1F1F2]"
          >
            Sign Up
          </Link>

          <a
            href="#allocator"
            className="rounded-[6px] bg-[#F1F2F3] px-4 py-2 text-[9px] font-medium text-[#0B0C0D] transition-transform duration-200 hover:scale-[1.02] hover:bg-white"
          >
            Try the demo
          </a>
        </div>

        {/* Mobile Menu Button */}

        <button
          type="button"
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
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
                className="rounded-lg px-3 py-3 text-[11px] text-[#A7ABB4] transition-colors hover:bg-[#111214] hover:text-[#F1F2F3]"
              >
                {label}
              </a>
            ))}

            <div className="mt-3 grid grid-cols-2 gap-2">
              <Link
                to="/signin"
                onClick={closeMenu}
                className="flex h-10 items-center justify-center rounded-lg border border-[#292B30] text-[10px] font-medium text-[#A7ABB4]"
              >
                Sign In
              </Link>

              <Link
                to="/signup"
                onClick={closeMenu}
                className="flex h-10 items-center justify-center rounded-lg border border-[#292B30] text-[10px] font-medium text-[#A7ABB4]"
              >
                Sign Up
              </Link>
            </div>

            <a
              href="#allocator"
              onClick={closeMenu}
              className="mt-2 flex h-10 items-center justify-center rounded-lg bg-[#F1F2F3] text-[10px] font-medium text-[#0B0C0D] transition-transform duration-200 active:scale-[0.98]"
            >
              Try the demo
            </a>
          </div>
        </div>
      )}
    </header>
  );
}