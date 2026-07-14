# 🎨 Portfolio Design System & Style Guide (`design.md`)

> **Comprehensive Design Specification for the Portfolio Project**  
> *Use this guide to replicate, maintain, or adapt the exact visual aesthetic, color tokens, typography, component behaviors, glassmorphism effects, keyframe animations, and micro-interactions across any project.*

---

## 📐 1. Core Aesthetic Principles

- **Theme Style**: Dark Mode Cyber-Minimalism with High-Precision Glassmorphism, Neon Glow Accents, and Dynamic 3D/Canvas visuals.
- **Background Philosophy**: Deep obsidian background (`#0F0E0E`) enriched with subtle animated aurora mesh blurs, starfield particle canvases, and soft radial glows.
- **Lighting & Contrast**: Pure white typography (`#FFFFFF`) against rich dark cards (`#171616`), energized by warm orange-to-magenta primary gradients (`#FF0000` -> `#FF1493` -> `#FF8C00`).
- **Interactive Depth**: Physics-driven magnetic buttons, spotlight mouse-tracking card borders, customized dual-ring glowing cursor, smooth inertia scrolling (Lenis), and interactive 3D canvas objects.

---

## 🎨 2. Color Palette & Tokens

### 2.1 Brand & Surface Colors
| Token Name | HEX / Value | CSS Variable | Usage Description |
| :--- | :--- | :--- | :--- |
| **Background** | `#0F0E0E` | `var(--color-bg)` | Main page canvas background |
| **Card Background** | `#171616` | `var(--color-card)` | Primary container / Bento card background |
| **Primary Accent** | `#FF8C00` | `var(--color-primary)` | Dark Orange / Highlight accents & glows |
| **Secondary Accent** | `#FF5F00` | `var(--color-secondary)` | Deep Amber-Orange for interactive states |
| **Pink Glow Accent** | `#FF1493` | `var(--color-pink)` | Deep Pink for active ring cursor & gradient mids |
| **Red Accent** | `#FF0000` | `var(--color-red)` | Vibrant Red for primary gradient start |
| **Text Muted** | `#B3B3B3` | `var(--color-muted)` | Subtitles, captions, body descriptions |
| **Border Transparent**| `rgba(255,255,255,0.06)`| `var(--color-border)` | Subtle glass borders for cards and inputs |
| **GitHub Green** | `#39d353` | `var(--color-green)` | Activity / Terminal success / Click feedback |
| **Cyber Blue** | `#00D2FF` | `var(--color-blue)` | Terminal accents / Project highlights |

### 2.2 Gradient Specifications
```css
/* Primary Signature Brand Gradient */
--gradient-primary: linear-gradient(135deg, #FF0000 0%, #FF1493 50%, #FF8C00 100%);

/* Hover State Primary Gradient */
--gradient-primary-hover: linear-gradient(135deg, #FF2020 0%, #FF3AA3 50%, #FFA020 100%);

/* Secondary Orange Gradient */
--gradient-orange: linear-gradient(135deg, #FF8C00 0%, #FF5F00 100%);

/* Fire Marquee Strip Gradient */
--gradient-fire: linear-gradient(90deg, #f97316 0%, #ef4444 33%, #ec4899 66%, #f97316 100%);

/* Secondary Dark Glass Marquee Gradient */
--gradient-glass-strip: linear-gradient(90deg, rgba(20,20,22,0.95) 0%, rgba(28,28,30,0.98) 25%, rgba(35,35,38,0.95) 50%, rgba(28,28,30,0.98) 75%, rgba(20,20,22,0.95) 100%);

/* GitHub Activity Green Conic Border */
--gradient-conic-green: conic-gradient(from var(--angle), #26a641, #39d353, #0F0E0E 30%, #0F0E0E 70%, #39d353, #26a641);

/* Cyber Blue Conic Border */
--gradient-conic-blue: conic-gradient(from var(--angle), #00D2FF, #0A84FF, #0F0E0E 30%, #0F0E0E 70%, #0A84FF, #00D2FF);

/* Orange Conic Border */
--gradient-conic-orange: conic-gradient(from var(--angle), #FF8C00, #FF5F00, #0F0E0E 30%, #0F0E0E 70%, #FF5F00, #FF8C00);
```

