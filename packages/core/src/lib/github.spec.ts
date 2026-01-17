import { describe, it, expect, vi } from 'vitest';
import { Easyhook } from '../core/base.js';
import { HookProvider } from '../utils/provider.js';

describe('Github Webhook Provider', () => {
  it('should handle github push event and emit "github-push"', () => {
    const easyhook = new Easyhook({
      intents: ['github'],
    });

    const spy = vi.fn();
    easyhook.on('github', spy);

    const payload = {
      ref: 'refs/heads/main',
      before: 'before-hash',
      after: 'after-hash',
      repository: {
        id: 123456,
        name: 'test-repo',
        full_name: 'owner/test-repo',
        private: false,
        owner: {
          name: 'owner',
          email: 'owner@example.com',
          login: 'owner',
          id: 1,
          avatar_url: 'https://avatar.url',
          url: 'https://api.github.com/users/owner',
        },
        html_url: 'https://github.com/owner/test-repo',
        description: 'Test Repository',
        fork: false,
        url: 'https://api.github.com/repos/owner/test-repo',
        created_at: 1234567890,
        updated_at: '2023-01-01T00:00:00Z',
        pushed_at: 1234567890,
        homepage: null,
        size: 100,
        stargazers_count: 10,
        watchers_count: 10,
        language: 'TypeScript',
        has_issues: true,
        has_projects: true,
        has_downloads: true,
        has_wiki: true,
        has_pages: false,
        forks_count: 0,
        mirror_url: null,
        open_issues_count: 0,
        forks: 0,
        open_issues: 0,
        watchers: 10,
        default_branch: 'main',
      },
      pusher: {
        name: 'pusher',
        email: 'pusher@example.com',
      },
      sender: {
        login: 'sender',
        id: 2,
        avatar_url: 'https://avatar.url',
        url: 'https://api.github.com/users/sender',
      },
      commits: [
        {
          id: 'commit-hash',
          tree_id: 'tree-hash',
          distinct: true,
          message: 'feat: add github webhook',
          timestamp: '2023-01-01T00:00:00Z',
          url: 'https://github.com/owner/test-repo/commit/commit-hash',
          author: {
            name: 'author',
            email: 'author@example.com',
            username: 'author',
          },
          committer: {
            name: 'committer',
            email: 'committer@example.com',
            username: 'committer',
          },
          added: [],
          removed: [],
          modified: ['packages/core/src/index.ts'],
        },
      ],
    };

    easyhook.isWebhook(HookProvider.Github, payload);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(payload);
  });

  it('should throw error if provider is not enabled', () => {
    const easyhook = new Easyhook({
      intents: ['easydonate'], // Github not enabled
    });

    expect(() => {
      easyhook.isWebhook(HookProvider.Github, {});
    }).toThrow('Intent for github is not enabled');
  });
});
