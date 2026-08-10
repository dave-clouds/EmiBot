# EmiBot — Architecture

Overview
--------
EmiBot is a small, modular Discord bot that serves as the first implementation of a future Discord-native assistant (EmiAgent). The immediate implementation scope is intentionally tiny: connect to Discord via the Discord Gateway and reply when mentioned. The architecture emphasizes separation between the Discord interface layer and the assistant / business logic so future features (AI, wallets, marketplaces) can be added without tightly coupling them to the gateway code.

Goals
- Keep the Discord integration simple and testable.
- Keep assistant/business logic isolated behind clear interfaces.
- Use environment variables for all secrets and credentials.
- Favor small, incremental changes that are easy to review and revert.

High-level components
- Discord Adapter (Gateway layer)
  - Handles connection, reconnection, and low-level gateway events.
  - Parses messages and mention events and forwards them to the Message Handler.
- Message Handler (Interface layer)
  - Normalizes incoming events (mentions, messages, commands).
  - Performs lightweight validation and rate-limiting if needed.
  - Delegates to the Bot Controller or command modules.
- Bot Controller (Core)
  - Implements the minimal decision logic for the first release (e.g., “when mentioned, reply with greeting”).
  - Exposes a clear API so future assistant logic can be plugged in.
- Assistant / Business Logic (Future)
  - Where AI, content, wallet, or trading features will live. Must remain separate modules with well-defined interfaces and dependency injection.
- Adapters (Future)
  - Zora, wallet providers, external APIs — implemented as independent adapters that the Assistant can use; never imported directly by the Discord Adapter.
- Configuration and Secrets
  - Environment variables (e.g., DISCORD_TOKEN). Secrets never committed to git.

Text architecture diagram (simple)
---------------------------------
[Discord Gateway]
        |
  Discord Adapter
        |
  Message Handler  <---> Middleware (logging, validation)
        |
  Bot Controller  <---> Assistant / Business Logic (separate module, future)
        |
  (Adapters: Zora, Wallets, External APIs)  - - - - - - - - - - - (FUTURE)

Design notes
- One-directional dependency: Discord Adapter -> Message Handler -> Bot Controller -> Assistant. Higher-level modules must not depend on the Discord Adapter.
- Keep the interface between Message Handler and Bot Controller small and well-documented (e.g., a single event object structure).
- Avoid global shared state. Use explicit dependency injection or initializers.
- Make it easy to run the Discord Adapter in test mode (mock gateway events).
- Keep any blocking or long-running external calls out of the gateway event loop; use async/await and timeouts.

Environment variables
- DISCORD_TOKEN — required for connecting to the Discord Gateway.
- (Future) Additional secrets will be stored in environment variables or hosting secrets manager.

Security
- Never log secrets or tokens.
- Never commit .env to the repository. Add .env to .gitignore locally and document required variables.
