<script lang="ts">
    import { onMount } from 'svelte';
    import SensorMap from '$lib/components/SensorMap.svelte';
    import type { Sensor } from '$lib/types/sensor';
    
    let sensores: Sensor[] = [];
    let error: string | null = null;

    onMount(async () => {
        try {
            const response = await fetch('/');
            if (!response.ok) {
                throw new Error(`Error fetching data: ${response.statusText}`);
            }
            sensores = await response.json();
        } catch (e) {
            if (e instanceof Error) {
                error = e.message;
                console.error('Fetch error:', e);
            } else {
                error = 'Unknown error';
                console.error('Unknown error:', e);
            }
        }
    });

    
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
<SensorMap />