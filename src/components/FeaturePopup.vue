<script setup lang="ts">
import { computed } from 'vue';
import type { FeatureSelection } from './GeoJsonLayer.vue';

const props = defineProps<{ selection: FeatureSelection }>();
defineEmits<{ close: [] }>();

type Row = { key: string; value: string };

function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim() === '';
  if (Array.isArray(value)) return value.length === 0;
  return false;
}

// Flattens nested objects/arrays into "key: value" rows, skipping empty values;
// array items are numbered only when there is more than one
function toRows(value: unknown, key: string): Row[] {
  if (isEmpty(value)) return [];
  if (Array.isArray(value)) {
    return value.flatMap((item, i) => toRows(item, value.length > 1 ? `${key} ${i + 1}` : key));
  }
  if (typeof value === 'object') {
    return Object.entries(value as Record<string, unknown>).flatMap(([k, v]) => toRows(v, k));
  }
  return [{ key, value: String(value).trim() }];
}

const rows = computed(() =>
  Object.entries(props.selection.properties).flatMap(([k, v]) => toRows(v, k)),
);
</script>

<template>
  <mgl-popup
    :coordinates="selection.coordinates"
    :close-on-click="false"
    :offset="12"
    max-width="320px"
    @close="$emit('close')"
  >
    <div class="feature-popup">
      <div class="layer-name" :style="{ color: selection.layer.color }">
        {{ selection.layer.displayName }}
      </div>
      <dl>
        <template v-for="row in rows" :key="row.key">
          <dt>{{ row.key }}</dt>
          <dd>{{ row.value }}</dd>
        </template>
      </dl>
    </div>
  </mgl-popup>
</template>

<style lang="scss">
.feature-popup {
  font-size: 13px;
  line-height: 1.4;
  max-height: 320px;
  overflow-y: auto;

  .layer-name {
    font-weight: 600;
    margin: 0 16px 6px 0;
  }

  dl {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 2px 8px;
    margin: 0;
  }

  dt {
    font-weight: 500;
    color: #555;
  }

  dd {
    margin: 0;
    white-space: pre-line;
    overflow-wrap: anywhere;
  }
}
</style>
