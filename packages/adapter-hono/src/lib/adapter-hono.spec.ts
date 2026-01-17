import { createHonoAdapter } from './adapter-hono.js';

describe('createHonoAdapter', () => {
  it('should work', () => {
    expect(typeof createHonoAdapter).toBe('function');
  });
});
