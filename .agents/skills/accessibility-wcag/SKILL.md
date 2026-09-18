---
name: accessibility-wcag
description: Accessibility and WCAG guidelines, keyboard navigation, focus ring standards, color contrast, and assistive technology support.
---

# Accessibility & WCAG Standards · FullStack 2A

## 1. Keyboard Navigation
- All interactive controls must be reachable via `Tab` and activatable via `Enter` or `Space`.
- Focus Indicators: `focus-visible:ring-2 focus-visible:ring-[#10B981] focus-visible:outline-none focus-visible:ring-offset-2`.
- Modal / Drawer Trap: Esc key closes overlays; focus restored to trigger on exit.
- Specialized Shortcuts: 
  - QCM: Keys `1`, `2`, `3`, `4` select options; `Enter` validates.
  - Search: `Cmd+K` / `Ctrl+K` toggles command palette.
  - Flashcards: `Space` flips card, `ArrowRight` / `ArrowLeft` navigates.

## 2. Color Contrast & Legibility
- Minimum contrast ratio 4.5:1 for normal text and 3:1 for large text / UI borders.
- Information must never be communicated by color alone: always pair icons, labels, or checkmarks with color cues.
