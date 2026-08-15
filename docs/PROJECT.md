EmiBot — Project Definition

Overview

EmiBot is the first implementation of a future Discord-native AI assistant called EmiAgent.

The project is being developed incrementally. EmiBot begins as a small, reliable Discord bot and will gradually evolve toward a multi-purpose assistant capable of interacting with external platforms and services.

The current implementation intentionally focuses on establishing a reliable Discord and application foundation before introducing real AI, blockchain, wallet, trading, or autonomous functionality.

---

Current Project State

Current milestone: Milestone 4 — EmiAgent Foundation

Milestone 4 status: Active

Milestones 1–3 have been completed.

The current implementation can:

- Connect to Discord through the Discord Gateway.
- Authenticate using a Discord bot token supplied through environment configuration.
- Respond to eligible mentions in Discord servers where the bot is present.
- Respond to direct messages.
- Ignore messages sent by other bots.
- Handle slash commands through the command handler.
- Separate message handling from the Discord client.
- Separate slash-command handling from the Discord client.
- Load application configuration through the configuration layer.
- Provide structured application logging.
- Handle Discord client errors.
- Handle graceful shutdown signals.
- Run automated tests with Vitest.
- Run linting with ESLint.
- Verify formatting with Prettier.

Milestone 4 begins the transition toward the planned EmiAgent application layer.

The M4 implementation should introduce a small assistant boundary capable of receiving normalized application requests and returning structured responses.

The initial assistant implementation must be deterministic or mock-based.

A real AI or LLM provider is not part of M4 unless explicitly approved.

The authoritative milestone status and verification requirements are maintained in:

docs/ROADMAP.md

---

Long-Term Vision

The long-term goal is to evolve EmiBot into EmiAgent, a Discord-native assistant capable of understanding requests, reasoning about tasks, and using approved tools and external integrations.

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

The long-term vision does not authorize implementation of future capabilities.

The active milestone in "docs/ROADMAP.md" remains the implementation boundary unless a human maintainer explicitly approves additional work.

---

Current Development Scope

Development must follow the active milestone defined in:

docs/ROADMAP.md

For Milestone 4, development is limited to establishing the EmiAgent foundation.

M4 should:

- Define a clear assistant/application interface.
- Accept normalized application requests.
- Return structured assistant responses.
- Provide a deterministic or mock assistant implementation.
- Establish a clean boundary between Discord handlers and assistant logic.
- Provide appropriate automated tests.
- Establish security boundaries for future assistant capabilities.
- Preserve all existing M1–M3 functionality.

M4 should remain small and understandable.

The assistant foundation should be designed so that a future real AI provider can be introduced behind the defined interface without requiring unnecessary changes to the Discord layer.

---

Explicitly Out of Scope Until Authorized

The following must not be implemented unless explicitly authorized by a human maintainer and included in an approved milestone:

- Real AI or LLM provider integration.
- Unrestricted AI or autonomous reasoning.
- Autonomous decision making.
- Zora integration.
- Wallet creation, custody, or management.
- Private-key handling.
- Seed-phrase handling.
- Blockchain transactions or signing.
- Token trading or automated trading.
- Solana or Pump.fun integrations.
- Telegram or other chat-platform integrations.
- Image-generation integrations.
- Autonomous financial actions.
- Persistent databases.
- Web dashboards.
- Production deployment infrastructure.
- Unrestricted filesystem access for the assistant.
- Unrestricted network access for the assistant.
- Unrestricted external tool execution.
- MCP servers or external agent tools unless explicitly approved and required by the active milestone.

Future interfaces or placeholders should only be introduced when they are required by the active milestone.

They should remain minimal and clearly documented as future functionality.

---

M4 — EmiAgent Foundation

Purpose

Milestone 4 establishes the first application-level foundation for EmiAgent.

The goal is not to create a fully intelligent agent.

The goal is to establish the boundary that will eventually allow EmiAgent to receive application requests, process them, and return structured responses.

The initial implementation should use deterministic or mock behavior.

Conceptually:

Discord
   │
   ▼
Message / Command Handler
   │
   ▼
Normalized Application Request
   │
   ▼
EmiAgent Interface
   │
   ▼
Mock / Deterministic Assistant
   │
   ▼
