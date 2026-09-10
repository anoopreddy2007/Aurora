export function Navbar() {
  return (
    <header className="bg-background">
      <nav className="mx-auto flex h-20 max-w-6xl items-center justify-between px-8">
        {/* Logo */}
        <a
          href="#"
          className="font-space text-[11px] font-medium text-text-primary"
        >
          Aurora
        </a>

        {/* Navigation */}
        <div className="hidden items-center gap-10 md:flex">
          <a
            href="#product"
            className="text-[9px] text-text-secondary transition-colors hover:text-text-primary"
          >
            Product
          </a>

          <a
            href="#how-it-works"
            className="text-[9px] text-text-secondary transition-colors hover:text-text-primary"
          >
            How it works
          </a>

          <a
            href="#features"
            className="text-[9px] text-text-secondary transition-colors hover:text-text-primary"
          >
            Features
          </a>

          <a
            href="#pricing"
            className="text-[9px] text-text-secondary transition-colors hover:text-text-primary"
          >
            Pricing
          </a>
        </div>

        {/* CTA */}
        <button
          type="button"
          className="rounded-[6px] bg-accent-primary px-4 py-2 text-[9px] font-medium text-white transition-opacity hover:opacity-90"
        >
          Try the demo
        </button>
      </nav>
    </header>
  );
}