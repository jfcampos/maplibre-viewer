import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import App from "./App.vue";

import "maplibre-gl/dist/maplibre-gl.css";
import { setWorkerUrl } from "maplibre-gl";
import workerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?url";
import VueMaplibreGl from "@indoorequal/vue-maplibre-gl";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@fontsource/roboto/100.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/roboto/900.css";
const vuetify = createVuetify({
	components,
	directives,
});

// maplibre-gl resolves its worker relative to import.meta.url, which breaks
// once Vite bundles it (dev pre-bundling and production build)
setWorkerUrl(workerUrl);

const app = createApp(App);
app.use(createPinia());
app.use(vuetify);
app.use(VueMaplibreGl);
app.mount("#app");
