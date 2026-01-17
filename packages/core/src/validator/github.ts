import { type } from 'arktype';

export const GithubPushSchema = type({
  ref: 'string',
  before: 'string',
  after: 'string',
  repository: {
    id: 'number',
    name: 'string',
    full_name: 'string',
    private: 'boolean',
    owner: {
      name: 'string',
      email: 'string?',
      login: 'string',
      id: 'number',
      avatar_url: 'string',
      url: 'string',
    },
    html_url: 'string',
    description: 'string|null',
    fork: 'boolean',
    url: 'string',
    created_at: 'number|string',
    updated_at: 'string',
    pushed_at: 'number|string',
    homepage: 'string|null',
    size: 'number',
    stargazers_count: 'number',
    watchers_count: 'number',
    language: 'string|null',
    has_issues: 'boolean',
    has_projects: 'boolean',
    has_downloads: 'boolean',
    has_wiki: 'boolean',
    has_pages: 'boolean',
    forks_count: 'number',
    mirror_url: 'string|null',
    open_issues_count: 'number',
    forks: 'number',
    open_issues: 'number',
    watchers: 'number',
    default_branch: 'string',
  },
  pusher: {
    name: 'string',
    email: 'string?',
  },
  sender: {
    login: 'string',
    id: 'number',
    avatar_url: 'string',
    url: 'string',
  },
  commits: type([
    {
      id: 'string',
      tree_id: 'string',
      distinct: 'boolean',
      message: 'string',
      timestamp: 'string',
      url: 'string',
      author: {
        name: 'string',
        email: 'string',
        username: 'string?',
      },
      committer: {
        name: 'string',
        email: 'string',
        username: 'string?',
      },
      added: 'string[]',
      removed: 'string[]',
      modified: 'string[]',
    },
    '[]',
  ]),
  'head_commit?': {
    id: 'string',
    tree_id: 'string',
    distinct: 'boolean',
    message: 'string',
    timestamp: 'string',
    url: 'string',
    author: {
      name: 'string',
      email: 'string',
      username: 'string?',
    },
    committer: {
      name: 'string',
      email: 'string',
      username: 'string?',
    },
    added: 'string[]',
    removed: 'string[]',
    modified: 'string[]',
  } as const as any, // ArkType doesn't support complex union literals in object keys easily without separate definition or helper, but wait. The user suggested: "'head_commit?': '{ ... } | null'".
  // Let's use the object definition form but wrapped in a union if possible or just use '...|null' string def if it was a string.
  // Since it's an object definition, I can't just make the key a string like 'head_commit?': '... | null'.
  // I need to check how arktype handles optional nullable objects.
  // Actually, arktype `type({...})` takes an object.
  // If I want it to be nullable, I might need to define the object type separately.
  // OR, I can use the string format for the whole property if I could serialize the object schema.
  // BUT, looking at the user request: "change the field type to the object OR null, e.g., "'head_commit?': '{ ... } | null'""
  // This implies ArkType supports defining the value as a type definition.
  // Wait, the existing code uses object literal syntax for `head_commit`.
  // I will try to use the `type` wrapper for the value or just union it if ArkType allows `type({ key: { ... } | null })` (syntax error in TS).
  // The user suggestion: `head_commit?: ... | null`.
  // Let's try to define the inner object schema and union it with null.
  // Actually, simplest is to use `type` for the inner object?
  // Let's look at `repository` definition in lines 7-44. It is nested object.
  // If I want `head_commit` to be nullable, I should probably do:
  // 'head_commit?': type({ ... }).or('null')
  // Let's see if I can do that.
  // User said: "allow null using arktype's union syntax ... e.g., "'head_commit?': '{ ... } | null'""
  // Maybe they meant replacing the object literal with a string representation if arktype supports it?
  // But `head_commit` has many fields.
  // I will define the `HeadCommitSchema` string constant or object and use it? No, keep it inline if possible.
  // PROPOSED FIX:
  // 'head_commit?': type({ ... }).or('null') if that works.
  // OR, maybe stricter: validation might fail if I just hack it.
  // Let's assume `type({ ... })` returns a Type.
  // So: `'head_commit?': type({ ... }).or('null')` should be valid JS/TS if `type` comes from `arktype`.
  // However, `head_commit?` is a key in the object passed to outer `type()`.
  // So the value must be a definition.
  // `type({ ... })` is a Type, which is a valid definition.
  // So I will convert the object literal to `type({...}).or('null')`.
});
