"use client";
import dynamic from "next/dynamic";
import Link from "next/link";

const Mini = dynamic(() => import("./MiniShape"), { ssr: false });
const card = "relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#150d2b] to-[#07060d] p-8 transition duration-300 hover:border-fuchsia-500/60 hover:shadow-[0_0_40px_rgba(168,85,247,0.2)]";

export default function Pipeline() {
  return (
    <section id="services" className="mx-auto max-w-7xl px-6 pb-32 pt-16">
      <div className="mb-12 max-w-2xl">
        <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-violet-300">
          Our 3D Production Pipeline
        </span>
        <h2 className="mt-4 text-4xl font-black tracking-tight text-white md:text-6xl">
          From Idea to Live 3D Experience in 3 Steps
        </h2>
        <p className="mt-3 text-base text-white/60">
          We combine rapid engineering with state-of-the-art WebGL to launch award-winning digital experiences.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_1.3fr_1fr] items-stretch">
        <div className={card}>
          <Mini kind="cube" />
          <span className="text-xs font-bold uppercase tracking-widest text-fuchsia-400">Step 01</span>
          <h3 className="mt-1 text-2xl font-bold text-white">Discovery &amp; 3D Concept</h3>
          <p className="mt-2 text-sm text-white/60 leading-relaxed">
            Share your brand, goals, and target audience. We map out the WebGL scene, custom shaders, and spatial physics around them.
          </p>
        </div>

        <div className={`${card} md:translate-y-6 border-fuchsia-500/40`}>
          <svg viewBox="0 0 300 176" className="h-44 w-full" fill="none" stroke="#a855f7" strokeWidth="1.5">
            <rect x="10" y="10" width="280" height="156" rx="10" />
            <path d="M10 40H290M90 40V166M90 100H290" />
            <circle cx="190" cy="70" r="18" stroke="#ec4899" />
            <rect x="110" y="115" width="80" height="36" rx="6" stroke="#ec4899" />
            <path d="M210 120h60M210 136h40" opacity=".6" />
          </svg>
          <span className="text-xs font-bold uppercase tracking-widest text-pink-400">Step 02</span>
          <h3 className="mt-1 text-2xl font-bold text-white">Custom Modeling &amp; Shaders</h3>
          <p className="mt-2 text-sm text-white/60 leading-relaxed">
            We sculpt bespoke 3D assets, animate particle fields, tune materials, and build smooth scroll choreography with GSAP &amp; Lenis.
          </p>
        </div>

        <div className={card}>
          <Mini kind="torus" />
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">Step 03</span>
          <h3 className="mt-1 text-2xl font-bold text-white">Optimization &amp; Edge Launch</h3>
          <p className="mt-2 text-sm text-white/60 leading-relaxed">
            We audit mobile frame rates (60fps guaranteed), compress 3D assets, and deploy to Cloudflare Edge CDN for global ultra-low latency.
          </p>
          <div className="mt-6">
            <Link
              href="/order"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-300 hover:text-white transition-colors"
            >
              Start Your Project →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
