"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

interface Plan {
  id: string;
  name: string;
  price: number;
  tagline: string;
  badge: string;
}

const plans: Record<string, Plan> = {
  starter: {
    id: "starter",
    name: "Starter 3D Web",
    price: 1499,
    tagline: "Essential high-impact single-page 3D WebGL website.",
    badge: "Startup Choice",
  },
  growth: {
    id: "growth",
    name: "Growth Brand Experience",
    price: 3499,
    tagline: "Full immersive 3D agency website with custom shaders & configurators.",
    badge: "Most Popular",
  },
  enterprise: {
    id: "enterprise",
    name: "Enterprise Bespoke WebGL",
    price: 7999,
    tagline: "Virtual universe, physics simulations, and bespoke web applications.",
    badge: "Enterprise",
  },
};

const addOnsList = [
  { id: "custom3d", name: "Custom 3D Object Modeling (GLTF/GLB)", price: 450, desc: "High-poly tailored 3D model designed from your CAD or concept." },
  { id: "audio", name: "Spatial Audio & Sound Design", price: 300, desc: "Interactive ambient soundscapes and tactile UI click feedback." },
  { id: "fasttrack", name: "7-Day Fast-Track Delivery", price: 600, desc: "Priority dedicated team sprint delivering in 7 calendar days." },
  { id: "cloudflare", name: "Cloudflare Edge Global CDN & DNS Suite", price: 250, desc: "Turnkey domain routing, DDoS shield, and global sub-50ms caching." },
];

