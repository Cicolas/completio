# Completio — Claude Code Guide

## Project

**Completio** is a fast AI-powered autocomplete SaaS. The core product delivers short, low-latency completions (a few words). Speed is the primary design constraint — every architectural decision should favor latency over features.

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime / Package Manager | **Bun** (not npm/yarn/pnpm) |
| Backend Framework | AdonisJS v7 |
| Frontend | React v19 + Inertia.js v2 |
| Styling | Tailwind CSS v4 + DaisyUI v5 |
| ORM | Lucid (AdonisJS) |
| Database | SQLite (dev) / MySQL (prod) |
| Validation | Vine |
| Build | Vite v7 |
| HTTP Client (FE) | Tuyau (type-safe AdonisJS routes) |

## Running the project

```bash
bun run dev       # dev server with HMR
bun run build     # production build
bun run test      # run tests (Japa)
bun run lint      # ESLint
bun run typecheck # tsc --noEmit (backend + frontend)
```

## Architecture

### Backend layout

```
app/
├── common/
│   └── interfaces/
│       └── ai_handler.ts      # AiHandler interface — all providers must implement this
├── controllers/
│   └── user/                  # user-scoped controllers (auth, account)
├── models/
│   └── user.ts
├── services/
│   ├── ai_service.ts          # orchestrates handler selection, caching, options
│   └── handlers/              # one file per AI provider (e.g. openai_handler.ts)
├── transformers/              # serialize models before sending to Inertia
└── validators/                # Vine schemas
```

### AI layer pattern

```
Request → AiService.complete(prompt, options)
              └─► selects an AiHandler implementation
                      └─► AiHandler.complete(prompt, options) → string
```

- **`AiHandler`** (`app/common/interfaces/ai_handler.ts`): the contract every provider implements.
- **`AiService`** (`app/services/ai_service.ts`): provider-agnostic facade used by controllers.
- **Handlers** (`app/services/handlers/`): one file per provider (OpenAI, Anthropic, local model, etc.).

### Path aliases (defined in `package.json` `imports`)

Use `#services/*`, `#models/*`, `#controllers/*`, etc. — never use relative `../../` imports across top-level directories.

## Key design constraints

- **Latency first.** Completions should return in as few tokens/ms as possible. Prefer streaming where possible.
- **Short output.** The API should encourage/enforce short completions (few words, not paragraphs).
- **Provider-agnostic.** Business logic must not be tied to a specific AI provider; swap via config.
- **No Anthropic SDK** unless a specific handler targets Claude. Use provider SDKs only inside handler files.

## Frontend conventions

- Pages live in `inertia/pages/`.
- Layouts in `inertia/layouts/`.
- Use Tuyau client (`inertia/client.ts`) for all API calls — never raw `fetch`.
- Toast notifications via Sonner (already wired in the default layout).

## Testing

Framework: **Japa**. Tests live in `tests/`. Run with `bun run test`.