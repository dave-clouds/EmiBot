import { describe, expect, it, vi } from 'vitest';

import { handleCommand } from '../../src/handlers/command-handler.js';

describe('command handler', () => {
  it('ignores non-chat-input interactions', async () => {
    const interaction = {
      isChatInputCommand: () => false,
    };

    const commands = new Map();

    await handleCommand(interaction, commands);
  });

  it('executes a registered command', async () => {
    const command = {
      execute: vi.fn(),
    };

    const interaction = {
      isChatInputCommand: () => true,
      commandName: 'ping',
    };

    const commands = new Map([['ping', command]]);

    await handleCommand(interaction, commands);

    expect(command.execute).toHaveBeenCalledWith(interaction);
  });

  it('ignores unknown commands', async () => {
    const interaction = {
      isChatInputCommand: () => true,
      commandName: 'unknown',
    };

    const commands = new Map();

    await handleCommand(interaction, commands);
  });
});
