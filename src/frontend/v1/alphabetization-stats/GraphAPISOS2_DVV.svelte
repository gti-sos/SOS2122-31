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
    let azfSOS = [];
    let afsSOS = [];
    let asSOS = [];

    //API EXTERNA:
    async function loadAPISOS1() {
        const resEXT = await fetch("/remoteApiCancer");
        if (resEXT.ok) {
            const arrayEXT = await resEXT.json();
            apiEXT = arrayEXT;
            //Ordenamos valores:
            console.log(apiEXT.length);
            apiEXT.forEach((element) => {
                cSOS.push(element.country);
                ySOS.push(element.year);
                azfSOS.push(element.ages_zero_fifty);
                afsSOS.push(element.ages_fifty_seventy);
                asSOS.push(element.ages_seventy);
            });
            //await delay(1000);
            loadGraph();
        } else {
            window.alert("No hay datos para este pais");
            console.log("INTERNAL FATAL ERROR");
            //window.location.href = `/#/alphabetization-stats`;
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
                type: "areaspline",
            },
            title: {
                text: `Gráfica con todos los paises`,
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
                {
                    name: "Edad 0-50",
                    data: azfSOS,
                },
                {
                    name: "Edad 50-70",
                    data: afsSOS,
                },
                {
                    name: "Edad 70",
                    data: asSOS,
                },
            ],
        });
    }

    onMount(getData);
</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/heatmap.js"></script>
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
