import type { EasyDonatePayload, GithubPushPayload } from './payload.js';

export interface BaseEvents {
  easydonate: (payload: EasyDonatePayload) => void;
  github: (payload: GithubPushPayload) => void;
}
