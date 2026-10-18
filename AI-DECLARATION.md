---
version: "0.1.2"
level: pair
---

This format is based on [AI-DECLARATION.md](https://ai-declaration.md/en/0.1.2).

## Notes

- AI tool: Claude Code (Anthropic).
- Human: project scaffold (Vite + Vue), Vuetify setup and base layout, environment config, first integration of MapLibre through vue-maplibre-gl, choice and download of the GeoJSON datasets, and all functional requirements.
- AI: implemented: MapLibre worker fix, layer store and toggles, point/polygon layers, generic popup, layout fixes and wrote the README. Design choices (layer colors, clustering, popup format, initial state, commit identity) were confirmed by the human before implementation.
- Testing: no automated test suite; changes were verified by type-checking (`vue-tsc`) and manual checks in the browser driven by the AI.
