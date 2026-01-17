import { Context, Handler } from 'hono';
import { Easyhook, HookProvider } from '@easyhook/core';

export const createHonoAdapter = (
  client: Easyhook,
  specificProvider?: HookProvider
): Handler => {
  return async (c: Context) => {
    const provider =
      specificProvider || (c.req.param('provider') as HookProvider);

    if (!provider) {
      return c.json({ success: false, message: 'Provider not specified' }, 400);
    }

    try {
      const body = await c.req.json();
      client.isWebhook(provider, body);
      return c.json({ success: true });
    } catch (error) {
      console.error('Error processing webhook:', error);
      return c.json({ success: false, message: 'Invalid JSON' }, 400);
    }
  };
};
