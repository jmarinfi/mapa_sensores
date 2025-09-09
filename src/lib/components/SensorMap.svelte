<script lang="ts">
	import { onMount } from 'svelte';
	import 'leaflet/dist/leaflet.css';
	import type { Sensor } from '$lib/types/sensor';
	import type { Marker, Map } from 'leaflet';

	export let sensores: Sensor[] = [];
	console.log('Sensores recibidos en SensorMap:', sensores);

	let mapContainer: HTMLDivElement;
	let map: Map;

	onMount(async () => {
		const L = (await import('leaflet')).default;
		await import('leaflet.utm');

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

				const marker = L.marker(latLng).bindPopup(`<b>${sensor.ID_EXTERNO}</b>`);
				markers.push(marker);
			});

			const group = L.featureGroup(markers);
			map = L.map(mapContainer);
			map.fitBounds(group.getBounds());
			group.addTo(map);
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
