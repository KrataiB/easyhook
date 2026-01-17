import { Elysia } from 'elysia';
import { Easyhook, EasyDonatePayload } from '@easyhook/core';
import { EasyhookIntegration, WebhookGateway } from '../src/index';

const client = new Easyhook({
  intents: ['easydonate'],
});
const app = new Elysia();

client.on('easydonate', (payload: EasyDonatePayload) => {
  console.log('🎉 ได้รับเงินบริจาคใหม่!');
  console.log('ผู้บริจาค:', payload.donatorName);
  console.log('จำนวนเงิน:', payload.amount);
  console.log('ข้อความ:', payload.donateMessage);
});

app
  .use(EasyhookIntegration(client))
  .post('/api/v1/hooks/:provider', WebhookGateway())
  .post('/easydonate', WebhookGateway('easydonate'))
  .post('/manual-test', ({ easyhook, body }) => {
    console.log('Doing something extra before processing...');
    easyhook.isWebhook('easydonate', body);
    return 'Done!';
  })

  .listen(3000);
