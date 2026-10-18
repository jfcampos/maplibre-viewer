import { defineStore } from "pinia";
import { ref } from "vue";
import type { Layers } from "../types";

export const useLayersStore = defineStore("layers", () => {
	const layers = ref<Layers>([
		{
			id: "parques-caninos",
			displayName: "Parques caninos",
			srcFile: "geojson/da_parquesCaninos-4326.geojson",
			color: "#e65100",
			enabled: false,
		},
		{
			id: "pistas-padel",
			displayName: "Pistas de pádel",
			srcFile: "geojson/da_deportesPistasPadel-4326.geojson",
			color: "#2e7d32",
			enabled: false,
		},
		{
			id: "colegios",
			displayName: "Colegios",
			srcFile: "geojson/da_higialim_colegios-4326.geojson",
			color: "#6a1b9a",
			enabled: false,
		},
		{
			id: "contenedores-ropa",
			displayName: "Contenedores de ropa",
			srcFile: "geojson/da_medioAmbiente_contenedoresRopa-4326.geojson",
			color: "#00838f",
			enabled: false,
		},
	]);

	function setEnabled(id: string, enabled: boolean) {
		const layer = layers.value.find((l) => l.id === id);
		if (layer) layer.enabled = enabled;
	}

	return { layers, setEnabled };
});
