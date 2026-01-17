import { EasyhookIntegration, WebhookGateway } from './adapter-hono.js';

describe('adapterHono', () => {
  it('should work', () => {
    expect(typeof EasyhookIntegration).toBe('function');
    expect(typeof WebhookGateway).toBe('function');
  });
});
