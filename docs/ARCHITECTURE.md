EmiBot — Architecture

Purpose

This document describes how EmiBot is structured, how its components interact, and the architectural direction of the project as it evolves toward EmiAgent.

It distinguishes between:

- Current architecture — functionality that is actually implemented.
- M4 architecture — functionality authorized for the current milestone.
- Target architecture — longer-term planned structure.

Planned components must not be treated as implemented functionality.

---

Architecture Goals

The architecture is designed to:

- Keep the Discord integration simple and testable.
- Keep application and business logic separate from Discord-specific code.
- Introduce EmiAgent through a small, controlled interface.
- Keep future integrations replaceable and independently testable.
- Keep configuration and secrets outside source code.
- Make failures observable through structured logging.
- Support incremental development without prematurely introducing complex infrastructure.
- Keep changes small, understandable, and reversible.
- Prevent the assistant from directly accessing secrets, wallets, or unrestricted external services.

---

Current Architecture

Current Milestone

Milestone 4 — EmiAgent Foundation

Milestones 1–3 are complete.

Milestone 4 introduces the foundation for the planned EmiAgent intelligence layer.

The M4 implementation must remain deliberately small. It establishes the assistant/application boundary without introducing a real LLM provider or autonomous external actions.

---

Current Components

Discord Client

The Discord client is created in:

src/index.js

It uses "discord.js" and connects to Discord through the Discord Gateway.

The Discord client enables the intents required by the implemented Discord behavior.

The Discord client is responsible for:

- Connecting to Discord.
- Receiving Discord events.
- Registering application event handlers.
- Handling Discord client errors.
- Destroying the client during shutdown.

Discord-specific event handling should remain close to the Discord boundary.

---

Message Handler

Message handling is implemented in:

src/handlers/message-handler.js

The message handler is responsible for processing eligible Discord messages.

Its responsibilities include:

- Ignoring messages sent by bots.
- Determining whether EmiBot should respond.
- Handling eligible message requests.
- Returning or sending the appropriate response through the existing application flow.
- Handling message-level failures appropriately.

Discord-specific behavior should remain isolated from future assistant logic.

The message handler must not contain LLM-provider logic, wallet logic, blockchain logic, or unrestricted external-service calls.

---

Command Handler

Slash-command handling is implemented in:

src/handlers/command-handler.js

The command handler is responsible for:

- Determining whether an interaction is a supported slash command.
- Looking up the corresponding registered command.
- Executing the command.
- Handling command execution errors.
- Providing an appropriate Discord response when execution fails.

Commands should remain independent of the future assistant implementation unless a roadmap milestone explicitly requires assistant integration.

---

Configuration

Configuration is handled by:

src/config/env.js

Configuration values are loaded from environment variables.

Secrets must never be stored directly in source code.

The primary Discord secret is:

DISCORD_TOKEN

Future assistant configuration must follow the same principle.

Provider API keys, credentials, private keys, seed phrases, and wallet credentials must never be hard-coded or committed to the repository.

---

Logging

Structured logging is handled by:

src/lib/logger.js

The project uses Pino for application logging.

Logging should be used for important operational events such as:

- Successful Discord connection.
- Discord client errors.
- Failed message handling.
- Failed command execution.
- Assistant/application errors.
- Graceful shutdown.

Secrets and sensitive credentials must never be written to logs.

Assistant requests and responses should only be logged when necessary for debugging and must not expose secrets or sensitive credentials.

---

Current Data Flow

The current Discord/application flow is:

Discord
   │
   ▼
Discord Gateway
   │
   ▼
discord.js Client
   │
   ├── messageCreate
   │       │
   │       ▼
   │   Message Handler
   │
   └── interactionCreate
           │
           ▼
      Command Handler

The M3 refactor moved message and command handling out of "src/index.js" into dedicated handlers.

M4 builds the next boundary on top of this structure.

---

M4 — EmiAgent Foundation

M4 Objective

Milestone 4 introduces the foundation for EmiAgent.

The purpose of M4 is to create a controlled assistant/application interface that can receive normalized application requests and return structured responses.

The initial assistant implementation should be deterministic or mock-based.

M4 is not the introduction of a real AI provider.

---

M4 Architecture

The M4 architecture should follow this direction:

Discord
   │
   ▼
Discord Adapter / Event Layer
   │
   ▼
Message / Command Handlers
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
Structured Assistant Response
   │
   ▼
Application Layer
   │
   ▼
Discord Response

The important boundary is:

Discord-specific input
        ↓
Normalized application request
        ↓
Assistant interface
        ↓
Structured response
        ↓
