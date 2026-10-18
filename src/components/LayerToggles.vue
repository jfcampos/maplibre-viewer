<script setup lang="ts">
import { useLayersStore } from '../stores/layers';

const store = useLayersStore();
</script>

<template>
  <v-list nav density="compact">
    <v-list-subheader>Capas</v-list-subheader>
    <v-list-item v-for="layer in store.layers" :key="layer.id" :title="layer.displayName">
      <template #prepend>
        <span class="swatch" :style="{ backgroundColor: layer.color }" />
      </template>
      <template #append>
        <v-switch
          :model-value="layer.enabled"
          :color="layer.color"
          density="compact"
          hide-details
          inset
          @update:model-value="store.setEnabled(layer.id, !!$event)"
        />
      </template>
    </v-list-item>
  </v-list>
</template>

<style scoped>
.swatch {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 12px;
  border: 2px solid #fff;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.2);
}
</style>
