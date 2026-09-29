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

The flow runs on its own, but these shortcuts help when filming a single beat.

| Key | What it does |
| --- | --- |
| `1` to `6` | Jump straight to a screen, in flow order |
| `Left` and `Right` | Step back and forward one screen |
| `N` | Replay the proactive notification in the Control Room |
| `Esc` | Close the chat panel or an agent panel |

Screen order: splash, scanning, mirror, plan, connectors, control room. The
chat panel and the notification both live inside the control room.

Number keys do not work on the splash screen while the URL field has focus.
Submit the field, then the shortcuts take over.

## How it is put together

```
src/
  components/
    OlivyOrb.tsx            Layered conic gradients, drifting blobs, orbiting particles
    AmbientBackground.tsx   Lavender wash, drifting colour fields, film grain
    AgentCard.tsx           Agent satellite, live and standby variants
    ConnectionLine.tsx      Self drawing spoke with flowing dash and a travelling packet
    ActivityFeed.tsx        Running log in the centre of the ring
    AgentDetailPanel.tsx    Slide over for one agent
    ChannelRow.tsx          One channel, before or after, full or dense
    CalendarView.tsx        The proposed week
    ConnectorCard.tsx       Account connection with its three states
    ContentPreviewCard.tsx  A reel as it will go out
    ChatBubble.tsx          Chat message
    NotificationBanner.tsx  Olivy speaking first
    StatusPill.tsx          Running, queued, standby
    BrandGlyphs.tsx         Brand marks Lucide no longer ships
  screens/
    Splash, Scanning, Mirror, Plan, Connectors, ControlRoom, ChatView
  lib/
    agents.ts               Agents, their timelines and the activity log
    plan.ts                 Channels before and after, and the week
    chat.ts                 Conversation and reels
    hooks.ts                Element size, timed sequences, delayed flags
```

## Notes on a few decisions

**Standby agents get shorter cards, not just dimmed ones.** Dimming a full size
card reads as broken. Size plus a dashed edge reads as deliberately off.

**The activity log sits inside the ring.** Nothing occupies the six o'clock
position, so the log fills real dead space instead of taking height away from
the constellation.

**The before and after morph happens inside the Plan screen.** Plan opens on the
same rows Mirror ended on, flips them one at a time, then reveals the week. The
rows then compact, which both makes room and signals that the diagnosis is done.

**The orb's glow peaks just outside the sphere.** A centred halo is invisible on
a light background because the orb covers its own brightest part.

## Design review helper

`scripts/shot.mjs` renders the running dev server headless at a fixed size, so
screens can be checked at exact desktop dimensions.

```bash
node scripts/shot.mjs <name> [waitSeconds] [actions]

# actions are separated by | and are either a CSS selector or key:<Key>,
# each optionally followed by ::<secondsToWaitAfter>
node scripts/shot.mjs plan 1 "button[type=submit]::9|key:4::4"

# override the viewport
W=1280 H=800 node scripts/shot.mjs plan 1
```

Output lands in `/tmp/olivy-shots`.
