---
name: prd-grill-report
description: Use when a PRD, requirement draft, wiki page, feature brief, or user story needs a non-interactive interrogation report: analyze ambiguity, inspect relevant code when provided, produce a prioritized QA/question list with recommended answers, and write a local HTML report that stakeholders can open directly.
---

# PRD Grill Report

## Overview

Generate a non-interactive PRD interrogation report.

This skill is the report-oriented counterpart to `prd-grill`:

- `prd-grill` asks one highest-risk question at a time and adapts to the user's answers.
- `prd-grill-report` produces a complete QA report in one pass for product, business, backend, design, QA, and frontend review.

Use this when the user is a frontend developer or implementation owner who should not be forced to answer product/business/backend questions alone.

## Core Output

Always produce:

1. A prioritized QA list in the conversation.
2. A standalone local HTML file containing the full report.

Default output path:

```text
./prd-grill-report.html
```

If the current workspace has a `docs/`, `doc/`, or `reports/` directory, prefer:

```text
./docs/prd-grill-report.html
```

If multiple reports may exist, include a short slug or date:

```text
./docs/prd-grill-report-<feature-slug>.html
```

## Inputs

Accept any of these:

- PRD link, wiki link, local Markdown/HTML/doc text, pasted requirement draft, issue description, screenshots, or conversation context.
- Optional related repository path.
- Optional focus modules, routes, files, API names, screenshots, or design links.

If a repository path or relevant files are provided, inspect code before finalizing the report. Do not scan the whole repository blindly. Search for evidence around routes, page names, components, stores, API modules, enums, permissions, tests, and existing similar flows.

If no repository is provided, state that code evidence was not available and classify recommendations as PRD-based.

## Analysis Workflow

1. Extract the PRD's stated goal, actors, entry points, user journey, visible UI, data fields, APIs, permissions, business rules, success criteria, and non-goals.
2. Classify facts as:
   - `Confirmed` - stated in PRD or verified from code/docs.
   - `Inferred` - likely from context or existing patterns.
   - `Unknown` - missing and important.
   - `Conflict` - PRD conflicts with itself, code, API, screenshots, or examples.
3. Inspect relevant code/docs before asking for clarification if code context is available.
4. Generate questions by risk, not document order.
5. Provide recommended answers where reasonable, but do not pretend product/backend/business decisions are confirmed.
6. Assign an owner for each unresolved item: Product, Business, Backend, Design, QA, Data, Frontend, or Cross-functional.
7. Produce an HTML report that is easy to share in browser review.

## QA Item Format

Every report item must use this structure:

```text
Question: <one concrete decision question>

Why it matters: <what implementation, test, API, UX, data, permission, or rollout decision depends on it>

Recommended answer: <best answer based on PRD/code evidence, or "Do not assume">

Status: Confirmed | Inferred | Needs product confirmation | Needs backend confirmation | Needs design confirmation | Needs data confirmation | Conflict

Owner: Product | Business | Backend | Design | QA | Data | Frontend | Cross-functional

Priority: P0 | P1 | P2 | P3

Evidence: <PRD section, quote summary, file path, route, API name, screenshot, or "No code evidence provided">
```

Use one concrete decision per question. Do not combine multiple decisions in one item.

## Priority Rules

Use these priorities:

- `P0` - Blocks development readiness or can cause data loss, permission leakage, incorrect money/compliance behavior, or cross-system contract failure.
- `P1` - Blocks correct implementation, testing, or backend/frontend contract design.
- `P2` - Important UX, edge case, acceptance criteria, observability, or rollout ambiguity.
- `P3` - Nice-to-clarify wording, minor content, or low-risk consistency issue.

## Interrogation Coverage

Cover these areas when relevant:

1. Goal and success criteria.
2. Scope and non-goals.
3. Entry points, roles, and permissions.
4. Happy path and main user journey.
5. State model: loading, empty, error, disabled, retry, cancel, refresh, duplicate submit, stale data.
6. UI display matrix: fields, source, transformation, empty values, enums, sorting, filtering, pagination.
7. API contract: request params, response fields, error codes, idempotency, compatibility, caching.
8. Business rules and validation.
9. Backend/data ownership and migration.
10. Design gaps: copy, empty states, dialogs, interaction states, responsive behavior.
11. QA acceptance examples: positive, negative, boundary.
12. Instrumentation, logging, monitoring, gray release, rollback.

## HTML Report Requirements

Create a single self-contained `.html` file with inline CSS and JavaScript only. Do not depend on external assets, CDNs, fonts, or build tools.

Use a professional developer-review style:

- Dense but readable dashboard/report layout.
- Light background with high contrast text.
- Clear status and priority badges.
- Sticky summary header on desktop.
- Table of contents or filter bar for priority/status/owner.
- Cards or rows for QA items, without nesting cards inside cards.
- Responsive layout for 375px, 768px, 1024px, and 1440px.
- Visible focus states and keyboard-friendly controls.
- No emoji as structural icons.
- No decorative gradient blobs, orbs, or stock-like visuals.

Recommended visual system:

- Background: `#F8FAFC`
- Surface: `#FFFFFF`
- Text: `#1E293B`
- Muted text: `#64748B`
- Primary: `#2563EB`
- Warning/CTA: `#F97316`
- Success: `#16A34A`
- Danger: `#DC2626`
- Border: `#E2E8F0`
- Font stack: `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`

HTML sections:

1. Header: feature name, readiness verdict, timestamp, source inputs.
2. Summary metrics: total questions, P0/P1 count, conflicts, owner distribution.
3. Readiness assessment: `Ready`, `Ready with assumptions`, or `Not ready`.
4. Top blockers: P0/P1 items.
5. Full QA list with filters.
6. Evidence and assumptions.
7. Recommended next step: PRD update, product/backend/design confirmation, `zoom-out`, `draft solution`, or `implementation-plan`.

## Readiness Verdict

Use:

- `Ready` only when no P0/P1 unknowns or conflicts remain and acceptance examples are clear.
- `Ready with assumptions` when remaining gaps are low-risk and explicitly documented.
- `Not ready` when any P0/P1 unknown or conflict blocks implementation confidence.

## Evidence Rules

- Prefer evidence over assumptions.
- Cite local file paths, route names, API names, docs, screenshots, or PRD section names when available.
- If evidence comes from code, include the file path and short reason.
- If no evidence exists, say so directly.
- Do not expose secrets, tokens, cookies, private auth data, or unrelated local environment details.

## Conversation Output

After writing the HTML file, respond with:

```text
Generated: <absolute path to html>

Readiness: <Ready | Ready with assumptions | Not ready>

Top blockers:
- ...

Suggested next step:
- ...
```

Keep the conversation summary short. The HTML file is the complete artifact.

## Common Mistakes

- Do not ask the frontend developer to answer product/business/backend questions by default.
- Do not start solution design or implementation planning.
- Do not produce only a Markdown checklist when an HTML report was requested.
- Do not treat missing empty states, permission behavior, enum meanings, or error handling as implementation details.
- Do not make recommendations look confirmed when they are assumptions.
- Do not scan or summarize unrelated repository areas.
