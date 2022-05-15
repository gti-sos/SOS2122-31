<script>
    import Button from "sveltestrap/src/Button.svelte";
    import Highcharts from "highcharts";
    import { pop } from "svelte-spa-router";
    let datos = [];
    let datos1 = [];
    let fechas = [];
    let kg = [];
    let tot = [];
    let tpc = [];
    let nivelPrimario = [];
    let nivelSecundario = [];
    let nivelTerciario = [];

    async function loadGraph(){
        const res = await fetch("https://sos2122-22.herokuapp.com/api/v2/co2-stats");
        const res1 = await fetch("/api/v2/registration-stats");
        if(res.ok){
            datos = await res.json();
            console.log(datos);
            console.log(JSON.stringify(datos, null, 2))
            datos.forEach(data => {
                fechas.push(data["country"] + "-" + data.year);
                tot.push(data.co2_tot);
                kg.push(data.co2_kg);
                tpc.push(data.co2_tpc)})
            datos1 = await res1.json();
            console.log(datos1);
            console.log(JSON.stringify(datos1, null, 2))
            datos1.forEach(data => {
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
        Highcharts.chart('container', {
    chart: {
        type: 'bar'
    },
    title: {
        text: 'Gráfico de barras sobre CO2 por pais y año'
    },
    xAxis: {
        categories: fechas,
        title: {
            text: 'Ciudad-Año'
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Percentage',
            align: 'high'
        },
        labels: {
            overflow: 'justify'
        }
    },
    tooltip:{
        split: true,
        valueSuffix: "",
    },
    plotOptions: {
        bar: {
            dataLabels: {
                enabled: true
            }
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -70,
        y: 90,
        floating: true,
        borderWidth: 1,
        backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
        shadow: true
    },
    credits: {
        enabled: false
    },
    series: [{
        name: 'tot',
        data: tot,
    },{
        name: 'kg',
        data: kg,
    },{
        name: 'tpc',
        data: tpc,
    },{
        name: 'Nivel Primario',
        data: nivelPrimario,
    },{
        name: 'Nivel Secundario',
        data: nivelSecundario,
    },{
        name: 'Nivel Terciario',
        data: nivelTerciario,
    }],
    });
  }
</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/series-label.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"  on:load="{loadGraph}"></script>
</svelte:head>

<main>        
    <br>
    <br>
    <Button id="back" outline color="secondary" on:click="{pop}"> Atrás</Button>
        <div style="margin:auto;"> 
        <figure class="highcharts-figure">
            <div id="container"></div>
            <p class="highcharts-description">
               Gráfico de barras sobre CO2 por pais y año de Jesus Vena Grupo 22 mezclado con la mia.
            </p>
        </figure>  
    </main>
    
    
    <style>
        .highcharts-figure {
          min-width: 100%;
          max-width:100%;
          margin: 1em auto;
        }
        #container {
          height: 600px;
        }
        
    </style>