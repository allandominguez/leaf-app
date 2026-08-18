# leaf

> **Status:** 🚧 Early development — project scaffolding is in place; core capture/timeline/search flow (Epics 1–5) is not yet built.

A minimal, mindful, local-first personal memory app. Capture small fragments worth keeping — thoughts, ideas, recommendations, decisions — and find them again later, even when you only vaguely remember what you're looking for.

**_Capture. Revisit. Connect. Reflect._**

> This repository contains the **mobile app** (React Native / Expo). A companion AI service (`leaf-ai`, FastAPI) is planned for retrieval and grounded recall but not yet scaffolded — see [Tech Stack](#tech-stack).

---

## Key Features

**Planned (MVP):**

- **Capture** — save, edit, and delete memories with no forced tagging or filing
- **Timeline** — browse memories chronologically
- **Search** — keyword search (SQLite FTS5), then semantic search
- **Recall** — ask natural-language questions and get answers grounded in your own memories, with sources
- **Related memories** — surface connections between entries without asking

**Possible later:**

- Gentle memory resurfacing ("on this day", spaced revisits)
- Local-only AI inference (no cloud calls at all)

The full product rationale and non-goals live in the project's Product Spec (not part of this repo).

---

## Tech Stack

**Mobile:**

- React Native (Expo ~57)
- TypeScript (strict mode)
- React Navigation
- SQLite via `expo-sqlite` — on-device source of truth

**AI service (planned, separate repo):**

- Python + FastAPI (`leaf-ai`)
- Cloud LLM/embedding APIs initially, with a local Ollama swap path validated later

No accounts, no sync, no backend user model — v1 is single-user, single-device, Android-first.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or v20 (LTS)
- [Expo Go](https://expo.dev/go) on your Android device, or a connected Android device with USB debugging enabled

### Installation

```bash
git clone <repo-url>
cd leaf/app
npm ci
```

### Running the app

```bash
npm start        # prompts to choose platform
npm run android  # Android directly
```

---

## Project Structure

```
leaf/app/
├── features/
│   └── <name>/             # One folder per feature
│       ├── components/     # Screens and UI components
│       ├── hooks/          # Feature-specific hooks
│       └── types.ts        # Feature-specific types
├── lib/                    # Shared infrastructure (storage helpers, utilities)
├── navigation/              # React Navigation root and stack definitions
├── assets/
├── App.tsx                 # Root component, mounts navigation
├── index.ts                # Expo entry point
└── app.json
```

Feature folders are self-contained — components, hooks, types, and storage calls for a feature live together under `features/<name>/`, rather than being split across top-level `components/`, `hooks/`, or `services/` directories.

---

## Branching

| Branch                       | Purpose                                        |
| ---------------------------- | ---------------------------------------------- |
| `main`                       | Production-ready code                          |
| `add/desc`, `update/desc`    | New features                                   |
| `fix/desc`                   | Bug fixes                                      |
| `chore/desc`, `improve/desc` | Maintenance tasks (dependencies, config, etc.) |

---

## Development

Lint, typecheck, and test scripts are being set up as part of Epic 1 — this section will fill in as they land:

```bash
npm run lint       # ESLint on .ts/.tsx (planned)
npm run typecheck  # tsc --noEmit (planned)
npm test           # Jest (planned)
```

Pre-commit hooks (gitleaks secrets scanning, lint-staged) are also planned but not yet wired up.

---

## Architecture Principles

- **Local-first** — SQLite on-device is the source of truth. AI features (embeddings, retrieval) call a separate `leaf-ai` service, but capture, browse, and search must keep working with that service unavailable.
- **AI as librarian, not author** — retrieval and grounded generation over the user's own memories; the AI never invents content and always shows its sources.
- **Hooks own logic, components own rendering** — business logic lives in custom hooks; components stay thin rendering layers.
- **No API secrets in the app** — cloud LLM/embedding keys stay server-side in `leaf-ai`, never bundled into or stored by the mobile app.
- **Accessibility from day one** — `accessibilityLabel`/`accessibilityRole` added at authoring time, not retrofitted.

---

## Project Goals

leaf is a portfolio piece and a deliberate learning vehicle for applied AI engineering — embeddings, RAG, hybrid retrieval, evaluation — built as a real, daily-use product rather than a toy demo.

### Product-Focused Thinking

- A calm, low-friction capture experience with no forced organisation
- A local-first architecture that keeps the app fully usable with AI offline
- Grounded, sourced AI answers instead of open-ended generation

### Technical Skills

- Mobile app development with React Native (Expo) and TypeScript
- On-device SQLite data modelling and a typed data access layer
- Embeddings, semantic search, and retrieval-augmented generation
- Retrieval evaluation (recall@k, MRR) against a real labelled eval set
- Local inference with Ollama as a swappable alternative to cloud APIs

### Professional Practices

- Clean git history and meaningful commits
- Behaviour-driven tests (Jest, React Native Testing Library)
- Code quality automation (ESLint, Prettier, Husky, lint-staged, gitleaks)
- TypeScript strict mode throughout
- Feature-cohesion folder structure

---

## Contributing

This is a personal portfolio project — PRs aren't expected, but feedback and suggestions are welcome.

### Code style

- TypeScript throughout, strict mode
- Business logic in hooks, rendering in components

---

## Contact

**Allan Dominguez**
[Portfolio](https://allandominguez.dev/) | [GitHub](https://github.com/allandominguez) | [LinkedIn](https://www.linkedin.com/in/allan-dominguez-113625146/) | [Email](mailto:allan.c.dominguez@gmail.com)

_This project is part of my portfolio demonstrating full-stack mobile product development._

---

## License

MIT License — see [LICENSE](LICENSE) file for details.