### 2.3 Shadow & Glow Tokens
```css
/* Soft Ambient Orange Glow */
box-shadow: 0 0 40px rgba(255, 140, 0, 0.3);

/* Intense Large Orange Glow */
box-shadow: 0 0 60px rgba(255, 140, 0, 0.4);

/* Glass Card Elevation Shadow */
box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);

/* Primary Button Glow Shadow */
box-shadow: 0 4px 24px rgba(255, 20, 147, 0.32), 0 0 60px rgba(255, 140, 0, 0.14);
```

---

## 🔤 3. Typography System & Font Families

The typography pairs modern geometric sans-serif fonts with elegant editorial serif fonts for contrast:

| Font Family | Font Variable | Google Font Name | Primary Purpose / Role |
| :--- | :--- | :--- | :--- |
| **Geist Sans** | `--font-geist-sans` | `Geist` | Default UI text, body copy, layout navigation |
| **Geist Mono** | `--font-geist-mono` | `Geist Mono` | Code blocks, technical metrics, timestamps |
| **Plus Jakarta Sans**| `--font-plus-jakarta-sans`| `Plus Jakarta Sans` | High-impact bold display titles & fire marquee |
| **Instrument Serif** | `--font-instrument` | `Instrument Serif` (Italic) | Editorial highlighted words, italic marquee text |
| **Bebas Neue** | `--font-bebas-neue` | `Bebas Neue` | Bold uppercase section headers & stats |
| **Playfair Display** | `--font-playfair-display`| `Playfair Display` | Classic luxury editorial subtitles |
| **Space Grotesk** | `--font-space-grotesk` | `Space Grotesk` | Tech labels, tags, subheadings |
| **Outfit** | `--font-outfit` | `Outfit` | Secondary UI headings & component text |

### 3.1 Typography Tailwind Classes & Utilities
```css
/* Gradient Text Fill Utility */
.text-gradient {
  background: linear-gradient(135deg, #FF8C00 0%, #FF5F00 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Primary Rainbow Brand Gradient Text */
.text-primary-gradient {
  background: linear-gradient(135deg, #FF0000 0%, #FF1493 50%, #FF8C00 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Hollow Stroke Text Utility */
.stroke-text {
  color: transparent !important;
  -webkit-text-fill-color: transparent !important;
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.45);
  transition: all 0.35s ease-out;
}

.stroke-text:hover {
  -webkit-text-stroke: 1.1px rgba(255, 255, 255, 0.9);
}
```

---

## ⚡ 4. Layout, Breakpoints & Spacing

### 4.1 Responsive Breakpoints
```ts
screens: {
  'xs':  '375px',   // Mobile Small
  'sm':  '640px',   // Mobile Large / Tablet Small
  'md':  '768px',   // Tablet
  'lg':  '1024px',  // Laptop / Desktop Small
  'xl':  '1280px',  // Desktop Standard
  '2xl': '1536px',  // Ultra-wide Screens
}
```

### 4.2 Container Padding Standard
```ts
container: {
  center: true,
  padding: {
    DEFAULT: '1rem',
    sm: '2rem',
    lg: '4rem',
    xl: '5rem',
    '2xl': '6rem',
  },
}
```

---

## 💫 5. Animation System & Keyframes

### 5.1 CSS Keyframes (`animations.css`)

```css
/* Fade In Entrance */
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

/* Slide Up Entrance */
@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to   { transform: translateY(0); opacity: 1; }
}

/* Ambient Floating Orbs */
@keyframes float {
  0%, 100% { transform: translate(0, 0); }
  33%      { transform: translate(30px, -30px); }
  66%      { transform: translate(-20px, 20px); }
}

/* Pulse Glow */
@keyframes glow {
  0%, 100% { opacity: 0.5; }
  50%      { opacity: 0.8; }
}

/* Clockwise Conic Border Angle Animation */
@property --angle {
  syntax: "<angle>";
  inherits: false;
  initial-value: 0deg;
}

@keyframes animate-angle {
  0%   { --angle: 0deg; }
  100% { --angle: 360deg; }
}

/* Rotating Navbar Border */
@keyframes navbar-border-spin {
  0%   { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}
```

