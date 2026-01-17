// eslint-disable-next-line @nx/enforce-module-boundaries
import { Easyhook } from '../packages/core/src/index';

const client = new Easyhook();

client.on('easydonate', async (data) => {
  console.log(`Webhook received: ${data}`);
  console.log(data);
});

client.connect();
