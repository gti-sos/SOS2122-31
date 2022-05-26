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
    let male = [];
    let female = [];
    let total = [];

    

    let pais2015 = [];
    let pais2016 = [];
    let pais2017 = [];
    let pais2018 = [];
    let pais2019 = [];
    let pais2020 = [];

    let totalJapan = [];



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

                
                
                //pais.push if element.country is not in the list
                if (pais.indexOf(element.country) == -1) {
                    pais.push(element.country);
                }
                console,log(pais);
                if(element.year == "2015"){
                    pais2015.push(element.country);
                    total2015.push(element.total);
                    male2015.push(element.male);
                    female2015.push(element.female);
                }
                if(element.year == "2016"){
                    pais2016.push(element.country);
                    total2016.push(element.total);
                    male2016.push(element.male);
                    female2016.push(element.female);
                }
                if(element.year == "2017"){
                    pais2017.push(element.country);
                    total2017.push(element.total);
                    male2017.push(element.male);
                    female2017.push(element.female);
                }
                if(element.year == "2018"){
                    pais2018.push(element.country);
                    total2018.push(element.total);
                    male2018.push(element.male);
                    female2018.push(element.female);
                }
                if(element.year == "2019"){
                    pais2019.push(element.country);
                    total2019.push(element.total);
                    male2019.push(element.male);
                    female2019.push(element.female);
                }
                if(element.year == "2020"){
                    pais2020.push(element.country);
                    total2020.push(element.total);
                    male2020.push(element.male);
                    female2020.push(element.female);
                }
                

            });
            

            

        
            const dataSource = {
                chart: {
                    caption: "Reach of Social Media Platforms amoung youth",
                    yaxisname: "% of youth on this platform",
                    subcaption: "2012-2016",
                    showhovereffect: "1",
                    numbersuffix: "%",
                    drawcrossline: "1",
                    plottooltext: "<b>$dataValue</b> of youth were on $seriesName",
                    theme: "fusion"
                },
                categories: [
                    {
                    category: [
                        {
                        label: "2015"
                        },
                        {
                        label: "2016"
                        },
                        {
                        label: "2017"
                        },
                        {
                        label: "2018"
                        },
                        {
                        label: "2019"
                        },
                        {
                        label: "2020"
                        }
                    ]
                    }
                ],
                dataset: [
                    {
                    seriesname: "Facebook",
                    data: [
                        {
                        value: "62"
                        },
                        {
                        value: "64"
                        },
                        {
                        value: "64"
                        },
                        {
                        value: "66"
                        },
                        {
                        value: "78"
                        }
                    ]
                    },
                    {
                    seriesname: "Instagram",
                    data: [
                        {
                        value: "16"
                        },
                        {
                        value: "28"
                        },
                        {
                        value: "34"
                        },
                        {
                        value: "42"
                        },
                        {
                        value: "54"
                        }
                    ]
                    },
                    {
                    seriesname: "LinkedIn",
                    data: [
                        {
                        value: "20"
                        },
                        {
                        value: "22"
                        },
                        {
                        value: "27"
                        },
                        {
                        value: "22"
                        },
                        {
                        value: "29"
                        }
                    ]
                    },
                    {
                    seriesname: "Twitter",
                    data: [
                        {
                        value: "18"
                        },
                        {
                        value: "19"
                        },
                        {
                        value: "21"
                        },
                        {
                        value: "21"
                        },
                        {
                        value: "24"
                        }
                    ]
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
       