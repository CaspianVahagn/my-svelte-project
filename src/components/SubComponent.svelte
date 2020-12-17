<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher()

    export let funTest = () => {
        dispatch('callback', 'salami');
    };
</script>

<style type="text/scss">
</style>

<div>
    <button class="btn-secondary" on:click={funTest}>Clicker</button>
</div>
