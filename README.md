# agent-skills

Personal agent skills for Codex and other AI coding agents.

## Install

Install `prd-grill` globally:

```bash
npx skills add https://github.com/zcegg/agent-skills --skill prd-grill -g -y
```

## prd-grill

`prd-grill` interrogates unclear PRDs before solution design, estimation, implementation planning, or coding.

Use it when a requirement draft needs to be challenged for missing goals, scope, flows, data, API contracts, permissions, edge cases, and acceptance examples.

Example prompt:

```text
Use prd-grill to interrogate this PRD draft one question at a time until development readiness is clear.
```