Structured Response
   │
   ▼
Discord Handler
   │
   ▼
Discord

The assistant must remain independent from Discord-specific implementation details.

---

M4 Assistant Boundary

The assistant should receive an application-level request rather than a raw Discord event object.

The application request should contain only the information required by the assistant.

The assistant should return a structured response that the application layer can translate into the appropriate interface response.

The exact request and response structure should remain intentionally small.

The design should prioritize:

- Clear responsibilities.
- Simple interfaces.
- Testability.
- Replaceability.
- Explicit dependencies.
- Controlled error handling.

---

Deterministic / Mock Assistant

The M4 assistant implementation should be deterministic or mock-based.

It should provide predictable responses for known requests.

The purpose of the mock assistant is to validate:

- Request validation.
- Assistant invocation.
- Response structure.
- Error handling.
- Application routing.
- Handler integration.
- Testability.

The mock assistant is not intended to simulate full AI reasoning.

It provides the foundation for a future assistant implementation.

---

Future AI Provider Boundary

A future AI or LLM provider should be introduced behind the assistant/application interface.

The Discord layer should not need to know:

- Which AI provider is being used.
- How prompts are constructed.
- How model responses are generated.
- Which model is selected.
- How provider-specific authentication works.

The desired future relationship is:

Discord
   │
   ▼
Application
   │
   ▼
EmiAgent Interface
   │
   ▼
AI Provider Implementation

The provider implementation should be replaceable without coupling the Discord layer to a specific vendor.

No real provider should be introduced during M4 without explicit approval.

---

Architecture Principles

The system should maintain a clear separation between the Discord interface and the application's internal logic.

Discord Interface Layer

The Discord layer is responsible for:

- Discord Gateway lifecycle.
- Receiving Discord events.
- Handling Discord-specific message interactions.
- Handling Discord-specific command interactions.
- Sending responses back to Discord.

Discord-specific objects should not unnecessarily cross into the application or assistant layer.

---

Message and Command Handlers

Message and command handling should remain in dedicated handler modules.

Current locations include:

src/handlers/message-handler.js
src/handlers/command-handler.js

These handlers translate Discord-specific interactions into application-level behavior where required.

Handlers should not contain:

- LLM-provider implementation.
- Wallet logic.
- Blockchain transaction logic.
- Zora integration logic.
- Unrestricted external-service calls.

---

Application / Business Logic

Application logic should live outside the Discord adapter where practical.

This allows future functionality to be reused independently of Discord-specific event handling.

The application layer should depend on defined interfaces rather than concrete external-service implementations where appropriate.

---

EmiAgent Layer

Milestone 4 introduces the initial EmiAgent foundation.

The EmiAgent layer should:

- Receive normalized application requests.
- Process requests through the defined assistant interface.
- Return structured responses.
- Remain independent from Discord-specific implementation details.
- Use deterministic/mock behavior during M4.

Future EmiAgent capabilities may include:

- Natural-language understanding.
- Reasoning.
- Tool selection.
- Content generation.
- External service coordination.

Those capabilities remain future functionality unless explicitly authorized by a roadmap milestone.

---

Technology Direction

Runtime

- Node.js.
- JavaScript using ES modules.

Discord

- "discord.js".
- Discord Gateway.

Configuration

- Environment variables for configuration and secrets.
- ".env" for local development only.
- ".env.example" for documenting required variables without secret values.

Logging

- Pino for structured application logging.
- "pino-pretty" for readable local development logs.

Testing

- Vitest for automated tests.

Code Quality

- ESLint for static analysis.
- Prettier for formatting.

Source Control

- Git.
- GitHub.
- Development work is performed on development or feature/milestone branches before changes are considered for "main".

The normal workflow is:

feature / milestone branch
        │
        ▼
testing and review
        │
        ▼
pull request
        │
        ▼
dev
        │
        ▼
main

---

Development Environment

The project may be developed using:

- Termux.
- Acode.
- Replit.
- GitHub Copilot.

Replit may be used as the agent-assisted development environment.

GitHub Copilot may be used for code review, analysis, explanation, or repository assistance.

Agents must follow the repository documentation before modifying code.

Agent-generated changes must be reviewed and tested by the human maintainer before being merged.

