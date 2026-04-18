---
name: release
description: Commit, bump version, publish to npm, and push. Run after changes are ready to release.
disable-model-invocation: false
allowed-tools: Bash, Read, Grep, Glob
---

# Release — Commit, Version, Publish, Push

## Modes

- **Default (prod):** publishes to the `latest` dist-tag. Users on `@structbuild/sdk` get this.
- **Staging:** user passes `staging` as the argument. Publishes under the `staging` dist-tag so `latest` stays pinned to the last prod release. Consumers opt in with `@structbuild/sdk@staging`.

## Step 1: Check for changes

Run `git status` and `git diff --stat` to see what needs to be committed. If there are no changes, skip to Step 3 (version bump).

## Step 2: Commit changes

1. Run `git log --oneline -5` to match the commit message style
2. Stage all changed files by name (not `git add -A`)
3. Write a concise commit message summarizing the changes
4. Commit with `Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>` trailer

## Step 3: Version bump

- **Staging mode:** `npm version prerelease --preid=staging` (produces e.g. `0.3.10-staging.0`, bumpable repeatedly).
- **Prod mode:** if the user specifies a version type (e.g. `minor`, `major`, `prepatch`, `preminor`, `premajor`, `prerelease`), use that: `npm version <type>`. Otherwise default to `npm version patch`.

`npm version` auto-commits the version bump.

## Step 4: Publish

- **Staging mode:** `npm publish --tag staging`. Never omit `--tag` in staging mode — bare `npm publish` would move the `latest` tag and break prod consumers.
- **Prod mode:** `npm publish`.

Confirm the publish succeeds and note which dist-tag was moved.

## Step 5: Push

Run `git push` to push all commits to origin. Then `git push --tags` so the version tag created by `npm version` reaches the remote.

## Step 6: Report

Print the new version number, the dist-tag it was published under, and the install command consumers should use (`@structbuild/sdk` for prod, `@structbuild/sdk@staging` for staging).
