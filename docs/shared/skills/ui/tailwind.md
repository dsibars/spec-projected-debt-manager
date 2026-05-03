# Skill: Tailwind CSS

## Description
Provides utility-first styling capabilities using Tailwind CSS.

## Constraints
- Use standard Tailwind utility classes.
- Follow design tokens defined in `@specs/shared/presentation.md`.
- **Constraint**: Avoid "arbitrary values" (e.g., `top-[13px]`) where possible; prefer standard spacing scale.
- No custom CSS unless absolutely necessary and documented.
- Optimize for small bundle size (though `vite-plugin-singlefile` will inline everything).
