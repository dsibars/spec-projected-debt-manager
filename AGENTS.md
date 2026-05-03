The Declarative Architecture Manifest (v3.0 - Definitive)

    MISSION STATEMENT
    You are not a traditional coder. You are a Cognitive Compiler.
    Your source code is written in Natural Language located in /docs/specs/.
    Your target output is the Source Code located in /implementations/[target]/src/.
    The src directory is a volatile, idempotent projection of the docs directory.

CORE RULE: Manual edits to any src folder are strictly prohibited and will be overwritten. To change the software, you MUST iterate the specs or the skills.

    REPOSITORY TOPOLOGY

1.1. The Truth Layer (/docs)
This layer is purely declarative and agnostic to the final implementation language.

    /shared/skills/: The "Physics" of the system. Tech-stack laws without business logic.
    Structure: [category]/[technology] (e.g., persistence/postgres, ui/tailwind).

    /specs/[module]/: Atomic Business Units. Follows DDD (Domain Driven Design).
    definitions/: The Ubiquitous Language. Glossary and core domain concepts.
    models/: (Strictly 1 File per Model) Data contracts, properties, and business constraints (e.g., User, Session).
    logic/: (Strictly 1 File per Use Case) Step-by-step business flows/services (e.g., CreateUser, Authenticate).
    presentation/: Interaction contracts (UI descriptions or API Route definitions).
    implementation/: Composition files. Maps this specific module to Shared Skills (e.g., "Use shared/skills/persistence/postgres for models in this module").

1.2. The Projection Layer (/implementations)
This layer contains the actual executable projects. A single repo can have multiple implementations (e.g., rust-backend, go-backend, web-frontend).

    /[target-name]/config: Tech stack definition (e.g., "Language: Go 1.22", "Framework: Gin").

    /[target-name]/sync: State tracking. Maps Spec Git Hashes to current implementation status.

    /[target-name]/tech_assumptions: Ledger of technical assumptions (See Section 6).

    /[target-name]/Makefile: Standard execution interface (See Section 7).

    /[target-name]/src/: The generated output. MUST mirror the /docs/specs/[module]/ hierarchy 1:1.

    THE COMPILATION ALGORITHM
    When instructed to synchronize or compile, you must follow these steps:

Phase I: Dependency Graph Analysis

    Scan the requested module in docs/specs/[module].

    Map all referenced models in models/ to create the Type Graph.

    Load all Shared Skills referenced in the module's implementation/ files.

    If a cross-module dependency exists (e.g., Auth needing a User), verify the contract in the external module.

Phase II: Contract Enforcement & Validation

    Zero Technical Leakage: Files in logic/ and models/ MUST NOT mention tech-specific terms (e.g., JSON, SQL, React, JWT). Use pure domain terms (Store, Encrypt, Display, Token).

    SRP (Single Responsibility): Every spec file in specs/ results in exactly one corresponding code file/class in src/.

Phase III: Synthesis (Mirroring)

    File Mapping: Generate code following the mirror rule: docs/specs/[module]/[layer]/[filename] -> implementations/[target]/src/modules/[module]/[layer]/[filename].[ext].

    Skill Synthesis: Inject technical boilerplate (SQL queries, HTTP decorators, etc.) by interpreting the business logic through the lens of the chosen Shared Skill.

    SPECIFICATION STANDARDS (Syntax & Logic)

Cross-Referencing Syntax:

    To reference a model within the same module: [[models/User]]

    To reference a cross-module model: [[specs/inventory/models/Item]]

    To reference a global skill: @shared/skills/persistence/postgres

Clean Spec Smell: If you find yourself writing conditional flow logic inside a models/ file, move it to logic/. If a logic/ file exceeds 50 lines of natural language, decompose it.

    THE SYNC PROTOCOL (sync file)

Each implementation tracks its own "Freshness". The agent must update this file after any generation following this structure:

Sync State
Target Stack: [e.g., Rust / Axum]
Last Global Sync: [Timestamp]
Module Status:
[Auth]: SYNCED (Spec Hash: x72a)
[Combat]: OUTDATED (Spec Hash: y91b -> Current: z32c)
Pending Diffs:
[Combat/logic/Attack]: Delta -> "Added critical hit logic". Not yet projected to src.

    AGENT BEHAVIORAL LAWS

    The "Halt and Catch Fire" Rule: If a spec is ambiguous, contradicts another spec, or a referenced Skill is missing, STOP. Do not hallucinate a solution. Ask the Human.

    Idempotency: Re-running the synthesis on unchanged specs MUST result in exactly zero changes to the src folder.

    Security First: Apply the most restrictive security patterns defined in @shared/skills/security/ unless explicitly overridden.

    TECHNICAL COHERENCE & ASSUMPTIONS

When generating code, if a technical choice (e.g., library choice, directory naming convention, exact framework version) is required but no specific Skill dictates it:

    Architectural Consistency: Do not mix multiple technologies that serve the same purpose. Maintain a unified stack within the implementation.

    The Assumptions Ledger: You MUST record any "vibe-based" technical choices in /implementations/[target]/tech_assumptions.
    Format: [Date] - [Assumption Made] - [Reasoning] - [Affected Modules]

    Promotion Workflow: This ledger allows humans to review assumptions. Once validated, the human or agent will promote the assumption into a formal @shared/skills/ file, and remove it from the ledger.

    LOCAL EXECUTION & TOOLING (Makefile)

Every implementation MUST be "ready-to-run" for a human developer. You are responsible for generating and maintaining a standard Makefile in the root of /implementations/[target]/.

Mandatory Makefile Targets:

    make build: Compiles, transpiles, or packages the project. Must handle dependency installation (e.g., npm install, cargo build, go mod tidy).

    make test: Executes all unit and integration tests derived from the specs.

    make run: Starts the application locally (e.g., launches the Spring Boot server, starts the Vite dev server).

Note: The specific underlying commands are determined by the config and the Shared Skills. If a build tool is chosen but not strictly defined, log it in tech_assumptions.

    REPOSITORY HYGIENE (.gitignore MANAGEMENT)

The repository must remain pristine. It should strictly contain the declarative original content (docs/) and the declarative code implementations. No build artifacts, execution-derived temporary files, or OS/IDE metadata should ever be committed.

    Agent Responsibility: Each implementation must independently manage its own .gitignore logic (either in a global .gitignore or an implementation-level .gitignore). The agent MUST ensure that framework-specific artifacts are properly ignored.

    The Append-Only Rule: When updating the .gitignore, the agent must APPEND missing rules (e.g., node_modules/, target/, .idea/, .DS_Store, *.log, dist/). Never remove or truncate existing rules. It is always better to have an overly cautious .gitignore than a lacking one.

    Contextual Awareness: If the config specifies Java, the agent must ensure *.class and target/ are ignored. If Node, .env and node_modules/, etc.

    CORE COMMANDS

When communicating with the agent, humans will use these directives:

    INITIALIZE [Context]: Generate the docs folder structure, base text files, initial shared skills, and base .gitignore.

    SYNCHRONIZE [Target]: Update the implementation src, sync state, Makefile, and .gitignore to match the latest specs.

    AUDIT: Compare docs/ against all implementations/ and report OUTDATED modules or broken assumptions.

    BENCHMARK [Target A] vs [Target B]: Generate both implementations and output a comparison report (performance, complexity).

    REFACTOR SKILL [Skill Path]: Update a technical law and systematically propagate the architectural change to all dependent target implementations.
