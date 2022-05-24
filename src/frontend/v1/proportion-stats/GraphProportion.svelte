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

        

        loadGraph();
    }else{
        window.alert("No hay datos cargados");
        console.log("INTERNAL FATAL ERROR");
        window.location.href ='/#/proportion-stats';
    }
}


    
    async function loadGraph(){
        Highcharts.chart('container', {

            chart: {
                height: '100%',
                type: 'packedbubble'
            },

            title: {
                text: 'Proportion fo young people without studies, work or capacitation, 2015-2020'
                
            },
           
            tooltip: {
                useHTML: true,
                pointFormat: '<b>{point.name}:</b> {point.value}m CO<sub>2</sub>'
            },

            plotOptions: {
                packedbubble: {
                    minSize: '20%',
                    maxSize: '100%',
                    zMin: 0,
                    zMax: 1000,
                    layoutAlgorithm: {
                        gravitationalConstant: 0.05,
                        splitSeries: true,
                        seriesInteraction: false,
                        dragBetweenSeries: true,
                        parentNodeLimit: true
                    },
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}',
                        filter: {
                            property: 'y',
                            operator: '>',
                            value: 250
                        },
                        style: {
                            color: 'black',
                            textOutline: 'none',
                            fontWeight: 'normal'
                        }
                    }
                }
            },

            

            

            series: [{
                name: '2015',
                data: [{
                    name: 'Male',
                    value: male2015
                },
                {
                    name: 'Female',
                    value: female2015
                },
                {
                    name : 'Total',
                    value: total2015
                }]    
            },{
                name: '2016',
                data: [{
                    name: 'Male',
                    value: male2016
                },
                {
                    name: 'Female',
                    value: female2016
                },
                {
                    name : 'Total',
                    value: total2016
                }] 
            },{
                name: '2017',
                data: [{
                    name: 'Male',
                    value: male2017
                },
                {
                    name: 'Female',
                    value: female2017
                },
                {
                    name : 'Total',
                    value: total2017
                }] 
            },{
                name: '2018',
                data: [{
                    name: 'Male',
                    value: male2018
                },
                {
                    name: 'Female',
                    value: female2018
                },
                {
                    name : 'Total',
                    value: total2018
                }] 
            },{
                name: '2019',
                data: [{
                    name: 'Male',
                    value: male2019
                },
                {
                    name: 'Female',
                    value: female2019
                },
                {
                    name : 'Total',
                    value: total2019
                }] 
            },{
                name: '2020',
                data: [{
                    name: 'Male',
                    value: male2020
                },
                {
                    name: 'Female',
                    value: female2020
                },
                {
                    name : 'Total',
                    value: total2020
                }] 
            }
                

            ],
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
                    },
                    pane : {
                        size: '70%'
                    }
                }]
            }

});
 }

 onMount(getData);
</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/highcharts-more.js"></script>
    <script src="https://code.highcharts.com/modules/packedbubble.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
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

</style>
