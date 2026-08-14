# EmiBot — Replit Agent Instructions

## Purpose

You are the primary coding agent for the EmiBot repository when the project is opened and developed in Replit.

Your responsibility is to help maintain and develop EmiBot according to the project's documented architecture, roadmap, security requirements, and development workflow.

You are an implementation agent, not the project owner.

Do not independently expand the project's scope or implement future functionality without explicit approval.

---

# First Action: Understand the Repository

Before making any code changes:

1. Read `README.md`.
2. Read `docs/PROJECT.md`.
3. Read `docs/ARCHITECTURE.md`.
4. Read `docs/ROADMAP.md`.
5. Read this file: `docs/REPLIT_AGENT.md`.
6. Inspect the existing source code and tests.
7. Determine which roadmap milestone is currently active.
8. Determine what functionality is actually implemented.

Do not assume that the roadmap describes functionality that already exists.

The actual source code and tests must be considered when determining the current implementation state.

---

# Repository Import and Replit Environment

When the GitHub repository is imported into Replit, treat the repository's current default/main branch as the starting project state.

The Replit environment may create its own local Git branch for development.

Do not assume that a Replit-created local branch changes the project's GitHub branch structure.

Before making changes, run:

```bash
git status
git branch
git remote -v

Confirm which branch is currently checked out.

Do not force-push, delete branches, change remotes, or rewrite Git history unless explicitly instructed by a human maintainer.


---

Project Authority

The following documents have different responsibilities:

README.md — project entry point and navigation.

docs/PROJECT.md — project goals, scope, principles, and security.

docs/ARCHITECTURE.md — technical architecture and design direction.

docs/ROADMAP.md — milestones, requirements, and completion criteria.

docs/REPLIT_AGENT.md — instructions for the Replit Agent.

.github/copilot-instructions.md — guidance for GitHub Copilot when reviewing or analyzing the repository.


When documents conflict with the actual implementation:

1. Do not silently choose one.


2. Identify the discrepancy.


3. Determine whether the code or documentation is outdated.


4. Report the discrepancy to the human maintainer.


5. Do not make broad architectural changes merely to resolve documentation differences.




---

Milestone Discipline

Always identify the active milestone before implementing work.

Only implement functionality required by the active milestone.

Do not implement future milestones simply because they are described in:

docs/ROADMAP.md

docs/ARCHITECTURE.md

README.md


For example, the presence of planned Zora, wallet, AI, or trading architecture does not authorize implementation of those features.

Future architecture is guidance for direction, not permission to implement everything immediately.

If the requested task appears to belong to a future milestone, stop and ask the human maintainer for confirmation.


---

Current Project State

The current completed milestone is:

Milestone 1 — Discord Bot Foundation

Milestone 1 is complete.

The next planned milestone is:

Milestone 2 — Slash Commands and Command Foundation

Milestone 2 is currently future work unless the human maintainer explicitly instructs you to begin it.

The current EmiBot implementation is intentionally small.


---

Current Functionality

The current application:

Connects to Discord through discord.js.

Uses the Discord Gateway.

Responds when EmiBot is mentioned.

Ignores messages sent by bots.

Uses environment-based configuration.

Validates DISCORD_TOKEN.

Uses Pino for structured logging.

Handles Discord client errors.

Handles graceful shutdown.

Uses Vitest for automated tests.

Uses ESLint.

Uses Prettier.


Do not assume that future components already exist.


---

Current Project Structure

The current implementation includes:

src/
├── config/
│   └── env.js
├── lib/
│   └── logger.js
└── index.js

tests/
├── config.test.js
└── logger.test.js

Future modules should only be introduced when justified by an active requirement.

Avoid creating empty architecture layers simply because they are mentioned in the target architecture.


---

Development Workflow

For every requested change:

Step 1 — Understand

Read the relevant documentation and inspect the existing implementation.

Step 2 — Plan

Determine:

What needs to change.

Why it needs to change.

Which files are affected.

Which milestone the change belongs to.

What tests are required.


For non-trivial changes, explain the plan before making broad modifications.

Step 3 — Implement

Make the smallest reasonable change that satisfies the requirement.

Prefer:

Small modules.

Clear responsibilities.

Existing project conventions.

Simple solutions.

Explicit dependencies.


Avoid unnecessary abstractions.

Step 4 — Test

Run the relevant tests.

For normal code changes, run:

npm run check

This performs:

ESLint
   ↓
Prettier check
   ↓
Vitest

Do not consider the implementation complete if these checks fail unless the failure is understood and explicitly reported.

Step 5 — Manual Validation

When automated tests cannot verify the complete behavior, document and perform the appropriate manual test.

For Discord functionality, this may include:

Starting EmiBot.

Confirming successful Discord connection.

Sending the relevant Discord message or command.

Confirming the expected response.

Confirming error behavior where applicable.


Step 6 — Review

Before finishing:

git status
git diff

Check for:

Unintended changes.

Debugging code.

Secrets.

Temporary files.

Unrelated modifications.

Incorrect documentation.

Broken tests.



---

Security Rules

Security is a hard requirement.

Never create, commit, or expose:

Discord bot tokens.

API keys.

Private keys.

Seed phrases.

Wallet credentials.

Passwords.

Authentication tokens.

Production credentials.

Real .env files containing secrets.


Never place secrets in:

Source code.

Tests.

Documentation.

Logs.

Screenshots.

Commit messages.

Pull requests.


Use Replit's Secrets/environment-variable system for sensitive values.

If a requested task requires a secret that has not been provided through an appropriate secure mechanism:

Stop and ask the human maintainer.

Never request that a secret be pasted into source code.


---

Configuration

Environment-specific values must be handled through environment variables.

The current required variable is:

DISCORD_TOKEN

The repository may contain:

.env.example

but it must never contain real secret values.

Do not modify .env files unless explicitly required for local configuration, and never commit them.


---

Discord Rules

When working with Discord functionality:

Use the existing discord.js setup unless the active milestone requires a change.

Request only the Gateway intents actually required by the feature.

Do not enable privileged intents unnecessarily.

Do not expose Discord tokens.

Handle Discord errors explicitly.

Avoid blocking the Discord event loop.

Use asynchronous operations appropriately.

Preserve graceful shutdown behavior.


Do not introduce slash commands, command frameworks, or additional Discord functionality unless the active milestone requires them.


---

Architecture Rules

Follow the architecture described in:

docs/ARCHITECTURE.md

The current implementation is intentionally simple.

Do not create:

Bot Controller layers.

Assistant layers.

AI providers.

Zora adapters.

Wallet adapters.

Trading adapters.

Database layers.


unless the active roadmap milestone explicitly requires them.

When introducing a new architectural component, define:

Its responsibility.

Its dependencies.

Its public interface.

Its error behavior.

Its tests.


Avoid circular dependencies.

Prefer one-directional dependencies.


---

Future EmiAgent

EmiAgent is a planned future intelligence layer.

Do not implement EmiAgent simply because it appears in the architecture documentation.

When the relevant roadmap milestone eventually becomes active, the assistant layer should be introduced deliberately.

The future agent should not automatically receive:

Wallet signing authority.

Private keys.

Unrestricted transaction capability.

Unrestricted external account access.


Tool permissions and security boundaries must be designed before connecting sensitive external capabilities.


---

External Integrations

The following are future functionality:

Zora.

Blockchain services.

Wallet services.

Trading services.

AI/LLM providers.

Image-generation services.

Additional communication platforms.


Do not implement these unless explicitly authorized by the active milestone or the human maintainer.

Do not add SDKs, API clients, credentials, or network integrations merely because they may be useful later.


---

Database and Persistent Storage

The current project does not require a persistent database.

Do not introduce:

PostgreSQL.

Redis.

MongoDB.

SQLite.

Cloud databases.

Persistent queues.


unless a roadmap milestone explicitly requires persistent state.

Avoid introducing infrastructure before it is necessary.


---

Testing Requirements

New behavior should have appropriate tests where practical.

Prefer:

Unit tests for pure logic.

Integration tests for module interactions.

Manual validation for Discord behavior that depends on the live Discord Gateway.


Do not delete or weaken existing tests simply to make a change pass.

Do not disable linting or formatting rules merely to avoid fixing code quality issues.


---

Documentation Rules

Documentation should describe the actual project state.

Update documentation when a change materially affects:

Project scope.

Architecture.

Milestones.

Security requirements.

Configuration.

Testing.

Repository structure.

Development workflow.

Replit Agent behavior.


Do not rewrite documentation for every tiny implementation change.

If documentation needs to change, keep the update focused on the affected section.

Never silently claim that a feature is implemented when it is only planned.


---

Git Rules

Do not rewrite Git history unless explicitly instructed.

Do not:

git reset --hard

or force-push shared branches without explicit approval.

Do not delete remote branches without approval.

Before modifying Git state, inspect:

git status
git branch
git remote -v

Keep commits focused and descriptive.

Prefer commit messages such as:

feat: add slash command framework
fix: handle Discord reply errors
test: add command handler tests
docs: update milestone documentation

Do not commit:

.env

Secrets.

Generated credentials.

Temporary debugging files.

Unrelated local files.



---

Replit Changes vs GitHub Changes

Replit is a development environment.

Do not assume that a change made inside Replit should automatically be merged into GitHub's main branch.

The normal workflow is:

GitHub repository
       ↓
Replit
       ↓
Development work
       ↓
Tests
       ↓
Review
       ↓
Commit
       ↓
Push to appropriate branch
       ↓
Human review
       ↓
Merge when approved

The human maintainer decides when a branch should be merged into main.

Do not merge or change protected branch settings without explicit instruction.


---

Agent Communication

When a task is ambiguous, security-sensitive, architectural, or outside the active milestone:

Ask before implementing.

When blocked:

1. Explain what is blocking progress.


2. Explain why it matters.


3. Suggest the safest next step.


4. Wait for human approval when required.



Do not make large speculative changes to unblock yourself.


---

Completion Checklist

Before declaring a task complete, verify:

[ ] The requested functionality is implemented.

[ ] The change belongs to the active milestone.

[ ] No future milestone was implemented accidentally.

[ ] No secrets were added.

[ ] Existing functionality still works.

[ ] Appropriate tests were added or updated.

[ ] npm run check passes.

[ ] Manual validation was performed when necessary.

[ ] Documentation was updated if materially affected.

[ ] git diff was reviewed.

[ ] No unrelated files were changed.

A task is complete only when the implementation and validation requirements are satisfied.


---

Final Principle

EmiBot should grow deliberately.

Prefer:

small → tested → reviewed → approved → integrated

over:

large → speculative → tightly coupled → difficult to review

The long-term goal is a capable EmiAgent, but the immediate responsibility is to build a reliable foundation one milestone at a time.