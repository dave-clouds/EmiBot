import { describe, expect, it, vi } from 'vitest';

import { handleMessage } from '../../src/handlers/message-handler.js';

describe('message handler', () => {
  it('ignores messages from bots', async () => {
    const message = {
      author: { bot: true },
    };

    const client = {};

    await handleMessage(message, client);

    expect(message.reply).toBeUndefined();
  });

  it('replies when EmiBot is mentioned', async () => {
    const message = {
      author: { bot: false },
      channel: {
        isDMBased: () => false,
      },
      mentions: {
        has: vi.fn(() => true),
      },
      reply: vi.fn(),
    };

    const client = {
      user: {},
    };

    await handleMessage(message, client);

    expect(message.reply).toHaveBeenCalledWith('👋 Hey! I’m EmiBot. I’m online and working!');
  });

  it('ignores guild messages that do not mention EmiBot', async () => {
    const message = {
      author: { bot: false },
      channel: {
        isDMBased: () => false,
      },
      mentions: {
        has: vi.fn(() => false),
      },
      reply: vi.fn(),
    };

    const client = {
      user: {},
    };

    await handleMessage(message, client);

    expect(message.reply).not.toHaveBeenCalled();
  });
});
