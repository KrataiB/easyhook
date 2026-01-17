import { EasyhookIntegration, WebhookGateway } from './adapter-elysia.js';

describe('easyhookAdapter', () => {
  it('should work', () => {
    expect(EasyhookIntegration).toBeDefined();
    expect(WebhookGateway).toBeDefined();
  });
});
