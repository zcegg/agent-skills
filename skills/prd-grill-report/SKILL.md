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

Create a single self-contained `.html` file that can be sent to another person and opened directly from disk.

Hard requirements:

- The HTML must work as a standalone file over `file://`.
- Put all CSS in one inline `<style>` block and all JavaScript in one inline `<script>` block.
- Do not depend on external assets, CDNs, web fonts, images, SVG files, build tools, local project files, or network requests.
- Do not use absolute local paths as resource links. Local repo paths may appear only as plain evidence text.
- Include `<meta name="viewport" content="width=device-width, initial-scale=1">`.
- The page must remain readable and usable when shared outside the author's machine.

Use the default visual template below every time unless the user explicitly asks for another style.

Default template: **Full-width executive risk dashboard**

- Dark navy top band, full browser width, height about 120-150px.
- Top band contains only title and compact metadata/source text.
- Main page background is light gray.
- Content width is almost full screen with comfortable gutters, not centered as a narrow article.
- First content panel is a white conclusion panel with metric cards and a pale warning callout.
- Subsequent panels are white bordered sections: PRD summary, top blockers, filters, full QA list.
- The style should match an internal engineering review dashboard: restrained, sharp, useful, and calm.
- This default style is not random. Do not switch to centered article, landing page, dark full-page, glassmorphism, bento, hero, gradient, or decorative dashboard styles unless asked.

Use a professional developer-review style. The page should feel like a clean internal product/engineering review dashboard, not an AI-generated article:

- Dense but readable dashboard/report layout.
- Light background with high contrast text.
- Clear status and priority badges.
- Sticky risk summary on desktop.
- Filter bar for priority/status/owner plus a text search field.
- Rows or compact issue panels for QA items, without nesting cards inside cards.
- Responsive layout for 375px, 768px, 1024px, and 1440px.
- Visible focus states and keyboard-friendly controls.
- No emoji as structural icons.
- No decorative gradient blobs, orbs, or stock-like visuals.
- No oversized hero, marketing copy, decorative empty space, or generic AI phrasing.
- No narrow fixed-width report column on large screens; use the available width with a readable max content width.
- Do not center the whole report as a narrow `max-width: 960px` article.
- Do not put metric cards above the conclusion panel as a detached centered row.
- Do not let long text, file paths, URLs, badges, or code overflow their containers.

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
- Header background: `#0F172A`
- Header muted text: `#94A3B8`
- Warning background: `#FFF7ED`
- Font stack: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
- Monospace stack for code/evidence: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`

Layout rules:

- Use a full-width app shell with a constrained inner width: `max-width: none; width: 100%; padding: 24px`.
- For very wide screens, content may use `max-width: 1600px; margin: 0 auto`, but must not be narrower than the available workspace.
- The dark top band is outside the card layout and spans full viewport width.
- On desktop, use a 12-column CSS grid:
  - Top summary spans full width.
  - Risk snapshot and top blockers sit above the full QA list.
  - Optional side summary may occupy 3-4 columns only when it adds value.
- On mobile, use a single column and keep filters horizontally scrollable only if needed.
- Use `box-sizing: border-box`, `overflow-wrap: anywhere` for long evidence, and `min-width: 0` on grid children.
- Prefer compact typography: body `14-15px`, line height `1.55`, section title `18-22px`, page title `24-32px`.
- Use 8px radius or less for panels and badges.

HTML sections:

1. Dark top band: feature name, PRD/source metadata, generated time, repository scope.
2. Conclusion panel: section title, metric cards, readiness verdict, and one-sentence decision summary.
3. Warning callout inside conclusion panel: explain why the PRD is or is not ready.
4. PRD summary / evidence scope panel.
5. "What to look at first" section: show the top 3-5 P0/P1/conflict items with owner and recommended next action. This must be visible near the first viewport on desktop.
6. Filterable full QA list.
7. Evidence and assumptions.
8. Recommended next step: PRD update, product/backend/design confirmation, `zoom-out`, `draft solution`, or `implementation-plan`.

First viewport rule:

- A reviewer must be able to see the verdict, P0/P1 count, conflict count, and top blockers without scrolling on a normal desktop viewport.
- Do not place long background explanation before the key risks.
- Put PRD/source metadata in a compact details row or collapsible details block after the risk summary.

QA item visual rules:

- Each item starts with a strong title line: `Q<number> <short problem statement>`.
- Immediately below the title, show badges in this order: priority, status, owner.
- Put `Why it matters` and `Recommended answer` above lower-level evidence.
- Evidence should be in a muted bordered block or compact list.
- P0 and Conflict items must have stronger visual weight: red left border or red priority badge.
- P1 items use orange.
- P2 items use blue.
- P3 items use gray.
- Avoid huge vertical gaps. Dense scanning is more important than decorative spacing.

Suggested HTML skeleton:

```html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>PRD QA 拷打报告</title>
  <style>/* all CSS here */</style>
</head>
<body>
  <header class="hero">
    <h1>...</h1>
    <p class="meta">...</p>
  </header>
  <main class="shell">
    <section class="panel conclusion">
      <h2>结论</h2>
      <div class="metric-grid">...</div>
      <div class="callout">...</div>
    </section>
    <section class="panel summary">...</section>
    <section class="panel focus-board">...</section>
    <section class="filters">...</section>
    <section class="qa-list">...</section>
  </main>
  <script>/* filter/search only, no external dependency */</script>
</body>
</html>
```

Minimum CSS behavior:

```css
* { box-sizing: border-box; }
body { margin: 0; background: #f8fafc; color: #1e293b; font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
.hero { background: #0f172a; color: #fff; padding: 32px 24px; }
.hero .meta { color: #94a3b8; }
.shell { width: 100%; max-width: 1600px; margin: 0 auto; padding: 24px; }
.dashboard-grid { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 16px; }
.panel { min-width: 0; background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; }
.metric-grid { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 12px; }
.metric { border: 1px solid #dbe3ef; border-radius: 6px; padding: 14px; background: #f8fafc; }
.callout { border-left: 4px solid #dc2626; background: #fff7ed; padding: 14px 16px; }
.evidence, code { overflow-wrap: anywhere; }
@media (max-width: 760px) {
  .shell { padding: 16px; }
  .dashboard-grid { grid-template-columns: 1fr; }
  .metric-grid { grid-template-columns: 1fr 1fr; }
}
```

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
