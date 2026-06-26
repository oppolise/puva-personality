# 4 ผู้ว่า 4 You Design Notes

## Reference

Primary inspiration:
- `https://www.atompakon.co/cats`
- Thai quiz flow linked from that page on OOOPEN Lab

Observed style:
- Soft creator-made quiz page, not a polished product dashboard.
- Large friendly illustration first, then short centered copy and a simple start button.
- Quiz screen is one centered card with generous whitespace.
- Questions are calm and short; answers are pill-like white buttons with thin gray borders.
- Tone says "เล่นขำ ๆ" clearly, so the user does not over-read the result.

Do not copy:
- Do not reuse the cat artwork, exact page assets, logo, or OOOPEN Lab UI.
- Do not reproduce the exact cat quiz questions or result structure.
- Keep this as an original Bangkok governor parody quiz using our own copy, colors, and illustrations.

## Visual Direction

The site should feel like a small illustrated internet quiz/zine:
- Background: warm off-white paper.
- Main surfaces: white print-card panels with thin borders.
- Illustration: simple handmade city/poster shapes, not realistic photos.
- Layout: single-column, centered, mobile-first.
- Buttons: rounded pill CTA and soft answer pills.
- Copy: Thai-first, casual, a little silly, never administrative.

Core tokens:
- Paper: `#f9f8f6`
- Ink: `#171717`
- Muted text: `#6f6b65`
- Line gray: `#92918f`
- Soft border: `#e9e3db`
- Primary teal: `#009688`
- Accent yellow: `#ffc23c`

Persona colors:
- Chadchart: `#008377`
- Anucha: `#2f9fd8`
- Joe: `#e9782f`
- Mallika: `#1f3f7a`

## Components

Home:
- Small centered brand header.
- Compact square poster illustration above the title.
- Large title `4 ผู้ว่า 4 You`.
- Short explanatory copy.
- CTA text should stay playful: `เริ่มกันเลย !!`.
- Show possible persona chips below the copy, not as heavy cards.

Quiz:
- One question per screen.
- Display `สถานการณ์ที่ N` and progress as `N / 10`.
- User selects an answer first; then presses `ต่อไป`.
- Last question button becomes `วาร์ปไปดูผล!`.
- Answer choices are centered text buttons without visible persona labels.

Result:
- Result starts with a clean illustration panel.
- Show only the winner headline, one `คุณเป็นสายไหน` explanation, share/restart actions, and the disclaimer.
- Keep ranking, methodology, percentages, and runner-up details out of the final screen so the reveal feels like the reference quiz.

## Interaction Rules

- No analytics, no backend, no localStorage/sessionStorage.
- Scoring stays in browser memory only.
- Sharing uses Web Share API if available, clipboard fallback if available.
- Avoid auto-advancing after an answer; the explicit next button gives the quiz a calmer OOOPEN-like rhythm.
- Keep all touch targets at least 48px high.

## Content Rules

- Questions can be serious city scenarios.
- Answers should be playful persona expressions.
- Avoid claims that accuse a real person of wrongdoing.
- Use satire around policy style, public meme, and city-management archetype.
- Keep disclaimer visible on home and result pages.

## QA Checklist

- Mobile 375px: no clipped Thai text, buttons remain readable.
- Desktop: content remains centered and does not become a wide dashboard.
- Full flow: home -> 10 questions -> result -> share/copy -> restart.
- Unit tests: scoring winner cases pass and privacy guard stays clean.
- Privacy scan: no `fetch`, analytics calls, localStorage, sessionStorage, or sendBeacon in app source.
