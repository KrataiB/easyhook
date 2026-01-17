import { HookProvider } from './provider.js';

export const HookIntents = {
  EasyDonate: HookProvider.EasyDonate,
  Github: HookProvider.Github,
} as const;

export type HookIntentValue = (typeof HookIntents)[keyof typeof HookIntents];
