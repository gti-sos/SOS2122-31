<script>
    import {onMount} from 'svelte';
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";
    let datos = [];
    let fechas = [];
    let nivelPrimario = [];
    let nivelSecundario = [];
    let nivelTerciario = [];
    onMount(loadGraph);
    async function loadGraph(){
        const res = await fetch("/api/v2/registration-stats");
        if(res.ok){
            datos = await res.json();
            console.log(datos);
            console.log(JSON.stringify(datos, null, 2))
            datos.forEach(data => {
                fechas.push(data["country"] + "-" + data.year);
                nivelPrimario.push(data.primarylevel);
                nivelSecundario.push(data.secondarylevel);
                nivelTerciario.push(data.tertiarylevel)
            });
        }else{
            window.alert("No hay datos para este pais");
            console.log("INTERNAL FATAL ERROR");
            window.location.href = `/#/registration-stats`;
        }
        var chart = new CanvasJS.Chart("chartContainer", {
            animationEnabled: true,
            theme: "light2", // "light1", "light2", "dark1", "dark2"
            title: {
                text: "Porcentaje de matriculados en distintos niveles escolares"
            },
            subtitles: [{
                text: "",
                fontSize: 16
            }],
            axisY: {
                prefix: "",
                scaleBreaks: {
                    customBreaks: [{
                        startValue: 10000,
                        endValue: 35000
                    }]
                }
            },
            data: [{
                type: "column",
                 yValueFormatString: "Porcentaje de matriculados: #,##0.00",
                
                dataPoints: [                
                    { label: fechas[0], y: nivelTerciario[0]},
                    { label: fechas[1], y: nivelTerciario[1]},
                    { label: fechas[2], y: nivelTerciario[2]},
                    { label: fechas[3], y: nivelTerciario[3]},
                    { label: fechas[4], y: nivelTerciario[4]},
                    { label: fechas[5], y: nivelTerciario[5]},
                    { label: fechas[6], y: nivelTerciario[6]},
                    { label: fechas[7], y: nivelTerciario[7]},
                    { label: fechas[8], y: nivelTerciario[8]},                    
                ]
            }]
        });
        chart.render();
    
    }
</script>

<svelte:head>
    <script src="https://canvasjs.com/assets/script/canvasjs.min.js"on:load="{loadGraph}"></script>
</svelte:head>

<main> 
    <div id="chartContainer" style="height: 300px; width: 100%;"></div>
    <Button id="back" outline color="secondary" on:click="{pop}"> Atrás</Button>
</main>