<script>
	import Router from "svelte-spa-router";
	import RegistrationStatsTable from "./registration-stats/RegistrationStatsTable.svelte";
	import EditRegistrationStats from "./registration-stats/EditRegistrationStats.svelte";
	import AlphabetizationStats from "./alphabetization-stats/AlphabetizationStats.svelte";
	import EditAlphabetizationStats from "./alphabetization-stats/EditAlphabetizationStats.svelte";
	import ProportionStats from "./proportion-stats/ProportionStats.svelte";
	import EditProportionStats from "./proportion-stats/EditProportionStats.svelte";
	import Home from "./Home.svelte";

	//import EditContact from "./EditContact.svelte"
	const routes = {
		"/": Home,
		"/registration-stats": RegistrationStatsTable,
		"/registration-stats/:country/:year": EditRegistrationStats,
		"/alphabetization-stats": AlphabetizationStats,
		"/alphabetization-stats/:country/:year": EditAlphabetizationStats,
		"/proportion-stats": ProportionStats,
		"/proportion-stats/:country/:year": EditProportionStats
	};
</script>

<main>
	<Router {routes} />
</main>