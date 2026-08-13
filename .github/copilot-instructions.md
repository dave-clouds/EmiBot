# Instructions for coding agents (Copilot / automated contributors)

Before changing code:

- Read docs/PROJECT.md, docs/ARCHITECTURE.md, and docs/ROADMAP.md.
- Confirm the current milestone and only implement work intended for that milestone (Milestone 1 by default).

Work practices:

- Work incrementally. Make small, focused changes and open a PR per change.
- Keep changes testable locally (Replit) and document how to run tests or manual checks.
- Explain changes succinctly in the PR description: what changed, why, and how to validate.

Security and secrets:

- Never add secrets to the repo.
- Do not create or commit .env files. Add .env to .gitignore locally if needed.
- Read and respect the Security section in docs/PROJECT.md. If a change requires a secret or access token, request it via repository admin (do not embed it in code).

Feature limits:

- Do not implement out-of-scope features (AI, Zora, wallet, trading, blockchain, Telegram, image gen) unless explicitly instructed by a human maintainer.
- If you need to add interfaces or placeholders for future features, keep them minimal, documented, and clearly marked as stubs.

Testing and CI:

- Add unit tests or simple integration tests for new behavior where feasible.
- Keep CI changes minimal and documented; do not add production deployment steps without human approval.

Communication:

- In PRs, include a SUMMARY and TESTING section that tells maintainers how to validate the change.
- If you are blocked (missing secrets, ambiguity, or design question), open an issue describing the block and recommended remediation.

Thank you — follow the repo guidelines and keep changes small and reversible.
