# EmiBot — Roadmap

Purpose
-------

This roadmap defines incremental milestones so work can proceed in small, reviewable steps. Milestone 1 is the only one required for the first implementation; all later milestones are planned future work.

Milestone 1 — Basic Discord bot (PRIORITY: current)

- Objective: Get EmiBot online and responding to mentions.
- Deliverables:
  - Minimal Node.js project structure (src/, package.json skeleton).
  - A Discord Gateway connection implemented using discord.js (or raw gateway if preferred).
  - On mention (e.g., user messages that include @EmiBot), reply with a friendly greeting:
    User: @EmiBot hello
    EmiBot: 👋 Hello! I'm EmiBot. I'm online and ready.
  - Document required environment variables (DISCORD_TOKEN).
  - Basic development instructions for running locally (Replit friendly).
- Constraints:
  - Do NOT implement slash commands, AI, Zora, wallet, or blockchain features yet.
  - Do NOT store secrets in repo.

Milestone 2 — Slash commands and command framework (FUTURE)

- Add a minimal slash-command registration flow (e.g., /ping -> Pong). This can be implemented after Milestone 1 but only with explicit instruction.
- Implement a small command handler framework with tests.

Milestone 3 — Message handling and content routing

- Add message parsing, sanitization, and a routing layer for different message intents.
- Provide hooks for rate-limiting and moderation.

Milestone 4 — Assistant integration (AI) (FUTURE)

- Introduce the assistant/business-logic module that can receive normalized inputs and return responses.
- Start with a mock or no-op assistant; do not call LLMs until design and security review.

Milestone 5 — External integrations (Zora, wallets) (FUTURE)

- Add adapter interfaces for Zora and wallet providers.
- Implement adapter stubs and unit tests.
- Strict security and confirmation workflows required before enabling any transaction capability.

Milestone 6 — Trading, dashboards, multi-platform (FUTURE)

- Add complex features such as trading, web dashboard, Telegram or other platforms only after prior milestones are secure and well-tested.

Notes on scope and priorities

- Milestone 1 must be small, fast, and low-risk.
- Each milestone should be delivered in a small PR with tests and clear instructions.
- Anything involving keys, funds, signing, or transactions requires explicit design, multi-step confirmations, and strong security controls.

How to propose changes to the roadmap

- Open a short proposal issue that states: goal, rationale, required secrets, and a rollback/disable mechanism.
