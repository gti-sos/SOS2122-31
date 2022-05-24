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

    

    let male2015 = [];
    let male2016 = [];
    let male2017 = [];
    let male2018 = [];
    let male2019 = [];
    let male2020 = [];

    let female2015 = [];
    let female2016 = [];
    let female2017 = [];
    let female2018 = [];
    let female2019 = [];
    let female2020 = [];

    let total2015 = [];
    let total2016 = [];
    let total2017 = [];
    let total2018 = [];
    let total2019 = [];
    let total2020 = [];

    let sumaMale2015 = 0;
    let sumaMale2016 = 0;
    let sumaMale2017 = 0;
    let sumaMale2018 = 0;
    let sumaMale2019 = 0;
    let sumaMale2020 = 0;

    let sumaFemale2015 = 0;
    let sumaFemale2016 = 0;
    let sumaFemale2017 = 0;
    let sumaFemale2018 = 0;
    let sumaFemale2019 = 0;
    let sumaFemale2020 = 0;

    let sumaTotal2015 = 0;
    let sumaTotal2016 = 0;
    let sumaTotal2017 = 0;
    let sumaTotal2018 = 0;
    let sumaTotal2019 = 0;
    let sumaTotal2020 = 0;

    async function getData(){
        const res1 = await fetch('/api/v1/proportion-stats');
        if (res1.ok){
            const arrayData = await res1.json();
            apiData = arrayData;
            console.log("api data : " + apiData);
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
            apiData.forEach((v) => {
                year.push(v.year);
                
                
            });
            console.log(year);

            for(let i = 0; i < year.length; i++){
                if(apiData[i].year == 2015){
                    male2015.push(apiData[i].male);
                    female2015.push(apiData[i].female);
                    total2015.push(apiData[i].total);
                }
                else if(apiData[i].year == 2016){
                    male2016.push(apiData[i].male);
                    female2016.push(apiData[i].female);
                    total2016.push(apiData[i].total);
                }
                else if(apiData[i].year == 2017){
                    male2017.push(apiData[i].male);
                    female2017.push(apiData[i].female);
                    total2017.push(apiData[i].total);
                }else if(apiData[i].year == 2018){
                    male2018.push(apiData[i].male);
                    female2018.push(apiData[i].female);
                    total2018.push(apiData[i].total);
                }else if(apiData[i].year == 2019){
                    male2019.push(apiData[i].male);
                    female2019.push(apiData[i].female);
                    total2019.push(apiData[i].total);
                }
                else if(apiData[i].year == 2020){
                    male2020.push(apiData[i].male);
                    female2020.push(apiData[i].female);
                    total2020.push(apiData[i].total);
                }
            }

            for(let i= 0; i< male2015; i++){
                sumaMale2015 = sumaMale2015 + male2015[i];
                sumaFemale2015 = sumaFemale2015 + female2015[i];
                sumaTotal2015 = sumaTotal2015 + total2015[i];
            }
            for(let i= 0; i< male2016; i++){
                sumaMale2016 = sumaMale2016 + male2016[i];
                sumaFemale2016 = sumaFemale2016 + female2016[i];
                sumaTotal2016 = sumaTotal2016 + total2016[i];
            }
            for(let i= 0; i< male2017; i++){
                sumaMale2017 = sumaMale2017 + male2017[i];
                sumaFemale2017 = sumaFemale2017 + female2017[i];
                sumaTotal2017 = sumaTotal2017 + total2017[i];
            }
            for(let i= 0; i< male2018; i++){
                sumaMale2018 = sumaMale2018 + male2018[i];
                sumaFemale2018 = sumaFemale2018 + female2018[i];
                sumaTotal2018 = sumaTotal2018 + total2018[i];
            }
            for(let i= 0; i< male2019; i++){
                sumaMale2019 = sumaMale2019 + male2019[i];
                sumaFemale2019 = sumaFemale2019 + female2019[i];
                sumaTotal2019 = sumaTotal2019 + total2019[i];
            }
            for(let i= 0; i< male2020; i++){
                sumaMale2020 = sumaMale2020 + male2020[i];
                sumaFemale2020 = sumaFemale2020 + female2020[i];
                sumaTotal2020 = sumaTotal2020 + total2020[i];
            }

        

        loadGraph();
    }else{
        window.alert("No hay datos cargados");
        console.log("INTERNAL FATAL ERROR");
        window.location.href ='/#/proportion-stats';
    }
}


    
    async function loadGraph(){
        Highcharts.chart('container',{
            chart: {
                type: 'lollipop'
            },

            accessibility: {
                point: {
                    valueDescriptionFormat: '{index}. {xDescription}, {point.y}.'
                }
            },

            legend: {
                enabled: false
            },

            subtitle: {
                text: '2015'
            },

            title: {
                text: 'Top 10 Countries by Population'
            },

            tooltip: {
                shared: true
            },

            xAxis: {
                type: 'category'
            },

            yAxis: {
                title: {
                    text: 'Proportion'
                }
            },

            series: [{
                name: 'Proportion',
                data: [{
                    name: 'Male',
                    low: sumaMale2015
                },
                {
                    name: 'Female',
                    low: sumaFemale2015
                },
                {
                    name: 'Total',
                    low: sumaTotal2015
                }
            ]
            }]
        })
 }

 onMount(getData);
</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/highcharts-more.js"></script>
    <script src="https://code.highcharts.com/modules/dumbbell.js"></script>
    <script src="https://code.highcharts.com/modules/lollipop.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"on:load="{loadGraph}"></script>

    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
            This chart shows how packed bubble charts can be grouped by series,
            creating a hierarchy.

        </p>
    </figure>

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
   #container {
    height: 400px;
}

.highcharts-figure,
.highcharts-data-table table {
    min-width: 320px;
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

.ld-label {
    width: 200px;
    display: inline-block;
}

.ld-url-input {
    width: 500px;
}

.ld-time-input {
    width: 40px;
}



</style>
