import { describe, expect, it } from 'vitest';
import { logger } from '../src/lib/logger.js';

describe('Logger', () => {
  it('creates a working logger', () => {
    expect(logger).toBeDefined();
    expect(typeof logger.info).toBe('function');
    expect(typeof logger.error).toBe('function');
  });
});
