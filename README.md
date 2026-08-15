EmiBot

EmiBot is the first implementation of a future Discord-native AI assistant called EmiAgent.

The project is being developed incrementally. EmiBot starts as a small Discord bot and gradually evolves toward an application architecture capable of supporting a controlled assistant layer and, later, approved external tools and integrations.

Each milestone is implemented, tested, reviewed, and approved before the project moves forward.

---

Current Status

Milestone 4 — EmiAgent Foundation: ACTIVE

Milestones 1–3 are complete.

M4 begins the transition from the Discord bot foundation toward the planned EmiAgent application layer.

The goal of M4 is not to introduce real AI yet.

Instead, M4 establishes a small, testable assistant boundary using a mock or deterministic assistant.

The intended flow is:

Discord
   ↓
Message / Command Handler
   ↓
Normalized Application Request
   ↓
EmiAgent Interface
   ↓
Mock / Deterministic Assistant
   ↓
Structured Assistant Response
   ↓
Application / Handler
   ↓
Discord

This allows the project to establish the assistant architecture before introducing a real AI provider.

---

Current Capabilities

The completed Discord foundation currently includes:

- Discord Gateway connectivity.
- Discord authentication using environment configuration.
- Discord message handling.
- Direct-message handling.
- Mention-based responses.
- Slash-command handling.
- Dedicated message handler.
- Dedicated command handler.
- Structured logging with Pino.
- Discord client error handling.
- Graceful shutdown.
- Environment-based configuration.
- Automated tests with Vitest.
- ESLint validation.
- Prettier formatting.
- Combined validation through "npm run check".

M4 builds on this foundation.

---

M4 Scope

M4 focuses on establishing the foundation for EmiAgent.

M4 may introduce:

- A minimal assistant interface.
- Normalized application requests.
- Structured assistant responses.
- A deterministic/mock assistant.
- Assistant validation.
- Assistant error handling.
- Tests for the assistant boundary.
- Minimal application routing required to connect handlers to the assistant.

The M4 implementation should remain deliberately small.

The purpose is to prove the architectural boundary, not to simulate a complete AI system.

---

M4 Explicitly Out of Scope

M4 must not introduce real external intelligence or autonomous capabilities.

The following remain out of scope unless explicitly approved by the human maintainer:

- OpenAI or other LLM providers.
- Real AI model calls.
- Autonomous agent loops.
- Prompt-management infrastructure.
- Zora integration.
- Blockchain integration.
- Wallet functionality.
- Private-key handling.
- Seed phrases.
- Transaction signing.
- Token trading.
- Automated financial actions.
- Image-generation APIs.
- Persistent databases.
- Redis/PostgreSQL/MongoDB.
- Production infrastructure.
- Unrestricted network tools.
- Unrestricted filesystem tools.
- Unrestricted MCP tools.
- Autonomous external actions.

The presence of these technologies in the long-term architecture does not authorize their implementation.

---

Technology Stack

- Language: JavaScript
- Runtime: Node.js
- Module system: ES modules
- Discord library: discord.js
- Configuration: Environment variables
- Logging: Pino
- Testing: Vitest
- Linting: ESLint
- Formatting: Prettier
- Source control: Git/GitHub
- Local development: Termux / Acode
- Agent-assisted development: Replit
- Code review/analysis: GitHub Copilot

Production hosting has not yet been finalized.

---

Project Structure

The project currently follows this general structure:

EmiBot/
├── .github/
│   └── copilot-instructions.md
├── docs/
│   ├── ARCHITECTURE.md
│   ├── PROJECT.md
│   ├── ROADMAP.md
│   └── REPLIT_AGENT.md
├── src/
│   ├── commands/
│   │   └── ping.js
│   ├── config/
│   │   └── env.js
│   ├── discord/
│   │   └── register-commands.js
│   ├── handlers/
│   │   ├── command-handler.js
│   │   └── message-handler.js
│   ├── lib/
│   │   └── logger.js
│   └── index.js
├── tests/
│   ├── commands/
│   │   └── ping.test.js
│   ├── handlers/
│   │   ├── command-handler.test.js
│   │   └── message-handler.test.js
│   ├── config.test.js
│   └── logger.test.js
├── .env.example
├── .gitignore
├── .prettierrc
├── eslint.config.js
├── package.json
├── package-lock.json
├── vitest.config.js
├── LICENSE
└── README.md

M4 may introduce additional assistant/application files when required by the milestone.

New modules should only be created when they have a justified responsibility.

---

Documentation

Project documentation is divided by responsibility:

"docs/PROJECT.md"

Defines:

- Project purpose.
- Goals.
- Scope.
- Principles.
- Security requirements.
- Technology direction.

"docs/ARCHITECTURE.md"

Defines:

- Current architecture.
- Target architecture.
- Component responsibilities.
- Data flow.
- Dependency direction.
- Security architecture.
- Architectural rules.

"docs/ROADMAP.md"

Defines:

- Milestones.
- Requirements.
- Planned direction.
- Completion criteria.
- Milestone status.

"docs/REPLIT_AGENT.md"

Defines:

- Replit Agent behavior.
- Development workflow.
- M4 implementation rules.
- Security boundaries.
- Testing requirements.
- Git rules.

".github/copilot-instructions.md"

