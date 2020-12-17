import App from './App.svelte';
import "./assets/theme.scss"
import "./assets/common-ui.scss"


const app = new App({
	target: document.body,
	props: {
		name: 'Tara Tanja'
	}
});

export default app;

