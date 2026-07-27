import { useState, useEffect } from 'react';
import { GraduationCap, Menu, X, Building2 } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Colleges', href: '#colleges' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-white/95 shadow-lg backdrop-blur-sm' : 'bg-white'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#home" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-700 to-cyan-500 text-white shadow-md">
            <GraduationCap className="h-7 w-7" />
          </div>
          <div>
            <h1 className="text-base font-bold leading-tight text-slate-800 sm:text-lg">
              Coimbatore Colleges
            </h1>
            <p className="text-xs text-slate-500">Arts & Science Directory</p>
          </div>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition-all hover:bg-blue-50 hover:text-blue-700"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#colleges"
            className="ml-2 flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-2 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110"
          >
            <Building2 className="h-4 w-4" /> Browse Colleges
          </a>
        </nav>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 transition hover:bg-slate-100 md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <nav className="border-t border-slate-100 bg-white px-6 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-blue-700"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#colleges"
              onClick={() => setMobileOpen(false)}
              className="mt-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 text-center text-sm font-semibold text-white"
            >
              Browse Colleges
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
