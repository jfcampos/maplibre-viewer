<script setup lang="ts">
import { useMap } from '@indoorequal/vue-maplibre-gl';
import type { MapLayerMouseEvent } from 'maplibre-gl';
import { useLayersStore } from '../stores/layers';
import type { Layer } from '../types';

export interface FeatureSelection {
  layer: Layer;
  coordinates: [number, number];
  properties: Record<string, unknown>;
}

const props = defineProps<{ layer: Layer }>();
const emit = defineEmits<{ select: [selection: FeatureSelection] }>();

const dataUrl = import.meta.env.BASE_URL + props.layer.srcFile;

// Polygons go below the lowest point layer already on the map, so they never
// cover points regardless of the order layers are switched on
function lowestPointLayerId(): string | undefined {
  const map = useMap().map;
  if (!map) return undefined;
  const pointIds = new Set(
    useLayersStore().layers.filter((l) => l.kind === 'point').map((l) => `${l.id}-clusters`),
  );
  return map.getStyle().layers.find((l) => pointIds.has(l.id))?.id;
}
const before = props.layer.kind === 'polygon' ? lowestPointLayerId() : undefined;

// Layer listeners are bound with map.on(type, layerId, fn), so they receive
// the raw MapLibre event (not the MglEvent wrapper used for map events).
// Every layer under the cursor gets the click; only the topmost one handles it
function onFeatureClick(e: MapLayerMouseEvent) {
  const feature = e.features?.[0];
  if (!feature) return;
  if (e.target.queryRenderedFeatures(e.point)[0]?.source !== props.layer.id) return;
  const coordinates = feature.geometry.type === 'Point'
    ? (feature.geometry.coordinates.slice(0, 2) as [number, number])
    : (e.lngLat.toArray() as [number, number]);
  emit('select', { layer: props.layer, coordinates, properties: feature.properties });
}

function setCursor(e: MapLayerMouseEvent) {
  e.target.getCanvas().style.cursor = e.type === 'mouseenter' ? 'pointer' : '';
}
</script>

<template>
  <mgl-geo-json-source
    v-if="layer.kind === 'polygon'"
    :source-id="layer.id"
    :data="dataUrl"
  >
    <mgl-fill-layer
      :layer-id="`${layer.id}-fill`"
      :before="before"
      :paint="{
        'fill-color': layer.color,
        'fill-opacity': 0.15,
      }"
      @click="onFeatureClick"
      @mouseenter="setCursor"
      @mouseleave="setCursor"
    />
    <mgl-line-layer
      :layer-id="`${layer.id}-outline`"
      :before="before"
      :paint="{
        'line-color': layer.color,
        'line-width': 2,
      }"
    />
  </mgl-geo-json-source>
  <mgl-geo-json-source
    v-else
    :source-id="layer.id"
    :data="dataUrl"
    :cluster="true"
    :cluster-max-zoom="14"
    :cluster-radius="50"
  >
    <mgl-circle-layer
      :layer-id="`${layer.id}-clusters`"
      :filter="['has', 'point_count']"
      :paint="{
        'circle-color': layer.color,
        'circle-radius': ['step', ['get', 'point_count'], 16, 5, 22, 10, 28],
        'circle-stroke-width': 2,
        'circle-stroke-color': '#fff',
      }"
    />
    <mgl-symbol-layer
      :layer-id="`${layer.id}-cluster-count`"
      :filter="['has', 'point_count']"
      :layout="{
        'text-field': ['get', 'point_count_abbreviated'],
        'text-size': 13,
      }"
      :paint="{ 'text-color': '#fff' }"
    />
    <mgl-circle-layer
      :layer-id="`${layer.id}-points`"
      :filter="['!', ['has', 'point_count']]"
      :paint="{
        'circle-color': layer.color,
        'circle-radius': 7,
        'circle-stroke-width': 2,
        'circle-stroke-color': '#fff',
      }"
      @click="onFeatureClick"
      @mouseenter="setCursor"
      @mouseleave="setCursor"
    />
  </mgl-geo-json-source>
</template>
