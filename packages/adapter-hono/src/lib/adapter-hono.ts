import { Context, Handler, MiddlewareHandler } from 'hono';
import { createMiddleware } from 'hono/factory';
import { Easyhook, HookProvider, WebhookValidationError } from '@easyhook/core';

declare module 'hono' {
  interface ContextVariableMap {
    easyhook: Easyhook;
  }
}

export const EasyhookIntegration = (client: Easyhook): MiddlewareHandler =>
  createMiddleware(async (c, next) => {
    c.set('easyhook', client);
    await next();
  });

export const WebhookGateway = (specificProvider?: HookProvider): Handler => {
  return async (c: Context) => {
    const easyhook = c.get('easyhook');

    if (!easyhook) {
      throw new Error(
        'Easyhook client not found in context. Did you forget to use EasyhookIntegration?'
      );
    }

    const provider =
      specificProvider || (c.req.param('provider') as HookProvider);

    if (!provider) {
      return c.json({ success: false, message: 'Provider not specified' }, 400);
    }

    try {
      const body = await c.req.json();
      easyhook.isWebhook(provider, body);
      return c.json({ success: true });
    } catch (error) {
      if (error instanceof WebhookValidationError) {
        return c.json(
          {
            success: false,
            error: 'Validation Failed',
            provider: error.provider,
            message: error.details,
          },
          400
        );
      }

      console.error(`Internal Error for ${provider}:`, error);
      return c.json({ success: false, message: 'Internal Server Error' }, 500);
    }
  };
};
