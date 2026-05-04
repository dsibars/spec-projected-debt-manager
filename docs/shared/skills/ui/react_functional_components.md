# Skill: React Functional Components

## Description
Provides the ability to project domain presentation and logic strictly using React Functional Components and standard hooks. This skill emphasizes a rigid separation between visual components and domain logic.

## Constraints & Rules
- **Functional Only:** No class components.
- **Hook Isolation:** All complex domain logic and state management must be encapsulated in custom hooks (e.g., `useDebts`, `usePeople`).
- **Component Purpose:** Components should primarily receive props and render UI. They should remain as stateless as possible, deferring to context or custom hooks for state.
- **No External State Libs:** Use React Context for global state or prop drilling for simple components. Do not use Redux, Zustand, or MobX unless explicitly added as a new skill.
- **Styling:** Must use strictly tokenized Tailwind CSS (see `@shared/skills/ui/tailwind_strict_tokens`). Inline styles (`style={{...}}`) are forbidden unless absolutely necessary for dynamic calculations (like a progress bar width).
- **Accessibility (a11y):** All interactive elements must have appropriate ARIA roles, labels, and support keyboard navigation (tabbing and Enter/Space to select).
- **Pattern Compliance:** Components must map directly to the patterns defined in `@shared/skills/ui/patterns`.

## Component Structure
1. Imports (React, Hooks, Types, Sub-components)
2. Interfaces/Types for Props
3. The Functional Component definition
4. Hook invocations (if applicable)
5. Early returns (Loading/Error states)
6. Main JSX Return
