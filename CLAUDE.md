# CLAUDE.md

This file gives Claude Code (or Cursor) the context it needs to work in this repository consistently.

## Project Overview
Fly Rank Setup — capstone project for the [track name] track. Replace this line with a one-paragraph description of what the project actually does once the core build begins.

## Tech Stack
- Runtime: Node.js (LTS)
- Language: JavaScript/TypeScript (update to match your actual choice)
- Package manager: npm
- Framework: TBD — add once selected (e.g. Next.js, Express, etc.)
- Testing: TBD
- Linting/formatting: TBD (e.g. ESLint + Prettier)

> Update this section as soon as real dependencies are added — an AI assistant relies on this being accurate to give useful suggestions.

## Coding Conventions
- Commit messages follow **Conventional Commits** (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, etc.)
- File/folder naming: kebab-case for files, PascalCase for components (adjust to your actual convention)
- Prefer small, focused commits over large ones
- Keep functions small and single-purpose; favor readability over cleverness

## Project Structure
```
/
├── README.md
├── LICENSE
├── .gitignore
├── CLAUDE.md
└── (source folders go here as the project grows)
```

## Working with this repo
- Run `npm install` before anything else
- (Add build/dev/test commands here once defined, e.g. `npm run dev`, `npm test`)
- Do not commit `.env` files or secrets — see `.gitignore`

## Notes for AI assistants
- Ask before adding new dependencies
- Follow existing code style rather than introducing new patterns
- Flag any assumptions made when requirements are ambiguous
## Project Rules

- All forms use react-hook-form.
- Validation must use Zod.
- Every component must be typed with TypeScript.
- Never use uncontrolled inputs.
- Every form must have accessible labels.
