<script>
    import { onMount } from "svelte";
    import Highcharts from "highcharts";

    //Atributos API Propia:
    let apiData = [];
    let country = [];
    let year = [];
    let ar_ym = [];
    let ar_yw = [];
    let ar_ty = [];

    //Atributos API Externa:
    let apiEXT = [];
    let cSOS = [];
    let ySOS = [];
    let paeSOS = [];
    let nrecSOS = [];
    let renSOS = [];

    //API EXTERNA:
    async function loadAPISOS1() {
        const resEXT = await fetch(
            "https://sos2122-10.herokuapp.com/api/v2/energy-consumptions"
        );
        if (resEXT.ok) {
            const arrayEXT = await resEXT.json();
            apiEXT = arrayEXT;
            //Ordenamos valores:
            console.log(apiEXT.length);
            apiEXT.forEach((element) => {
                cSOS.push(element.country);
                ySOS.push(element.year);
                paeSOS.push(element.percentages_access_elecetricity);
                nrecSOS.push(element.non_renewable_energy_consumptions);
                renSOS.push(element.renewable_energy_consumptions);
            });
            //await delay(1000);
            loadGraph();
        } else {
            window.alert("No hay datos para este pais");
            console.log("INTERNAL FATAL ERROR");
            window.location.href = `/#/alphabetization-stats`;
        }
    }

    //API PROPIA:
    async function getData() {
        const res1 = await fetch("api/v2/alphabetization-stats/");
        if (res1.ok) {
            const arrayData = await res1.json();
            apiData = arrayData;
            //Ordenamos valores:
            apiData.sort(function (a, b) {
                var keyA = new Date(a.year),
                    keyB = new Date(b.year);
                // Compare the 2 dates
                if (keyA < keyB) return -1;
                if (keyA > keyB) return 1;
                return 0;
            });
            console.log(apiData.length);
            apiData.forEach((element) => {
                country.push(element.country);
                year.push(element.year);
                ar_ym.push(element.ar_ym);
                ar_yw.push(element.ar_yw);
                ar_ty.push(element.ar_ty);
            });
            //await delay(1000);
            loadAPISOS1();
            loadGraph();
        } else {
            window.alert("ERROR AL CONECTAR CON LA BASE DE DATOS");
            console.log("INTERNAL FATAL ERROR");
            window.location.href = `/#/alphabetization-stats`;
        }
    }

    async function loadGraph() {
        Highcharts.chart("container", {
            chart: {
                type: "area",
                inverted: true,
            },
            title: {
                text: "Average fruit consumption during one week",
            },
            accessibility: {
                keyboardNavigation: {
                    seriesNavigation: {
                        mode: "serialize",
                    },
                },
            },
            legend: {
                layout: "vertical",
                align: "right",
                verticalAlign: "top",
                x: -150,
                y: 100,
                floating: true,
                borderWidth: 1,
                backgroundColor:
                    Highcharts.defaultOptions.legend.backgroundColor ||
                    "#FFFFFF",
            },
            xAxis: {
                categories: year,
            },
            yAxis: {
                title: {
                    text: "Number of units",
                },
                allowDecimals: false,
                min: 0,
            },
            plotOptions: {
                area: {
                    fillOpacity: 0.5,
                },
            },
            series: [
                {
                    name: "% Hombres",
                    data: ar_ym,
                },
                {
                    name: "% Mujeres",
                    data: ar_yw,
                },
                {
                    name: "% Media",
                    data: ar_ty,
                },
                {
                    name: "% Acceso Electricidad",
                    data: paeSOS,
                },
                {
                    name: "% Energías no renovables",
                    data: nrecSOS,
                },
                {
                    name: "% Energías renovables",
                    data: renSOS,
                },
            ],
        });
    }

    onMount(getData);
</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script
        src="https://code.highcharts.com/modules/accessibility.js"
        on:load={loadGraph}></script>
</svelte:head>
<main>
    <figure class="highcharts-figure">
        <div id="container" />
        <p class="highcharts-description" />
    </figure>
    <br />
</main>
