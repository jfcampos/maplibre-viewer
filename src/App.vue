<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import {
  MglMap,
  MglNavigationControl,
} from '@indoorequal/vue-maplibre-gl';
import type { LngLatLike } from 'maplibre-gl';
import { useLayersStore } from './stores/layers';
import LayerToggles from './components/LayerToggles.vue';
import GeoJsonLayer, { type FeatureSelection } from './components/GeoJsonLayer.vue';
import FeaturePopup from './components/FeaturePopup.vue';

const style = import.meta.env.VITE_MAP_URL;
const center: LngLatLike = import.meta.env.VITE_INIT_LONG_LAT.split(',').map(Number) as [number, number];
const zoom = 12;

const layersStore = useLayersStore();
const enabledLayers = computed(() => layersStore.layers.filter((l) => l.enabled));

const selection = ref<FeatureSelection | null>(null);

// Close the popup when its layer is switched off
watch(enabledLayers, (layers) => {
  if (selection.value && !layers.some((l) => l.id === selection.value!.layer.id)) {
    selection.value = null;
  }
});
</script>

<template>
  <v-app>
    <v-app-bar title="Malaga Explorer"></v-app-bar>

    <v-navigation-drawer>
      <LayerToggles />
    </v-navigation-drawer>

    <v-main class="d-flex align-center justify-center" height="300">
      <mgl-map
        :map-style="style"
        :center="center"
        :zoom="zoom"
      >
        <GeoJsonLayer
          v-for="layer in enabledLayers"
          :key="layer.id"
          :layer="layer"
          @select="selection = $event"
        />
        <FeaturePopup
          v-if="selection"
          :key="`${selection.layer.id}:${selection.coordinates.join(',')}`"
          :selection="selection"
          @close="selection = null"
        />
        <mgl-navigation-control position="top-right" />
      </mgl-map>
    </v-main>
  </v-app>
</template>

<style lang="scss">
@import "maplibre-gl/dist/maplibre-gl.css";
</style>
