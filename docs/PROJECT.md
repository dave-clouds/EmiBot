# EmiBot — Project Overview

EmiBot is the first implementation of a future Discord-native AI assistant called EmiAgent. EmiBot's immediate goal is intentionally small and focused: it must connect to Discord via the Discord Gateway and respond when it is mentioned in a server.

Immediate objective (first implementation)

- Connect to Discord using the Discord Gateway.
- Be online and respond to mentions in any server where the bot is present.
  - Example interaction:
    User: @EmiBot hello
    EmiBot: 👋 Hello! I'm EmiBot. I'm online and ready.
- (Planned) Support a simple /ping slash command later — do NOT implement in this first iteration unless explicitly instructed.

Current scope (what to implement now)

- Project and developer documentation.
- A minimal Node.js/JavaScript codebase structure (to be added later by developers/agents).
- Environment configuration via environment variables.
- Tests and CI guidance (skeletons and documentation only for now).

Out-of-scope for the first implementation

Do NOT implement the following in this first release:

- AI/LLM functionality (no calls to language models or inference engines).
- Zora integration or any NFT marketplace features.
- Blockchain functionality, wallets, signing, or transactions.
- Trading functionality or bots interacting with markets.
- Solana/Pump.fun integration or chain-specific code.
- Telegram or other chat-platform integrations.
- Image generation, media processing, or storage systems.
- Persistent databases or web dashboards.
- Autonomous agent behavior or background automation.

Technology direction

- Language: JavaScript (ES2020+ / Node.js)
- Runtime: Node.js (LTS)
- Discord library: discord.js (interacting with the Discord Gateway)
- Configuration: environment variables for secrets
- Source control: GitHub
- Development/testing: Replit for early development and demos
- Hosting (eventual target): Railway or similar cloud platform

Development philosophy

- Keep the Discord interface layer simple and strictly separated from the assistant/business logic. The Discord layer should only handle messages, commands, and the gateway lifecycle; it should delegate decision-making to separate modules.
- Work incrementally with small, reviewable changes. Each change should be easy to test locally (Replit) and include clear documentation and tests where applicable.
- Security-first: Never hard-code secrets or commit .env files. Use environment variables (or the hosting platform's secret manager) for all credentials.
- Fail-safe by default: any action that could affect funds, keys, or external accounts must be explicitly excluded until rigorous design and multi-step confirmations are in place.

Security and secrets

- Never commit Discord bot tokens, private keys, seed phrases, or other secrets to source control.
- Do NOT add any .env files to the repository. Add .env to .gitignore locally and rely on platform secrets for CI/hosting.
- Use environment variables such as DISCORD_TOKEN for the bot token. Document required variables in docs but do not provide values.

Where to start next (for developers/agents)

1. Read docs/ARCHITECTURE.md and docs/ROADMAP.md to understand the design and milestones.
2. Implement Milestone 1: a minimal bot that authenticates with Discord and replies when mentioned. Keep the implementation modular and unit-testable.
3. Open small PRs and include clear descriptions and test instructions.
