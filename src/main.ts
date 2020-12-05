import App from './App.svelte';
import "./assets/theme.scss"

const app = new App({
	target: document.body,
	props: {
		name: 'Testinkton'
	}
});

export default app;