Agents must not introduce functionality outside the active milestone.

---

Hosting

Production hosting has not yet been finalized.

Railway or another appropriate cloud platform may be evaluated later.

No production deployment should be introduced without explicit approval.

---

Security and Secrets

Security is a core project requirement.

Never commit:

- Discord bot tokens.
- API keys.
- Private keys.
- Seed phrases.
- Wallet credentials.
- Passwords.
- Other sensitive credentials.
- ".env" files containing real values.

Secrets must be supplied through environment variables or an appropriate secret-management system.

The repository may contain ".env.example", but it must never contain real credentials.

Code, logs, tests, documentation, screenshots, and pull requests must not expose secrets.

Any functionality involving funds, wallets, signing, transactions, or external account permissions requires explicit design and approval before implementation.

---

EmiAgent Security Boundaries

During M4, EmiAgent must not have access to:

- Private keys.
- Seed phrases.
- Wallet credentials.
- Discord tokens.
- API keys.
- Passwords.
- Unrestricted filesystem operations.
- Unrestricted network operations.
- Unrestricted external tools.

The assistant must not independently:

- Sign transactions.
- Transfer funds.
- Buy or sell assets.
- Mint blockchain content.
- Publish external content.
- Execute financial actions.
- Modify repository secrets.
- Modify security configuration without explicit authorization.

Future tools must be exposed through explicit interfaces with defined permissions.

---

Development Workflow

Development should be incremental and reviewable.

The preferred workflow is:

1. Identify the active milestone.
2. Read the relevant project documentation.
3. Understand the existing implementation.
4. Define the smallest change required.
5. Define or confirm the architecture before introducing new components.
6. Implement the change.
7. Add or update tests where appropriate.
8. Run:

npm run check

9. Review the implementation and Git diff.
10. Perform required manual validation.
11. Commit changes to the active feature or milestone branch.
12. Push the branch to GitHub.
13. Create a pull request into "dev".
14. Merge only after automated checks and human review pass.
15. Delete the completed milestone branch when appropriate.
16. Keep "main" reserved for reviewed, stable project state.

---

Agent-Assisted Development Rules

When an AI coding agent is used:

1. The agent must read the relevant repository documentation before making changes.
2. The agent must identify the active milestone.
3. The agent must produce an implementation plan before making significant changes.
4. The agent must remain within the active milestone scope.
5. The agent must not introduce future functionality without explicit approval.
6. The agent must preserve existing behavior unless the active milestone requires a change.
7. The agent must add appropriate tests.
8. The agent must run "npm run check".
9. The agent must report important implementation decisions.
10. The human maintainer must review the resulting changes before merging.

For M4 specifically, the agent must not introduce a real LLM provider, wallet functionality, blockchain transactions, Zora integration, or unrestricted tools.

---

Project Principles

The project follows these principles:

Incremental Complexity

Introduce complexity only when the current milestone requires it.

Explicit Boundaries

Components should have clear responsibilities and dependencies.

Security First

Secrets, wallets, funds, and external permissions require explicit security design.

Testability

New application behavior should be independently testable where practical.

Replaceability

Future external services should be replaceable without unnecessarily rewriting the application.

Human Approval

AI agents may assist with implementation, but architectural changes, security-sensitive functionality, and milestone completion require human review and approval.

No Premature Abstraction

Do not create abstractions solely for hypothetical future functionality.

Documentation as Contract

Repository documentation describes the intended behavior and constraints of the project.

When documentation and implementation disagree, the discrepancy should be identified and resolved rather than silently ignored.

---

Source of Truth

The project documentation has distinct responsibilities:

- "README.md" — project entry point and navigation.
- "docs/PROJECT.md" — project definition, goals, scope, and principles.
- "docs/ARCHITECTURE.md" — technical architecture and design direction.
- "docs/ROADMAP.md" — milestones, requirements, and completion status.
- "docs/REPLIT_AGENT.md" — instructions for the Replit Agent.
- ".github/copilot-instructions.md" — guidance for GitHub Copilot when performing repository review and analysis.

The active roadmap milestone defines what may be implemented.

Architecture documentation must not be used to justify implementing future functionality early.

When documentation conflicts with the actual implementation, the discrepancy should be identified and resolved rather than silently assuming one is correct.
