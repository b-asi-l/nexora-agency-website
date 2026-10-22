# Project Documentation & Architecture Report: PixelCraft

**Project Name:** PixelCraft — 3D WebGL Digital Agency Platform  
**Repository:** [github.com/b-asi-l/nexora-agency-website](https://github.com/b-asi-l/nexora-agency-website)  
**Production Hosting Target:** Cloudflare Pages (Global Edge CDN)  
**Date of Report:** October 2026  
**Document Version:** 1.0.0  

---

## 1. Executive Summary

**PixelCraft** is a cutting-edge interactive digital agency web platform engineered to deliver award-winning, immersive 3D WebGL experiences for high-growth startups, luxury brands, e-commerce retailers, and enterprise organizations.

- **Brand Tagline:** *"Websites That Make Brands Impossible to Ignore."*
- **Core Positioning:** Merging high-fidelity 3D spatial computing with high-conversion web engineering, transforming static web design into memorable, interactive digital worlds that achieve high dwell time and superior conversion rates.
- **Key Deliverables:** 
  - Complete Next.js 15 App Router website with dynamic WebGL scenes.
  - Interactive 3D Product Configurator with live material and shader controls.
  - Executive Leadership showcase with high-resolution portraits and custom role definitions.
  - Full commercial sales funnel including interactive pricing and a dedicated Order intake system (`/order`).
  - Production-ready Cloudflare Pages static export configuration.

---

## 2. Executive Leadership Structure

The organization is driven by a five-person executive committee governing strategy, operations, marketing, management, and capital:

| Name | Executive Role & Title | Core Responsibilities |
| :--- | :--- | :--- |
| **Amal Raj** | **Chief Executive Officer (CEO & Co-Founder)** | Overall corporate vision, global market expansion, agency positioning, and technological innovation. |
| **Alen Mathews** | **Operation & Logistics Manager** | Production sprints, client delivery pipelines, resource allocation, and cross-functional agile logistics. |
| **Ananthapadmanabhan S.** | **Chief Marketing Officer (CMO & Growth Director)** | Brand narrative, inbound client acquisition, viral digital showcases, and partner ecosystems. |
| **Basil Mathew** | **Managing Director (MD)** | Corporate governance, high-ticket enterprise agreements, client relationship management, and legal strategy. |
| **Abhai Prathap** | **Chief Financial Officer (CFO & Head of Capital)** | Fiscal modeling, cash flow management, international billing infrastructure, and investor relations. |

---

## 3. Technology Stack & Technical Architecture

The platform was built using modern web development and 3D graphics technologies:

### 3.1. Core Framework & Language
- **Next.js 15 (App Router):** Modern React architecture featuring static site generation (`output: 'export'`), route optimization, and code splitting.
- **React 19:** State-of-the-art component architecture leveraging modern hooks and dynamic client boundaries.
- **TypeScript 5:** Type-safe development across all component interfaces, props, and data models.

### 3.2. 3D Graphics & Shader Engineering
- **Three.js (WebGL):** 3D scene graph, camera rigs, geometry generation, and lighting systems.
- **@react-three/fiber (R3F):** Declarative React reconciler for Three.js, enabling reactive state bindings within the canvas.
- **@react-three/drei:** Specialized 3D utilities including `OrbitControls`, `Float`, `Environment`, and `ContactShadows`.
- **Custom GLSL Shaders:** Bespoke Vertex and Fragment shaders for procedural fluid wave simulation with real-time time-step uniforms.

### 3.3. Animation, Styling & UX
- **Tailwind CSS 3.4:** Custom design tokens, dark futuristic palette (`#05040d`), custom glassmorphism borders, and neon gradient utilities.
- **GSAP (GreenSock) & ScrollTrigger:** High-performance scroll-scrubbed camera choreography and spatial navigation.
- **Framer Motion 11:** Fluid layout transitions, floating micro-interactions, and modal animations.
- **Typography:** Google Fonts (`Plus Jakarta Sans`) integrated with custom typography hierarchies.

---

## 4. Key Website Sections & Functional Breakdown

### 4.1. Global Navigation (`components/Nav.tsx`)
- Fixed frosted glass header (`backdrop-blur-2xl`) with responsive state management.
- Quick-scroll anchors to `#services`, `#editor`, `#usecases`, `#pricing`, `#team`, and `#contact`.
- Quick-action buttons: "Get In Touch" and "Order Project →" linked directly to the checkout funnel.
- Animated mobile drawer with touch navigation.

### 4.2. Cinematic 3D Hero Scene (`components/Hero.tsx` & `components/HeroScene.tsx`)
- **Liquid Wave Simulation:** Real-time GLSL shader plane displaying oscillating sine/cosine vertex deformation.
- **Interactive Aquatic Physics:** 3D animated model tracking pointer/cursor positions (`x`, `y`) with lerped rotations and wagging fin kinematics.
- **Depth Spheres:** 14 floating refractive glass spheres rendered with dynamic transmission, thickness, and `sunset` HDR environment lighting.
- **Scroll Rig:** Camera coordinates smoothly interpolated along the Z and Y axes via GSAP ScrollTrigger as the user begins scrolling.

### 4.3. Interactive 3D Configurator Studio (`components/EditorMock.tsx` & `components/SneakerScene.tsx`)
- Interactive 3D viewport allowing users to click and drag to rotate the 3D model.
- **Transform Sliders:** Real-time adjustments to X, Y, and Z position coordinates with live numerical feedback.
- **Color Picker:** Dynamic hex color input that updates emissive and diffuse physical materials instantly.
- **Material Shaders:** Toggle between high-gloss clearcoat and metallic reflective shaders.
- **Scene Graph Explorer:** Visual layer hierarchy showcasing professional studio tooling.

### 4.4. Production Pipeline (`components/Pipeline.tsx`)
- 3-step structured client journey:
  1. *Discovery & 3D Concept* (Interactive 3D wireframe cube)
  2. *Custom Modeling & Shaders* (SVG architectural blueprint preview)
  3. *Optimization & Edge Launch* (Interactive 3D glowing torus)

### 4.5. Case Studies Grid (`components/UseCases.tsx`)
- Bento-grid layout detailing commercial success across:
  - *E-Commerce & Luxury Brands* (+42% Average Sales Lift)
  - *SaaS & High-Tech Startups* (3.5x Dwell Time on Site)
  - *Creative Agencies & Portfolios* (Awwwards SOTD Benchmarks)
  - *Cinematic Storytelling & Brand Worlds* (High brand recall)

### 4.6. Transparent Pricing Engine (`components/Pricing.tsx`)
- **Interactive Scope Toggle:** Switch between Standard Scope and Annual Package (featuring an automated 20% discount badge).
- **Three Strategic Tiers:**
  - **Starter 3D Web ($1,499):** High-impact single-page presence.
  - **Growth Brand Experience ($3,499 - Most Popular):** Multi-scene WebGL platform with custom shaders and configurator.
  - **Enterprise Bespoke WebGL ($7,999+):** Large-scale virtual worlds, physics engines, and custom SLA support.
- Direct CTA routing passing selected plan identifiers to the checkout funnel (`/order?plan=...`).

### 4.7. Executive Leadership Grid (`components/Team.tsx`)
- Visual display of all 5 executive team members with high-resolution portraits, role tags, biographies, and direct LinkedIn/X/Email channels.
- Glassmorphic card styling with customized hover gradients.

### 4.8. Contact & Social Channels Hub (`components/Contact.tsx`)
- Interactive project inquiry form with real-time input validation and animated submission feedback.
- Direct studio channels: Email (`hello@pixelcraft.agency`), WhatsApp direct link, and global studio locations.
- Official social channel buttons: GitHub, X (Twitter), LinkedIn, Instagram, and Discord.

### 4.9. Dedicated Order & Checkout Portal (`app/order/page.tsx`)
- Standalone conversion portal accessible at `/order`.
- **Modular Add-On Configurator:**
  - *Custom 3D Object Modeling (GLTF/GLB)* (+$450)
  - *Spatial Audio & Sound Design* (+$300)
  - *7-Day Fast-Track Delivery* (+$600)
  - *Cloudflare Edge Global CDN & DNS Suite* (+$250)
- **Real-Time Calculator:** Automatically sums base package fees and selected modular add-ons.
- **Order Generation:** Creates an encrypted reference token (e.g., `#PC-892401`) upon submission and formats a 1-click WhatsApp message to initiate discovery.

### 4.10. Bioluminescent 3D Jellyfish Footer (`components/FooterCTA.tsx` & `components/JellyScene.tsx`)
- Custom canvas with floating bioluminescent procedural jellyfish navigating three-dimensional underwater fog.
- Full sitemap navigation, legal notices, and Cloudflare Pages deployment badge.

---

## 5. Deployment & Cloudflare Infrastructure

The application is structured for deployment on **Cloudflare Pages**:

```
Git Push -> Cloudflare CI/CD -> npm run build -> /out Static Export -> Global Edge CDN
```

### 5.1. Static Export Configuration (`next.config.js`)
- Configured with `output: 'export'` and `images: { unoptimized: true }` to compile all pages into raw HTML, CSS, JavaScript chunks, and static assets in the `/out` folder.
- Eliminates Node.js server overhead, memory leaks, and cold start latency.

### 5.2. Edge Caching & Security Headers (`public/_headers`)
- Enforces strict security policies:
  - `X-Frame-Options: SAMEORIGIN` (prevents clickjacking)
  - `X-Content-Type-Options: nosniff` (prevents MIME-type sniffing)
  - `Referrer-Policy: strict-origin-when-cross-origin`
- Configures immutable one-year cache headers (`Cache-Control: public, max-age=31536000, immutable`) for all compiled `/_next/static/*` assets.

---

## 6. Project Directory Structure

```
├── app/
│   ├── globals.css          # Design system, Plus Jakarta Sans font, custom scrollbar
│   ├── layout.tsx           # Root metadata & HTML structure
│   ├── page.tsx             # Main agency landing page combining all sections
│   └── order/
│       └── page.tsx         # Dedicated project configuration & order checkout page
├── components/
│   ├── Contact.tsx          # Interactive contact form & social media hub
│   ├── EditorMock.tsx       # Live 3D product configurator wrapper & controls
│   ├── FooterCTA.tsx        # Footer sitemap & 3D Jellyfish canvas
│   ├── Hero.tsx             # Hero typography, CTA buttons & 3D scene wrapper
│   ├── HeroScene.tsx        # WebGL fluid wave shader & animated fish model
│   ├── JellyScene.tsx       # Procedural floating bioluminescent jellyfish
│   ├── MiniShape.tsx        # Interactive rotating cube/torus for pipeline steps
│   ├── Nav.tsx              # Sticky frosted header & mobile drawer
│   ├── Pipeline.tsx         # 3-step production methodology cards
│   ├── Pricing.tsx          # Pricing plans with billing toggle & feature matrix
│   ├── SneakerScene.tsx     # 3D interactive model with OrbitControls & PBR shaders
│   ├── Team.tsx             # Executive leadership showcase (5 executive members)
│   └── UseCases.tsx         # Bento-grid industry case studies
├── public/
│   ├── _headers             # Cloudflare Pages edge security & cache headers
│   └── team/                # High-resolution executive portrait images
│       ├── amal_raj.jpg            # Amal Raj (CEO)
│       ├── alen_mathews.jpg        # Alen Mathews (Operations)
│       ├── ananthapadmanabhan.jpg  # Ananthapadmanabhan S. (CMO)
│       ├── basil_mathew.jpg        # Basil Mathew (MD)
│       └── abhai_prathap.jpg       # Abhai Prathap (CFO)
├── next.config.js           # Next.js standalone output & package transpilation config
├── open-next.config.ts      # Cloudflare OpenNext adapter configuration
├── wrangler.jsonc           # Cloudflare Worker deployment config with .open-next assets
├── tailwind.config.js       # Color tokens, neon gradients & layout presets
└── package.json             # Project dependencies & build scripts
```

---

## 7. Performance & Optimization Highlights

1. **60 FPS Hardware-Accelerated Rendering:** WebGL components run on the client's GPU via dedicated canvas contexts with `AdaptiveDpr` pixel scaling.
2. **Client-Side Code Splitting:** 3D canvases are imported dynamically via `next/dynamic` with `{ ssr: false }`, ensuring lightweight initial page loads and fast server-side generation.
3. **Responsive Viewports:** Layouts, 3D canvases, and navigation automatically adapt across mobile phones, tablets, and ultrawide desktop monitors.
4. **Zero-Database Lightweight Intake:** Contact and order workflows generate instant, client-facing transaction tokens and pre-formatted WhatsApp direct links, enabling zero-friction lead capture without database maintenance.
