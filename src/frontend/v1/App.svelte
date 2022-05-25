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

//José Ortiz Roldan
	import GraphProportion from "./proportion-stats/GraphProportion.svelte";
	import GraphProportionSearch from "./proportion-stats/GraphProportionSearch.svelte";
	import ApexProportion from "./proportion-stats/apexProportion.svelte";
	import GraphExternalAPI_JOR from "./proportion-stats/graphExternalAPI_JOR.svelte";
	import GraphExternalAPI2_JOR from "./proportion-stats/graphExternalAPI2_JOR.svelte";
//	
	import GraphGeneral from "./GraphGeneral.svelte";
	import GraphGeneral2 from "./GraphGeneral2.svelte";
	import GraphCanvaJs from "./registration-stats/graphCanvaJS.svelte";
	import GraphCo2Stats from "./registration-stats/GraphCo2Stats.svelte";
	import GraphPublic from "./registration-stats/graphPublic.svelte";
	import Integrations from "./Integrations.svelte";
	import GraphPopulation from "./registration-stats/graphPopulation.svelte";
	import GraphJSCharting from "./alphabetization-stats/GraphJSCharting.svelte";
	import GraphExternalApi from "./registration-stats/graphExternalApi.svelte";
	import GraphExternalApi2 from "./registration-stats/graphExternalApi2.svelte";
	import GraphApiext1Dvv from "./alphabetization-stats/GraphAPIEXT1_DVV.svelte";
	import GraphApiext2Dvv from "./alphabetization-stats/GraphAPIEXT2_DVV.svelte";
	import About from "./About.svelte";
	import GraphApisos1Dvv from "./alphabetization-stats/GraphAPISOS1_DVV.svelte";
	import GraphApisos2Dvv from "./alphabetization-stats/GraphAPISOS2_DVV.svelte";
	
	const routes = {
		"/": Home,
		"/about": About,
		"/registration-stats": RegistrationStatsTable,
		"/registration-stats/:country/:year": EditRegistrationStats,
		"/alphabetization-stats": AlphabetizationStats,
		"/alphabetization-stats/:country/:year": EditAlphabetizationStats,
		"/proportion-stats": ProportionStatsTable,
		"/proportion-stats/:country/:year": EditProportionStats,
		"/graphProportion": GraphProportion,
		"/graphProportionSearch/:country": GraphProportionSearch,
		"/apexProportion": ApexProportion,
		"/graphExternalAPI_JOR": GraphExternalAPI_JOR,
		"/graphExternalAPI2_JOR": GraphExternalAPI2_JOR,
		"/info": Info,
		"/graphAlphabetization/:country": GraphAlphabetization,
		"/graphRegistration": GraphRegistration,
		"/graphGeneral": GraphGeneral,
		"/analytics": GraphGeneral2,
		"/graphCanvaJS": GraphCanvaJs,
		"/graphCo2Stats": GraphCo2Stats,
		"/graphPublicStats": GraphPublic,
		"/graphPopulation": GraphPopulation,
		"/integrations": Integrations,
		"/graphExternalApi": GraphExternalApi,
		"/graphExternalApi2": GraphExternalApi2,
		"/graphJSCharting/:country": GraphJSCharting,
		"/graphAPIEXT1_DVV": GraphApiext1Dvv,
		"/graphAPIEXT2_DVV": GraphApiext2Dvv,
		"/graphAPISOS1_DVV": GraphApisos1Dvv,
		"/graphAPISOS2_DVV": GraphApisos2Dvv,
	};
</script>

<main>
	<Router {routes} />
</main>
