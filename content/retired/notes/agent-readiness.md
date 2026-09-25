---
slug: agent-readiness
title: Agent-readiness: what the evidence actually shows.
description: Browser agents complete tasks on agent-ready sites far more often. Coding agents ask for Markdown. Models prefer the libraries they already know. What that adds up to for a developer tool, honestly.
date: 2026-09-16
author: Dhruv Sharma
---

# Agent-readiness: what the evidence actually shows.

Developer tools have a new visitor. Not a person reading the docs, and not a search crawler indexing them, but an agent: a coding assistant fetching a page to answer its user, or a browser agent trying to complete a sign-up. Most sites were built for neither. Here is what the evidence says about what that costs, and what it does not say.

## Agents succeed on sites built for them.

In a study across three browser-agent models and 300 runs, an agent-ready version of a site produced 89.3% strict task success. The human-oriented baseline produced 49.3%. Same tasks, same models; the difference was the site.

Agent-ready meant the unglamorous things. Stable selectors. Forms an agent can fill without guessing. Error states written in text an agent can read. Structure that survives without a mouse.

## Coding agents ask for Markdown, and say so.

A developer-audience site published two months of server logs in mid-2026. Agent requests, 268K, exceeded human pageviews, 107K. And Claude Code, the heaviest fetcher, requested Markdown 76% of the time via the Accept header, the standard HTTP mechanism a client uses to say what format it wants.

This is the thing llms.txt was supposed to be and is not. Content negotiation serves the same URL as Markdown to any client that asks, for any agent, with no discovery file to find first. Google's guide says you do not need llms.txt to appear in Search, and the log data says almost nobody fetches it. Content negotiation is a server header. Vercel serves it on its own docs.

You can see it work on this site:

    curl -sL -H "Accept: text/markdown" https://we-relay.studio/notes/agent-readiness

## The headwind nobody puts in the deck.

Models prefer the libraries they already know. Across eight production LLMs on 525 tasks, the model reached for a widely-adopted library in up to 45% of cases where it was not required.

For a new tool this is the honest constraint. Getting a model to name your library in prose is one outcome, and a reachable one. Getting it to write your library into generated code is a different and much harder outcome, and only the second drives installs. A report should show which of the two it measured, and ours does.

## What we check, and what we do not promise.

The audit checks content negotiation, crawler posture by named bot, agent-navigable structure, docs consumability by a coding assistant, the MCP surface if there is one, and which sources AI answers cite for your category, seven runs per prompt.

We do not promise that any of it moves installs on a timeline. Nobody has published a customer-acquisition study for AI infrastructure yet. We would rather say so than sell you a playbook extrapolated from somewhere else.

[Marketing for developer tools](/dev-tools)
