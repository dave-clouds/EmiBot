# GitHub Copilot Review Instructions

These instructions apply when GitHub Copilot is used to review, analyze, explain, or provide feedback about the EmiBot repository.

## Project Context

EmiBot is a Discord-native bot that is being developed incrementally toward a future multi-purpose assistant.

Before reviewing code or making recommendations, read:

- `README.md`
- `docs/PROJECT.md`
- `docs/ARCHITECTURE.md`
- `docs/ROADMAP.md`

Use the documentation and the existing implementation as the source of truth for the current project state.

## Review Principles

When reviewing EmiBot:

- Distinguish implemented functionality from planned functionality.
- Do not assume roadmap items have already been implemented.
- Respect the existing architecture and project boundaries.
- Identify unnecessary complexity, security risks, bugs, and maintainability problems.
- Prefer small, focused, reversible changes.
- Consider existing tests, linting, formatting, configuration, and logging practices.
- Do not recommend introducing dependencies or services without a clear reason.

## Current Development Boundaries

Unless explicitly authorized by the project maintainer, treat the following as future functionality:

- AI / LLM functionality.
- EmiAgent intelligence and reasoning.
- Zora integration.
- Wallet functionality.
- Token trading or transaction execution.
- Blockchain integrations.
- Solana / Pump.fun functionality.
- Telegram integration.
- Image-generation integration.
- Autonomous financial or trading actions.
- Production deployment changes.

Do not treat planned functionality as implemented functionality.

## Security

Never recommend committing or exposing:

- API keys.
- Discord tokens.
- Private keys.
- Wallet credentials.
- `.env` files.
- Other secrets or sensitive credentials.

Use environment variables and `.env.example` for configuration documentation.

## Review Output

When providing a review, prioritize:

1. Correctness.
2. Security.
3. Architecture.
4. Maintainability.
5. Testing.
6. Documentation consistency.

Clearly distinguish between:

- Confirmed problems.
- Potential problems.
- Recommendations.
- Optional improvements.

Do not make assumptions when repository information is missing. State what information is required.
