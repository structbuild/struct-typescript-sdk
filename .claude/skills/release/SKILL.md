---
name: release
description: Commit, bump version, publish to npm, and push. Run after changes are ready to release.
disable-model-invocation: false
allowed-tools: Bash, Read, Grep, Glob
---

# Release — Commit, Version, Publish, Push

## Step 1: Check for changes

Run `git status` and `git diff --stat` to see what needs to be committed. If there are no changes, skip to Step 3 (version bump).

## Step 2: Commit changes

1. Run `git log --oneline -5` to match the commit message style
2. Stage all changed files by name (not `git add -A`)
3. Write a concise commit message summarizing the changes
4. Commit with `Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>` trailer

## Step 3: Version bump

If the user specifies a version type (e.g. `minor`, `major`, `prepatch`, `preminor`, `premajor`, `prerelease`), use that: `npm version <type>`. Otherwise default to `npm version patch`. This auto-commits the version bump.

## Step 4: Publish

Run `npm publish` and confirm it succeeds.

## Step 5: Push

Run `git push` to push all commits to origin.

## Step 6: Report

Print the new version number and confirm all steps completed.
