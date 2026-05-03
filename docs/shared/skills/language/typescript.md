# Skill: TypeScript

## Description
Provides static typing and modern JavaScript features for the projection layer.

## Constraints
- A valid `tsconfig.json` MUST be present in the root of the implementation.
- Strict mode should be enabled by default (`"strict": true`).
- Target should be `ESNext` or compatible with the chosen platform.
- Module resolution should follow the platform's requirements (e.g., `bundler` or `node`).
- All domain models and logic from the specs must be fully typed.
- The `make build` command should include a type-checking step (`tsc`).
