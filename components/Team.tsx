"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface TeamMember {
  name: string;
  role: string;
  title: string;
  image: string;
  bio: string;
  glow: string;
  borderGlow: string;
  badgeBg: string;
  socials: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

const team: TeamMember[] = [
  {
    name: "Abhai Prathap",
    role: "Chief Executive Officer",
    title: "CEO & Co-Founder",
    image: "/team/abhai_prathap.jpg",
    bio: "Leading PixelCraft's vision, global strategy, and breakthrough WebGL interactive design capabilities for brands worldwide.",
    glow: "from-fuchsia-500/20 to-purple-600/10",
    borderGlow: "group-hover:border-fuchsia-500/60",
    badgeBg: "bg-fuchsia-500/10 text-fuchsia-300 border-fuchsia-500/30",
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      email: "mailto:abhai@pixelcraft.agency",
    },
  },
  {
    name: "Ananthapadmanabhan S.",
    role: "Operation & Logistics Manager",
    title: "Operations & Logistics Manager",
    image: "/team/ananthapadmanabhan.jpg",
    bio: "Directing operational efficiency, production sprints, client delivery timelines, and multi-disciplinary logistics.",
    glow: "from-cyan-500/20 to-blue-600/10",
    borderGlow: "group-hover:border-cyan-400/60",
    badgeBg: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      email: "mailto:anantha@pixelcraft.agency",
    },
  },
  {
    name: "Amal Raj",
    role: "Chief Marketing Officer",
    title: "CMO & Growth Director",
    image: "/team/amal_raj.jpg",
    bio: "Spearheading brand narrative, market expansion, viral digital campaigns, and strategic brand positioning.",
    glow: "from-pink-500/20 to-rose-600/10",
    borderGlow: "group-hover:border-pink-500/60",
    badgeBg: "bg-pink-500/10 text-pink-300 border-pink-500/30",
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      email: "mailto:amal@pixelcraft.agency",
    },
  },
  {
    name: "Alen Mathews",
    role: "Managing Director",
    title: "Managing Director (MD)",
    image: "/team/alen_mathews.jpg",
    bio: "Overseeing executive corporate execution, enterprise client relations, partnership ecosystems, and governance.",
    glow: "from-violet-500/20 to-indigo-600/10",
    borderGlow: "group-hover:border-violet-500/60",
    badgeBg: "bg-violet-500/10 text-violet-300 border-violet-500/30",
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      email: "mailto:alen@pixelcraft.agency",
    },
  },
  {
    name: "Basil Mathew",
    role: "Chief Financial Officer",
    title: "CFO & Head of Capital",
    image: "/team/basil_mathew.jpg",
    bio: "Managing capital allocation, fiscal growth modeling, international financial systems, and investment scaling.",
    glow: "from-emerald-500/20 to-teal-600/10",
    borderGlow: "group-hover:border-emerald-500/60",
    badgeBg: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      email: "mailto:basil@pixelcraft.agency",
    },
  },
];

export default function Team() {
  return (
    <section id="team" className="relative mx-auto max-w-7xl px-6 pb-32 pt-16">
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-10 -translate-x-1/2 -z-10 h-72 w-full max-w-4xl rounded-full bg-gradient-to-r from-fuchsia-600/15 via-purple-600/10 to-cyan-500/15 blur-3xl opacity-70" />

      {/* Header */}
      <div className="mb-16 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-fuchsia-300 mb-4 backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-fuchsia-400 animate-pulse" />
          Executive Leadership
        </div>
        <h2 className="text-4xl font-black tracking-tight text-white md:text-6xl drop-shadow-[0_2px_24px_rgba(255,255,255,0.15)]">
          Meet The Minds Behind <span className="bg-gradient-to-r from-fuchsia-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">PixelCraft</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-white/60 md:text-lg">
          A world-class leadership team driving the next generation of interactive 3D WebGL web experiences.
        </p>
      </div>

      {/* Leadership Grid: 5 cards (top row 3, bottom row 2 centered) */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {team.map((member, index) => (
          <motion.div
            key={member.role}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0c0a1a]/80 backdrop-blur-xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl ${member.borderGlow} ${
              index === 3 ? "lg:col-start-1 lg:translate-x-1/2" : ""
            } ${index === 4 ? "lg:col-start-2 lg:translate-x-1/2" : ""}`}
          >
            {/* Top gradient glow inside card */}
            <div className={`pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br ${member.glow} blur-2xl transition-opacity duration-300 opacity-60 group-hover:opacity-100`} />

            {/* Photo Container */}
            <div className="relative mb-5 aspect-[4/5] w-full overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-inner">
              <Image
                src={member.image}
                alt={member.name}
                width={400}
                height={500}
                className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a1a] via-transparent to-transparent opacity-60" />

              {/* Role badge over photo */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <span className={`inline-block rounded-full border px-3 py-1 text-xs font-bold backdrop-blur-md ${member.badgeBg}`}>
                  {member.role}
                </span>
              </div>
            </div>

            {/* Member Details */}
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-white transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-xs font-medium text-white/50">{member.title}</p>
                </div>

                {/* Social icons */}
                <div className="flex items-center gap-2">
                  {member.socials.linkedin && (
                    <a
                      href={member.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} LinkedIn`}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition-colors hover:border-cyan-400 hover:bg-cyan-500/20 hover:text-cyan-300"
                    >
                      <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64c-.88 0-1.6.72-1.6 1.6s.72 1.6 1.6 1.6 1.6-.72 1.6-1.6-.72-1.6-1.6-1.6Z" />
                      </svg>
                    </a>
                  )}
                  {member.socials.twitter && (
                    <a
                      href={member.socials.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} X Twitter`}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition-colors hover:border-fuchsia-400 hover:bg-fuchsia-500/20 hover:text-fuchsia-300"
                    >
                      <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                  )}
                  {member.socials.email && (
                    <a
                      href={member.socials.email}
                      aria-label={`${member.name} Email`}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition-colors hover:border-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300"
                    >
                      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>

              <p className="mt-3 text-xs leading-relaxed text-white/60">
                {member.bio}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
