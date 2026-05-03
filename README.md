# Spec-Projected Debt Manager

A personal debt management application built as a reference implementation for the **Spec-Projected Development (SPD)** approach (as outlined in `AGENTS.md`).

## Overview

The Debt Manager is designed to cleanly track personal finances regarding money you owe to others and money others owe to you. It operates **offline** initially, ensuring privacy and speed without requiring immediate cloud synchronization.

This repository serves a dual purpose:
1. **A functional utility app:** Helping you keep track of shared expenses, personal loans, and debts.
2. **A structural proving ground:** Demonstrating how to use AI Agents as "Cognitive Compilers" to project natural language specifications into executable code.

## Core Features

### 1. Person Management
- Add, edit, and manage profiles for people you interact with financially.
- Act as the central anchor for all debt relationships.

### 2. Debt Tracking
- **Directional Debts:** Clearly categorize whether "They owe me" or "I owe them".
- **Status Management:** Mark active debts as **"Paid"** once settled to maintain a clear ledger.
- **Soft Deletion:** Safely remove debts without permanently losing the historical data audit trail.

### 3. Economy Dashboard & Reporting
- **Global Status:** View your overall financial standing (Total Owed to You vs. Total You Owe).
- **Grouped Views:** 
  - Filter, group, and aggregate balances by specific **Persons**.
  - Filter, group, and aggregate balances by specific **Dates** or timeframes.

## Architecture (Spec-Projected Development)

This project strictly adheres to the SPD methodology:

- **No manual code editing** should occur in the target implementation (`src/`) directories.
- All features, data models (e.g., `Person`, `Debt`), and business logic are defined declaratively in the `/docs/specs` directory.
- The system uses predefined tech-stack rules (`/shared/skills/`) to automatically compile and project those specs into functioning applications.
