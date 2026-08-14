import { describe, expect, it } from 'vitest';
import { config } from '../src/config/env.js';

describe('EmiBot configuration', () => {
  it('loads the application configuration', () => {
    expect(config.app.nodeEnv).toBe('test');
    expect(config.app.logLevel).toBe('info');
    expect(config.discord.guildId).not.toBeNull();
  });
});
