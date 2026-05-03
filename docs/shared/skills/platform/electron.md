# Skill: Electron Platform

## Description
Uses Electron to host a web-based application as a native desktop application. This skill defines the architecture for the Main and Renderer processes and the secure communication between them.

## Constraints
- **Security First:**
    - `contextIsolation` must be enabled.
    - `nodeIntegration` must be disabled in the Renderer process.
    - `sandbox` should be enabled where possible.
    - Use `preload` scripts to expose a limited, secure API via `contextBridge`.
- **Architecture:**
    - Main process handles window management and native OS integration.
    - Renderer process handles the UI (typically a React/Vite application).
    - Preload script acts as the secure bridge.
- **Packaging:**
    - Support multi-target builds (Linux, Windows, macOS).
    - Use standard tools like `electron-builder` or `electron-forge`.
- **IPC:**
    - All communication between Renderer and Main must go through predefined IPC channels in the preload script.
