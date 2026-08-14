import { describe, expect, it, vi } from 'vitest';

import { pingCommand } from '../../src/commands/ping.js';

describe('ping command', () => {
  it('has the expected command metadata', () => {
    expect(pingCommand.data).toEqual({
      name: 'ping',
      description: 'Check whether EmiBot is responding.',
    });
  });

  it('replies with Pong', async () => {
    const interaction = {
      reply: vi.fn(),
    };

    await pingCommand.execute(interaction);

    expect(interaction.reply).toHaveBeenCalledWith('Pong! 🏓');
  });
});
