---
name: vue-implementation-guardrails
description: Use when implementing or modifying Vue 2 or Vue 3 code and the change must stay scoped, maintainable, consistent with existing project conventions, and resistant to AI over-engineering, unnecessary abstraction, large components, unrelated refactors, or speculative infrastructure.
---

# Vue Implementation Guardrails

## Core Rule

Implement the smallest maintainable change that satisfies the confirmed requirement. Prefer local, explicit, project-consistent code over speculative abstractions.

Use alongside `vue-best-practices`; add `vue-options-api-best-practices` for Vue 2 or Options API, and `antfu` / `vue` for Vue 3 + TypeScript projects.

## Scope Guardrails

- Do not change unrelated behavior, routes, stores, APIs, styles, build config, or shared utilities.
- Do not migrate Vue 2 to Vue 3, Options API to Composition API, Vuex to Pinia, or legacy patterns to new patterns unless the task explicitly asks for it.
- Do not introduce new dependencies, global plugins, state layers, caching layers, compatibility layers, or generic frameworks without explicit need.
- Prefer existing project components, composables, mixins, directives, stores, API wrappers, router helpers, constants, and style tokens.
- If the requirement is ambiguous, stop and ask. Do not hide product decisions inside implementation defaults.

## Size Guardrails

- Keep changed Vue SFCs under 500 lines when practical.
- If a changed `.vue` file exceeds 500 lines, pause and explain why it remains acceptable or propose a split.
- Do not split only to satisfy a number. Split only along real responsibilities:
  - container vs presentational component
  - form section
  - table/list row or column action area
  - modal/drawer
  - reusable business widget
  - composable for stateful reuse
  - constants/types/API mapping files
- Keep new helper files focused. One file should have one reason to change.

## Abstraction Guardrails

- Do not create a composable, utility, base component, mapper, adapter, or config-driven engine for one use case.
- Create an abstraction only when at least one is true:
  - two or more real call sites need it now
  - it isolates genuinely complex behavior
  - it matches an existing local pattern
  - it makes tests simpler and behavior clearer
- Do not prebuild future extension points. Leave boring code boring.

## Vue Coding Guardrails

- Keep source state minimal. Derive display state with `computed` when possible.
- Keep side effects explicit and narrow. Avoid broad `watch` / deep watchers unless necessary.
- Use props and emits for parent-child communication; do not use global state for local UI state.
- Keep API calls in the existing API layer or local convention. Do not call raw endpoints from random components if wrappers exist.
- Handle loading, empty, error, disabled, and permission states only where the requirement or existing pattern requires them.
- Keep template logic readable. Move complex predicates to named computed values or methods.
- Avoid `any`, broad object bags, and magic strings when local types/constants are already available.

## Change Discipline

Before editing, identify:

```text
Files to touch:
Existing conventions to follow:
Behavior to preserve:
Verification command:
```

During implementation:

- Make one vertical slice at a time.
- After each slice, remove dead code, unused imports, unused state, and temporary logs.
- If the code starts requiring broad rewrites, stop and report the pressure point.

## Self-Check Before Completion

Run or state the closest available checks:

```bash
# Adapt to the repo; use only commands that exist.
pnpm lint
pnpm test
pnpm typecheck
pnpm build
```

Also check changed Vue file sizes when relevant:

```bash
find . -name "*.vue" -not -path "*/node_modules/*" -print0 | xargs -0 wc -l | sort -nr | head
```

Final report must call out any intentional exception:

```text
Guardrail exceptions:
- None
```

or:

```text
Guardrail exceptions:
- <file> exceeds 500 lines because <reason>; proposed split: <option>
```
