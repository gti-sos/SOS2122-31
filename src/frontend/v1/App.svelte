<script>
	import Router from "svelte-spa-router";
	import RegistrationStatsTable from "./registration-stats/RegistrationStatsTable.svelte";
	import EditRegistrationStats from "./registration-stats/EditRegistrationStats.svelte";
	import AlphabetizationStats from "./alphabetization-stats/AlphabetizationStats.svelte";
	import EditAlphabetizationStats from "./alphabetization-stats/EditAlphabetizationStats.svelte";
	import ProportionStatsTable from "./proportion-stats/ProportionStatsTable.svelte";
	import EditProportionStats from "./proportion-stats/EditProportionStats.svelte";
	import Home from "./Home.svelte";
	import Info from "./Info.svelte";
	//Gráficos:
	import GraphAlphabetization from "./alphabetization-stats/GraphAlphabetization.svelte";
	import GraphRegistration from "./registration-stats/GraphRegistration.svelte";
	import GraphProportion from "./proportion-stats/GraphProportion.svelte";
	import GraphGeneral from "./GraphGeneral.svelte";
	import GraphCanvasJs from "./registration-stats/GraphCanvasJS.svelte";
	import GraphCo2Stats from "./registration-stats/GraphCo2Stats.svelte";
	import GraphPublic from "./registration-stats/graphPublic.svelte";
	
	const routes = {
		"/": Home,
		"/registration-stats": RegistrationStatsTable,
		"/registration-stats/:country/:year": EditRegistrationStats,
		"/alphabetization-stats": AlphabetizationStats,
		"/alphabetization-stats/:country/:year": EditAlphabetizationStats,
		"/proportion-stats": ProportionStatsTable,
		"/proportion-stats/:country/:year": EditProportionStats,
		"/proportion-stats/:country": GraphProportion,
		"/info" : Info,
		"/graphAlphabetization/:country" : GraphAlphabetization,
		"/graphRegistration" : GraphRegistration,	
		"/graphGeneral" : GraphGeneral,
		"/graphCanvaJS" : GraphCanvasJs,
		"/graphCo2Stats" : GraphCo2Stats,
		"/graphPublicStats": GraphPublic
	};
</script>

<main>
	<Router {routes} />
</main>