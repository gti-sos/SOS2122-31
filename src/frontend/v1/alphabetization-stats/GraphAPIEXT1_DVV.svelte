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
    let cPorPersona = [];
    let mPorPersona = [];
    let tPorPersona = [];

    //API EXTERNA:
    async function loadAPIEXT1() {
        const resEXT = await fetch(
            "https://disease.sh/v2/countries?yesterday=false&sort=deaths&allowNull=true"
        );
        if (resEXT.ok) {
            const arrayEXT = await resEXT.json();
            apiEXT = arrayEXT;
            //Ordenamos valores:
            console.log(apiEXT.length);
            apiEXT.forEach((element) => {
                cPorPersona.push(element.oneCasePerPeople);
                mPorPersona.push(element.oneDeathPerPeople);
                tPorPersona.push(element.oneTestPerPeople);
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
        const res1 = await fetch(`api/v2/alphabetization-stats/${country}`);
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
            loadAPIEXT1();
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
                type: "column",
            },
            title: {
                text: "INTEGRACIÓN API 1 EXTERNA",
            },
            subtitle: {
                text: "Población por país",
            },
            xAxis: {
                categories: name,
                crosshair: true,
                categories : year
            },
            yAxis: {
                min: 0,
                title: {
                    text: "Integración datos propios y externos",
                },
            },
            tooltip: {
                headerFormat:
                    '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat:
                    '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} habitantes</b></td></tr>',
                footerFormat: "</table>",
                shared: true,
                useHTML: true,
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0,
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
                    name: "Casos por persona",
                    data: cPorPersona,
                },
                {
                    name: "Muertes por persona",
                    data: mPorPersona,
                },
                {
                    name: "Test por persona",
                    data: tPorPersona,
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
