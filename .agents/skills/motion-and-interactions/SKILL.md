---
name: motion-and-interactions
description: Motion design principles, spring physics, scroll-driven staggered reveals, Canvas proximity grid, micro-interactions, and prefers-reduced-motion standards.
---

# Motion & Interaction Design Standard · FullStack 2A

## 1. Core Principles
- "WOW through quality of motion, not quantity of motion."
- Fast, snappy, natural physics: 200ms - 350ms duration, cubic-bezier(0.16, 1, 0.3, 1) or spring dampening.
- GPU accelerated: Only animate `transform` and `opacity`. Never animate `width`, `height`, `top`, or `box-shadow` directly.

## 2. Scroll-Driven Animations
- Progressive reveal using `IntersectionObserver` with threshold 0.1.
- Gentle upward translation: `translateY(12px) ➔ translateY(0px)` with fade-in.
- Staggered children reveals (50ms offset).
- Zero scroll-jacking: Native scroll momentum is always preserved.

## 3. Interactive Digital Notebook Grid
- Implemented in high-performance HTML5 Canvas with `pointer-events: none`.
- Proximity radius (120px) where nearby square grid vertices subtly illuminate with low-opacity green (`#10B981` / `#22C55E`).
- Throttled with `requestAnimationFrame`. Automatically disabled on touch screens and under `prefers-reduced-motion`.

## 4. Accessibility
- `@media (prefers-reduced-motion: reduce)`: All translations set to 0, transitions reduced to instant opacity fades.
