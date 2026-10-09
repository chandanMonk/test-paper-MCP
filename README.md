# Wishlist app — Paper → Polaris demo

A small demo repo for testing the **Paper design → Polaris code** workflow with Claude Code.

## What makes the design context work

| File | Role |
|---|---|
| `CLAUDE.md` | Conventions Claude follows when it writes code here (Polaris rules, file layout, workflow). |
| `design/paper.json` | Maps each Paper frame to the route it becomes, with status and design flags. |
| `design/screenshots/` | The frame as designed, kept next to the code for review. |
| `app/shared/` | Existing helpers (charts, CSS) that generated code must reuse instead of re-inventing. |

When you run `/paper-desktop:design-to-code`, Claude reads the selected frame from Paper (structure, text,
exact styles) **and** this repo (CLAUDE.md, existing pages, shared helpers), then writes code that fits the repo.

## The loop

1. In Paper, select a frame (for example *S10 · Analytics*).
2. Open Claude Code in this folder and create a branch: `git switch -c design/s10-analytics`.
3. Run `/paper-desktop:design-to-code`.
4. Review: `git diff main` and compare the page to `design/screenshots/<slug>.jpg`.
5. Commit, push, open a PR. Reviewers see the design screenshot, the mapping change and the code in one diff.

## Preview

The `s-*` components only render inside Shopify admin. Opened locally, you'll see the custom charts but
Polaris components show as plain text — run the app through `shopify app dev` to see the real page.
