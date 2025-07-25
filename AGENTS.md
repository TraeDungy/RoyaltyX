# AGENTS Contributor Guide

This file provides instructions for working with the RoyaltyX repository. These guidelines apply to the entire repository unless another AGENTS.md file in a subdirectory overrides them.

## Dev Environment Tips
- Use `pnpm dlx turbo run where <project_name>` to jump to a package instead of scanning with `ls`.
- Run `pnpm install --filter <project_name>` to add the package to your workspace so Vite, ESLint, and TypeScript can see it.
- Use `pnpm create vite@latest <project_name> -- --template react-ts` to spin up a new React + Vite package with TypeScript checks ready.
- Check the `name` field inside each package's `package.json` to confirm the right name—skip the top-level one.

## Testing Instructions
- Find the CI plan in the `.github/workflows` folder.
- Run `pnpm turbo run test --filter <project_name>` to run every check defined for that package.
- From the package root you can just call `pnpm test`. The commit should pass all tests before you merge.
- To focus on one step, add the Vitest pattern: `pnpm vitest run -t "<test name>"`.
- Fix any test or type errors until the whole suite is green.
- After moving files or changing imports, run `pnpm lint --filter <project_name>` to be sure ESLint and TypeScript rules still pass.
- Add or update tests for the code you change, even if nobody asked.

## PR Instructions
- Title format: `[<project_name>] <Title>`

Follow these steps to ensure consistency and quality across the project.
