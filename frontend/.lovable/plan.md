# ELLIE: Solana Transaction Summarizer

A single-page TanStack Start app styled entirely with vanilla CSS Modules (no Tailwind utility classes in components). Dark premium theme: pure black background with metallic gold accents.

## Scope

Frontend-only UI shell. The "Summarize" button will simulate output with a short mocked plain-English summary after a brief delay so the output card behavior is visible. No backend, no Solana RPC, no AI integration in this pass — those can be added later when you're ready (Lovable Cloud + AI Gateway would be the path).

## Design System

Defined as CSS variables in a new `src/styles/theme.css` (imported once from `src/styles.css`):
- `--color-bg: #000000`
- `--color-surface: #0a0a0a`
- `--color-text: #f5f5f5`
- `--color-muted: #9a9a9a`
- `--color-gold: #D4AF37`
- `--color-gold-soft: rgba(212, 175, 55, 0.35)`
- `--font-sans: 'Inter', system-ui, sans-serif` (loaded via `<link>` in `__root.tsx` head)
- Gold glow shadow token for the active output card

Tailwind stays installed (template default) but no utility classes are used in the new components — all styling lives in `.module.css` files.

## Layout

```text
┌─────────────────────────────────────────────────┐
│  ◯  ELLIE | Agentic Intelligence                │  Header (sticky, thin gold underline)
├─────────────────────────────────────────────────┤
│                                                 │
│         Paste Solana Transaction Signature...   │  Large input
│         [        Summarize        ]             │  Gold button
│                                                 │
│         ┌───────────────────────────────┐       │
│         │  (hidden until summary ready) │       │  Output card with gold glow border
│         │  Plain-English summary text   │       │
│         └───────────────────────────────┘       │
│                                                 │
├─────────────────────────────────────────────────┤
│   Built for Superteam Agentic Engineering Grant │  Footer
└─────────────────────────────────────────────────┘
```

- Header: circular 40px placeholder (gold ring, dark interior with a small "E") + brand text.
- Input: full-width within a max 640px centered column, generous padding, subtle gold focus ring.
- Button: solid gold background, black text, hover lifts brightness + soft glow.
- Output card: `display: none` until a summary exists; when shown, 1px gold border + outer gold glow + inner dark surface.
- Footer: centered muted text.

## Files to add / change

- `src/routes/index.tsx` — replace placeholder with the ELLIE page; update route `head()` (title "ELLIE | Agentic Intelligence", matching description + OG tags).
- `src/routes/__root.tsx` — add Google Fonts `<link>` for Inter; update default title/meta to ELLIE branding.
- `src/components/ellie/Header.tsx` + `Header.module.css`
- `src/components/ellie/Summarizer.tsx` + `Summarizer.module.css` (input, button, output card, local state)
- `src/components/ellie/Footer.tsx` + `Footer.module.css`
- `src/styles/theme.css` — CSS variables + base resets for black background and gold selection color; imported from `src/styles.css`.

## Behavior

- Input is controlled state. Submit (button click or Enter) trims the value; if empty, the button stays disabled.
- On submit: set a short loading state (~700ms), then reveal the output card with a mocked summary referencing the signature (e.g. "Transaction `abc…xyz` transferred 1.25 SOL from Wallet A to Wallet B and paid a 0.000005 SOL fee."). Real AI wiring is out of scope here.
- Output card uses a CSS class toggle (`visible`) rather than conditional mount, so the hidden-by-default + reveal transition feels smooth.

## Out of scope (call out for follow-up)

- Actual Solana RPC lookup of the signature
- Real AI summarization (would use Lovable Cloud + AI Gateway)
- Persistence / history of past lookups
