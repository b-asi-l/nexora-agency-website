"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Pricing() {
  const [billing, setBilling] = useState<"monthly" | "annual">("annual");

  const plans = [
    {
      id: "starter",
      name: "Starter 3D Web",
      tagline: "Essential high-impact 3D landing page for modern startups & creators.",
      price: billing === "annual" ? "$1,199" : "$1,499",
      sub: "one-time project or $119/mo maintenance",
      popular: false,
      glow: "border-white/10 hover:border-violet-500/50",
      accent: "from-violet-500 to-indigo-500",
      features: [
        "1 Immersive Hero 3D Interactive WebGL Scene",
        "Responsive across all Mobile & Desktop devices",
        "Smooth GSAP scroll interactions & physics",
        "Next.js / React performance optimization",
        "Standard Contact Form & Analytics setup",
        "Cloudflare Edge CDN deployment included",
        "2 Rounds of creative design revisions",
        "Delivered in 10-14 business days",
      ],
      ctaText: "Order Starter",
      ctaBg: "border border-white/20 bg-white/5 hover:bg-white/10 text-white",
    },
    {
      id: "growth",
      name: "Growth Brand Experience",
      tagline: "Our award-winning full 3D interactive multi-section agency website.",
      price: billing === "annual" ? "$2,799" : "$3,499",
      sub: "one-time project or $249/mo maintenance",
      popular: true,
      glow: "border-fuchsia-500/60 shadow-[0_0_60px_rgba(236,72,153,0.25)]",
      accent: "from-fuchsia-500 via-pink-500 to-rose-500",
      features: [
        "Everything in Starter, plus:",
        "Up to 3 Custom 3D Interactive Scenes / Models",
        "Custom GLSL Shaders & Fluid Particle Dynamics",
        "Interactive 3D Product Configurator (Color/Material/360°)",
        "Bento-Grid Case Studies & Portfolio showcase",
        "Full Lenis smooth scroll & custom cursor effects",
        "CMS Integration for blog, portfolio & team updates",
        "Cloudflare Pages + Custom Domain + SSL automated",
        "Priority 7-Day Fast-Track Delivery available",
        "Dedicated Creative Director & Slack channel",
      ],
      ctaText: "Order Growth (Recommended)",
      ctaBg: "bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white shadow-[0_0_30px_rgba(236,72,153,0.5)] hover:brightness-110",
    },
    {
      id: "enterprise",
      name: "Enterprise Bespoke WebGL",
      tagline: "Ultra-luxury, custom virtual universe engineered for market leaders.",
      price: billing === "annual" ? "$6,499+" : "$7,999+",
      sub: "custom scope & SLA support",
      popular: false,
      glow: "border-white/10 hover:border-cyan-400/50",
      accent: "from-cyan-400 to-blue-500",
      features: [
        "Unlimited custom 3D WebGL scenes & procedural worlds",
        "Complex 3D Rigging, physics simulation & sound design",
        "Enterprise e-commerce integration (Shopify / Stripe)",
        "Multi-language (i18n) & regional CDN acceleration",
        "Bespoke interactive 3D configurators & mini-games",
        "SOC-2 compliant Cloudflare enterprise architecture",
        "99.99% uptime SLA & dedicated ongoing engineering",
        "White-glove 24/7 technical creative support",
      ],
      ctaText: "Order Enterprise",
      ctaBg: "border border-cyan-400/40 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-200",
    },
  ];

  return (
    <section id="pricing" className="relative mx-auto max-w-7xl px-6 pb-32 pt-16">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-20 -translate-x-1/2 -z-10 h-96 w-full max-w-5xl rounded-full bg-gradient-to-r from-purple-900/20 via-pink-900/20 to-blue-900/20 blur-3xl opacity-60" />

      {/* Header */}
      <div className="mb-14 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-pink-500/30 bg-pink-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-pink-300 mb-4 backdrop-blur-md">
          Transparent Investment
        </div>
        <h2 className="text-4xl font-black tracking-tight text-white md:text-6xl">
          Simple, Value-Packed <span className="bg-gradient-to-r from-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">Pricing</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-white/60 md:text-lg">
          No hidden fees. Every package delivers a fully responsive, high-performance 3D website built to captivate and convert.
        </p>

        {/* Billing Switcher */}
        <div className="mt-8 inline-flex items-center rounded-full border border-white/10 bg-[#0c0a1a] p-1.5 backdrop-blur-md">
          <button
            onClick={() => setBilling("monthly")}
            className={`rounded-full px-5 py-2 text-xs font-bold transition-all ${
              billing === "monthly"
                ? "bg-white/15 text-white shadow-md"
                : "text-white/60 hover:text-white"
            }`}
          >
            Standard Scope
          </button>
          <button
            onClick={() => setBilling("annual")}
            className={`relative rounded-full px-5 py-2 text-xs font-bold transition-all ${
              billing === "annual"
                ? "bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white shadow-lg"
                : "text-white/60 hover:text-white"
            }`}
          >
            Annual Package
            <span className="ml-2 rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-extrabold uppercase text-white">
              Save 20%
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid gap-8 lg:grid-cols-3 items-stretch">
        {plans.map((p, idx) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className={`relative flex flex-col justify-between rounded-3xl border bg-[#0b0a18]/90 backdrop-blur-xl p-8 transition-all duration-300 hover:-translate-y-2 ${p.glow} ${
              p.popular ? "ring-1 ring-fuchsia-500/40" : ""
            }`}
          >
            {p.popular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="rounded-full bg-gradient-to-r from-fuchsia-500 to-pink-500 px-4 py-1 text-xs font-black uppercase tracking-wider text-white shadow-[0_0_20px_#ec4899]">
                  Most Popular
                </span>
              </div>
            )}

            <div>
              {/* Card Header */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white">{p.name}</h3>
                <p className="mt-2 text-xs text-white/60 leading-relaxed min-h-[36px]">
                  {p.tagline}
                </p>
              </div>

              {/* Price display */}
              <div className="mb-6 border-b border-white/10 pb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black tracking-tight text-white md:text-5xl">
                    {p.price}
                  </span>
                </div>
                <p className="mt-1 text-xs text-white/50">{p.sub}</p>
              </div>

              {/* Features List */}
              <div className="mb-8 space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-white/40">
                  Included Features:
                </p>
                {p.features.map((f, i) => (
                  <div key={i} className="flex items-start gap-3 text-xs text-white/80">
                    <svg
                      className="h-4 w-4 shrink-0 text-fuchsia-400 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Order Button */}
            <Link
              href={`/order?plan=${p.id}`}
              className={`block w-full rounded-2xl py-4 text-center text-sm font-bold transition-all duration-300 ${p.ctaBg}`}
            >
              {p.ctaText} →
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Custom Enterprise Banner */}
      <div className="mt-12 rounded-3xl border border-white/10 bg-gradient-to-r from-[#120a26] via-[#090b1c] to-[#0d1624] p-8 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h4 className="text-xl font-bold text-white">Need a custom contract or bespoke 3D production?</h4>
          <p className="mt-1 text-sm text-white/60">
            We work with Fortune 500 brands, game studios, and high-growth venture-backed startups on bespoke terms.
          </p>
        </div>
        <Link
          href="/order?plan=enterprise"
          className="shrink-0 rounded-full border border-cyan-400/40 bg-cyan-500/10 px-6 py-3 text-sm font-bold text-cyan-300 transition-colors hover:bg-cyan-500/20"
        >
          Book Custom Consultation
        </Link>
      </div>
    </section>
  );
}
