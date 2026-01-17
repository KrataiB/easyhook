import { Hono } from 'hono';
import { Easyhook } from '@easyhook/core';
import { createHonoAdapter } from '../src/index';

const app = new Hono();

const client = new Easyhook({
  intents: ['easydonate'],
});

app.post('/webhooks/:provider', createHonoAdapter(client));
app.post('/easydonate', createHonoAdapter(client, 'easydonate'));
export default app;
