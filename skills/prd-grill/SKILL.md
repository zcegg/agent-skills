---
name: prd-grill
description: Use when a PRD, requirement draft, wiki page, feature brief, user story, or product idea is unclear and needs to be interrogated before solution design, estimation, implementation planning, or coding; especially when the user says to grill, challenge, stress-test, clarify, refine, find ambiguity, find unknowns, or determine readiness for development.
---

# PRD Grill

## Overview

Interrogate a PRD draft until it is development-ready. This is the requirements counterpart to `grill-me`: use this skill to challenge the PRD, not the implementation plan.

Core rule: ask exactly one question at a time, choose the highest-risk unresolved question, and provide a recommended answer with confidence.

## Position in the Workflow

Use this before solution design:

`raw PRD -> prd-grill -> zoom-out -> draft solution -> grill-me -> implementation-plan -> coding`

Do not use this as code review. Do not produce an implementation plan. Do not start solving the implementation unless a requirement decision depends on facts discoverable in the codebase.

## First Pass

Before asking the first question:

1. Extract the PRD's stated goal, actors, entry points, core flow, data, APIs, permissions, success criteria, and non-goals.
2. Mark each item as one of:
   - `Confirmed` - directly stated in the PRD or codebase.
   - `Inferred` - likely but not explicit.
   - `Unknown` - missing and important.
   - `Conflict` - PRD, design, code, or examples disagree.
3. If the answer can be found by inspecting local code, docs, routes, API definitions, tests, or design artifacts, inspect them before asking the user.
4. If multiple questions are possible, pick the one that blocks the most downstream decisions.

Start with a compact status line:

```text
I found N confirmed points, N inferred points, N unknowns, and N conflicts. I will resolve the highest-risk item first.
```

Then ask the first question.

## Question Format

Ask one question only. Use this shape every time:

```text
Question: <one concrete decision question>

Why it matters: <what implementation, test, API, UX, or rollout decision depends on it>

Recommended answer: <best answer based on the PRD/codebase, or "I would not assume this">

Status: Confirmed | Inferred | Needs product confirmation | Needs backend confirmation | Needs design confirmation | Needs data confirmation
```

If the question has a small set of obvious choices, include 2-4 options and mark one as recommended. Do not bundle multiple decisions into one question.

## Interrogation Order

Use risk, not document order. Prefer questions in this sequence unless the PRD clearly points elsewhere:

1. **Goal and user value** - Who needs this, in what scenario, and what outcome proves value?
2. **Scope and non-goals** - What is explicitly included, excluded, deferred, or unchanged?
3. **Entry and ownership** - Where does the feature start, who can access it, and which system owns each decision?
4. **Main flow** - What is the happy path from entry to completion?
5. **State and edge flows** - Loading, empty, error, disabled, retry, cancel, back, refresh, duplicate submit, expired data.
6. **Data display matrix** - Every visible field, source, transformation, empty value, enum meaning, sorting, filtering, pagination.
7. **API contract** - Request params, response fields, error codes, enum values, idempotency, compatibility, caching.
8. **Permissions and compliance** - View/edit/action permissions, audit trail, sensitive data, masking, tenant or role boundaries.
9. **Validation and business rules** - Required fields, limits, cross-field constraints, time rules, conflict handling.
10. **Instrumentation and operations** - Tracking, logs, monitoring, gray release, rollback, alerts, migration, data repair.
11. **Acceptance examples** - At least one positive example, one negative example, and one boundary example per core rule.

## Evidence Rules

- Prefer evidence over assumptions. Cite file paths, route names, API names, wiki sections, screenshots, or exact PRD bullets when available.
- If the PRD is ambiguous but local code establishes an existing convention, say so and propose following that convention.
- If the question is a product decision, do not bury it as an engineering assumption.
- If a decision can be safely defaulted, label it `Ready with assumption` and record the assumption.
- If a decision affects data loss, permissions, money, user-visible state, rollout risk, or cross-system contracts, require confirmation.

## Stop Conditions

Continue one question at a time until one of these is true:

- The user says to stop or proceed.
- All high-risk unknowns are resolved.
- Remaining unknowns are low-risk assumptions and can be documented.
- The PRD is clearly not ready and has a short blocker list.

When stopping, output:

```text
Readiness: Ready | Ready with assumptions | Not ready

Confirmed decisions:
- ...

Assumptions:
- ...

Open blockers:
- ...

Next recommended step:
- zoom-out | draft PRD update | ask product/backend/design | implementation-plan
```

## Common Mistakes

- Do not ask broad questions like "Any other requirements?" Ask the concrete missing decision.
- Do not produce a long checklist and call it done. This skill is interactive interrogation.
- Do not grill the solution. If the conversation turns into architecture or implementation tradeoffs, switch to `grill-me`.
- Do not accept vague acceptance criteria such as "works normally." Convert them into examples.
- Do not treat missing UI text, empty states, error behavior, permission behavior, or enum meanings as implementation details; they are requirements.