---

## 🧩 6. Reusable Component Specifications

### 6.1 Custom Dual-Layer Cursor (`CustomCursor.tsx`)
- **Structure**: Inner solid dot (`5px`) + outer ring circle (`24px`).
- **Default Ring Style**: `border: 1.25px solid rgba(255, 255, 255, 0.62)`.
- **Hover Interactive State**: Ring scales up to `1.6x`, border turns Pink (`#FF1493`), dot scales down to `0.4x` and turns Orange (`#FF8C00`).
- **Click State**: Ring shrinks to `0.9x`, turns GitHub Green (`#39d353`).
- **Text Input State**: Cursor dims to `opacity: 0.15` to preserve native caret visibility.

### 6.2 Primary & Secondary Buttons (`Button.tsx`)
```css
/* Primary Button: Multi-layer gradient background with smooth position shift */
.btn-primary {
  background: linear-gradient(135deg, #FF5C29 0%, #FF1493 55%, #FF8C00 100%);
  background-size: 200% 200%;
  box-shadow: 0 2px 12px rgba(255, 92, 41, 0.2), inset 0 0 0 1px rgba(255, 255, 255, 0.06);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.btn-primary:hover {
  background-position: 100% 100%;
  box-shadow: 0 4px 24px rgba(255, 20, 147, 0.32), 0 0 60px rgba(255, 140, 0, 0.14), inset 0 0 0 1px rgba(255, 255, 255, 0.12);
}

/* Secondary Button: Glassmorphic background */
.btn-secondary {
  background: rgba(255, 255, 255, 0.04);
  border: 1.5px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(12px);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.25);
  box-shadow: 0 4px 20px rgba(255, 255, 255, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.1);
}
```

### 6.3 Glowing Conic Border Buttons (`glowing-border-btn`)
- **Mechanism**: Pseudo-element `::after` running `conic-gradient` with `@property --angle` keyframe rotation.
- **Orange Variant**: `conic-gradient(from var(--angle), #FF8C00, #FF5F00, #0F0E0E 30%, #0F0E0E 70%, #FF5F00, #FF8C00)`
- **Green Variant**: `conic-gradient(from var(--angle), #26a641, #39d353, #0F0E0E 30%, #0F0E0E 70%, #39d353, #26a641)`
- **Blue Variant**: `conic-gradient(from var(--angle), #00D2FF, #0A84FF, #0F0E0E 30%, #0F0E0E 70%, #0A84FF, #00D2FF)`
- **Hover Reaction**: Speed accelerates from `3.5s` to `1.5s` cycle with `drop-shadow` intensity boost.

### 6.4 Spotlight Mouse-Tracking Cards (`GlowCard.tsx`)
- **Border Technique**: Uses CSS Mask XOR (`WebkitMask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`).
- **Light Position**: Dynamic CSS properties `--glow-x` and `--glow-y` updated via RAF (`requestAnimationFrame`) or pointer move.
- **Radial Gradient Fill**: `radial-gradient(200px circle at var(--glow-x) var(--glow-y), rgba(255, 140, 0, 1), transparent 45%)`.

### 6.5 Floating Pill Navbar (`Navbar.tsx`)
- **Pill Shape**: `rounded-full`, fixed top position with auto scroll hide/reveal logic.
- **Glass Effect**: `background: rgba(15, 14, 14, 0.4)`, `backdrop-filter: blur(8px)`, `border-color: rgba(255, 255, 255, 0.05)`.
- **Rotating Outline**: Outer border masked container with `conic-gradient(from 0deg, #ffffff, rgba(255, 255, 255, 0.2) 25%, rgba(255, 255, 255, 0.2) 75%, #ffffff)` spinning endlessly.

