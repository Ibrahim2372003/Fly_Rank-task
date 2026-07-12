# Fly Rank Capstone — AI Assistant Conventions

This file describes the project stack and conventions for AI-assisted development in Cursor or Claude Code.

## Stack

| Layer | Choice |
|-------|--------|
| Runtime | Node.js (LTS) |
| Package manager | npm |
| Version control | Git + GitHub |
| IDE / AI assistant | Cursor |

## Commit Messages

Use [Conventional Commits](https://www.conventionalcommits.org/) for every commit:

```
<type>(<optional scope>): <description>

[optional body]
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

**Examples:**
- `feat: add user authentication endpoint`
- `fix: handle null response from API`
- `docs: update setup instructions in README`

## Code Conventions

- Prefer small, focused changes over large refactors.
- Match existing naming and file structure in the repo.
- Add comments only for non-obvious business logic.
- Do not commit secrets (`.env`, API keys, credentials).
- Write tests when adding meaningful behavior, not for trivial code.

## AI Workflow

1. Read surrounding code before editing.
2. Keep diffs minimal and scoped to the task.
3. Run relevant checks (lint, test, build) before considering work done.
4. Follow user instructions in rules and this file over generic defaults.

## Project Phases

This capstone follows the Fly Rank track phases:

1. **Setup** — Toolchain, repo scaffolding, first commits
2. *(Future phases added as the project progresses)*
