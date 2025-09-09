<script lang="ts">
	import { onMount } from 'svelte';
	import 'leaflet/dist/leaflet.css';

	let mapContainer: HTMLDivElement;

	onMount(async () => {
		const L = await import('leaflet');
		const map = L.map(mapContainer).setView([51.505, -0.09], 13);

		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution:
				'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
			maxZoom: 19
		}).addTo(map);

		L.marker([51.505, -0.09]).addTo(map).bindPopup('Un marcador de ejemplo.').openPopup();
	});
</script>

<div class="map-container" bind:this={mapContainer}></div>

<style>
	.map-container {
		height: 500px;
		width: 100%;
	}
</style>
