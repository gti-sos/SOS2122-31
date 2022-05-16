<script>
    import Button from "sveltestrap/src/Button.svelte";
    import Highcharts from "highcharts";
    import { pop } from "svelte-spa-router";
    let datos = [];
    let datos1 = [];
    let fechas = [];
    let death_rate = [];
    let life_expectancy_birth = [];
    let birth_rate = [];
    let nivelPrimario = [];
    let nivelSecundario = [];
    let nivelTerciario = [];

    async function loadGraph() {
        const res = await fetch(
            "https://sos2122-10.herokuapp.com/api/v2/population-levels"
        );
        const res1 = await fetch("/api/v2/registration-stats");
        if (res.ok) {
            datos = await res.json();
            console.log(datos);
            console.log(JSON.stringify(datos, null, 2));
            datos.forEach((data) => {
                fechas.push(data["country"] + "-" + data.year);
                death_rate.push(data.death_rate);
                life_expectancy_birth.push(data.life_expectancy_birth);
                birth_rate.push(data.birth_rate);
            });
            datos1 = await res1.json();
            console.log(datos1);
            console.log(JSON.stringify(datos1, null, 2));
            datos1.forEach((data) => {
                fechas.push(data["country"] + "-" + data.year);
                nivelPrimario.push(data.primarylevel);
                nivelSecundario.push(data.secondarylevel);
                nivelTerciario.push(data.tertiarylevel);
            });
        } else {
            window.alert("No hay datos para este pais");
            console.log("INTERNAL FATAL ERROR");
            window.location.href = `/#/registration-stats`;
        }
        Highcharts.chart("container", {
            title: {
                text: "Combination chart",
            },
            xAxis: {
                categories: fechas,
            },
            labels: {
                items: [
                    {
                        html: "Mezcla columna y linea",
                        style: {
                            left: "50px",
                            top: "18px",
                            color:
                                // theme
                                (Highcharts.defaultOptions.title.style &&
                                    Highcharts.defaultOptions.title.style
                                        .color) ||
                                "black",
                        },
                    },
                ],
            },
            series: [
                {
                    name: "death_rate",
                    type: "column",
                    data: death_rate,
                },
                {
                    name: "life_expectancy_birth",
                    type: "column",
                    data: life_expectancy_birth,
                },
                {
                    name: "birth_rate",
                    type: "column",
                    data: birth_rate,
                },
                {
                    type: "spline",
                    name: "Nivel Primario",
                    data: nivelPrimario,
                    marker: {
                        lineWidth: 10,
                        lineColor: Highcharts.getOptions().colors[3],
                        fillColor: "white",
                    },
                },
                {
                    type: "spline",
                    name: "Nivel Secundario",
                    data: nivelSecundario,
                    marker: {
                        lineWidth: 10,
                        lineColor: Highcharts.getOptions().colors[4],
                        fillColor: "white",
                    },
                },
                {
                    type: "spline",
                    name: "Nivel Terciario",
                    data: nivelTerciario,
                    marker: {
                        lineWidth: 10,
                        lineColor: Highcharts.getOptions().colors[5],
                        fillColor: "white",
                    },
                }
            ],
        });
    }
</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/highcharts-3d.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script
        src="https://code.highcharts.com/modules/accessibility.js"
        on:load={loadGraph}></script>
</svelte:head>

<main>
    <br />
    <br />
    <Button id="back" outline color="secondary" on:click={pop}>Atrás</Button>
    <div style="margin:auto;">
        <figure class="highcharts-figure">
            <div id="container" />
            <p class="highcharts-description">
                Gráfico de barras sobre poblacion por pais y año de Alejandro
                Molino Grupo 10 mezclado con la mia.
            </p>
        </figure>
    </div>
</main>

<style>
    .highcharts-figure {
        min-width: 100%;
        max-width: 100%;
        margin: 1em auto;
    }
    #container {
        height: 600px;
    }
</style>
