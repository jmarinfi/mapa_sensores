<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	const obras = [
		{ id: '192', name: 'Obra Principal' },
		{ id: '205', name: 'Proyecto Secundario' }
	];

	const tiposInstrumento = [
		{ id: '71', name: 'Piezómetro' },
		{ id: '82', name: 'Inclinómetro' },
		{ id: '95', name: 'Extensómetro' }
	];

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Mapa de Sensores</title>
</svelte:head>

<div class="grid grid-rows-[auto_1fr] h-screen w-full font-sans">
	<header class="p-4 border-b bg-gray-50">
		<h2 class="text-lg font-semibold mb-3">Filtros</h2>
		<div class="flex gap-8 items-start">
			<div class="flex flex-col">
				<label for="obra-select" class="mb-2 font-medium text-sm">Obra:</label>
				<select id="obra-select" class="p-2 rounded-md border border-gray-300">
					{#each obras as obra}
						<option value={obra.id}>{obra.name}</option>
					{/each}
				</select>
			</div>

			<div class="flex flex-col">
				<fieldset>
					<legend class="mb-2 font-medium text-sm">Tipo de instrumento:</legend>
					<div class="flex flex-row gap-2">
						{#each tiposInstrumento as tipo}
							<label class="flex items-center gap-2 font-normal">
								<input type="checkbox" value={tipo.id} class="rounded border-gray-300" />
								{tipo.name}
							</label>
						{/each}
					</div>
				</fieldset>
			</div>
		</div>
	</header>

	<main class="overflow-auto">
		{@render children?.()}
	</main>
</div>
