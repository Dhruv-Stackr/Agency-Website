---
route: /dev-tools
title: Marketing for developer tools, with the evidence attached · Relay
description: For 2–20 person technical teams with a working product and no marketing hire. SEO, AI search and agent-readiness at the core, campaigns, web and content around them, all visible in your own dashboard.
lang: en-US
---

# Your users' agents fetch your pages. Build for them.

For 2–20 person teams with a working product, docs, an API, and no marketing hire. Relay runs the marketing you have not had time to hire for: SEO and AI search with agent-readiness at the core, campaigns, web and content around them, and a dashboard that shows you what was done and what it changed, so you can stay in the code.

[Book the free 20-minute audit call]({BOOKING_URL})

## The evidence, before the pitch.

**89.3% vs 49.3%**: strict task success for browser agents on an agent-ready site against a human-oriented baseline. Three models, 300 runs.

**76%**: how often Claude Code asked for Markdown via the Accept header on a developer-audience site whose server logs were published. Agent requests on that site (268K) exceeded human pageviews (107K).

**Up to 45%**: how often LLMs reach for a widely-adopted library in cases where it is not required. For a new tool, the model's prior is a headwind. Getting a model to name your library in prose is a different and much easier outcome than getting it to write your library into generated code, and only the second drives installs. A report from us keeps the two apart.

## What the audit checks first for a developer tool.

- **Content negotiation.** Whether your pages and docs return Markdown to a client that sends `Accept: text/markdown`, and whether the response varies correctly for caches.
- **Crawler posture, by name.** Which of the named AI crawlers your robots.txt admits, which it forgets, and which category each belongs to: search and citation, or training. Sites that disallow OpenAI's search crawler do not appear in ChatGPT search.
- **Agent-navigable structure.** Stable selectors, forms an agent can complete, error states it can read.
- **Docs consumability.** Whether a coding assistant can consume your documentation as a whole, and whether the one legitimate use of llms.txt, as a docs index for agents, is done or done badly.
- **MCP surface.** If your product exposes one, whether an agent can discover it and use it.
- **AI-answer retrieval.** Which sources the engines cite for your category's questions, whether you are among them, measured seven runs per prompt and reported as a band.

## Then the rest of the stack, in the order the plan sets.

- **Content under a human editor.** Written from your docs and your users' questions, so the answer quotes you.
- **Campaigns when there is something to send traffic to.** Tracking fixed first, budget moved toward what converts.
- **Landing pages and site work.** When the audit says the site is the bottleneck, that comes first.
- **Social built from what you shipped.** Releases, benchmarks and changelogs, not a calendar.

Each one lands in your dashboard with the number it is meant to move. [The services](/services)

## This site does what it asks of yours.

Named AI crawlers are allowed by name in our robots.txt. Every page has a Markdown twin, served to any client that asks for it with an Accept header. Structured data is for rich results, not for AI. Every statistic on the site fails the build without a source and a date. Below, this page fetching its own twin, live.

    curl -sL -H "Accept: text/markdown" https://we-relay.studio/dev-tools

## What we tell you on day one.

We have not found published research on how AI-infrastructure startups acquire customers. Anyone selling you a playbook is extrapolating. We are figuring it out with you, with a measurement step between every two moves, and we would rather say that than pretend.

Google says optimising for generative AI search is "still SEO", and we agree. We also read the same benchmark you would: the sources Google's AI answers draw on overlap with organic results at below 0.2. One craft, measured per surface. [Every number's source](/sources).

## Who this is for, and how month one runs.

2–20 person technical teams, seed to Series B, with a working product, technical founders, and no in-house marketing hire or exactly one overloaded generalist. Best fit when there is a product to send people to and the ask is visibility and pipeline, measured.

1. **The call.** Twenty minutes on your Search Console, your docs and one live AI query for your category.
2. **The audit.** Seven to ten business days: agent-readiness, crawler posture, docs consumability, AI-answer retrieval, each with the command to check it.
3. **The first fixes.** Shipped and measured in month one, in the order the audit set.
4. **The plan runs.** In your dashboard, with a written update every week. Accounts in your own name from day one.

Terms: monthly in advance, fifteen days' notice, and [the ninety-day clause](/terms). The price is said once, on the call.

## Start with twenty minutes on your own numbers.

[Book the free 20-minute audit call]({BOOKING_URL})
