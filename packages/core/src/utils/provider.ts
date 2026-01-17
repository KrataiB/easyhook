export const HookProvider = {
  EasyDonate: 'easydonate',
  Github: 'github',
} as const;

export type HookProvider = (typeof HookProvider)[keyof typeof HookProvider];
