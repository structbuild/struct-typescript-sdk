---
name: release
description: Commit, bump version, and push. CI publishes to npm via OIDC on tag push. Run after changes are ready to release.
disable-model-invocation: false
allowed-tools: Bash, Read, Grep, Glob
---

# Release — Commit, Version, Push (CI Publishes)

Publishing happens in `.github/workflows/publish.yml` when a `v*` tag arrives. It uses OIDC trusted publishing, so `npm publish` from a local machine will 404 — do not attempt it.

## Modes

- **Default (prod):** CI publishes to the `latest` dist-tag. Users on `@structbuild/sdk` get this. CI also creates a GitHub Release.
- **Staging:** user passes `staging` as the argument. CI **skips npm publish** for `*-staging.*` tags and only creates a GitHub prerelease. Consumers cannot `npm install @structbuild/sdk@staging` — staging is GitHub-ref-only.

## Step 1: Check for changes

Run `git status` and `git diff --stat` to see what needs to be committed. If there are no changes, skip to Step 3 (version bump).

## Step 2: Commit changes

1. Run `git log --oneline -5` to match the commit message style
2. Stage all changed files by name (not `git add -A`)
3. Write a concise commit message summarizing the changes
4. Commit with the current model's `Co-Authored-By:` trailer

## Step 3: Version bump

- **Staging mode:** `npm version prerelease --preid=staging` (produces e.g. `0.5.10-staging.0`, bumpable repeatedly).
- **Prod mode:** if the user specifies a version type (e.g. `minor`, `major`, `prepatch`, `preminor`, `premajor`, `prerelease`), use that: `npm version <type>`. Otherwise default to `npm version patch`.

`npm version` auto-commits the version bump and creates a `v<version>` tag.

## Step 4: Push commits and tag

Push commits first, then the tag — the tag push is what triggers the publish workflow:

```
git push
git push --tags
```

Never run `npm publish` locally. The npm registry rejects non-OIDC tokens for this package.

## Step 5: Verify the workflow

Watch the publish workflow for the tag you just pushed:

```
gh run list --workflow=publish.yml --limit 1
gh run watch <run-id>
```

For prod tags: confirm both the `publish` and `github-release` jobs succeed.
For staging tags: the `publish` job is skipped by design; only `github-release` runs (as prerelease).

If the publish job fails, do not retry by re-tagging the same version — bump again (Step 3) and re-push.

## Step 6: Report

Print:
- The new version number and the tag name
- Whether it was published to npm (prod) or GitHub-only (staging)
- For prod: install command `npm install @structbuild/sdk`
- For staging: the GitHub release URL (`https://github.com/structbuild/struct-typescript-sdk/releases/tag/<tag>`)
