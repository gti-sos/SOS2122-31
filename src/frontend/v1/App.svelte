<script>
	import Router from "svelte-spa-router";
	import RegistrationStatsTable from "./registration-stats/RegistrationStatsTable.svelte";
	import EditRegistrationStats from "./registration-stats/EditRegistrationStats.svelte";
	import Home from "./Home.svelte";
	//import EditContact from "./EditContact.svelte"
	const routes = {
		"/": Home,
		"/registration-stats": RegistrationStatsTable,
		"/registration-stats/:country/:year": EditRegistrationStats
	};
</script>

<main>
	<Router {routes} />
</main>