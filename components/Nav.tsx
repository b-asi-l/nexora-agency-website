"use client";

import { useState } from "react";
import Link from "next/link";

export default function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "3D Studio", href: "#editor" },
    { name: "Work", href: "#usecases" },
    { name: "Pricing", href: "#pricing" },
    { name: "Team", href: "#team" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-2xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 text-2xl font-black tracking-tight">
          <span className="bg-gradient-to-r from-fuchsia-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            Pixel
          </span>
          <span className="text-white">Craft</span>
          <span className="rounded-md border border-fuchsia-500/40 bg-fuchsia-500/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-fuchsia-300">
            Agency
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-white/75 transition-colors hover:text-white"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden items-center gap-3 md:flex">
          <a
            href="#contact"
            className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-semibold text-white/90 transition-colors hover:bg-white/10"
          >
            Get In Touch
          </a>
          <Link
            href="/order"
            className="rounded-full bg-gradient-to-r from-fuchsia-500 to-pink-500 px-5 py-2.5 text-xs font-bold text-white shadow-[0_0_24px_rgba(236,72,153,0.6)] transition-all hover:brightness-110 active:scale-95"
          >
            Order Project →
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white md:hidden"
        >
          {mobileMenuOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-white/10 bg-[#0a0818]/95 px-6 py-6 backdrop-blur-2xl md:hidden space-y-4">
          <div className="grid gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-semibold text-white/80 hover:bg-white/10 hover:text-white"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <Link
              href="/order"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full rounded-2xl bg-gradient-to-r from-fuchsia-500 to-pink-500 py-3.5 text-center text-sm font-bold text-white shadow-[0_0_24px_rgba(236,72,153,0.5)]"
            >
              Order Project →
            </Link>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full rounded-2xl border border-white/20 bg-white/5 py-3 text-center text-sm font-semibold text-white"
            >
              Contact Leadership
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
