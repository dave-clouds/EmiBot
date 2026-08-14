# EmiBot — Project Definition

## Overview

EmiBot is the first implementation of a future Discord-native AI assistant called **EmiAgent**.

The project is being developed incrementally. EmiBot begins as a small, reliable Discord bot and will gradually evolve toward a multi-purpose assistant capable of interacting with external platforms and services.

The current implementation intentionally focuses on the Discord foundation rather than AI, blockchain, trading, or autonomous behavior.

## Current Project State

**Current milestone:** Milestone 1 — Discord Bot Foundation

**Milestone 1 status:** Complete

The current implementation can:

- Connect to Discord through the Discord Gateway.
- Authenticate using a Discord bot token supplied through environment configuration.
- Respond to mentions in Discord servers where the bot is present.
- Respond to direct messages.
- Ignore messages sent by other bots.
- Log important application and Discord client events.
- Handle graceful shutdown signals.
- Run automated tests with Vitest.
- Run linting with ESLint.
- Verify formatting with Prettier.

The current implementation is intentionally simple and serves as the foundation for future development.

The authoritative milestone status and verification requirements are maintained in `docs/ROADMAP.md`.

## Long-Term Vision

The long-term goal is to evolve EmiBot into **EmiAgent**, a Discord-native assistant capable of understanding requests, reasoning about tasks, and using approved tools and external integrations.

Future capabilities may include:

- Conversational AI.
- Tool-based decision making.
- Zora integration.
- Content discovery and monitoring.
- Content creation and publishing.
- Wallet-aware functionality.
- Carefully controlled blockchain interactions.
- Market and community intelligence.
- Additional external service integrations.

These are future capabilities and must not be treated as currently implemented functionality.

## Current Development Scope

Development should follow the active milestone defined in `docs/ROADMAP.md`.

Only functionality required by the current milestone should be implemented unless a human maintainer explicitly authorizes additional work.

The project should remain small and understandable while the foundation is being developed.

## Explicitly Out of Scope Until Authorized

The following must not be implemented unless explicitly authorized by a human maintainer and included in an approved milestone:

- AI or LLM functionality.
- EmiAgent reasoning or autonomous decision making.
- Zora integration.
- Wallet creation, custody, or management.
- Private-key handling.
- Blockchain transactions or signing.
- Token trading or automated trading.
- Solana or Pump.fun integrations.
- Telegram or other chat-platform integrations.
- Image-generation integrations.
- Autonomous financial actions.
- Persistent databases.
- Web dashboards.
- Production deployment infrastructure.

Future interfaces or placeholders should only be introduced when they are required by the active milestone. They should remain minimal and clearly documented as future functionality.

## Architecture Principles

The system should maintain a clear separation between the Discord interface and the application's internal logic.

### Discord Interface Layer

The Discord layer is responsible for:

- Discord Gateway lifecycle.
- Receiving Discord events.
- Handling Discord-specific message and command interactions.
- Sending responses back to Discord.

### Application / Business Logic

Application logic should live outside the Discord adapter where practical.

This allows future functionality to be reused independently of Discord-specific event handling.

### Future EmiAgent Layer

The future EmiAgent layer will provide intelligence, reasoning, and controlled access to tools.

It should not be tightly coupled to the Discord Gateway implementation.

This separation is important because EmiAgent may eventually interact with multiple services and integrations.

## Technology Direction

### Runtime

- Node.js
- JavaScript using ES modules

### Discord

- `discord.js`
- Discord Gateway

### Configuration

- Environment variables for configuration and secrets.
- `.env` for local development only.
- `.env.example` for documenting required variables without secret values.

### Logging

- Pino for structured application logging.
- `pino-pretty` for readable local development logs.

### Testing

- Vitest for automated tests.

### Code Quality

- ESLint for static analysis.
- Prettier for formatting.

### Source Control

- Git
- GitHub
- Development work is performed on development or feature branches before changes are considered for `main`.

### Development Environment

- Termux and Acode may be used for local development.
- Replit may be used as the primary agent-assisted development environment.
- GitHub Copilot may be used through its web interface for code review, analysis, or explanation.

### Hosting

Production hosting has not yet been finalized.

Railway or another appropriate cloud platform may be evaluated later.

No production deployment should be introduced without explicit approval.

## Security and Secrets

Security is a core project requirement.

Never commit:

- Discord bot tokens.
- API keys.
- Private keys.
- Seed phrases.
- Wallet credentials.
- Passwords.
- Other sensitive credentials.
- `.env` files containing real values.

Secrets must be supplied through environment variables or an appropriate secret-management system.

The repository may contain `.env.example`, but it must never contain real credentials.

Code, logs, tests, documentation, screenshots, and pull requests must not expose secrets.

Any functionality involving funds, wallets, signing, transactions, or external account permissions requires explicit design and approval before implementation.

## Development Workflow

Development should be incremental and reviewable.

The preferred workflow is:

1. Identify the active milestone.
2. Read the relevant project documentation.
3. Understand the existing implementation.
4. Define the smallest change required.
5. Implement the change.
6. Add or update tests where appropriate.
7. Run:

```bash
npm run check
```
