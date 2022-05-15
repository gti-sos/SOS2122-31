<script>
    import { onMount } from "svelte";
    import Highcharts from "highcharts";

    //Atributos API Externa:
    let apiEXT = [];
    let name = [];
    let population = [];

    //API EXTERNA:
    async function getData() {
        const resEXT = await fetch("https://restcountries.com/v2/lang/es");
        if (resEXT.ok) {
            const arrayEXT = await resEXT.json();
            apiEXT = arrayEXT;
            //Ordenamos valores:
            console.log(apiEXT);
            apiEXT.forEach((element) => {
                name.push(element.name);
                population.push(element.population);
            });
            loadGraph();
        } else {
            window.alert("ERROR AL CONECTAR CON LA BASE DE DATOS");
            console.log("INTERNAL FATAL ERROR");
        }
    }

    async function loadGraph() {
        Highcharts.chart("container", {
            chart: {
                type: "column",
            },
            title: {
                text: "INTEGRACIÓN API 2 EXTERNA",
            },
            subtitle: {
                text: "Población por país",
            },
            xAxis: {
                categories: name,
                crosshair: true,
            },
            yAxis: {
                min: 0,
                title: {
                    text: "Número habitantes por país",
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
                    name: "Población de cada país",
                    data: population
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
