# Fly Rank Capstone

AI-assisted development capstone project for the Fly Rank track.

## About

This repository is the foundation for building software with AI pair programming tools (Cursor). It tracks progress through structured phases, from toolchain setup to full application delivery.

## Tech Stack

- **Runtime:** Node.js (LTS)
- **Version control:** Git + GitHub
- **AI IDE:** Cursor
- **Commit format:** [Conventional Commits](https://www.conventionalcommits.org/)

## Prerequisites

- [Node.js LTS](https://nodejs.org/) (v20 or later)
- [Git](https://git-scm.com/)
- [Cursor](https://cursor.com/) (or Claude Code in your terminal)

Verify your toolchain:

```bash
node -v
git --version
```

## Getting Started

1. Clone the repository (replace `YOUR_USERNAME` after creating the GitHub repo):
   ```bash
   git clone https://github.com/YOUR_USERNAME/Fly_Rank-task.git
   cd Fly_Rank-task
   ```

2. Open the project in Cursor.

3. Read [CLAUDE.md](CLAUDE.md) for stack conventions, commit format, and AI workflow guidelines before making changes.

## Fly Rank Phases

| Phase | Status |
|-------|--------|
| Setup — toolchain and repo scaffolding | Complete |
| *(upcoming phases)* | Planned |

## Project Structure

```
Fly_Rank-task/
├── .cursor/rules/     # Cursor AI conventions
├── CLAUDE.md          # Stack and coding conventions
├── LICENSE
└── README.md
```

## License

MIT — see [LICENSE](LICENSE).
