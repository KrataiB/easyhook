export class WebhookValidationError extends Error {
  constructor(public provider: string, public details: string) {
    super(`Invalid Payload for ${provider}`);
    this.name = 'WebhookValidationError';
  }
}
