import { Hono } from 'hono';
import { Easyhook } from '@easyhook/core';
import { EasyhookIntegration, WebhookGateway } from '../src/index';

const app = new Hono();

const client = new Easyhook({
  intents: ['easydonate'],
});

app.use(EasyhookIntegration(client));

app.post('/webhooks/:provider', WebhookGateway());
app.post('/easydonate', WebhookGateway('easydonate'));
export default app;
