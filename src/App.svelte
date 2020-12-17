<script lang="ts">
	import type {PersonModel} from "./shared/models/person.model";
	import {storageService} from "./shared/storage.service";
	import Morpher from "./Morpher.svelte";
	import SubComponent from "./components/SubComponent.svelte";


	export let name: string;
	let a: string = "a";
	let b: string = "helloo";
	let value: PersonModel = {name: name, age: 12}
	let s = ""
	$: s = a.repeat(23 * a.length)
	const save = () => {
		storageService.saveString(a, b);
	}
	const load = () => {
		storageService.loadString(a).then(value1 => {
			b = value1['value'];
			console.log(value1);
		});
	}

	const callBack = (value: CustomEvent) => {
		console.log("ITWORKS " + value.detail);
	}
</script>

<main class="box">
	<h1 >Hello {value.name}!</h1>
<!--	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial {s}</a> to learn how to build Svelte apps.</p>-->
	<p>AA</p><input type="text" bind:value="{a}" >
	<p class="fade">BB</p><input type="text" bind:value="{b}" >
	<button class="btn" on:click={save}>save</button>
	<button class="btn-primary" on:click={load}>load</button>
	<button class="btn-secondary" on:click={load}>load</button>
	<button class="btn-warn" on:click={load}>load</button>
	<SubComponent on:callback={callBack}/>
</main>

<style type="text/scss">
	main {
		text-align: center;
		padding: 1em;
		max-width: 100vw;
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
