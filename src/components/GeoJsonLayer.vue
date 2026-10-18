<script setup lang="ts">
import type { MapLayerMouseEvent } from 'maplibre-gl';
import type { Layer } from '../types';

export interface FeatureSelection {
  layer: Layer;
  coordinates: [number, number];
  properties: Record<string, unknown>;
}

const props = defineProps<{ layer: Layer }>();
const emit = defineEmits<{ select: [selection: FeatureSelection] }>();

const dataUrl = import.meta.env.BASE_URL + props.layer.srcFile;

// Layer listeners are bound with map.on(type, layerId, fn), so they receive
// the raw MapLibre event (not the MglEvent wrapper used for map events)
function onPointClick(e: MapLayerMouseEvent) {
  const feature = e.features?.[0];
  if (!feature || feature.geometry.type !== 'Point') return;
  emit('select', {
    layer: props.layer,
    coordinates: feature.geometry.coordinates.slice(0, 2) as [number, number],
    properties: feature.properties,
  });
}

function setCursor(e: MapLayerMouseEvent) {
  e.target.getCanvas().style.cursor = e.type === 'mouseenter' ? 'pointer' : '';
}
</script>

<template>
  <mgl-geo-json-source
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
      @click="onPointClick"
      @mouseenter="setCursor"
      @mouseleave="setCursor"
    />
  </mgl-geo-json-source>
</template>
