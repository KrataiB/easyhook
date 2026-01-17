# Contributing to Easyhook

Thank you for your interest in contributing to Easyhook! We welcome contributions from the community to make this project better.

## Development Setup

This project is a monorepo managed by [Nx](https://nx.dev).

### Prerequisites

- Node.js (Latest LTS recommended)
- npm or pnpm

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/krataib/easyhook.git
cd easyhook
npm install
```

## Common Commands

Since this is an Nx workspace, you can use `nx` commands to run tasks.

### Build

To build all packages:

```bash
npx nx run-many -t build
```

To build a specific package (e.g., core):

```bash
npx nx run @easyhook/core:build
```

### Test

To run all tests:

```bash
npx nx run-many -t test
```

To run tests for a specific package:

```bash
npx nx run @easyhook/core:test
```

## Pull Request Process

1.  **Fork** the repository and clone it locally.
2.  Create a new branch for your feature or bug fix: `git checkout -b feature/my-feature`.
3.  Make your changes and ensure tests pass.
4.  Commit your changes with descriptive messages.
5.  Push your branch to your fork.
6.  Open a **Pull Request** against the `main` branch of this repository.

## Coding Standards

- Ensure your code follows the existing style.
- Add tests for any new features or bug fixes.
- Update documentation if necessary.

Thank you for contributing!
