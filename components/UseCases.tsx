import Link from "next/link";

const items = [
  {
    title: "E-Commerce & Luxury Brands",
    desc: "Interactive 3D product viewports, real-time material switches, and instant 360° spin interactions that boost buyer conversions by 40%.",
    tag: "High Conversion",
    stat: "+42% Avg. Sales Lift",
    glow: "hover:border-fuchsia-500/70 hover:shadow-[0_0_50px_rgba(236,72,153,0.25)]",
  },
  {
    title: "SaaS & High-Tech Startups",
    desc: "Visualizing complex cloud architectures and software ecosystems through dynamic WebGL particles and procedural graphs.",
    tag: "Next-Gen Tech",
    stat: "3.5x Time on Site",
    glow: "hover:border-cyan-400/70 hover:shadow-[0_0_50px_rgba(34,211,238,0.25)]",
  },
  {
    title: "Creative Agencies & Portfolios",
    desc: "Digital galleries that break the grid. Interactive physics, floating glass objects, and kinetic typography that wins design awards.",
    tag: "Award Winning",
    stat: "Awwwards SOTD Quality",
    glow: "hover:border-violet-500/70 hover:shadow-[0_0_50px_rgba(139,92,246,0.25)]",
  },
  {
    title: "Cinematic Storytelling & Brand Worlds",
    desc: "Scroll-driven spatial storytelling that carries audiences through 3D underwater scenes, cosmic voids, and futuristic cities.",
    tag: "Immersive Web",
    stat: "Unforgettable Recall",
    glow: "hover:border-pink-500/70 hover:shadow-[0_0_50px_rgba(236,72,153,0.25)]",
  },
];

export default function UseCases() {
  return (
    <section id="usecases" className="mx-auto max-w-7xl px-6 pb-32 pt-16">
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-300">
            Selected Industries &amp; Case Studies
          </span>
          <h2 className="mt-4 text-4xl font-black tracking-tight text-white md:text-6xl">
            Where 3D Makes the Difference
          </h2>
          <p className="mt-2 text-base text-white/60 max-w-xl">
            From luxury apparel to breakthrough venture-backed SaaS, see how brands use PixelCraft to dominate attention.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <span className="rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 px-4 py-1.5 text-xs font-bold text-fuchsia-300">
            ★ 4x Site of the Month
          </span>
          <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-bold text-cyan-300">
            WebGL 2026 Trendsetter
          </span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {items.map((item, i) => (
          <article
            key={item.title}
            className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0a0c1a]/80 p-8 backdrop-blur-xl transition duration-300 ${item.glow}`}
          >
            <div className="flex items-center justify-between">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white/70">
                {item.tag}
              </span>
              <span className="text-xs font-bold text-cyan-300">{item.stat}</span>
            </div>

            <h3 className="mt-6 text-2xl font-bold text-white group-hover:text-white transition-colors">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              {item.desc}
            </p>

            <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-xs text-white/40">Ready to build for this sector?</span>
              <Link
                href="/order"
                className="text-xs font-bold text-fuchsia-400 hover:text-fuchsia-300 flex items-center gap-1 transition-colors"
              >
                Configure Project →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
