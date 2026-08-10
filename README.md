# EmiBot

EmiBot is the first implementation of a future Discord-native AI assistant (EmiAgent). This repository contains the project's documentation, design notes, and the initial small-scope objectives for a minimal Discord bot.

Current status
- Goal for the first implementation: connect to Discord (Discord Gateway) and reply when mentioned in a server.
- Not implemented yet: AI features, wallets, Zora, trading, slash commands (initially), or any blockchain functionality.
- Development artifacts: documentation (docs/) and project scaffolding. The application code will be added in small incremental PRs.

Technology direction
- JavaScript (Node.js)
- discord.js (Discord Gateway)
- Environment variables for secrets (e.g., DISCORD_TOKEN)
- Development: Replit
- Hosting target: Railway (or similar)

Getting started (developer notes)
1. Read the docs:
   - docs/PROJECT.md
   - docs/ARCHITECTURE.md
   - docs/ROADMAP.md
2. Required environment variables:
   - DISCORD_TOKEN — Discord bot token (do NOT commit)
3. Local development (high-level):
   - Install Node.js (LTS), install dependencies, and run the bot (implementation not added yet).
   - Replit: use the Replit secrets manager to set DISCORD_TOKEN and run the Node process.
4. Security:
   - Never commit secrets or .env files. Use your platform's secret manager.

Where to find more information
- docs/PROJECT.md — project scope, philosophy, and security.
- docs/ARCHITECTURE.md — architecture and component diagram.
- docs/ROADMAP.md — milestones and future work.

Contributing
- Work in small PRs.
- Read .github/copilot-instructions.md for guidance directed at automated contributors.
- Open issues for design questions or anything that requires maintainer approval.

License
- The repository is provided under the MIT License. See LICENSE for details.
