"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

const Jelly = dynamic(() => import("./JellyScene"), { ssr: false });

export default function FooterCTA() {
  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/b-asi-l/nexora-agency-website",
      icon: (
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      ),
    },
    {
      name: "X",
      url: "https://twitter.com",
      icon: (
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com",
      icon: (
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64c-.88 0-1.6.72-1.6 1.6s.72 1.6 1.6 1.6 1.6-.72 1.6-1.6-.72-1.6-1.6-1.6Z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      url: "https://instagram.com",
      icon: (
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="relative border-t border-white/10 bg-[#04030a]">
      {/* 3D Jellyfish Scene Hero Header */}
      <div className="relative h-[80vh] min-h-[550px] w-full overflow-hidden">
        <div className="absolute inset-0">
          <Jelly />
        </div>
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <span className="rounded-full border border-cyan-400/40 bg-cyan-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-cyan-300 backdrop-blur-md mb-6">
            Make Brands Impossible To Ignore
          </span>
          <h2 className="max-w-4xl text-5xl font-black tracking-tighter text-white drop-shadow-[0_0_60px_#22d3ee88] md:text-8xl">
            Start Building Magic Today
          </h2>
          <p className="mt-6 max-w-xl text-base text-white/80 md:text-xl">
            Elevate your brand with award-winning 3D WebGL experiences that captivate attention and drive conversions.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/order"
              className="rounded-full bg-gradient-to-r from-fuchsia-500 to-pink-500 px-10 py-4 text-base font-bold text-white shadow-[0_0_40px_#ec4899aa] transition-all hover:brightness-110 active:scale-95"
            >
              Order Your 3D Site →
            </Link>
            <a
              href="#contact"
              className="rounded-full border border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-md hover:bg-white/10 transition-colors"
            >
              Speak With Leadership
            </a>
          </div>
        </div>
      </div>

      {/* Footer Navigation Columns */}
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-6 py-16 md:grid-cols-4 border-t border-white/5">
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-wider text-white/40">Navigation</p>
          <div className="space-y-2">
            <a href="#services" className="block text-sm text-white/60 hover:text-white transition-colors">Services &amp; Process</a>
            <a href="#editor" className="block text-sm text-white/60 hover:text-white transition-colors">3D Interactive Studio</a>
            <a href="#usecases" className="block text-sm text-white/60 hover:text-white transition-colors">Case Studies</a>
            <a href="#pricing" className="block text-sm text-white/60 hover:text-white transition-colors">Pricing Packages</a>
            <a href="#team" className="block text-sm text-white/60 hover:text-white transition-colors">Executive Team</a>
          </div>
        </div>

        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-wider text-white/40">Services</p>
          <div className="space-y-2">
            <Link href="/order?plan=starter" className="block text-sm text-white/60 hover:text-white transition-colors">Starter 3D Web</Link>
            <Link href="/order?plan=growth" className="block text-sm text-white/60 hover:text-white transition-colors">Growth Brand WebGL</Link>
            <Link href="/order?plan=enterprise" className="block text-sm text-white/60 hover:text-white transition-colors">Enterprise Custom Scenes</Link>
            <span className="block text-sm text-white/40">Custom GLSL Shaders</span>
            <span className="block text-sm text-white/40">Spatial Audio Design</span>
          </div>
        </div>

        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-wider text-white/40">Executive Leadership</p>
          <div className="space-y-2">
            <a href="#team" className="block text-sm text-white/60 hover:text-white transition-colors">CEO &amp; Founder</a>
            <a href="#team" className="block text-sm text-white/60 hover:text-white transition-colors">Operations &amp; Logistics Manager</a>
            <a href="#team" className="block text-sm text-white/60 hover:text-white transition-colors">Chief Marketing Officer</a>
            <a href="#team" className="block text-sm text-white/60 hover:text-white transition-colors">Managing Director</a>
            <a href="#team" className="block text-sm text-white/60 hover:text-white transition-colors">Chief Financial Officer</a>
          </div>
        </div>

        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-wider text-white/40">Contact &amp; Connect</p>
          <div className="space-y-2">
            <a href="mailto:hello@pixelcraft.agency" className="block text-sm text-cyan-300 hover:underline">hello@pixelcraft.agency</a>
            <p className="text-sm text-white/50">+1 (555) 3D-PIXEL</p>
            <p className="text-sm text-white/40">Global Edge CDN Architecture</p>
            <div className="pt-4 flex gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors hover:border-cyan-400 hover:text-white"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 bg-black/60 px-6 py-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-xs text-white/40 sm:flex-row">
          <p>© 2026 PixelCraft Agency. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              Cloudflare Pages Ready
            </span>
            <span className="text-white/20">|</span>
            <a href="https://github.com/b-asi-l/nexora-agency-website" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              GitHub: b-asi-l/nexora-agency-website
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
