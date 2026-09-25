---
route: /method
title: The Source Line · how Relay measures
description: Relay's measurement rules: a source under every number, seven runs per prompt, a band instead of a score. Published so you can check.
---

# Every number carries a source, or it does not ship.

The Source Line. A source under every number. A band instead of a score. This page is the method, published so that anyone can check it.

## Rule one. Every number carries its source.

On every page of every deck and every tile of your dashboard, under every statistic, a line in monospace: who measured it, on what sample, when. If the number comes from a tool vendor, the line says so. If the sample is small, the line says how small.

This is not a footnote. It is the reason to believe the number. A buyer who asks "who says?" should never find us empty-handed.

Numbers also expire. Every claim we use has a review date. When it passes, the claim is re-verified or it leaves the deck. The number you see on this site today was checked on the date printed under it.

## Rule two. AI visibility is a distribution, not a number.

The same prompt, asked of the same engine, on the same day, returns a different set of sources each time. Measured across four engines, the overlap between two identical runs is 0.32 to 0.43. A single run's detection rate has a 95% confidence interval of roughly −22% to +122%. The standard error only falls below 0.10 at seven runs per prompt.

So the run is fixed:

- **Prompts.** Twenty to forty per client, in three or four intent clusters, written from the category questions your buyers ask and the competitors you named. Category questions, never brand queries.
- **Engines.** ChatGPT with search on. Google's AI answers, treated as one surface. Perplexity. Reported separately, never blended, because engines disagree.
- **Repetitions.** Seven per prompt per engine.
- **Cadence.** Weekly, aggregated monthly. Never daily; daily is seven times the cost for no decision value.
- **Decomposition.** The chance of being cited is the chance the engine searched at all, times the chance you were retrieved, times the chance you were cited once retrieved. We report all three. Around 58% of ChatGPT responses never search the web, and a number that ignores that is wrong by construction.
- **Output.** An inclusion-rate band per engine with the count of runs behind it. Mentions and citations split. The competitors that appeared in the same prompts. The sources the engine cites for your category, and whether you are on them.
- **Footer on every artefact.** Engines, prompt count, runs, window, tool, cost. No vendor discloses all six. That is the credibility.

## Rule three. What a number needs before it reaches you.

- Seven runs behind any AI-visibility figure, reported as a band.
- A stated sampling method behind any share-of-voice figure: the real interface, or an API, and which.
- A stated inference behind any traffic attributed to AI.
- Fourteen days clear of a Google rollout before a change is called a cause.
- Its own clock: campaigns are read in weeks, search in months.

## Rule four. The levers with evidence behind them.

Across 45 studies of how AI answers choose their sources, three things hold up: topical relevance and position, extractable facts such as statistics, quotes and definitions, and recency. Google's own guide says the same in its own words: the craft that earns a ranking earns a citation. So the work goes there: pages that answer the question a buyer asks, facts a machine can lift, crawlers admitted by name, structured data for rich results, and a brand people search for. Everything else on the market's menu is measured against that list before it is sold.

## Rule five. Google is right about Google.

Google's guide of 15 May 2026 says optimising for generative AI search is "still SEO". We agree. The craft is the same: crawlable pages, clear facts, real authority.

The surfaces are not the same. Google organic and Google's AI answers retrieve substantially different sources, with URL-level overlap below 0.2 on an 11,500-query benchmark. Sites that block Google's AI crawler are significantly less likely to be retrieved by AI answers even when the content is otherwise accessible.

So the practice is one craft, measured per surface. Not a new acronym. Not a dashboard over a coin flip.

## Rule six. The uncomfortable number first.

Household names appear in 73% of relevant AI answers. Mid-market brands, 44%. Niche and small brands, 11%. Our clients start in the 11%. The gap to 44% is what an engagement can plausibly move, and naming the ceiling is what makes any promise about the gap credible.

And the reason to keep going once you start: when every brand runs the same play, the individual payoff collapses from +0.802 to +0.007. But brands that opt out receive zero. Participating is strictly better than not, and that is a reason to stay that does not depend on us being clever.

## Our own number.

Relay's AI-visibility distribution for its own category will be published on this page, dated, from the first monthly run, with the same footer we put on a client's. Measuring ourselves the same way is the only honest way to measure you.

<!-- OWN-RUN: insert the first ≥7-run distribution here with the method footer; until then this paragraph stands as written. -->

## What the site itself does.

This site is built the way the audit asks a site to be built. Named AI crawlers are allowed in robots.txt by name. Every page has a Markdown twin, served to any client that asks for it with an Accept header. Structured data is for rich results, not for AI. Every statistic on the site is a component that fails the build without a source and a date.

Verify: `curl -sL -H "Accept: text/markdown" https://we-relay.studio/method`

[Book the free 20-minute audit call](/book)
