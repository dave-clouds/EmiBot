# EmiBot — Roadmap

## Purpose

This roadmap defines the incremental development path for EmiBot.

The project is developed milestone by milestone. Each milestone should have:

- A clearly defined objective.
- A limited scope.
- Explicit deliverables.
- Tests or validation requirements.
- Clear completion criteria.
- No implementation of future features unless the milestone requires them or a human maintainer explicitly approves the change.

Only the active milestone should be implemented.

---

# Milestone 1 — Discord Bot Foundation

**Status: COMPLETE**

## Objective

Establish the initial EmiBot foundation and prove that EmiBot can connect to Discord and respond to mentions.

## Completed Deliverables

- [x] Minimal Node.js project structure.
- [x] Node.js package configuration.
- [x] Discord Gateway connection using `discord.js`.
- [x] Required Discord Gateway intents configured.
- [x] EmiBot responds when mentioned in a Discord server.
- [x] Bot messages are ignored to prevent self-triggering.
- [x] Discord client errors are handled and logged.
- [x] Graceful shutdown handling for `SIGINT` and `SIGTERM`.
- [x] Environment-based configuration.
- [x] `DISCORD_TOKEN` validation.
- [x] `.env.example` provided without real secrets.
- [x] Structured logging using Pino.
- [x] Automated tests using Vitest.
- [x] ESLint configuration.
- [x] Prettier configuration.
- [x] Combined validation command using `npm run check`.
- [x] Documentation updated to describe the implemented architecture and project direction.
- [x] Manual Discord testing confirmed that EmiBot responds to mentions.

## Validation

The project validation command is:

```bash
npm run check

Milestone 1 validation confirmed:

ESLint passes.

Prettier formatting passes.

Automated tests pass.

EmiBot successfully connects to Discord.

EmiBot successfully responds to mentions in a Discord server.


Milestone 1 Scope

The implementation remains intentionally small.

The current bot does not contain:

AI/LLM functionality.

Zora integration.

Wallet functionality.

Blockchain transactions.

Trading functionality.

Solana/Pump.fun integration.

Telegram integration.

Image generation.

Persistent databases.

Autonomous agent behavior.


These remain future work.


---

Milestone 2 — Slash Commands and Command Foundation

**Status: COMPLETE**

Objective

Introduce a controlled command system that allows EmiBot to respond to explicit Discord slash commands.

Planned Deliverables

Add slash-command registration.

Introduce a minimal command structure.

Add an initial command such as /ping.

Establish command validation and error handling.

Add tests for command behavior.

Keep command logic separated from Discord connection lifecycle where practical.


Constraints

Do not introduce AI, Zora, wallets, trading, blockchain transactions, or autonomous behavior as part of this milestone.

Milestone 2 should only be implemented after explicit approval to begin the milestone.


---

Milestone 3 — Message Handling and Application Routing

**Status: COMPLETE**

Objective

Separate message handling and application routing from the Discord client as the complexity of EmiBot increases.

Planned Direction

Potential components include:

Message Handler.

Command Handler.

Application/Command Layer.

Input normalization.

Validation.

Routing.

Rate-limiting hooks.

Moderation hooks.


The architecture should only introduce components that are justified by actual requirements.

Avoid creating abstractions solely for hypothetical future functionality.


---

Milestone 4 — EmiAgent Foundation

Status: ACTIVE

Objective

Begin the transition from a simple Discord bot toward the planned EmiAgent intelligence layer.

Planned Direction

Introduce a separate assistant/application layer capable of receiving normalized application requests and returning structured responses.

The initial implementation should use a mock or deterministic assistant where appropriate.

Constraints

Do not introduce an LLM provider without explicit design approval.

Do not expose private keys or wallet capabilities to the assistant.

Do not allow unrestricted autonomous actions.

Define tool boundaries and permissions before connecting external services.

Add appropriate tests before introducing real AI functionality.



---

Milestone 5 — External Integrations

Status: FUTURE

Objective

Introduce controlled integrations with external services required by EmiBot's approved functionality.

Potential Integrations

Zora.

Blockchain services.

Wallet providers.

Other approved external APIs.


Planned Architecture

External services should be isolated behind dedicated adapters or tools.

For example:

EmiAgent
   │
   ├── Zora adapter
   ├── Wallet adapter
   └── Other approved adapters

The Discord layer should not directly contain external-service implementation logic.

Security Requirements

Any functionality involving:

Wallets.

Private keys.

Signing.

Transactions.

Funds.

External account permissions.


requires explicit security design and human approval before implementation.

Transaction-capable functionality must use strong confirmation and safety controls.


---

Milestone 6 — Advanced Automation and Additional Interfaces

Status: FUTURE

Objective

Expand EmiBot only after the earlier architecture and security foundations have been proven.

Potential Future Functionality

Advanced trading functionality.

Approved market integrations.

Web dashboards.

Additional communication platforms.

Image generation and media workflows.

Background monitoring.

Automated engagement workflows.


Each feature must be evaluated individually rather than being added simply because it appears in the long-term vision.


---

Milestone Completion Rules

A milestone should not be considered complete merely because code has been written.

A milestone is complete when:

1. Its defined implementation requirements are satisfied.


2. Out-of-scope functionality has not been introduced.


3. Appropriate automated tests pass.


4. Required manual validation has been performed.


5. Security requirements have been satisfied.


6. Documentation accurately describes the implemented state.


7. The relevant changes have been reviewed.


8. The milestone status is explicitly updated in this roadmap.




---

Documentation Update Policy

Documentation should describe the actual state of the project.

Documentation does not need to be manually rewritten after every small code change.

Update documentation when a change materially affects:

Project scope.

Architecture.

Milestone requirements.

Security requirements.

Development workflow.

Configuration.

Testing or validation.

Repository structure.

Agent instructions.


Small implementation changes that do not affect these areas do not necessarily require documentation changes.

Documentation updates should normally be included with the change that makes the documented behavior different.


---

Milestone Status and Verification

The roadmap is the human-readable source of truth for milestone status.

Future automation may be introduced to verify milestone requirements automatically.

Possible checks may include:

Required files exist.

Required scripts exist.

Automated tests pass.

Linting passes.

Formatting passes.

Required environment configuration is documented.

Required functionality has corresponding tests.

Required documentation exists.


Automated checks should verify milestone requirements rather than automatically declaring a milestone complete.

Final milestone completion remains a human-maintainer decision unless a future workflow explicitly delegates that decision.


---

Development Rules

Work should proceed incrementally.

For each milestone:

Keep changes small and reviewable.

Prefer focused commits.

Add tests with new behavior where practical.

Run npm run check before considering implementation complete.

Perform required manual validation.

Do not implement future milestones early without approval.

Do not introduce unnecessary infrastructure.

Keep security-sensitive functionality disabled until explicitly approved.



---

Proposing Roadmap Changes

Changes to the roadmap should clearly state:

What is being changed.

Why the change is necessary.

Which milestone it affects.

What new dependencies or secrets may be required.

How the change will be tested.

How the feature can be disabled or rolled back.


A roadmap change should not silently expand the scope of an active milestone.
```
