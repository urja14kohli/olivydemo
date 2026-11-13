# Olivy

A high fidelity frontend demo of Olivy, a proactive marketing partner. Built for
video and investor presentations. Every number, post and event is hardcoded.
There is no backend and no network call anywhere in the app.

## Running it

```bash
npm install
npm run dev
```

Best viewed at 1440 x 900. The layout also holds at 1280 x 800.

## Presenting it

The flow runs on its own. Number keys jump between screens when filming a single
beat (there is no on-screen prototype jumper).

| Key | What it does |
| --- | --- |
| `1` to `6` | Jump straight to a screen, in flow order |

Screen order: welcome, match, first post, connect, today, calendar.

Number keys do not work on the welcome screen while the URL field has focus.
Submit the field, then the shortcuts take over.

## Flow

1. **Welcome** — paste a site (or try `luminaskin.com`)
2. **Match** — Bumble-style picks: three rounds of two same-type posts about the brand
3. **First post** — composed reel from the picks, with Instagram / TikTok / Shopify marks
4. **Connect** — optional Instagram, Shopify, TikTok
5. **Today** — dashboard to approve and schedule

## How it is put together

```
src/
  components/
    OlivyOrb.tsx            Soft breathing orb
    Icons.tsx               Channel icons + IG / TikTok / Shopify logos
    Thumb.tsx               Content thumbnails
    Wordmark.tsx            Olivy mark
  screens/
    Welcome, Match, FirstPost, Connect, AppShell, Today, CalendarPage
  lib/
    brand.ts                Lumina identity
    lumina.ts               Match rounds, ready pieces, week, working tasks
    schedule.ts             Approve → calendar state
```

## Design review helper

`scripts/shot.mjs` renders the running dev server headless at a fixed size, so
screens can be checked at exact desktop dimensions.

```bash
node scripts/shot.mjs <name> [waitSeconds] [actions]

# actions are separated by | and are either a CSS selector or key:<Key>,
# each optionally followed by ::<secondsToWaitAfter>
node scripts/shot.mjs match 1

# override the viewport
W=1280 H=800 node scripts/shot.mjs first 1
```

Output lands in `/tmp/olivy-shots`.
