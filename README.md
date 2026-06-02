# agent-skills

Personal agent skills for Codex and other AI coding agents.

## Install prd-grill

Install `prd-grill` globally:

```bash
npx skills add https://github.com/zcegg/agent-skills --skill prd-grill -g -y
```

Install `prd-grill-report` globally:

```bash
npx skills add https://github.com/zcegg/agent-skills --skill prd-grill-report -g -y
```

Install `vue-implementation-guardrails` globally:

```bash
npx skills add https://github.com/zcegg/agent-skills --skill vue-implementation-guardrails -g -y
```

## prd-grill

`prd-grill` interrogates unclear PRDs before solution design, estimation, implementation planning, or coding.

Use it when a requirement draft needs to be challenged for missing goals, scope, flows, data, API contracts, permissions, edge cases, and acceptance examples.

Example prompt:

```text
Use prd-grill to interrogate this PRD draft one question at a time until development readiness is clear.
```

## prd-grill-report

`prd-grill-report` generates a non-interactive PRD ambiguity report for stakeholders.

Use it when the frontend implementer should not be forced to answer product, business, backend, design, and data questions alone. It produces prioritized QA items with question, why it matters, recommended answer, owner, status, evidence, readiness, and a local HTML report.

Example prompt:

```text
Use prd-grill-report to analyze this PRD, inspect relevant code evidence if provided, and generate a local HTML QA report.
```

## vue-implementation-guardrails

`vue-implementation-guardrails` keeps Vue 2 / Vue 3 implementation scoped, maintainable, and consistent with existing project conventions.

Use it with `vue-best-practices`; add `vue-options-api-best-practices` for Vue 2 or Options API work.

Example prompt:

```text
Use vue-implementation-guardrails while implementing this Vue requirement. Keep the change scoped, reuse existing project conventions, avoid unnecessary abstraction, and report any guardrail exceptions.
```
