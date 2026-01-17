<p align="center">
  <img src="assets/banner.png" alt="Easyhook Anime Mascot" width="100%" style="border-radius: 10px">
</p>

# Easyhook

<p align="center">
    <a href="https://github.com/krataib/easyhook/pulls">
        <img src="https://img.shields.io/badge/ADD_PROVIDER-Pull_Request-ff69b4?style=for-the-badge&logo=github&logoColor=white" alt="Add Provider">
    </a>
    <a href="https://github.com/krataib/easyhook/issues/new">
        <img src="https://img.shields.io/badge/REPORT_ISSUE-Bug_Report-red?style=for-the-badge&logo=github&logoColor=white" alt="Report Issue">
    </a>
</p>

<p align="center">
    <a href="https://npm.im/@easyhook/core"><img src="https://img.shields.io/npm/v/@easyhook/core?color=royalblue&label=%40easyhook%2Fcore&logo=npm" alt="npm version" /></a>
    <a href="https://npm.im/@easyhook/adapter-elysia"><img src="https://img.shields.io/npm/v/@easyhook/adapter-elysia?color=royalblue&label=%40easyhook%2Fadapter-elysia&logo=npm" alt="npm version" /></a>
    <a href="https://npm.im/@easyhook/adapter-hono"><img src="https://img.shields.io/npm/v/@easyhook/adapter-hono?color=royalblue&label=%40easyhook%2Fadapter-hono&logo=npm" alt="npm version" /></a>
</p>

Type-safe Webhook Integration, Made Easy.

Easyhook simplifies the process of receiving and validating webhooks from various providers. It offers a type-safe, adapter-based approach that integrates seamlessly with your favorite frameworks like **Elysia** and **Hono**.

## 🎯 Goals

- **Type Safety**: Automatic type inference for webhook payloads.
- **Simplicity**: Minimal configuration to get started.
- **Flexibility**: Works with different frameworks via adapters.
- **Validation**: Runtime validation ensuring your webhook data is correct.

## 🔌 Supported Providers

| Provider       | Key          | Events Support | Documentation                                                  |
| :------------- | :----------- | :------------- | :------------------------------------------------------------- |
| **GitHub**     | `github`     | `push`         | [Webhooks Guide](https://docs.github.com/en/webhooks)          |
| **EasyDonate** | `easydonate` | `payment`      | [Developer System](https://easydonate.app/dashboard/developer) |

## 📦 Installation

```bash
# Core
npm install @easyhook/core

# Adapters (Choose one)
npm install @easyhook/adapter-elysia
npm install @easyhook/adapter-hono
```

## 🚀 Usage

### 1. Initialize Core

Create your specific Easyhook client.

```typescript
import { Easyhook } from '@easyhook/core';

export const easyhook = new Easyhook({
  intents: ['github', 'easydonate'],
});

// Listen for events
easyhook.on('github', (payload) => {
  console.log(
    `Push to ${payload.repository.full_name} by ${payload.pusher.name}`
  );
});

easyhook.on('easydonate', (payload) => {
  console.log(`Received ${payload.amount} from ${payload.donatorName}`);
});
```

### 2. Framework Integration

#### ElysiaJS

```typescript
import { Elysia } from 'elysia';
import { EasyhookIntegration, WebhookGateway } from '@easyhook/adapter-elysia';
import { easyhook } from './client';

const app = new Elysia()
  .use(EasyhookIntegration(easyhook))

  // Automatic Gateway
  .post('/webhooks/:provider', WebhookGateway())

  // Or specific endpoint
  .post('/github-webhook', WebhookGateway('github'))

  .listen(3000);
```

#### Hono

```typescript
import { Hono } from 'hono';
import { createHonoAdapter } from '@easyhook/adapter-hono';
import { easyhook } from './client';

const app = new Hono();

// Automatic Gateway
app.post('/webhooks/:provider', createHonoAdapter(easyhook));

// Or specific endpoint
app.post('/github-webhook', createHonoAdapter(easyhook, 'github'));

export default app;
```

## 🛡️ Validation

Easyhook automatically validates incoming payloads against strict schemas. If a payload is invalid, the adapter will automatically reject the request (usually with a 400 Bad Request) and the event handler will **not** be triggered, ensuring your application logic only deals with valid data.

## 🤝 Contributing

Contributions are welcome! Please see the [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## 📄 License

MIT
