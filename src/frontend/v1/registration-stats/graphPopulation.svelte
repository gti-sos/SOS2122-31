<script>
    import Button from "sveltestrap/src/Button.svelte";
    import Highcharts from "highcharts";

    let datos = [];
    let datos1 = [];
    let fechas = [];
    let death_rate = [];
    let life_expectancy_birth = [];
    let birth_rate = [];
    let nivelPrimario = [];
    let nivelSecundario = [];
    let nivelTerciario = [];

    async function loadGraph(){
        const res = await fetch("https://sos2122-10.herokuapp.com/api/v2/population-levels");
        const res1 = await fetch("/api/v2/registration-stats");
        if(res.ok){
            datos = await res.json();
            console.log(datos);
            console.log(JSON.stringify(datos, null, 2))
            datos.forEach(data => {
                fechas.push(data["country"] + "-" + data.year);
                death_rate.push(data.death_rate);
                life_expectancy_birth.push(data.life_expectancy_birth);
                birth_rate.push(data.birth_rate)})
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
        text: ' Gráfico de barras sobre poblacion por pais y año'
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
        name: 'death_rate',
        data: death_rate,
    },{
        name: 'life_expectancy_birth',
        data: life_expectancy_birth,
    },{
        name: 'birth_rate',
        data: birth_rate,
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
    <Button id='back' outline color="secondary" onclick="window.location.href='#/registration-stats'">Volver</Button>
        <div style="margin:auto;"> 
        <figure class="highcharts-figure">
            <div id="container"></div>
            <p class="highcharts-description">
               Gráfico de barras sobre poblacion por pais y año de Alejandro Molino Grupo 10 mezclado con la mia.
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