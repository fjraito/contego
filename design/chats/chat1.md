# Contego homepage redesign

_Started 2026-07-07 13:18 UTC_

---

## User

lets start from scratch homepage for Contego. Use Next.JS and i like this style and structure

## Assistant

Let me look at your attached files first.

_[tool: view_image]_

_[tool: view_image]_

I've got the Contego logo (green geometric "C" mark + wordmark) and the Amplemarket-style reference layout — a dark/light alternating SaaS homepage with big serif-ish headlines, product screenshots, logo strip, testimonials, results grid.

One note up front: I build high-fidelity, interactive homepage designs in HTML (which I can then hand off to Claude Code as a Next.js starting point). I can't run a live Next.js dev server here, but the design will be structured cleanly for that handoff.

Before I build, I need to know what Contego actually *is* — the reference is a sales-AI tool, but your product may be totally different.

_[tool: questions_v2]_

## User

<pasted_text name="Pasted text (38 lines)">
Contego — Company Brief (AI Context Document)
Purpose: paste this at the top of any AI prompt (copywriting, content, ads, SEO) so the output matches Contego's positioning and voice. Fields marked [FILL] are gaps — complete them once, then this brief is final.

Company Overview
Contego is an AI UGC agency. We produce hyper-realistic AI UGC videos: user-generated-content style video that is indistinguishable from real creator footage. Website: contegoagency.com.
Founded: [FILL]
Team size: [FILL]
Location: [FILL — or "remote-first" if applicable]
What We Sell
One service, done at the highest level:
Hyper-Realistic AI UGC Videos. UGC-style video content generated with AI that does not look AI-generated. No plastic faces, no uncanny lip sync, no robotic delivery. Used for paid social ads (TikTok, Meta, YouTube Shorts), organic social, landing pages, and product explainers.
The full engagement includes strategy, conversion-focused scriptwriting, production, and delivery. Clients get finished, ad-ready video, not raw AI output.
Who We Serve
Primary buyers: performance marketers, growth leads, and founders running paid social who need more creative volume than human creators can supply, at better cost, without the "obviously AI" quality problem of DIY tools.
Industries served: [FILL — list the verticals with proven results]
Positioning
Category: AI UGC agency. Angle: hyper-realistic AI UGC videos. If viewers can tell it is AI, it failed. Core promise: creative that earns trust in the first second, because customers decide from short video before they buy.
We are not a tool and not a creator marketplace. We are an agency: strategy, scripts, production, and testing handled end to end.
Differentiators
Realism. Most AI UGC looks like AI UGC. Ours does not. That single difference decides whether viewers keep watching or scroll.
Scriptwriting depth. Most AI video fails at the script level, not the render level. Our background is conversion copywriting.
Speed and volume. No creator scheduling, shipping, or reshoot delays. More hook variants tested per week at a fraction of traditional UGC cost.
Proof: [FILL — 2-3 headline results you are allowed to cite; anonymized framing like "8-figure e-commerce brand" is acceptable for NDA work]
Voice and Style Rules
Plain English. Direct and concise. No hype filler.
Banned words and patterns: "leverage," "synergies," "delve," "unlock," "Welcome to..." as an opener, "Most..." as a hook opener.
No em dashes anywhere in copy.
No AI-sounding phrasing. If a line sounds like a language model wrote it, rewrite it.
Claims must be provable. Never invent stats, client names, or results. If proof is missing, write around it or flag the gap.
What Contego Is Not
Not an AI tool or SaaS. Do not describe Contego as software.
Not a UGC creator marketplace.
Not "cheap AI content." Never position on price alone; position on realism and performance.
Standard CTA
Claim your Free AI UGC Video Sample



</pasted_text>

## Assistant

Contego is an AI UGC agency making hyper-realistic UGC video for paid social. That's plenty to build from. I'll follow the Amplemarket structure (dark/light alternating, big headlines, media hero, logo strip, testimonials, results grid, CTA band) but rebuild it around vertical UGC video, the mint-green brand, and the voice rules in your brief (plain English, no em dashes, no banned words, no invented stats).

Let me prep the logo and get the exact brand green.

_[tool: image_metadata]_

_[tool: read_skill_prompt]_

Now let me crop the green mark and sample the exact brand green.

_[tool: run_script]_

_[tool: copy_starter_component]_

_[tool: view_image]_

Brand green is `#5AE48E`, mark cropped cleanly. Building the homepage now as a single Design Component — dark/light alternating like your reference, but rebuilt around vertical UGC video, with copy that follows your voice rules (plain English, no em dashes, no banned words, no invented stats — proof areas are honest fill-in placeholders).

_[tool: dc_write]_

_[tool: show_html]_

_[tool: ready_for_verification]_

Built the Contego homepage as a single Design Component, following your reference's structure but rebuilt for an AI UGC agency:

- **Dark/light alternating** sections, mint-green (`#5AE48E`) brand accent, your logo mark + wordmark in nav and footer.
- **Hero** with a fanned trio of vertical UGC video frames (drag your own clips in) and the headline "AI UGC that doesn't look like AI."
- Realism statement with a **typical-AI vs Contego** comparison, service pipeline, three differentiators, use-case chips, a 4-step process, a proof grid, the free-sample CTA band (working email form), FAQ accordion, and footer.
- Copy follows your voice rules: plain English, no em dashes, none of the banned words.

Two honest notes tied to your brief's gaps: the **proof metrics** and **logo strip** are labeled fill-in placeholders (I don't invent stats or client names), and the video frames are empty drop-slots. Fill those and it's launch-ready.

On Next.js: I can't run a live dev server here, but this is clean, structured HTML ready to hand to Claude Code as a Next.js starting point whenever you want — just say the word.

