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
        const resEXT = await fetch("/remoteApiEnergy");
        if (resEXT.ok) {
            const arrayEXT = await resEXT.json();
            apiEXT = arrayEXT;
            //Ordenamos valores:
            console.log(apiEXT.length);
            apiEXT.forEach((element) => {
                cSOS.push(element.country);
                ySOS.push(element.year);
                azfSOS.push(element.primarylevel);
                afsSOS.push(element.secondarylevel);
                asSOS.push(element.tertiarylevel);
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
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: "pie",
            },
            title: {
                text: "Browser market shares in January, 2018",
            },
            tooltip: {
                pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
            },
            accessibility: {
                point: {
                    valueSuffix: "%",
                },
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: "pointer",
                    dataLabels: {
                        enabled: true,
                        format: "<b>{point.name}</b>: {point.percentage:.1f} %",
                    },
                },
            },
            series: [
                {
                    name: "Brands",
                    colorByPoint: true,
                    data: [
                        {
                            name: "Chrome",
                            y: 61.41,
                        },
                        {
                            name: "Internet Explorer",
                            y: 11.84,
                        },
                        {
                            name: "Firefox",
                            y: 10.85,
                        },
                        {
                            name: "Edge",
                            y: 4.67,
                        },
                        {
                            name: "Safari",
                            y: 4.18,
                        },
                        {
                            name: "Sogou Explorer",
                            y: 1.64,
                        },
                        {
                            name: "Opera",
                            y: 1.6,
                        },
                        {
                            name: "QQ",
                            y: 1.2,
                        },
                        {
                            name: "Other",
                            y: 2.61,
                        },
                    ],
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
