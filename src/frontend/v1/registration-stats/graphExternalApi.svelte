<script>
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";

    async function loadGraph() {
        let tipos = [];
        let c = {};
        const res = await fetch(
            "https://db.ygoprodeck.com/api/v7/cardinfo.php"
        );
        const p = await res.json();
        console.log(p);

        p.data.forEach((v) => {
            if (v.type in c) {
                c[v.type] += 1;
            } else {
                c[v.type] = 1;
            }
        });

        for (var key in c) {
            tipos.push([key, c[key]]);
        }

        Highcharts.chart("container", {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: 0,
                plotShadow: false,
            },
            title: {
                text: "Browser<br>shares<br>2017",
                align: "center",
                verticalAlign: "middle",
                y: 60,
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
                    dataLabels: {
                        enabled: true,
                        distance: -50,
                        style: {
                            fontWeight: "bold",
                            color: "white",
                        },
                    },
                    startAngle: -90,
                    endAngle: 90,
                    center: ["50%", "75%"],
                    size: "110%",
                },
            },
            series: [
                {
                    type: "pie",
                    name: "Cantidad en porcentaje",
                    innerSize: "50%",
                    data: tipos,
                },
            ],
        });
    }
</script>

<svelte:head>
    <script
        src="https://code.highcharts.com/highcharts.js"
        on:load={loadGraph}></script>
    <script src="https://code.highcharts.com/highcharts-3d.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
</svelte:head>

<main>
    <figure class="highcharts-figure">
        <div id="container" />
        <p class="highcharts-description">
            Gráfico de tarta 3D que muestra la cantidad de cartas de YU-GI-OH
            segun su tipo en porcentaje.
        </p>
    </figure>
    <Button id="back" outline color="secondary" on:click={pop}>Atrás</Button>
</main>

<style>
    #container {
        height: 600px;
        width: 900px;
    }
    .highcharts-figure {
        min-width: 350px;
        max-width: 900px;
        margin: 1em auto;
    }
</style>
