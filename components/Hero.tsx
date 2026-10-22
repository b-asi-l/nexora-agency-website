"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <HeroScene />
      </div>

      <div className="pointer-events-none relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="pointer-events-auto mb-6 inline-flex items-center gap-2 rounded-full border border-fuchsia-500/40 bg-fuchsia-950/60 px-4 py-1.5 text-xs font-semibold text-fuchsia-300 backdrop-blur-xl shadow-[0_0_20px_rgba(236,72,153,0.3)]"
        >
          <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
          Websites That Make Brands Impossible to Ignore
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="max-w-5xl text-5xl font-black leading-[0.95] tracking-tighter drop-shadow-[0_4px_50px_rgba(168,85,247,.7)] sm:text-7xl md:text-9xl text-white"
        >
          3D Websites in Minutes
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 max-w-2xl text-lg text-white/90 md:text-2xl font-normal drop-shadow-md"
        >
          Immersive WebGL experiences, interactive 3D configurators, and high-conversion agency design.
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="pointer-events-auto mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/order"
            className="rounded-full bg-gradient-to-r from-fuchsia-500 via-pink-500 to-cyan-400 px-8 py-4 font-bold text-white shadow-[0_0_40px_#ec4899aa] transition-all hover:scale-105 hover:brightness-110 active:scale-95"
          >
            Order Your 3D Site →
          </Link>
          <a
            href="#editor"
            className="rounded-full border border-white/20 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-xl transition-all hover:bg-white/20 active:scale-95"
          >
            Try 3D Configurator ↓
          </a>
        </motion.div>
      </div>
    </section>
  );
}