### 6.6 Dual Infinite Marquee Strips (`HeroStrips.tsx`)
1. **Primary Fire Marquee**:
   - Background: `linear-gradient(90deg, #f97316, #ef4444, #ec4899, #f97316)`
   - Typography: `Plus Jakarta Sans`, Font Weight `800`, Uppercase, `clamp(1.5rem, 4vw, 3.75rem)`
   - Animation Speed: 25s seamless infinite transform scroll.
2. **Secondary Dark Glass Marquee**:
   - Background: Dark Glassmorphic gradient with `backdrop-filter: blur(20px)`
   - Typography: `Instrument Serif`, Italic, `clamp(1.5rem, 5vw, 3rem)`
   - Separator Icon: Diamond `✦` (`marquee-separator`)

### 6.7 Glowing White Scrollbar with Blurred Ends (`globals.css`)
```css
html {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.45) transparent;
}

::-webkit-scrollbar {
  width: 16px;
  height: 16px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, transparent 0%, rgba(255, 255, 255, 0.45) 8%, rgba(255, 255, 255, 0.45) 92%, transparent 100%);
  border-radius: 9999px;
  border: 5px solid transparent;
  background-clip: padding-box;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.8), inset 0 0 3px rgba(255, 255, 255, 0.4);
  transition: all 0.3s ease;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, transparent 0%, rgba(255, 255, 255, 0.9) 8%, rgba(255, 255, 255, 0.9) 92%, transparent 100%);
  background-clip: padding-box;
  box-shadow: 0 0 18px rgba(255, 255, 255, 1), inset 0 0 5px rgba(255, 255, 255, 0.6);
}
```

---

## 🌌 7. Background Canvas & Atmosphere Effects

1. **Aurora Mesh Background (`AuroraMeshBackground.tsx`)**:
   - 5 large floating radial blur orbs (`blur(100px)`) positioned behind content:
     - Orb 1 (Navy): `#1e3a8a`, opacity `0.35`
     - Orb 2 (Purple): `#5b21b6`, opacity `0.40`
     - Orb 3 (Emerald): `#065f46`, opacity `0.30`
     - Orb 4 (Magenta): `#831843`, opacity `0.35`
     - Orb 5 (Teal): `#0f766e`, opacity `0.25`
   - Alternate floating keyframes over 14s - 20s.

2. **Custom Particle Stars (`CustomParticleBackground.tsx`)**:
   - Interactive HTML5 Canvas rendering floating star particles with distance connecting lines and mouse particle repulsion/attraction.

3. **Matrix Rain Canvas (`MatrixRain.tsx`)**:
   - Falling green binary/alphanumeric characters (`#39d353`) for terminal or developer sandboxes.

---

## 🛠️ 8. Integration Checklist for Other Projects

To apply this portfolio's design to any external React / Next.js / HTML project:

1. **Copy Global CSS & Keyframes**:
   - Import `globals.css`, `animations.css`, and `theme.css`.
2. **Configure Tailwind Configuration**:
   - Merge the `theme.extend` tokens for `colors`, `fontFamily`, `boxShadow`, `backgroundImage`, and `keyframes` into `tailwind.config.ts`.
3. **Load Font Families**:
   - Include Google Fonts: `Geist`, `Geist Mono`, `Plus Jakarta Sans`, `Instrument Serif`, `Bebas Neue`, `Playfair Display`, `Space Grotesk`, `Outfit`.
4. **Copy Core UI Components**:
   - `Button.tsx` (Primary, Secondary, Ghost, Shimmer, Magnetic)
   - `GlowCard.tsx` & `GlowCardGroup` (Spotlight cards)
   - `CustomCursor.tsx` (Dual-layer interactive cursor)
   - `SectionHeading.tsx` (Gradient badges & highlighted typography)
5. **Apply Glassmorphic & Conic Styling**:
   - Use `.btn-primary`, `.btn-secondary`, `.glowing-border-btn`, `.marquee-strip-fire-bg`, `.marquee-strip-secondary`.

---

> **Design System Version**: `1.0.0`  
> **Maintainer**: Heet Soni (`Heet-bhagwat10`)
