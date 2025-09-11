<script lang="ts">
	import SensorMap from '$lib/components/SensorMap.svelte';
	import type { Sensor } from '$lib/types/sensor';

	export let data;

	let sensores: Sensor[] = data.sensores;
	let error: string | null = data.error || null;
</script>

{#if error}
	<div class="p-4 text-red-600">
		Error al cargar los sensores: {error}
	</div>
{:else if sensores.length > 0}
	<SensorMap {sensores} />
{:else}
    <div class="flex flex-col justify-center items-center h-full text-gray-500 text-center">
        <p>No hay sensores para mostrar.</p>
        <p>Por favor, selecciona una obra y algún tipo de instrumento.</p>
    </div>
{/if}
