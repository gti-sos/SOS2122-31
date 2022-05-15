<script>
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";
    
async function loadChart(){
   
    var cartas={};
    var cardTypes = [];
    const resData = await fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php");
    const cardData = await resData.json();  
    console.log(cardData);
    
    cardData.data.forEach((v) =>{
         if(v.type in cartas){
                cartas[v.type] += 1;
            }
            else{
                cartas[v.type]= 1;
            }
        });
    
    for (var key in cartas){
        cardTypes.push([key,cartas[key]]);
    }
    
    Highcharts.chart('container', {
    chart: {
        type: 'pie',
        options3d: {
            enabled: true,
            alpha: 45,
            beta: 0
        }
    },
    title: {
        text: 'Cartas de Yu-Gi-Oh'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            depth: 35,
            dataLabels: {
                enabled: true,
                format: '{point.name}'
            }
        }
    },
    series: [{
        name: 'Porcentaje de cartas',
        data: cardTypes
    }]
});
}
</script>
<svelte:head>
  <script src="https://code.highcharts.com/highcharts.js" on:load={loadChart}></script>
  <script src="https://code.highcharts.com/highcharts-3d.js"></script>
  <script src="https://code.highcharts.com/modules/exporting.js"></script>
  <script src="https://code.highcharts.com/modules/export-data.js"></script>
  <script src="https://code.highcharts.com/modules/accessibility.js"></script>
</svelte:head>

<main>
  <figure class="highcharts-figure">
  <div id ="container"></div>
  <p class="highcharts-description">
      Gráfico de tarta 3D que muestra la cantidad de cartas de YU-GI-OH segun su tipo.
  </p>
  </figure>
    <Button id="back" outline color="secondary" on:click="{pop}"> Atrás</Button>
</main>

<style>
#container {
    height: 600px;
    width: 900px;
}
.highcharts-figure {
    min-width: 350px;
    max-width: 900px;
    margin: 1em auto;
}
</style>