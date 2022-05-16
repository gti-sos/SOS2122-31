<script>
    import Button from "sveltestrap/src/Button.svelte";
    import Highcharts from "highcharts";

    let reg1 = [];
    let reg2 = [];
    let reg3 = [];

    let alp1 = [];
    let alp2 = [];
    let alp3 = [];

    let pro1 = [];
    let pro2 = [];
    let pro3 = [];

    let res;
    let res1;
    let res2;
    async function loadGraph() {
        res = await fetch("/api/v2/registration-stats"); //alphabetization
        res1 = await fetch("/api/v2/alphabetization-stats"); //alphabetization
        res2 = await fetch("/api/v1/proportion-stats"); //proportion
        if (res.ok && res1.ok && res2.ok) {
            const datos = await res.json();
            const datos1 = await res1.json();
            const datos2 = await res2.json();
            guardaDatosPopulation(datos2);
            guardaDatosEnergy(datos1);
            guardaDatosInternet(datos);
        } else {
            console.log("INTERNAL FATAL ERROR");
        }

        Highcharts.chart("container", {
            chart: {
                type: "areaspline",
            },
            title: {
                text: "Porcentajes de las 3 gráficas unidas",
            },
            legend: {
                layout: "vertical",
                align: "left",
                verticalAlign: "top",
                x: 150,
                y: 100,
                floating: true,
                borderWidth: 1,
                backgroundColor:
                    Highcharts.defaultOptions.legend.backgroundColor ||
                    "#FFFFFF",
            },
            xAxis: {
                plotBands: [
                    {
                        from: 4.5,
                        to: 6.5,
                        color: "rgba(68, 170, 213, .2)",
                    },
                ],
            },
            yAxis: {
                title: {
                    text: "Percentage",
                },
            },
            tooltip: {
                shared: true,
            },
            credits: {
                enabled: false,
            },
            plotOptions: {
                areaspline: {
                    fillOpacity: 0.5,
                },
            },
            series: [
                {
                    name: "% Matriculados Nivel Primario",
                    data: reg1,
                },
                {
                    name: "% Matriculados Nivel Secundario",
                    data: reg2,
                },
                {
                    name: "% Matriculados Nivel Terciario",
                    data: reg3,
                },
                {
                    name: "% Alfabetización Hombres",
                    data: alp1,
                },
                {
                    name: "% Alfabetización Mujeres",
                    data: alp2,
                },
                {
                    name: "% Alfabetización Media",
                    data: alp3,
                },
                {
                    name: "% Sin Educación Hombres",
                    data: pro1,
                },
                {
                    name: "% Sin Educación Mujeres",
                    data: pro2,
                },
                {
                    name: "% Sin Educación Totales",
                    data: pro3,
                },
            ],
        });
    }

    async function guardaDatosInternet(datos) {
        datos.sort(function (a, b) {
            var keyA = new Date(a.year),
                keyB = new Date(b.year);
            // Compare the 2 dates
            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
            return 0;
        });

        datos.forEach((data) => {
            let aux = [];
            aux.push(data.year);
            aux.push(data.primarylevel);
            reg1.push(aux);

            aux = [];
            aux.push(data.year);
            aux.push(data.secondarylevel);
            reg2.push(aux);

            aux = [];
            aux.push(data.year);
            aux.push(data.tertiarylevel);
            reg3.push(aux);
        });
    }

    async function guardaDatosEnergy(datos1) {
        datos1.sort(function (a, b) {
            var keyA = new Date(a.year),
                keyB = new Date(b.year);
            // Compare the 2 dates
            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
            return 0;
        });
        datos1.forEach((data) => {
            let aux = [];
            aux.push(data.year);
            aux.push(data.ar_ym);
            alp1.push(aux);

            aux = [];
            aux.push(data.year);
            aux.push(data.ar_yw);
            alp2.push(aux);

            aux = [];
            aux.push(data.year);
            aux.push(data.ar_ty);
            alp3.push(aux);
        });
    }
    async function guardaDatosPopulation(datos2) {
        datos2.sort(function (a, b) {
            var keyA = new Date(a.year),
                keyB = new Date(b.year);
            // Compare the 2 dates
            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
            return 0;
        });
        datos2.forEach((data) => {
            let aux = [];
            aux.push(data.year);
            aux.push(data.male);
            pro1.push(aux);

            aux = [];
            aux.push(data.year);
            aux.push(data.female);
            pro2.push(aux);

            aux = [];
            aux.push(data.year);
            aux.push(data.total);
            pro3.push(aux);
        });
    }
</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/series-label.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script
        src="https://code.highcharts.com/modules/accessibility.js"
        on:load={loadGraph}></script>
</svelte:head>

<main>
    <br />
    <br />
    <Button
        id="back"
        outline
        color="secondary"
        onclick="window.location.href='#/registration-stats'">Volver</Button
    >
    <div style="margin:auto;">
        <figure class="highcharts-figure">
            <div id="container" />
            <p class="highcharts-description">
                Nuestras fuentes de información esta orientadas a analizar la
                relación que existe entre los matriculados el los diferentes
                niveles escolares, la tasa de alfabetización y proporción sin
                educación, empleo ni capacitación en jóvenes
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
