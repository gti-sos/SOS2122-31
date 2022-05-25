<script>
    import FusionCharts from "fusioncharts";
    import Charts from "fusioncharts/fusioncharts.charts";
    import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
    import SvelteFC, { fcRoot } from "svelte-fusioncharts";
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";
    import {onMount} from 'svelte';
    import UncontrolledAlert from "sveltestrap/src/UncontrolledAlert.svelte";


    export let params = {};
    //const delay = (ms) => new Promise((res) => setTimeout(res, ms));

    fcRoot(FusionCharts, Charts, FusionTheme);
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));

    let apiData = [];
    let country = params.country;
    let pais = [];
    let year = [];
    let male = [];
    let female = [];
    let total = [];

    let sumaMale = 0;
    let sumaFemale = 0;
    let sumaTotal = 0;
    let totalSuma = 0;
    let malePercent = 0;
    let femalePercent = 0;
    let totalPercent = 0;

    var chartConfigs = {};
    var dataSource = {};
    let errorC = null;


async function getSearch(){
    const res3 = await fetch(`api/v1/proportion-stats`);
        if (res3.ok) {
            const arrayData = await res3.json();
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
            console.log("Male: " + male);
            console.log("Female" + female);
            console.log("Total" + total);
            console.log("Pais " + pais);

            for(let i = 0; i < male.length; i++){
                sumaMale = sumaMale + male[i];
                sumaFemale = sumaFemale + female[i];
                sumaTotal = sumaTotal + total[i];  
            }
            console.log("sumaMale " + sumaMale);
            console.log("sumaFemale " + sumaFemale);
            console.log("sumaTotal " + sumaTotal);

            totalSuma = sumaMale + sumaFemale + sumaTotal;
            console.log("totalSuma " + totalSuma);

            malePercent = sumaMale / totalSuma;
            femalePercent = sumaFemale / totalSuma;
            totalPercent = sumaTotal / totalSuma;

        


            await delay(1000);
            const dataSource = {
                "chart": {
                    "caption": "Late arrivals by reported cause",
                    "subcaption": "Last month",
                    "pyaxisname": "No. of Occurrence",
                    "theme": "fusion",
                    "showsecondarylimits": "0",
                    "showdivlinesecondaryvalue": "0",
                    "plottooltext": "Due to $label, late arrivals count is : <b>$dataValue</b> of the total <b>$sum</b> employees",
                    "drawcrossline": "1"
                },
                "data": [
                    {
                    "label": "2015",
                    "value": "5680"
                    },
                    {
                    "label": "2016",
                    "value": "1036"
                    },
                    {
                    "label": "2017",
                    "value": "950"
                    },
                    {
                    "label": "2018",
                    "value": "500"
                    },
                    {
                    "label": "2019",
                    "value": "140"
                    },
                    {
                    "label": "2020",
                    "value": "68"
                    }
                ]
                };
        
        
        

            loadGraph();
        }else{
            window.alert("No hay datos cargados");
            console.log("INTERNAL FATAL ERROR");
            window.location.href ='/#/proportion-stats';
        }
    }
    
    async function loadGraph(){
        chartConfigs = {
            type: "pareto2d",
            width: 1000,
            height: 600,
            dataFormat: "json",
            dataSource,
        };
    }

        

 onMount(getSearch);


</script>

{#if errorC === 404}
<UncontrolledAlert  color="danger" >
    El país introducido no tiene registros.
</UncontrolledAlert>
{/if}

    <div align="center">
            <h3>Buscar otro País</h3>
            <input
                type="text"
                style="text-align : center;  border-radius: 5px;"
                bind:value={country}
            />
            <Button outline color="success"
                on:click={() => {
                    window.location.href = `/#/energy-consumptions/graph/${country}`;
                    location.reload();
                }}
            >
                Buscar
            </Button>
            <Button outline color="warning" on:click="{()=>{
                pop();
            }}">
            Volver
            </Button>
    </div>
    <div align="left">
        <SvelteFC {...chartConfigs}/>
    </div>
       