import { Elysia } from 'elysia';
import { Easyhook, HookProvider, WebhookValidationError } from '@easyhook/core';

export const EasyhookIntegration = (client: Easyhook) =>
  new Elysia({ name: 'easyhook' }).decorate('easyhook', client);

import { Context } from 'elysia';

export const WebhookGateway = (specificProvider?: HookProvider) => {
  return ({
    body,
    params,
    set,
    easyhook,
  }: Context & { easyhook: Easyhook }) => {
    const provider = specificProvider || (params && params.provider);

    if (!provider) {
      set.status = 400;
      return { success: false, message: 'Provider not specified' };
    }

    try {
      easyhook.isWebhook(provider as HookProvider, body);
      return { success: true };
    } catch (error) {
      // 3. ดักจับ Error และแปลงเป็น JSON
      if (error instanceof WebhookValidationError) {
        set.status = 400;
        return {
          success: false,
          error: 'Validation Failed',
          provider: error.provider,
          // ส่งข้อความ error ที่ชัดเจนกลับไป
          message: error.details,
        };
      }

      // กรณี Error อื่นๆ ที่เราไม่ได้คาดไว้
      console.error(`Internal Error for ${provider}:`, error);
      set.status = 500;
      return { success: false, message: 'Internal Server Error' };
    }
  };
};
