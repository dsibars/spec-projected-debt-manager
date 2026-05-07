# Technical Assumptions Ledger

2024-05-23 - Use React Context for global state - Simplifies data flow for a purely local static web app without adding heavy external dependencies like Redux. - All modules.
2024-05-23 - Use `crypto.randomUUID()` for IDs - Native browser API, no need for uuid package. - All modules.
2024-05-23 - Application architecture based on `src/App.tsx` handling routing/tabs - No external router required for simple 3-tab layout. - Shared UI.
2024-05-23 - Error Handling uses simple exceptions - Standard TS/JS throw new Error. - Logic layer.
