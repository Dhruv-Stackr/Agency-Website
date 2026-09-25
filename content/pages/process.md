---
route: /process
title: How it works · Relay
description: The free 20-minute audit call, the proposal the next business day, the audit month, and then the plan running where you can watch it. Four pages from a real audit.
---

# Twenty minutes first. Then a month. Then you watch it run.

The call is free. The audit is month one, and it decides what the plan does first. [What happens on the call, and four questions to answer first](/book).

## The call: twenty minutes on your own numbers.

1. **Your words first.** What made you take the call, and what does working look like, in a number. If there is no number yet, we shape one together before anything else happens.
2. **Live, on your data.** Your Search Console and your ad accounts if you share them. One live AI query for your category, to see who gets named and whether you do. The source of your own homepage. Everything shown is something you can repeat after the call.
3. **The three biggest gaps.** The uncomfortable one first. Each with what it costs you, in your vocabulary, and the fair reason it might exist. Every fix is sequenced with a measurement step.
4. **The proposal, one page, the next business day.** The three gaps, what we would do first and what we would measure before the second step, the services the plan calls for, the monthly fee said once, and the terms.

Nothing on the call touches your accounts. We only look at what you open.

## The proposal is one page. Here is its shape.

It arrives the next business day. The three gaps, in the order they cost you. What we would do first, and what we would measure before the second step. The services the plan calls for, and nothing else. The fee, said once. The terms, which are the same for everyone. It stands for thirty days.

## Month one: the audit, and the first fixes.

The full audit deck, in one format whether you run a clinic or a software company. What it contains, page by page, is below.

- **The scorecard.** Where you stand on everything we checked, colour-coded by what it costs you: red for what costs you today, amber for what will, and what is working stays as it is.
- **The findings.** Each one a page: the finding, the evidence, the source under every number, the check you can run yourself, and the fair reason it might be that way.
- **The plan.** Owner, effort, expected impact, sequence, across every service the plan needs. What we do first, what we measure before the second.
- **The plain-English page.** The whole deck in the words you would use to explain it to a co-founder.
- **The baseline.** Your numbers on day one, including your AI-visibility band for twenty category prompts, seven runs each. Yours to keep.

Then the first fixes on the plan, shipped and measured, in month one.

## Then the plan runs, and you watch it.

SEO and content, campaigns, web, social, creative, in the order the plan set. Every item in your dashboard with its status and the number it is meant to move. A five-line note every Monday, on WhatsApp, by email and in the dashboard. A one-page report and a call every month. A call whenever you ask.

Terms: monthly in advance, fifteen days' notice, and [the ninety-day clause](/terms).

## Three findings from a real audit.

<!-- SAMPLE: The Whole Truth Foods, thewholetruthfoods.com. Findings re-derived live before publish; every verify command printed. Approved or vetoed by Dhruv before ship. -->

Run against thewholetruthfoods.com on 16 September 2026, in the format every finding takes: what we found, what it costs, and how to check it yourself. The full deck runs to thirteen pages; this is the format, not the verdict.

**Working. Keep it.** The robots.txt names five AI crawlers and allows every one: GPTBot, Google-Extended, PerplexityBot, ClaudeBot, CCBot. Most sites we look at have never made this decision at all.
Verify: `curl -sL https://thewholetruthfoods.com/robots.txt`

**Costs money today.** The homepage title is "The Whole Truth Foods - Online Store" and the description is "Order online from The Whole Truth Foods with secure payment options and seamless online shopping experience." Those are the platform's defaults. The two lines a search result quotes first are the template's, not the brand's own.
Verify: `curl -sL https://thewholetruthfoods.com/ | grep -o '<title>[^<]*'`
Fair reason: the storefront was migrated and the template fields were never revisited. It is the most common finding we make.

**Costs money tomorrow.** The all-products page is 4.9 MB of HTML before a single image loads. On a phone on a train it is the difference between a browse and a bounce, and it is the page every "buy" query lands on.
Verify: `curl -sL https://thewholetruthfoods.com/collections/all -o /dev/null -w '%{size_download}'`

## Start with twenty minutes on your own numbers.

[Book the free 20-minute audit call]({BOOKING_URL})
