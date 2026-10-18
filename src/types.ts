export type Layer = {
	id: string;
	displayName: string;
	// GeoJSON path relative to public/, in EPSG:4326 (lon/lat)
	srcFile: string;
	kind: "point" | "polygon";
	color: string;
	enabled: boolean;
};

export type Layers = Layer[];