function OrderContent() {
  const searchParams = useSearchParams();
  const initialPlan = searchParams.get("plan") || "growth";

  const [selectedPlanId, setSelectedPlanId] = useState<string>("growth");
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>(["cloudflare"]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    timeline: "2-3 Weeks",
    notes: "",
  });

  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    if (initialPlan && plans[initialPlan]) {
      setSelectedPlanId(initialPlan);
    }
  }, [initialPlan]);

  const activePlan = plans[selectedPlanId] || plans.growth;

  const toggleAddOn = (id: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const addOnsTotal = selectedAddOns.reduce((acc, id) => {
    const item = addOnsList.find((a) => a.id === id);
    return acc + (item ? item.price : 0);
  }, 0);

  const totalPrice = activePlan.price + addOnsTotal;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `PC-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setOrderComplete(true);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello PixelCraft team! I just placed an order request on your website.\nOrder ID: ${orderId || "NEW-ORDER"}\nPlan: ${activePlan.name} ($${totalPrice.toLocaleString()})\nClient: ${form.name} (${form.company})\nEmail: ${form.email}`
  );

  return (
    <div className="min-h-screen bg-[#05040d] text-white">
      {/* Top Navbar */}
      <header className="border-b border-white/10 bg-black/40 backdrop-blur-xl sticky top-0 z-50">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2 text-xl font-black tracking-tight">
            <span className="bg-gradient-to-r from-fuchsia-400 to-pink-500 bg-clip-text text-transparent">Pixel</span>Craft
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-xs font-semibold text-white/70 hover:text-white transition-colors"
            >
              ← Back to Overview
            </Link>
            <a
              href="https://github.com/b-asi-l/nexora-agency-website"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80 hover:bg-white/10"
            >
              GitHub Repo
            </a>
          </div>
        </div>
      </header>

      {/* Main Order Container */}
      <main className="mx-auto max-w-7xl px-6 py-12">
        {orderComplete ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mx-auto max-w-2xl rounded-3xl border border-emerald-500/30 bg-[#0c0a1a] p-10 text-center shadow-[0_0_80px_rgba(16,185,129,0.2)]"
          >
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-[0_0_40px_rgba(16,185,129,0.5)]">
              <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h1 className="mt-6 text-3xl font-black md:text-4xl text-white">
              Order Request Submitted!
            </h1>
            <p className="mt-2 text-sm text-emerald-400 font-mono font-bold tracking-wider">
              ORDER REFERENCE: #{orderId}
            </p>
            <p className="mt-4 text-sm text-white/70">
              Thank you, <span className="font-semibold text-white">{form.name}</span>! Our leadership team and technical director have received your project intake for{" "}
              <span className="font-semibold text-fuchsia-300">{activePlan.name}</span>.
            </p>

            {/* Order Summary box */}
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 text-left space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Base Package:</span>
                <span className="font-semibold text-white">{activePlan.name} (${activePlan.price.toLocaleString()})</span>
              </div>
              {selectedAddOns.map((id) => {
                const a = addOnsList.find((x) => x.id === id);
                if (!a) return null;
                return (
                  <div key={id} className="flex justify-between text-xs text-white/70">
                    <span>+ {a.name}</span>
                    <span>${a.price}</span>
                  </div>
                );
              })}
              <div className="border-t border-white/10 pt-3 flex justify-between text-base font-bold text-white">
                <span>Total Scope Investment:</span>
                <span className="text-cyan-300">${totalPrice.toLocaleString()} USD</span>
              </div>
            </div>

            {/* Direct Connect Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`https://wa.me/?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-6 py-3.5 text-sm font-bold text-white shadow-[0_0_24px_rgba(16,185,129,0.5)] hover:bg-emerald-600 transition-colors"
              >
                Connect on WhatsApp →
              </a>
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-bold text-white hover:bg-white/10 transition-colors"
              >
                Return to PixelCraft Home
              </Link>
            </div>
          </motion.div>
        ) : (
          <div>
            <div className="mb-10 text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-fuchsia-300 mb-3 backdrop-blur-md">
                Fast-Track Booking
              </div>
              <h1 className="text-4xl font-black tracking-tight text-white md:text-5xl">
                Configure Your <span className="bg-gradient-to-r from-fuchsia-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">3D Website Project</span>
              </h1>
              <p className="mx-auto mt-3 max-w-xl text-sm text-white/60">
                Choose your package, tailor optional add-ons, and submit your project details. We begin discovery immediately upon review.
              </p>
            </div>

            <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
              {/* Form & Selection Options */}
              <div className="space-y-10">
                {/* 1. Step: Select Plan */}
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-fuchsia-500 text-xs font-black">1</span>
                    Select Your Agency Package
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-3">
                    {Object.values(plans).map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setSelectedPlanId(p.id)}
                        className={`relative rounded-2xl border p-5 text-left transition-all ${
                          selectedPlanId === p.id
                            ? "border-fuchsia-500 bg-fuchsia-500/15 shadow-[0_0_30px_rgba(236,72,153,0.3)] ring-1 ring-fuchsia-500"
                            : "border-white/10 bg-[#0c0a1a] hover:border-white/20"
                        }`}
                      >
                        <span className="text-[10px] font-bold uppercase tracking-wider text-fuchsia-400">
                          {p.badge}
                        </span>
                        <h3 className="mt-1 font-bold text-white text-base">{p.name}</h3>
                        <p className="mt-2 text-2xl font-black text-cyan-300">${p.price.toLocaleString()}</p>
                        <p className="mt-2 text-xs text-white/60 leading-relaxed">{p.tagline}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Step: Choose Add-ons */}
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500 text-xs font-black">2</span>
                    Enhance With Add-On Modules
                  </h2>
                  <div className="space-y-3">
                    {addOnsList.map((a) => {
                      const isChecked = selectedAddOns.includes(a.id);
                      return (
                        <div
                          key={a.id}
                          onClick={() => toggleAddOn(a.id)}
                          className={`flex items-start justify-between cursor-pointer rounded-2xl border p-4 transition-all ${
                            isChecked
                              ? "border-cyan-400/50 bg-cyan-500/10 shadow-sm"
                              : "border-white/10 bg-[#0c0a1a] hover:border-white/20"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => {}}
                              className="mt-1 h-4 w-4 rounded border-white/20 accent-cyan-400 cursor-pointer"
                            />
                            <div>
                              <p className="text-sm font-bold text-white">{a.name}</p>
                              <p className="text-xs text-white/50">{a.desc}</p>
                            </div>
                          </div>
                          <span className="text-sm font-bold text-cyan-300 shrink-0 ml-4">
                            +${a.price}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Step: Client Intake Form */}
                <form onSubmit={handleSubmit} id="order-form" className="space-y-5">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-pink-500 text-xs font-black">3</span>
                    Client &amp; Project Information
                  </h2>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-white/70">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-white/70">Business Email *</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="john@brand.com"
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-white/70">Company / Brand Name</label>
                      <input
                        type="text"
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        placeholder="Nexora Studio"
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-white/70">WhatsApp / Phone</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-white/70">Desired Launch Timeline</label>
                    <select
                      value={form.timeline}
                      onChange={(e) => setForm({ ...form, timeline: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-[#120a26] px-4 py-3 text-sm text-white focus:border-cyan-400 focus:outline-none"
                    >
                      <option>Urgent Sprint (Under 10 Days)</option>
                      <option>Standard (2-3 Weeks)</option>
                      <option>Flexible / Next Quarter</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-white/70">Special Requests or Project Notes</label>
                    <textarea
                      rows={3}
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      placeholder="Include references, desired 3D models, branding guidelines..."
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </form>
              </div>

              {/* Order Summary Sidebar */}
              <div className="lg:sticky lg:top-24 h-fit">
                <div className="rounded-3xl border border-white/15 bg-[#0b0a18]/90 p-6 backdrop-blur-xl shadow-2xl">
                  <h3 className="text-xl font-bold text-white border-b border-white/10 pb-4">
                    Order Summary
                  </h3>

                  <div className="mt-4 space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-semibold text-white">{activePlan.name}</span>
                      <span className="font-bold text-white">${activePlan.price.toLocaleString()}</span>
                    </div>

                    {selectedAddOns.length > 0 && (
                      <div className="pt-2 border-t border-white/5 space-y-2">
                        <p className="text-xs font-semibold text-white/50">Add-Ons Selected:</p>
                        {selectedAddOns.map((id) => {
                          const item = addOnsList.find((a) => a.id === id);
                          if (!item) return null;
                          return (
                            <div key={id} className="flex justify-between text-xs text-white/70">
                              <span>• {item.name}</span>
                              <span>+${item.price}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    <div className="pt-4 border-t border-white/10 flex justify-between items-baseline">
                      <div>
                        <span className="text-xs text-white/50 block">Total Scope Price</span>
                        <span className="text-xs text-emerald-400 font-medium">Cloudflare Deployment Included</span>
                      </div>
                      <span className="text-3xl font-black tracking-tight text-transparent bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-pink-400 bg-clip-text">
                        ${totalPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    form="order-form"
                    className="mt-6 w-full rounded-2xl bg-gradient-to-r from-fuchsia-500 via-pink-500 to-cyan-400 py-4 text-center text-sm font-bold text-white shadow-[0_0_30px_rgba(236,72,153,0.5)] transition-all hover:brightness-110 active:scale-[0.99]"
                  >
                    Confirm &amp; Place Order Request →
                  </button>

                  <div className="mt-4 space-y-2 text-center">
                    <p className="text-[11px] text-white/40">
                      🔒 No payment required today. An invoice and contract will be issued upon discovery call approval.
                    </p>
                    <p className="text-[11px] text-cyan-300/80">
                      ⚡ Cloudflare Edge CDN &amp; High-Availability Architecture Guaranteed.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function OrderPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#05040d] flex items-center justify-center text-white">Loading order configurator...</div>}>
      <OrderContent />
    </Suspense>
  );
}