Discord-specific output

The assistant must not depend directly on Discord event objects where avoidable.

---

Assistant Interface

M4 should define a small assistant interface.

The exact implementation may vary, but conceptually the interface should provide:

Assistant
   │
   ├── receives an application request
   │
   └── returns a structured assistant response

A conceptual request may contain:

{
  input,
  source,
  context
}

A conceptual response may contain:

{
  content,
  status
}

The implementation should keep the interface small and easy to replace.

The mock assistant should be replaceable by a real LLM-backed implementation in a future milestone without requiring the Discord handlers to be rewritten.

---

Assistant Responsibilities

The M4 assistant may:

- Receive normalized application requests.
- Perform deterministic/mock processing.
- Return a predictable structured response.
- Validate the request shape.
- Report controlled errors.

The M4 assistant must not:

- Call an external LLM provider.
- Access private keys.
- Access wallet credentials.
- Sign transactions.
- Send blockchain transactions.
- Execute trades.
- Mint content.
- Call Zora.
- Access unrestricted external services.
- Perform autonomous actions.
- Modify repository configuration or secrets.

---

Assistant Boundary

The assistant is an application component.

It should not know about Discord-specific implementation details such as:

- Discord client instances.
- Discord gateway events.
- Discord channel objects.
- Discord message objects.

The handler is responsible for translating Discord input into an application request.

Conceptually:

Discord Message
      │
      ▼
Message Handler
      │
      ▼
Application Request
      │
      ▼
EmiAgent
      │
      ▼
Assistant Response
      │
      ▼
Message Handler
      │
      ▼
Discord Message

This separation allows EmiAgent to eventually support additional interfaces without coupling the assistant to Discord.

---

Mock / Deterministic Assistant

M4 should use a mock or deterministic assistant.

The implementation should produce predictable results for known inputs.

This provides a controlled environment for testing:

- Request validation.
- Assistant invocation.
- Response structure.
- Error handling.
- Handler-to-assistant integration.

The mock assistant is intentionally not intended to simulate full AI reasoning.

Its purpose is to establish the architecture and contracts required before introducing a real AI provider.

---

M4 Security Boundaries

Security boundaries must be established before external tools or AI providers are introduced.

Secrets

The assistant must not receive:

- Discord tokens.
- API keys.
- Private keys.
- Seed phrases.
- Wallet credentials.
- Passwords.
- Authentication tokens.

Secrets must remain in the appropriate configuration or secret-management boundary.

---

Wallets and Funds

M4 must not introduce wallet functionality.

The assistant must not:

- Read private keys.
- Sign transactions.
- Transfer funds.
- Buy tokens.
- Sell tokens.
- Approve transactions.
- Access wallet seed phrases.

Any future wallet capability requires a separate security design and explicit approval.

---

External Services

M4 must not introduce unrestricted external service access.

Future integrations must be placed behind explicit application/tool boundaries.

For example:

EmiAgent
   │
   ▼
Approved Tool Interface
   │
   ▼
External Service Adapter

The assistant should not directly import arbitrary external-service SDKs merely because they may be useful in the future.

---

Autonomous Actions

M4 must not introduce unrestricted autonomous behavior.

The assistant should only perform the operation explicitly authorized by the application flow.

Future tool execution must define:

- Allowed operations.
- Required inputs.
- Authentication requirements.
- Permission boundaries.
- Failure behavior.
- Logging requirements.
- Human approval requirements where applicable.

---

Future Tool Architecture

Tools are a future extension of EmiAgent.

The intended direction is:

                    EmiAgent
                       │
          ┌────────────┼────────────┐
          ▼            ▼            ▼
      Zora Tool    Wallet Tool   Other Tool
          │            │            │
          ▼            ▼            ▼
      Zora API      Wallet      External API

These tools are not implemented by M4.

Each future tool must have a clearly defined interface and security boundary.

Tools should not expose raw credentials or unrestricted capabilities to the assistant.

---

Error Handling

The application should use explicit error boundaries.

Examples include:

- Discord client failures.
- Message handler failures.
- Command handler failures.
- Assistant validation failures.
- Assistant execution failures.
- Future integration failures.

Assistant failures should produce controlled application responses rather than crashing the Discord process.

Errors should be logged with enough context to diagnose the problem without exposing secrets.

Future external integrations should use:

- "async/await".
- Explicit error handling.
- Appropriate timeouts.
- Clear error boundaries.
- Structured logging.

---

Startup and Shutdown

The application starts through:

npm start

which executes:

src/index.js

The application:

