# EmiBot — Architecture

## Purpose

This document describes how EmiBot is structured, how its components interact, and the architectural direction of the project.

It distinguishes between:

- **Current architecture** — functionality that is actually implemented.
- **Target architecture** — the planned structure as EmiBot evolves toward EmiAgent.

Planned components must not be treated as implemented functionality.

---

## Architecture Goals

The architecture is designed to:

- Keep the Discord integration simple and testable.
- Keep application and business logic separate from Discord-specific code as the project grows.
- Make future integrations replaceable and independently testable.
- Keep configuration and secrets outside the source code.
- Make failures observable through structured logging.
- Support incremental development without prematurely introducing complex infrastructure.
- Keep changes small, understandable, and reversible.

---

# Current Architecture

## Current Milestone

**Milestone 1 — Discord Bot Foundation**

The current implementation is intentionally small.

The repository currently contains:

```text
src/
├── config/
│   └── env.js
├── lib/
│   └── logger.js
└── index.js

Automated tests are located in:

tests/
├── config.test.js
└── logger.test.js


---

Current Components

Discord Client

The Discord client is created in:

src/index.js

It uses discord.js and connects to Discord through the Discord Gateway.

The Discord client currently enables the intents required for the implemented Discord behavior:

Guilds

GuildMessages

MessageContent


The Discord client is responsible for:

Connecting to Discord.

Receiving Discord events.

Detecting when EmiBot is mentioned.

Responding to eligible messages.

Handling Discord client errors.

Destroying the client during shutdown.


Message Handling

The current message handling is intentionally located in src/index.js.

The bot:

1. Receives a messageCreate event.


2. Ignores messages sent by bots.


3. Checks whether EmiBot was mentioned.


4. Replies when EmiBot is mentioned.


5. Logs an error if the reply fails.



This is intentionally simple for Milestone 1.

As the project grows, message and command handling should be extracted from src/index.js into dedicated modules when the complexity justifies it.

Configuration

Configuration is handled by:

src/config/env.js

The configuration layer loads environment variables and validates the required Discord configuration.

The Discord bot token is supplied through:

DISCORD_TOKEN

Secrets are never stored directly in source code.

Logging

Structured logging is handled by:

src/lib/logger.js

The project uses Pino for application logging.

Logging is used for important events such as:

Successful Discord connection.

Discord client errors.

Failed message replies.

Graceful shutdown.


Secrets and credentials must never be written to logs.


---

Current Data Flow

The current Milestone 1 message flow is:

Discord
   │
   ▼
Discord Gateway
   │
   ▼
discord.js Client
   │
   ▼
messageCreate event
   │
   ├── Message from bot?
   │       └── Yes → Ignore
   │
   └── EmiBot mentioned?
           │
           ├── No → Ignore
           │
           └── Yes
                │
                ▼
           Reply to message
                │
                ▼
             Discord

The current implementation does not yet contain an independent Bot Controller, Assistant, AI layer, or external integration adapter.


---

Startup and Shutdown Flow

Startup

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



Shutdown

The application handles:

SIGINT

SIGTERM


During shutdown it:

1. Logs the shutdown event.


2. Destroys the Discord client.


3. Exits the process.



This provides predictable behavior when the application is stopped locally or by a hosting environment.


---

Error Handling

The current application uses explicit error handling around operations that can fail.

Examples include:

Discord client errors.

Failed message replies.

Failed Discord authentication.


Errors should be logged with enough context to diagnose the problem without exposing secrets.

Future external integrations should use:

async/await.

Explicit error handling.

Appropriate timeouts.

Clear error boundaries.

Structured logging.


Long-running or blocking operations should not unnecessarily block Discord event handling.


---

Configuration and Secrets

Configuration values are provided through environment variables.

The primary required secret is:

DISCORD_TOKEN

Local development may use a .env file, but real .env files must never be committed to Git.

The repository may contain:

.env.example

to document required environment variables without containing real secret values.

Future services and integrations should follow the same configuration principle.


---

Testing

The project uses Vitest for automated testing.

Current tests cover configuration and logging behavior.

The standard validation command is:

npm run check

This runs:

ESLint
   ↓
Prettier check
   ↓
Vitest

New behavior should include appropriate tests where practical.

Discord behavior that cannot reasonably be tested through unit tests should have documented manual validation steps.


---

Code Quality

The project currently uses:

ESLint — static analysis.

Prettier — code formatting.

Vitest — automated testing.


The expected validation command before completing a code change is:

npm run check

A change should not be considered complete when these checks fail unless the failure is explicitly understood and documented.


---

Target Architecture

As EmiBot grows toward EmiAgent, the application should gradually move toward a more modular architecture.

The intended direction is:

Discord
                            │
                            ▼
                   Discord Adapter
                            │
                            ▼
                    Message Handler
                            │
                            ▼
                    Command / App Layer
                            │
                            ▼
                        EmiAgent
                            │
              ┌─────────────┼─────────────┐
              ▼             ▼             ▼
          Zora Tool     Wallet Tool    Other Tools
              │             │             │
              └─────────────┼─────────────┘
                            ▼
                     External Services

This is a target design, not the current implementation.

The architecture should evolve toward this structure only when the active roadmap milestone requires it.


---

Future Components

Discord Adapter

The future Discord Adapter will isolate Discord-specific concerns from the rest of the application.

Responsibilities may include:

Discord Gateway connection.

Discord event translation.

Message and command input handling.

Sending responses to Discord.


Higher-level application logic should not depend directly on Discord-specific implementation details.

Message Handler

A dedicated Message Handler may eventually normalize Discord events into application-level events.

It may handle:

Mentions.

Messages.

Slash commands.

Validation.

Routing.


This component should only be introduced when the complexity of src/index.js justifies the separation.

Application / Command Layer

The application layer will contain reusable application behavior independent of Discord-specific APIs.

For example:

Discord command
      ↓
Application command
      ↓
Business operation

This allows the same application behavior to potentially be triggered by other interfaces in the future.

EmiAgent

EmiAgent is the planned intelligence layer of the project.

It may eventually:

Understand natural-language requests.

Reason about tasks.

Select approved tools.

Generate or refine content.

Coordinate external integrations.


EmiAgent is not part of the current Milestone 1 implementation.

External Integration Adapters

Future services such as Zora and other external APIs should be implemented through independent adapters or tools.

The goal is to avoid coupling external-service logic directly to Discord event handlers.

For example:

EmiAgent
   │
   ├── Zora adapter
   ├── Wallet adapter
   └── Other service adapters

Each integration should have clear boundaries, error handling, authentication requirements, and tests.


---

Dependency Direction

The preferred future dependency direction is:

Interface
   ↓
Application
   ↓
Business Logic
   ↓
Tools / Integrations

Higher-level application logic should not depend unnecessarily on low-level Discord implementation details.

External integrations should not be imported directly into Discord event handlers when a dedicated application/tool boundary is appropriate.

The architecture should avoid unnecessary circular dependencies.


---

State Management

The current Milestone 1 implementation does not require a persistent database.

Avoid introducing persistent storage until a roadmap milestone requires it.

When state becomes necessary, the storage mechanism should be introduced deliberately with documented:

Data ownership.

Data model.

Persistence requirements.

Security considerations.

Failure behavior.

Testing strategy.


Avoid unnecessary global mutable state.

Prefer explicit dependencies and initialization.


---

External Integrations

The following integrations are future possibilities and are not currently implemented:

Zora.

Blockchain networks.

Wallet services.

Trading or market services.

AI/LLM providers.

Image-generation services.

Additional communication platforms.


No external integration should be added simply because it appears in the long-term vision.

An integration must first be authorized by the relevant roadmap milestone or explicitly approved by a human maintainer.


---

Security Architecture

Security requirements apply to every layer of the system.

Never commit:

Discord tokens.

API keys.

Private keys.

Seed phrases.

Wallet credentials.

Passwords.

.env files containing real secrets.


Never expose secrets through:

Logs.

Error messages.

Tests.

Documentation.

Screenshots.

Git commits.

Pull requests.


Operations involving wallets, funds, signing, transactions, or external account permissions require explicit security design and human approval before implementation.


---

Architecture Change Rules

Architecture should evolve incrementally.

Before introducing a new architectural component:

1. Confirm that the current milestone requires it.


2. Check whether the existing implementation can support the requirement without unnecessary complexity.


3. Define the component's responsibility.


4. Define its dependencies.


5. Add appropriate tests.


6. Update this document if the architecture materially changes.



Do not introduce abstractions solely for hypothetical future requirements.

The target architecture is a direction, not a requirement to implement every planned component immediately.


---

Source of Truth

The project documentation has distinct responsibilities:

README.md — project entry point and navigation.

docs/PROJECT.md — project definition, goals, scope, and principles.

docs/ARCHITECTURE.md — technical architecture and design direction.

docs/ROADMAP.md — milestones, requirements, and completion status.

docs/REPLIT_AGENT.md — instructions for the Replit Agent.

.github/copilot-instructions.md — guidance for GitHub Copilot when performing repository review and analysis.


When documentation conflicts with the actual implementation, the discrepancy should be identified and resolved rather than silently assuming one is correct.
```
