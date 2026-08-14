# EmiBot

EmiBot is the first implementation of a future Discord-native AI assistant called **EmiAgent**.

The current implementation is intentionally small: EmiBot connects to Discord through the Discord Gateway and responds when it is mentioned.

The project is being developed incrementally so that each milestone can be tested, reviewed, and understood before additional capabilities are introduced.

---

## Current Status

**Milestone 1 — Discord Bot Foundation: COMPLETE**

EmiBot currently:

- Connects to Discord through the Discord Gateway.
- Responds when mentioned in a Discord server.
- Ignores messages sent by bots.
- Uses environment-based configuration.
- Validates the required Discord bot token.
- Uses structured logging with Pino.
- Handles Discord client errors.
- Handles graceful shutdown.
- Includes automated tests with Vitest.
- Uses ESLint for static analysis.
- Uses Prettier for formatting.
- Provides a combined validation command with `npm run check`.

Milestone 1 has been manually validated by running EmiBot and confirming that it responds to mentions in Discord.

### Current Scope

The current implementation does **not** include:

- AI/LLM functionality.
- EmiAgent intelligence.
- Zora integration.
- Wallet functionality.
- Blockchain transactions.
- Trading functionality.
- Solana/Pump.fun integration.
- Slash commands.
- Telegram or other communication-platform integrations.
- Image generation.
- Persistent databases.
- Autonomous background behavior.

These are future capabilities and must not be implemented unless the relevant roadmap milestone is active or a human maintainer explicitly approves the work.

---

# Technology Stack

- **Language:** JavaScript
- **Runtime:** Node.js
- **Discord library:** discord.js
- **Configuration:** Environment variables
- **Logging:** Pino
- **Testing:** Vitest
- **Linting:** ESLint
- **Formatting:** Prettier
- **Source control:** Git/GitHub
- **Development environment:** Replit and local development
- **Future hosting target:** Railway or a similar cloud platform

---

# Project Structure

The current project structure is:

```text
EmiBot/
├── .github/
│   └── copilot-instructions.md
├── docs/
│   ├── ARCHITECTURE.md
│   ├── PROJECT.md
│   ├── ROADMAP.md
│   └── REPLIT_AGENT.md
├── src/
│   ├── config/
│   │   └── env.js
│   ├── lib/
│   │   └── logger.js
│   └── index.js
├── tests/
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

The structure will evolve as future milestones introduce additional components.


---

Documentation

The project documentation is divided by responsibility:

docs/PROJECT.md — project definition, goals, scope, principles, and security.

docs/ARCHITECTURE.md — current architecture, target architecture, components, data flow, security architecture, and architectural rules.

docs/ROADMAP.md — milestones, requirements, completion criteria, and future development.

docs/REPLIT_AGENT.md — instructions for the Replit Agent when working with the project.

.github/copilot-instructions.md — guidance for GitHub Copilot when reviewing or analyzing the repository.


These documents should describe the actual state of the project and its approved direction.


---

Getting Started

Requirements

You need:

Node.js LTS

npm

Git

A Discord application/bot

A Discord bot token for local execution



---

Install Dependencies

From the project directory:

npm install


---

Environment Configuration

EmiBot requires:

DISCORD_TOKEN

For local development, create a .env file containing the required value.

Example:

DISCORD_TOKEN=your_discord_bot_token

Never commit .env or any real secret to Git.

The repository contains .env.example as a safe reference for required configuration.

When running in Replit or another hosted environment, use the platform's secret/environment-variable manager instead of committing secrets.


---

Running EmiBot

Start the bot with:

npm start

For development with Node's watch mode:

npm run dev

When the bot connects successfully, structured logs will indicate that EmiBot is online.

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

The command should complete successfully before a change is considered ready for review.

Individual checks can also be run:

npm run lint
npm run format:check
npm test


---

Manual Discord Test

Milestone 1 can be manually verified by:

1. Starting EmiBot.


2. Confirming that EmiBot connects successfully.


3. Opening a Discord server where EmiBot is installed.


4. Mentioning EmiBot in a channel where it can read and send messages.


5. Confirming that EmiBot replies.


6. Confirming that messages from bots are ignored.



Example:

User: @EmiBot hello

EmiBot: 👋 Hey! I’m EmiBot. I’m online and working!


---

Development Workflow

Development should proceed milestone by milestone.

Before implementing work:

1. Read the relevant project documentation.


2. Confirm which roadmap milestone is active.


3. Implement only the requirements of that milestone.


4. Add or update tests where appropriate.


5. Run npm run check.


6. Perform required manual validation.


7. Review the changes.


8. Commit focused changes.


9. Push the development branch.


10. Review the change before merging into the main branch.



Future milestones should not be implemented early simply because they are described in the roadmap.


---

Security

Never commit:

Discord bot tokens.

API keys.

Private keys.

Seed phrases.

Wallet credentials.

Passwords.

Real .env files.

Other sensitive credentials.


Never expose secrets through:

Source code.

Logs.

Tests.

Documentation.

Screenshots.

Git commits.

Pull requests.


Use environment variables or the appropriate platform secret manager for sensitive configuration.

Any functionality involving wallets, funds, signing, transactions, or external account permissions requires explicit security design and human approval.


---

Replit Development

Replit is one of the project's development environments.

When the repository is imported into Replit, the Replit Agent should first read the repository documentation and understand the current milestone before making changes.

The primary instructions for the Replit Agent are located at:

docs/REPLIT_AGENT.md

The Replit Agent must follow the project's documented scope, architecture, roadmap, security requirements, and development workflow.


---

Roadmap

The current milestone is:

Milestone 1 — Discord Bot Foundation: COMPLETE

The next planned milestone is:

Milestone 2 — Slash Commands and Command Foundation: FUTURE

See docs/ROADMAP.md for the complete roadmap.


---

Contributing

Before making changes:

Read docs/PROJECT.md.

Read docs/ARCHITECTURE.md.

Read docs/ROADMAP.md.

Read docs/REPLIT_AGENT.md when working through the Replit Agent.

Confirm the active milestone.

Keep changes small and reviewable.

Add tests for new behavior where practical.

Run npm run check.

Do not add secrets.

Do not implement future milestones without approval.


Design questions, security-sensitive changes, and scope changes should be reviewed by a human maintainer before implementation.


---

License

This project is provided under the MIT License.

See LICENSE for details.
```
