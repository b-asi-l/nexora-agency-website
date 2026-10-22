# PixelCraft — Award-Winning 3D WebGL Agency Website

> **"Websites That Make Brands Impossible to Ignore."**

PixelCraft is a high-performance 3D WebGL digital agency website built with Next.js 15, React 19, Three.js, React Three Fiber, GSAP, and Tailwind CSS.

---

## 🚀 Features

- **Cinematic 3D Hero Scene**: Real-time WebGL fluid wave shader, floating glass spheres, interactive aquatic physics, and smooth GSAP camera choreography.
- **Interactive 3D Configurator (`#editor`)**: Real-time 3D object rotation, dynamic color picker, position XYZ sliders, and metallic/glossy shader toggles.
- **3-Step Production Pipeline (`#services`)**: Interactive 3D miniature geometry cubes and toruses illustrating client onboarding.
- **Case Studies Grid (`#usecases`)**: High-conversion bento cards for E-Commerce, SaaS, Portfolios, and Brand Worlds.
- **Transparent Pricing Packages (`#pricing`)**: Monthly vs. Annual switcher (with 20% discount badge), feature checklists, and direct order links.
- **Executive Leadership Team (`#team`)**:
  1. **Amal Raj** — Chief Executive Officer (CEO & Co-Founder)
  2. **Alen Mathews** — Operation & Logistics Manager
  3. **Ananthapadmanabhan S.** — Chief Marketing Officer (CMO & Growth Director)
  4. **Basil Mathew** — Managing Director (MD)
  5. **Abhai Prathap** — Chief Financial Officer (CFO & Head of Capital)
- **Direct Contact & Social Media Hub (`#contact`)**:
  - Live interactive project inquiry form
  - Direct WhatsApp and Email links
  - Social media channel buttons (GitHub, X/Twitter, LinkedIn, Instagram, Discord)
- **Dedicated Project Order Page (`/order`)**:
  - Interactive package selector (Starter, Growth, Enterprise)
  - Modular Add-ons (Custom 3D Modeling, Spatial Audio, 7-Day Fast Track, Cloudflare Edge Suite)
  - Real-time live total price calculator
  - Order submission with instant order ID generation and pre-filled WhatsApp message connect.

---

## ⚡ Cloudflare Deployment Options

The project is pre-configured with static export (`output: 'export'` in `next.config.js`), a root `worker.js` static proxy, `wrangler.json`, and an automatic patch script that prevents unwanted OpenNext migration.

### Option A: Cloudflare Workers (CI/CD via GitHub)
If you connected your repository to Cloudflare Workers:
1. In Cloudflare Dashboard -> **Workers & Pages** -> Select **pixelcraft** -> **Settings** -> **Builds**.
2. Set the build configurations:
   - **Build command**: `npm run build`
   - **Deploy command**: `npx wrangler deploy --no-autoconfig` *(or `npm run deploy`)*
3. Click **Save**.

### Option B: Cloudflare Pages (Recommended Zero-Config)
If deploying via Cloudflare Pages:
1. Navigate to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
2. Select `b-asi-l/nexora-agency-website`.
3. Set:
   - **Framework preset**: `None` or `Next.js (Static HTML Export)`
   - **Build command**: `npm run build`
   - **Build output directory**: `out`
   - **Deploy command**: *(Leave blank)*
4. Click **Save and Deploy**.

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for static export (outputs to /out)
npm run build
```

---

## 🛠️ Tech Stack
- **Framework**: Next.js 15 (App Router, Static Export)
- **3D Engine**: Three.js, @react-three/fiber, @react-three/drei
- **Motion & Physics**: GSAP, Framer Motion
- **Styling**: Tailwind CSS, Vanilla CSS, Plus Jakarta Sans
- **Hosting**: Cloudflare Pages / Edge Global CDN
