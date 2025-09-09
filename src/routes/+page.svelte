<script lang="ts">
    import SensorMap from '$lib/components/SensorMap.svelte';
    import type { Sensor } from '$lib/types/sensor';

    export let data;
    
    let sensores: Sensor[] = data.sensores;
    let error: string | null = data.error || null;
</script>

<h1>Sensores</h1>
{#if error}
    <p style="color: red;">{error}</p>
{:else}
    <ul>
        {#each sensores as sensor}
            <li>
                <strong>{sensor.NOM_SENSOR}</strong> ({sensor.ID_EXTERNO})<br>
                {sensor.DESCRIPCION}<br>
                Coordenadas: {sensor.X}, {sensor.Y}<br>
                -----------------------------<br>
            </li>
        {/each}
    </ul>
{/if}

<h1>Mapa de Sensores</h1>
<SensorMap {sensores} />