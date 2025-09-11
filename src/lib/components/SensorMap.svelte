<script lang="ts">
	import { onMount } from 'svelte';
	import 'leaflet/dist/leaflet.css';
	import type { Sensor } from '$lib/types/sensor';
	import type { Marker, Map, Layer, Icon } from 'leaflet';

	export let sensores: Sensor[] = [];
	console.log('Sensores recibidos en SensorMap:', sensores);

	let mapContainer: HTMLDivElement;
	let map: Map;

	onMount(async () => {
		const L = (await import('leaflet')).default;
		await import('leaflet.utm');

		const greenIcon: Icon = L.icon({
			iconUrl:
				'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
			iconSize: [12, 20], // Tamaño del icono (ancho, alto) en píxeles
			iconAnchor: [6, 20], // Punto del icono que corresponde a la ubicación del marcador
		});

		if (!sensores || sensores.length === 0) {
			map = L.map(mapContainer).setView([0, 0], 13);
		} else {
			const markers: Marker[] = [];

			sensores.forEach((sensor) => {
				const latLng = L.utm({
					x: sensor.X,
					y: sensor.Y,
					zone: 31,
					band: 'N',
					southHemi: false
				}).latLng();

				// Safe access to iconSize
				const [width, height] = Array.isArray(greenIcon.options.iconSize)
					? greenIcon.options.iconSize
					: [12, 20]; // fallback values

				const customDivIcon = L.divIcon({
					className: 'custom-div-icon',
					html: `
						<div class="marker-wrapper">
							<img src="${greenIcon.options.iconUrl}" 
								 style="width:${width}px; height:${height}px;" 
								 alt="marker" />
							<div class="marker-label">${sensor.ID_EXTERNO}</div>
						</div>
					`,
					iconSize: [40, 20],
					iconAnchor: [20, 10]
				});

				const marker = L.marker(latLng, { icon: customDivIcon }).bindPopup(`<b>${sensor.ID_EXTERNO}</b>`, {
					autoClose: false,
					closeOnClick: false
				});
				markers.push(marker);
			});

			const group = L.featureGroup(markers);
			map = L.map(mapContainer);

			group.addTo(map);

			map.fitBounds(group.getBounds());
		}

		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution:
				'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
			maxZoom: 19
		}).addTo(map);
	});
</script>

<div class="map-container" bind:this={mapContainer}></div>

<style>
	.map-container {
		height: 500px;
		width: 100%;
	}
</style>
