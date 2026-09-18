---
name: ui-ux-design-system
description: Design system guidelines, token standards, strict 4-color architecture (#10B981, #22C55E, #0A0A0A, #FFFFFF), typography scale, and component styling for FullStack 2A.
---

# UI/UX & Design System Standard · FullStack 2A

## 1. Color Palette (Zero Tolerance)
Only 4 colors are allowed in the core UI palette:
- Primary Green: `#10B981` (Emerald 500)
- Secondary Green: `#22C55E` (Green 500)
- Deep Black: `#0A0A0A` (Neutral 950)
- Crisp White: `#FFFFFF`
Strictly prohibited: `#14B8A6` (Teal), ambers, blues, purples, or random accents.

## 2. Typography
- Headings: `Plus Jakarta Sans`, font-black / font-extrabold, tracking-tight.
- Brand Signature: `Caveat` (`font-handwriting`), font-bold, tracking-wide.
- Body: `Inter` or system sans, high legibility, line-height 1.6.
- Monospace / Metrics: System Mono (`font-mono`), font-bold, uppercase tracking-wider.

## 3. Surface & Elevation (Light & Dark Mode)
- Dark Mode: Surface `#0A0A0A`, borders `rgba(255, 255, 255, 0.12)`, cards `rgba(255, 255, 255, 0.03)`.
- Light Mode: Surface `#FFFFFF`, borders `rgba(10, 10, 10, 0.12)`, cards `rgba(10, 10, 10, 0.02)`.
- Active Pill: `bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/35` with subtle indicator bar.
