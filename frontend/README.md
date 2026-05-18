# HR Application Frontend

Enterprise-ready React/Vite SaaS foundation.

## Structure

- `src/app` - application composition, config, routes, providers, and future store
- `src/features` - feature/module boundaries
- `src/shared` - reusable layout, UI components, hooks, libraries, and styles

## Current approach

The modules are scaffolded for future development. Navigation is config-driven through `src/app/config/moduleRegistry.js`, but the application still keeps a simple single-page experience until full routing/auth/data layers are needed.
