import { TypedEmitter } from 'tiny-typed-emitter';
import { BaseEvents } from '../types/events.js';
import { HookIntentValue } from '../utils/intents.js';
import { HookProvider } from '../utils/provider.js';
import { EasydonateSchema, GithubPushSchema } from '../validator/index.js';
import { type } from 'arktype';
import { WebhookValidationError } from '../validator/custom.js';

export interface EasyhookOptions {
  intents: HookIntentValue[];
}

export class Easyhook extends TypedEmitter<BaseEvents> {
  private enabledIntents: Set<string>;

  constructor(options: EasyhookOptions) {
    super();
    this.enabledIntents = new Set(options.intents);
  }

  public isWebhook(provider: HookProvider, body: unknown) {
    if (!this.enabledIntents.has(provider)) {
      throw new Error(`Intent for ${provider} is not enabled`);
    }

    switch (provider) {
      case HookProvider.EasyDonate: {
        const payload = { ...(body as object), provider };
        const input = EasydonateSchema(payload);

        if (input instanceof type.errors) {
          throw new WebhookValidationError(provider, input.summary);
        }

        this.emit('easydonate', input);
        break;
      }
      case HookProvider.Github: {
        const input = GithubPushSchema(body);

        if (input instanceof type.errors) {
          throw new WebhookValidationError(provider, input.summary);
        }

        this.emit('github', input);
        break;
      }
      default:
        throw new Error(`Unhandled provider: ${provider}`);
    }
  }
}
