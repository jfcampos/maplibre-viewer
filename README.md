# maplibre-viewer

Map viewer for Málaga open-data GeoJSON layers, built with Vue 3, Vuetify, Pinia and MapLibre GL (via `@indoorequal/vue-maplibre-gl`).

## Setup

```sh
pnpm install
cp .env.example .env   # set your MapTiler key in VITE_MAP_URL
pnpm dev
```

| Variable | Description |
|---|---|
| `VITE_MAP_URL` | MapLibre style URL |
| `VITE_INIT_LONG_LAT` | Initial map center as `lon,lat` |

## Layers

Layers are defined in `src/stores/layers.ts`. Each one points to a GeoJSON file in `public/` (`srcFile`), which must use EPSG:4326 (lon/lat) coordinates. The sidebar toggles each layer, and clicking a point shows all of its properties in a popup.
