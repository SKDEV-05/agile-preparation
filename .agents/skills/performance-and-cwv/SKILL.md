---
name: performance-and-cwv
description: Core Web Vitals optimization guidelines, bundle minimization, rendering budgets, and lightweight execution patterns.
---

# Performance & Core Web Vitals Standard · FullStack 2A

## 1. Metric Targets
- LCP (Largest Contentful Paint): < 1.2s.
- INP (Interaction to Next Paint): < 50ms.
- CLS (Cumulative Layout Shift): 0.00.

## 2. Best Practices
- Code Splitting: Lazy load heavy simulator modules and route views (`React.lazy`).
- Asset Optimization: Modern formats (WebP/SVG), explicit width/height attributes to prevent layout shift.
- Fast Render: Eliminate heavy 3D engine overhead when modern SVG / Canvas / CSS provides faster, crisper rendering.
- State Throttling: Debounce search inputs, throttle scroll observers.
