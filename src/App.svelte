<script lang="ts">
	import type {PersonModel} from "./shared/models/person.model";
	import {storageService} from "./shared/storage.service";

	export let name:string;
	const map: Map<string,number> = new Map<string, number>();
	let a: string = "a";
	let b: string = "helloo";
	let value:PersonModel = {name:name,age:12}
	let s = ""
	$: s =  a.repeat(23*a.length)

	const save = () => {
		storageService.saveString(a,b);
	}
	const load = () => {
		storageService.loadString(a).then(value1 => {
			b = value1['value'];
			console.log(value1);
		});
	}
</script>

<main>
	<h1 class="fade">Hello {value.name}!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial {s}</a> to learn how to build Svelte apps.</p>
	<p>AA</p><input type="text" bind:value="{a}" >
	<p class="fade">BB</p><input type="text" bind:value="{b}" >
	<button on:click={save}>save</button>
	<button on:click={load}>load</button>
	<div class="ct-chart ct-golden-section" ></div>
</main>

<style type="text/scss">
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
		h1 {
			color: #ff3e00;
			text-transform: uppercase;
			font-size: 4em;
			font-weight: 100;
		}
	}
	@media (min-width: 440px) {
		main {
			max-width: none;
		}
	}
</style>