1. Loads configuration.
2. Creates the Discord client.
3. Registers Discord event handlers.
4. Registers error handling.
5. Registers shutdown handlers.
6. Connects to Discord using the configured bot token.

Shutdown handles:

SIGINT
SIGTERM

During shutdown the application:

1. Logs the shutdown event.
2. Destroys the Discord client.
3. Exits the process.

M4 must preserve this predictable startup and shutdown behavior.

---

Testing

The project uses Vitest for automated testing.

The standard validation command is:

npm run check

This runs:

ESLint
   ↓
Prettier check
   ↓
Vitest

M4 should add tests for the new assistant/application boundary.

Tests should cover, where applicable:

- Valid assistant requests.
- Invalid assistant requests.
- Deterministic assistant responses.
- Handler-to-assistant interaction.
- Assistant error handling.
- Response structure.
- Security-sensitive inputs being rejected or excluded.

The assistant should be testable without connecting to Discord or an external AI provider.

Discord behavior that cannot reasonably be tested through unit tests should have documented manual validation steps.

---

Dependency Direction

The preferred dependency direction is:

Discord Interface
        ↓
Handlers
        ↓
Application
        ↓
EmiAgent
        ↓
Approved Tools / Integrations
        ↓
External Services

Higher-level application logic should not unnecessarily depend on Discord implementation details.

EmiAgent should depend on defined interfaces rather than concrete external-service implementations.

External integrations should not be imported directly into Discord event handlers when a dedicated application/tool boundary is appropriate.

The architecture should avoid unnecessary circular dependencies.

---

State Management

M4 does not require a persistent database.

Do not introduce persistent storage unless explicitly required by the roadmap.

The assistant should avoid unnecessary global mutable state.

Prefer explicit dependencies and initialization.

When persistent state becomes necessary, it must be introduced deliberately with documented:

- Data ownership.
- Data model.
- Persistence requirements.
- Security considerations.
- Failure behavior.
- Testing strategy.

---

External Integrations

The following integrations remain future possibilities:

- Zora.
- Blockchain networks.
- Wallet services.
- Trading or market services.
- AI/LLM providers.
- Image-generation services.
- Additional communication platforms.

M4 must not implement these integrations.

An integration must first be authorized by the relevant roadmap milestone or explicitly approved by a human maintainer.

---

Security Architecture

Security requirements apply to every layer of the system.

Never commit:

- Discord tokens.
- API keys.
- Private keys.
- Seed phrases.
- Wallet credentials.
- Passwords.
- ".env" files containing real secrets.

Never expose secrets through:

- Logs.
- Error messages.
- Tests.
- Documentation.
- Screenshots.
- Git commits.
- Pull requests.

Operations involving wallets, funds, signing, transactions, or external account permissions require explicit security design and human approval before implementation.

---

Architecture Change Rules

Architecture should evolve incrementally.

Before introducing a new architectural component:

1. Confirm that the current milestone requires it.
2. Check whether the existing implementation can support the requirement without unnecessary complexity.
3. Define the component's responsibility.
4. Define its dependencies.
5. Define its security boundary.
6. Add appropriate tests.
7. Update this document if the architecture materially changes.

Do not introduce abstractions solely for hypothetical future requirements.

The target architecture is a direction, not a requirement to implement every planned component immediately.

---

M4 Completion Criteria

M4 should not be considered complete merely because the code compiles.

Before M4 can be considered complete:

- The assistant interface is defined.
- A deterministic/mock assistant is implemented.
- The application request/response contract is tested.
- Discord handlers can use the assistant boundary where required by the milestone.
- No real LLM provider has been introduced.
- No wallet functionality has been introduced.
- No private keys or sensitive credentials are exposed.
- No unrestricted autonomous actions have been introduced.
- Automated tests pass.
- Linting passes.
- Formatting passes.
- Required manual validation is performed.
- Documentation accurately reflects the implementation.
- The final M4 completion decision remains a human-maintainer decision.

---

Source of Truth

The project documentation has distinct responsibilities:

- "README.md" — project entry point and navigation.
- "docs/PROJECT.md" — project definition, goals, scope, and principles.
- "docs/ARCHITECTURE.md" — technical architecture and design direction.
- "docs/ROADMAP.md" — milestones, requirements, and completion status.
- "docs/REPLIT_AGENT.md" — instructions for the Replit Agent.
- ".github/copilot-instructions.md" — guidance for GitHub Copilot when performing repository review and analysis.

When documentation conflicts with the actual implementation, the discrepancy should be identified and resolved rather than silently assuming one is correct.

The active roadmap milestone defines what may be implemented. Architecture documentation must not be used to justify implementing future functionality early.