Provides guidance for GitHub Copilot when reviewing or analyzing the repository.

Documentation must describe the actual project state.

---

Getting Started

Requirements

You need:

- Node.js LTS
- npm
- Git
- A Discord application/bot
- A Discord bot token for local execution

---

Install Dependencies

From the project directory:

npm install

---

Environment Configuration

EmiBot currently requires:

DISCORD_TOKEN

For local development, create a ".env" file containing the required value:

DISCORD_TOKEN=your_discord_bot_token

Never commit ".env" or any real secret to Git.

The repository contains ".env.example" as a safe reference.

When running in Replit, use Replit's Secrets/environment-variable system instead of committing credentials.

---

Running EmiBot

Start the bot with:

npm start

For development with Node's watch mode:

npm run dev

When the bot connects successfully, the logs should indicate that EmiBot is online.

To stop the bot locally:

Ctrl+C

---

Validation

Before considering a code change complete, run:

npm run check

This performs:

ESLint
   ↓
Prettier check
   ↓
Vitest

Individual checks can also be run:

npm run lint
npm run format:check
npm test

A change should not be considered complete while these checks are failing unless the failure is understood and explicitly documented.

---

M4 Development Validation

M4 should primarily be validated through automated tests.

The assistant boundary should be testable without:

- Discord Gateway access.
- A real LLM provider.
- Blockchain services.
- Wallet services.
- External APIs.

The deterministic/mock assistant should produce predictable results so that the application boundary can be tested reliably.

Discord manual testing should still be performed when changes affect Discord behavior.

---

Development Workflow

Development proceeds milestone by milestone.

The standard workflow is:

Identify active milestone
        ↓
Read documentation
        ↓
Inspect existing implementation
        ↓
Define smallest required change
        ↓
Implement
        ↓
Add/update tests
        ↓
Run npm run check
        ↓
Manual validation where required
        ↓
Review git diff
        ↓
Commit
        ↓
Push milestone branch
        ↓
Human review
        ↓
Merge into dev

For M4, the working branch is:

M4

The human maintainer controls when M4 is merged into "dev".

Future work should not be implemented early simply because it appears in the roadmap or target architecture.

---

Replit Development

Replit may be used as the primary agent-assisted development environment.

When the repository is imported into Replit:

1. The Replit Agent must read the repository documentation.
2. The Agent must identify the active milestone.
3. The Agent must inspect the existing implementation.
4. The Agent must confirm the current Git branch.
5. The Agent must follow "docs/REPLIT_AGENT.md".
6. The Agent must implement only approved M4 functionality.
7. The Agent must run the project's validation checks.
8. The Agent must review changes before committing.

The primary Replit Agent instructions are located at:

docs/REPLIT_AGENT.md

The Agent must not independently expand the project's scope.

---

Security

Never commit:

- Discord bot tokens.
- API keys.
- Private keys.
- Seed phrases.
- Wallet credentials.
- Passwords.
- Authentication tokens.
- Real ".env" files.
- Other sensitive credentials.

Never expose secrets through:

- Source code.
- Logs.
- Tests.
- Documentation.
- Screenshots.
- Git commits.
- Pull requests.

Use environment variables or the appropriate secret-management system for sensitive configuration.

M4 does not require AI-provider credentials.

Any functionality involving:

- Wallets.
- Funds.
- Private keys.
- Signing.
- Transactions.
- External account permissions.

requires explicit security design and human approval.

---

EmiAgent Security Boundary

During M4, EmiAgent must not receive:

- Private keys.
- Seed phrases.
- Wallet credentials.
- Discord tokens.
- API keys.
- Passwords.
- Unrestricted filesystem access.
- Unrestricted network access.
- Unrestricted external tools.

The M4 assistant must not independently perform financial, blockchain, publishing, or other external actions.

Tools and external capabilities will only be introduced after their boundaries and permissions have been explicitly designed and approved.

---

Roadmap

Milestone 1 — Discord Bot Foundation

Status: COMPLETE

Established the basic Discord bot foundation.

Milestone 2 — Slash Commands and Command Foundation

Status: COMPLETE

Established the slash-command foundation.

Milestone 3 — Message Handling and Application Routing

Status: COMPLETE

Separated message and command handling from the Discord client and established the initial application-routing foundation.

Milestone 4 — EmiAgent Foundation

Status: ACTIVE

Establishes:

- Normalized application requests.
- Assistant interface.
- Structured assistant responses.
- Deterministic/mock assistant.
- Assistant boundary tests.
- Controlled application-to-assistant routing.

See "docs/ROADMAP.md" for the authoritative milestone requirements.

---

Contributing

Before making changes:

1. Read "docs/PROJECT.md".
2. Read "docs/ARCHITECTURE.md".
3. Read "docs/ROADMAP.md".
4. Read "docs/REPLIT_AGENT.md" when using the Replit Agent.
5. Confirm the active milestone.
6. Inspect the existing implementation.
7. Keep changes small and reviewable.
8. Add or update tests where appropriate.
9. Run:

npm run check

10. Review the resulting Git diff.
11. Do not add secrets.
12. Do not implement future milestones without approval.

Design questions, security-sensitive changes, and scope changes should be reviewed by the human maintainer before implementation.

---

License

This project is provided under the MIT License.

See "LICENSE" for details.
