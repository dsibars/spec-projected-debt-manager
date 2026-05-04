# Skill: Tailwind Strict Tokens

## Description
Provides utility-first styling capabilities using Tailwind CSS, strictly constrained to predefined design tokens to ensure absolute visual consistency across implementations.

## Constraints & Rules
- **No Arbitrary Values:** The use of arbitrary Tailwind values (e.g., `w-[13px]`, `top-[-5px]`, `text-[#ff0000]`) is strictly forbidden.
- **Token Enforcement:** You must map Tailwind classes directly to the tokens defined in `@specs/shared/presentation.md`.
  - Primary Color: `bg-blue-900`, `text-blue-900`
  - Secondary Color: `bg-slate-500`, `text-slate-500`
  - Positive (Emerald): `bg-emerald-600`, `text-emerald-600`
  - Negative (Rose): `bg-rose-600`, `text-rose-600`
  - Warning (Amber): `bg-amber-500`, `text-amber-500`
- **Spacing Scale:** Use standard Tailwind spacing scales (`p-4`, `m-2`, `gap-3`). Do not invent new spacing.
- **Custom CSS:** Adding custom CSS rules in a global stylesheet is not allowed unless it is to define a new base token that Tailwind cannot handle (which is rare).
- **Responsive Prefixes:** Utilize standard breakpoints (`sm:`, `md:`, `lg:`) to alter layout structure as defined in the responsive presentation specs.

## Purpose
By enforcing strict tokens, we guarantee that whether an app is rendered in an Electron shell or a static web view, the visual language remains identical and recognizable.
