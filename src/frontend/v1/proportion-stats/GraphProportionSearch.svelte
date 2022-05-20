<script>
    import { onMount } from "svelte";
    import Highcharts from "highcharts";
    import Button from "sveltestrap/src/Button.svelte";

    export let params = {};
    //const delay = (ms) => new Promise((res) => setTimeout(res, ms));

    let apiData = [];
    let country = params.country;
    let pais = [];
    let year = [];
    let male = [];
    let female = [];
    let total = [];


async function getSearch(){
    const res2 = await fetch(`api/v2/proportion-stats/${country}`);
        if (res2.ok) {
            const arrayData = await res2.json();
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
                male.push(element.male);
                female.push(element.female);
                total.push(element.total);
                //pais.push if element.country is not in the list
                if(!pais.includes(element.country)){
                    pais.push(element.country);
                }

            });

        loadGraph();
    }else{
        window.alert("No hay datos cargados");
        console.log("INTERNAL FATAL ERROR");
        window.location.href ='/#/proportion-stats';
    }
}
    
    async function loadGraph(){
        Highcharts.chart('container', {

title: {
    text: 'Proportion fo young people without studies, work or capacitation, 2015-2020'
},

subtitle: {
    text: 'Source: www.worldbank.org'
},

yAxis: {
    title: {
        text: 'Proportion'
    }
},

xAxis: {
    accessibility: {
        rangeDescription: 'Range: 2015 to 2020'
    }
},

legend: {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'middle'
},

plotOptions: {
    series: {
        label: {
            connectorAllowed: false
        },
        pointStart: 2010
    }
},

series: [{
    name: 'Male',
    data: male
}, {
    name: 'Female',
    data: female
}, {
    name: 'Total',
    data: total
}],
responsive: {
    rules: [{
        condition: {
            maxWidth: 500
        },
        chartOptions: {
            legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom'
            }
        }
    }]
}

});
 }

 onMount(getSearch);
</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script
        src="https://code.highcharts.com/modules/accessibility.js"
        on:load="{loadGraph}"></script>
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
                window.location.href =  `/#/graphProportionSearch/${country}`;
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
            En esta gráfica se muestra para el pais seleccionado el avance de la
            tasa de empleo, educación o capacitación de los jóvenes.
        </p>
    </figure>
</main>

<style>
    .highcharts-figure,
.highcharts-data-table table {
    min-width: 360px;
    max-width: 800px;
    margin: 1em auto;
}

.highcharts-data-table table {
    font-family: Verdana, sans-serif;
    border-collapse: collapse;
    border: 1px solid #ebebeb;
    margin: 10px auto;
    text-align: center;
    width: 100%;
    max-width: 500px;
}

.highcharts-data-table caption {
    padding: 1em 0;
    font-size: 1.2em;
    color: #555;
}

.highcharts-data-table th {
    font-weight: 600;
    padding: 0.5em;
}


.highcharts-data-table td,
.highcharts-data-table th,
.highcharts-data-table caption {
    padding: 0.5em;
}

.highcharts-data-table thead tr,
.highcharts-data-table tr:nth-child(even) {
    background: #f8f8f8;
}

.highcharts-data-table tr:hover {
    background: #f1f7ff;
}
</style>
