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
  1. **Abhai Prathap** — Chief Executive Officer (CEO)
  2. **Ananthapadmanabhan S.** — Operations and Logistics Manager
  3. **Amal Raj** — Chief Marketing Officer (CMO)
  4. **Alen Mathews** — Managing Director (MD)
  5. **Basil Mathew** — Chief Financial Officer (CFO)
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

## ⚡ Cloudflare Pages Deployment (Step-by-Step)

The project is already pre-configured for static export (`output: 'export'` in `next.config.js`).

### Method 1: Connect via GitHub (Automatic CI/CD — Recommended)
1. Log in to your [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. In the left sidebar, navigate to **Compute (Workers & Pages)** > **Pages**.
3. Click **Connect to Git** and choose **GitHub**.
4. Select your repository: `b-asi-l/nexora-agency-website`.
5. In the Build Configuration settings:
   - **Framework preset**: `Next.js (Static HTML Export)` or `None`
   - **Build command**: `npm run build`
   - **Build output directory**: `out`
   - **Root directory**: `/` (leave default)
6. Click **Save and Deploy**.
7. Cloudflare will automatically build and publish your website globally to a free `*.pages.dev` subdomain with automatic SSL!

### Method 2: Direct Wrangler CLI Deployment
If you prefer deploying directly from your terminal:
```bash
# Install Wrangler globally or run via npx
npx wrangler pages deploy out --project-name=pixelcraft-agency
```

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
