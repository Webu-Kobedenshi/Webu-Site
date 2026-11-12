# Webu (We部) — Design System Specification

> "Industrial exhibition under studio light — the 3D sculpture is the only dense object in space, and the UI is typeset as a quiet architectural catalog."

## 1. Core Philosophy

- **Product as Hero**: The 3D wordmark ("Webu.") is the sole dimensional entity on the page. All surrounding UI is flat, disciplined, and whispered.
- **Rationed Color**: 95% monochromatic space of warm ecru and deep carbon. Vermilion orange (`#d74a23`) is strictly rationed as the single chromatic pulse (logo period, active step indicators, and scroll cue).
- **Hairline Discipline**: Separation is created via 1px muted rules (`#c8cdc1` / `#394334`) and generous whitespace, never heavy drop shadows or generic boxy card containers.
- **Swiss / Industrial Typographic Contrast**: High scale contrast between micro technical mono labels (`Geist Mono`, 9-11px, wide letter spacing) and bold, confident headline sans (`Geist Sans`, tight letter spacing).

---

## 2. Color Tokens

| Name | Hex Value | CSS Variable | Role & Usage |
| :--- | :--- | :--- | :--- |
| **Canvas (Background)** | `#eaece6` | `--background` | Warm gallery ecru, seamless studio backdrop. |
| **Ink (Foreground)** | `#20231f` | `--foreground` | Deep charcoal. Softer, warmer, and more intentional than pure #000. |
| **Primary Accent** | `#d74a23` / `#ff6236` | `--primary` | Vermilion identity pulse. The solitary chromatic note. |
| **Structural Gray** | `#c8cdc1` | `--border` | 1px architectural dividers, frame lines, and hairline borders. |
| **Muted Surface** | `#dfe3d9` | `--muted` | Subdued tonal fills, learning process canvas. |
| **Subdued Text** | `#5b6057` | `--muted-foreground` | Technical metadata, step tags, secondary descriptions. |
| **Inverted Carbon** | `#20251f` | `--carbon` | Dark gallery band for activity photography archive. |
| **Inverted Foreground** | `#f0f1e9` | `--carbon-foreground` | Crisp paper white on dark inverted bands. |

---

## 3. Typography Hierarchy

### Display Sans (`Geist Sans`, `Hiragino Kaku Gothic ProN`)
- **Hero Title**: `clamp(28px, 7.5vw, 60px)`, weight `650`, letter-spacing `-0.055em`, line-height `1.38`.
- **Section Headings**: `clamp(26px, 3.4vw, 46px)`, weight `650`, letter-spacing `-0.045em`, line-height `1.32`.
- **Sub-headings / Cards**: `clamp(18px, 1.8vw, 24px)`, weight `600`, letter-spacing `-0.035em`, line-height `1.4`.
- **Body Copy**: `14px - 15px`, line-height `1.85`, color `#5b6057` or `#20231f`.

### Technical Mono (`Geist Mono`)
- **Eyebrows / Index Meta**: `9px - 11px`, weight `550`, uppercase, letter-spacing `0.08em - 0.22em`.
- **Step Numbers**: `14px - 16px`, weight `700`, tabular-nums.
- **Micro Badges**: `10px - 11px`, border-radius `999px`, weight `600`.

---

## 4. Components & Micro-Interactions

- **Pill Buttons (`.button-dark`, `.button-outline`)**:
  - Border-radius `999px`.
  - Height `48px - 54px`, padding `14px 24px`.
  - Subtle hover lift (`translateY(-2px)`), rotating arrow icon (`rotate(45deg)`).
- **Process Step Cards**:
  - Flat transparent base with top 1px hairline border.
  - Active state activates an orange 2px top indicator and subtle tinted surface.
  - No drop shadows; structural clarity only.
- **Scroll Synchronized 3D Sculpture**:
  - Orbits smoothly across sections in a persistent canvas.
  - Watermark mode behind text on mobile (opacity `0.08 - 0.12`).
  - Terminal suction into the 2D footer wordmark at the bottom of the page.
