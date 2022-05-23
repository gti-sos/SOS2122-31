<script>
    import Button from "sveltestrap/src/Button.svelte";
    import Highcharts from "highcharts";
    import { pop } from "svelte-spa-router";
    import { onMount } from "svelte";

    let apiData = [];
    let data = [];
    let name = [];
    let tags = [];
    let partype = [];
    let dificulty = {};
    let assasin = [];
    let tank = [];
    let fighter = [];
    let mage = [];
    let marksman = [];
    let support = [];


    
    async function getData(){
        const res = await fetch('https://ddragon.leagueoflegends.com/cdn/12.9.1/data/en_US/champion.json');
        if (res.ok){
            const arrayData = await res.json();
            apiData = await (arrayData);
            console.log("api data : " + apiData);

            data = await (apiData.data);
            console.log("Data recieved :" + data.length);

            getLists();

        }
        else{
            window.alert("No hay datos cargados en" + window.location.href );
            console.log("INTERNAL FATAL ERROR en" + window.location.href);
            
        }

    }


    async function getLists(){
        data.forEach(v =>{
            name.push(v.name);
            tags.push(v.tags);
            partype.push(v.partype);
            
            if(v.tags.includes("Assassin")){
                assasin.push(v.name);
            }
            if(v.tags.includes("Fighter")){
                fighter.push(v.name);
            }
            if(v.tags.includes("Mage")){
                mage.push(v.name);
            }
            if(v.tags.includes("Marksman")){
                marksman.push(v.name);
            }
            if(v.tags.includes("Support")){
                support.push(v.name);
            }
            if(v.tags.includes("Tank")){
                tank.push(v.name);
            }
            //use v.name as key and v.info.difficulty as value
            dificulty[v.name] = v.info.difficulty;

        })
        loadGraph();
    }

    async function loadGraph(){
        Highcharts.chart('container',{
            chart: {
                type: 'packedbubble',
                height: '100%'
            },
            title: {
                text: 'Proportion of champions by type'
            },
            tooltip: {
                useHTML: true,
                pointFormat: '<b>{point.name}:</b> {point.value}dificulty'
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
            },
            series: [{
                name: 'Assasin',
                data: [assasin.forEach((v) => {
                    return {
                        name: v,
                        value: dificulty[v]
                    }
                })]
            },{
                name: 'Fighter',
                data: [fighter.forEach((v) => {
                    return {
                        name: v, 
                        value: dificulty[v]
                    }
                })]
            },{
                name: 'Mage',
                data: [mage.forEach((v) => {
                    return {
                        name: v, 
                        value: dificulty[v]
                    }
                })]
            },{
                name: 'Marksman',
                data: [marksman.forEach((v) => {
                    return {
                        name: v, 
                        value: dificulty[v]
                    }
                })]
            },{
                name: 'Support',
                data: [support.forEach((v) => {
                    return {
                        name: v, 
                        value: dificulty[v]
                    }
                })]
            },{
                name: 'Tank',
                data: [tank.forEach((v) => {
                    return {
                        name: v, 
                        value: dificulty[v]
                    }
                })]
            }]


        });
    }
    
onMount(getData);


   
</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js" on:load="{loadGraph}" ></script>
    <script src="https://code.highcharts.com/highcharts-more.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
</svelte:head>

<main>
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
            This chart shows the champs for each role and the partype of each champ.
        </p>
    </figure>
    <Button id="back" outline color="secondary" on:click="{pop}"> Atrás</Button>

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