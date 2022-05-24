<script>
    import{Nav, NavItem, NavLink } from "sveltestrap";
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
        Highcharts.chart('container', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Browser market shares in January, 2018'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            }
        }
    },
    series: [{
        name: 'Brands',
        colorByPoint: true,
        data: [{
            name: 'Chrome',
            y: 61.41,
            sliced: true,
            selected: true
        }, {
            name: 'Internet Explorer',
            y: 11.84
        }, {
            name: 'Firefox',
            y: 10.85
        }, {
            name: 'Edge',
            y: 4.67
        }, {
            name: 'Safari',
            y: 4.18
        }, {
            name: 'Sogou Explorer',
            y: 1.64
        }, {
            name: 'Opera',
            y: 1.6
        }, {
            name: 'QQ',
            y: 1.2
        }, {
            name: 'Other',
            y: 2.61
        }]
    }]
});
 }

 onMount(getData);
</script>


<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
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
    
    
  
    <div>
        <h1>
          Análiticas de Educación
        </h1>
    </div>

    <div id="first"></div>
    <div id="second"></div>
    <div id="third"></div>
  
    <div>
        <p class="description">
            Gráficos de tarta que muestran los porcentajes de abandono, terminación y gasto gubernamental; respectivamente.
        </p>
    </div>
    
  
    <div>
      {#if !cargados}
        <p class="error">{error}</p>
      {/if}
    </div>
  </main>

  <style>
    main {
        text-align: center;
        padding: 30px;       
    }
    div.nav {
        text-align: left;
    }
    p.error{
      color: red; 
      text-align:center;
      font-size: 20px;
      margin-top:80px;
    }
    
   
  </style>