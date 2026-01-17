import { EasydonateSchema } from '../validator/easydonate.js';
import { GithubPushSchema } from '../validator/github.js';

export type EasyDonatePayload = typeof EasydonateSchema.infer;
export type GithubPushPayload = typeof GithubPushSchema.infer;
