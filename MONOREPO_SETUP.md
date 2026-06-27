# Monorepo Setup Guide

This repository is now a monorepo containing both the frontend and backend for the Ellie TX Summarizer project.

## Directory Structure

```
ellie-tx-summarizer/
├── backend/          # Solana Transaction Summarizer Backend API
├── frontend/         # Ellie TX Summarizer Frontend UI
├── MONOREPO_SETUP.md # This file
└── README.md
```

## Merging Instructions

To complete the monorepo merge with full commit history preservation, use the following git commands:

### Step 1: Add ellie-project-v2 as a remote
```bash
git remote add frontend-repo https://github.com/EVMG-Technologies/ellie-project-v2.git
git fetch frontend-repo main
```

### Step 2: Use git subtree to merge frontend into the /frontend directory
```bash
git subtree add --prefix=frontend frontend-repo/main --squash
```

This will preserve the commit history of both repositories while organizing them into separate directories.

## Next Steps

1. After running the above commands, commit and push to the `monorepo-setup` branch
2. Create a pull request to merge `monorepo-setup` into `main`
3. Update any CI/CD pipelines to run tests for `/backend` and `/frontend` separately
4. Update documentation and issue tracking to reference the new monorepo structure
