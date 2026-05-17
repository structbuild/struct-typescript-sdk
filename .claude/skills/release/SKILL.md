---
name: release
description: Commit, bump version, publish (npm for prod, git-tag-only for staging), and push. Run after changes are ready to release.
disable-model-invocation: false
allowed-tools: Bash, Read, Grep, Glob
---

# Release — Commit, Version, Publish, Push

## Modes

- **Default (prod):** publishes to npm under the `latest` dist-tag. Users on `@structbuild/sdk` get this.
- **Staging:** user passes `staging` as the argument. **Does NOT publish to npm.** Ships via a git tag (`vX.Y.Z-staging.N`) on the `staging` branch; consumers install with a GitHub ref. This keeps the npm `latest` tag pinned to the last prod release and avoids polluting npm with staging prereleases.

## Step 1: Check for changes

Run `git status` and `git diff --stat` to see what needs to be committed. If there are no changes, skip to Step 3 (version bump).

## Step 2: Commit changes

1. Run `git log --oneline -5` to match the commit message style
2. Stage all changed files by name (not `git add -A`)
3. Write a concise commit message summarizing the changes
4. Commit with `Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>` trailer

## Step 3: Version bump

- **Staging mode:** edit `package.json` directly to bump the `-staging.N` suffix (e.g. `0.6.0-staging.3` → `0.6.0-staging.4`). Do **not** use `npm version` — it auto-creates a tag that we want to create explicitly in Step 4 after the version-bump commit is in place. Stage and commit `package.json` together with the spec/code changes from Step 2 (one combined commit is fine).
- **Prod mode:** if the user specifies a version type (e.g. `minor`, `major`, `prepatch`, `preminor`, `premajor`, `prerelease`), use that: `npm version <type>`. Otherwise default to `npm version patch`. `npm version` auto-commits the bump and creates a git tag.

## Step 4: Publish / Tag

- **Staging mode (git tag only, NO npm publish):**
  1. `git push origin staging` — push the version-bump commit.
  2. `git tag vX.Y.Z-staging.N` at HEAD (lightweight tag is fine; annotate if you want a message).
  3. `git push origin vX.Y.Z-staging.N` — push the tag.
  4. **Never** run `npm publish` in staging mode. Staging releases are consumed via GitHub refs only.

- **Prod mode:** `npm publish`. Then `git push` and `git push --tags` (the version tag was created by `npm version`).

## Step 5: Update consumer repos (staging mode only)

For staging releases, consumer repos pinning `@structbuild/sdk` via a GitHub ref need their `package.json` bumped manually:

```json
"@structbuild/sdk": "github:structbuild/struct-typescript-sdk#vX.Y.Z-staging.N"
```

Then reinstall **with the consumer's package manager** — check the consumer's `packageManager` field (or its lockfile) and use that. Don't assume bun; explorer-style repos may use pnpm/npm/yarn and running the wrong installer will create a stray lockfile.

This step is skipped for prod mode (consumers pull from npm).

## Step 6: Report

Print the new version number, how it was published (npm dist-tag for prod; git tag + branch for staging), and the install instructions:

- **Prod:** `bun add @structbuild/sdk` / `pnpm add @structbuild/sdk` (resolves to npm `latest`).
- **Staging:** `"@structbuild/sdk": "github:structbuild/struct-typescript-sdk#vX.Y.Z-staging.N"` in the consumer's `package.json`, then install with their package manager.

## Why staging avoids npm

We previously published staging prereleases to npm under a `staging` dist-tag. We stopped because:

1. Staging spec churn meant frequent breaking renames — every one polluted npm with a version that can never be unpublished.
2. Consumer repos already pinned via GitHub refs for other reasons (private branches, fast iteration), so npm wasn't doing useful work.
3. A git tag is reversible (we can re-point or delete); a published npm version is not.

If you find yourself wanting to `npm publish --tag staging` again, push back on the user and confirm — the answer is almost always "no, use a git tag."
