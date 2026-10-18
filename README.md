# maplibre-viewer

[![AI-DECLARATION: pair](https://img.shields.io/badge/䷼%20AI--DECLARATION-pair-ffedd5?labelColor=ffedd5)](https://ai-declaration.md)

Map viewer for [Málaga open data](https://datosabiertos.malaga.eu/) GeoJSON layers. Built with Vue 3, Vuetify, Pinia and MapLibre GL (via `@indoorequal/vue-maplibre-gl`).

- Sidebar toggles per layer (all off on load)
- Point layers are clustered; polygon layers render as fill + outline, always below points
- Clicking a feature opens a popup listing all its properties (nested values flattened, empty ones hidden)

## Setup

```sh
pnpm install
cp .env.example .env   # set your MapTiler key in VITE_MAP_URL
pnpm dev
```

| Variable             | Description                     |
| -------------------- | ------------------------------- |
| `VITE_MAP_URL`       | MapLibre style URL              |
| `VITE_INIT_LONG_LAT` | Initial map center as `lon,lat` |

## Adding a layer

1. Put the GeoJSON in `public/geojson/`. It must use EPSG:4326 (lon/lat); MapLibre can't place projected coordinates such as EPSG:25830.
2. Add an entry to `src/stores/layers.ts`:

```ts
{
	id: "my-layer",               // unique; also the MapLibre source id
	displayName: "My layer",
	srcFile: "geojson/my-layer-4326.geojson",
	kind: "point",                // or "polygon"
	color: "#1565c0",
	enabled: false,
}
```

## AI Declaration

Check [AI-DECLARATION.md](AI-DECLARATION.md)

This was a learning experiment, initial MapLibre integration was done manually and then the rest of the code was in pair mode, with step-by-step review by me.
