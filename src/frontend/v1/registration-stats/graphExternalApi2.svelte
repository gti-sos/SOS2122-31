<script>
    import Button from "sveltestrap/src/Button.svelte";
    import Highcharts from "highcharts";
    import { pop } from "svelte-spa-router";

    let nombre = [];
    let datos = [];
    let p = [];
    async function loadGraph2() {
        Highcharts.chart('container', {
    chart: {
        type: 'area'
    },
    accessibility: {
        description: 'Image description: An area chart compares the nuclear stockpiles of the USA and the USSR/Russia between 1945 and 2017. The number of nuclear weapons is plotted on the Y-axis and the years on the X-axis. The chart is interactive, and the year-on-year stockpile levels can be traced for each country. The US has a stockpile of 6 nuclear weapons at the dawn of the nuclear age in 1945. This number has gradually increased to 369 by 1950 when the USSR enters the arms race with 6 weapons. At this point, the US starts to rapidly build its stockpile culminating in 32,040 warheads by 1966 compared to the USSR’s 7,089. From this peak in 1966, the US stockpile gradually decreases as the USSR’s stockpile expands. By 1978 the USSR has closed the nuclear gap at 25,393. The USSR stockpile continues to grow until it reaches a peak of 45,000 in 1986 compared to the US arsenal of 24,401. From 1986, the nuclear stockpiles of both countries start to fall. By 2000, the numbers have fallen to 10,577 and 21,000 for the US and Russia, respectively. The decreases continue until 2017 at which point the US holds 4,018 weapons compared to Russia’s 4,500.'
    },
    title: {
        text: 'DATOS SOBRE EL GASTO PÚBLICO EN MUJERES, HOMBRES Y EL TOTAL'
    },
    subtitle: {
        text: ""
    },
    xAxis: {
        allowDecimals: false,
        categories: nombre,
        labels: {
            formatter: function () {
                return this.value; // clean, unformatted number for year
            }
        },
        accessibility: {
            rangeDescription: 'Range: 1940 to 2017.'
        }
    },
    yAxis: {
        title: {
            text: 'RANGO'
        },
        labels: {
            formatter: function () {
                return this.value / 1000 + 'k';
            }
        }
    },
    tooltip: {
        pointFormat: '<b>{point.y:,.0f}</b><br/>'
    },
    plotOptions: {
        area: {
            marker: {
                enabled: false,
                symbol: 'circle',
                radius: 2,
                states: {
                    hover: {
                        enabled: true
                    }
                }
            }
        }
    },
    series: [{
        name: 'HOMBRES, MUJERES Y TOTAL (EN ESE ORDEN DE 7 EN 7)',
        data: p
    }]
});

    }
    async function loadGraph() {
        let res1 = await fetch("https://servicios.ine.es/wstempus/js/es/DATOS_TABLA/t15/p416/a2018/s05001.px?tip=AM");
        if (res1.ok) {
            datos = await res1.json();
            console.log(datos);
            console.log(JSON.stringify(datos, null, 2));
            datos.forEach((data1) => {
                data1.Data.forEach((data2) => {
                    console.log(data2.Valor)
                    p.push(data2.Valor)
                    nombre.push(data2.NombrePeriodo)
                });
            });
            console.log(nombre);
            console.log(p);
            loadGraph2();
        } else {
            window.alert("No hay datos para este pais");
            console.log("INTERNAL FATAL ERROR");
            window.location.href = `/#/registration-stats`;
        }
    }
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
    <br />
    <Button id="back" outline color="secondary" on:click="{pop}"> Atrás</Button>
    <br />
    <br />
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
            Pie chart showing a hollow semi-circle. This is a compact visualization,
            often used in dashboards.
        </p>
    </figure>
</main>

<style>
    .highcharts-figure {
        min-width: 320px;
        max-width: 1000px;
        margin: 1em auto;
    }
</style>
