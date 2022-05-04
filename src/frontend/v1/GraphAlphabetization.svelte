<script>
    import { onMount } from "svelte";
    import Highcharts from "highcharts";
    import Button from "sveltestrap/src/Button.svelte";

    export let params = {};
    //const delay = (ms) => new Promise((res) => setTimeout(res, ms));

    let apiData = [];
    let country = params.country;
    let year = [];
    let ar_ym = [];
    let ar_yw = [];
    let ar_ty = [];

    
    async function getData() {
        const res1 = await fetch(`api/v1/alphabetization-stats/${country}`);
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
                year.push(element.year);
                ar_ym.push(element.ar_ym);
                ar_yw.push(element.ar_yw);
                ar_ty.push(element.ar_ty);
            });
            //await delay(1000);
            loadGraph();
        } else {
            window.alert("No hay datos para este pais");
            console.log("INTERNAL FATAL ERROR");
            window.location.href = `/#/alphabetization-stats`;
        }
    }

    async function loadGraph() {
        Highcharts.chart("container", {
            chart: {
                type: "area",
            },
            title: {
                text: `Gráfica para el pais: ${country}`,
            },
            subtitle: {
                text: "Fuente de datos: Banco Mundial de Datos",
            },
            xAxis: {
                categories: year,
                tickmarkPlacement: "on",
                title: {
                    enabled: false,
                },
            },
            yAxis: {
                title: {
                    text: "Percentage",
                },
            },
            tooltip: {
                split: true,
                valueSuffix: "%",
            },
            plotOptions: {
                area: {
                    stacking: "normal",
                    lineColor: "#666666",
                    lineWidth: 1,
                    marker: {
                        lineWidth: 1,
                        lineColor: "#666666",
                    },
                },
            },
            series: [
                {
                    name: "Hombres",
                    data: ar_ym,
                },
                {
                    name: "Mujeres",
                    data: ar_yw,
                },
                {
                    name: "Media",
                    data: ar_ty,
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
    <br />
    <h1 align="center">Pais al que buscar gráfica:</h1>
    <div align="center">
        <input type="text" bind:value={country} />
        <Button
            outline
            color="info"
            on:click={() => {
                window.location.href = `/#/graphAlphabetization/${country}`;
                location.reload();
            }}
        >
            Buscar
        </Button>
    </div>
    <br />
    <figure class="highcharts-figure">
        <div id="container" />
    </figure>
    <br />
    <figure class="highcharts-figure">
        <div id="container" />
        <p class="highcharts-description">
            Gráfica donde se muestra para el pais indicado el avance que ha
            tenido la alfabetización a lo largo de los años.
        </p>
    </figure>
</main>
