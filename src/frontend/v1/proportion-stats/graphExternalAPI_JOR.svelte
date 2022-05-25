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
    let difficulty = [];
    let assasin = [];
    let tank = [];
    let fighter = [];
    let mage = [];
    let marksman = [];
    let support = [];
    let apiData2 = [];
    let attack = [];
    let defense = [];
    let magic = [];

    
    async function getData(){
        const res = await fetch('https://ddragon.leagueoflegends.com/cdn/12.9.1/data/en_US/champion.json');
        if (res.ok){
            const arrayData = await res.json();
            apiData = await (JSON.stringify(arrayData.data));
            apiData2 = await (JSON.parse(apiData));

            console.log("api data : " + apiData);
            console.log("api data 2 : " + apiData2);

            for (let i in apiData2){
                name.push(apiData2[i].name);
                tags.push(apiData2[i].tags);
                partype.push(apiData2[i].partype);
                difficulty.push(apiData2[i].info.difficulty);
                attack.push(apiData2[i].info.attack);
                defense.push(apiData2[i].info.defense);
                magic.push(apiData2[i].info.magic);
                if(apiData2[i].tags.includes("Assassin")){
                    assasin.push(apiData2[i].name);
                }
                if(apiData2[i].tags.includes("Fighter")){
                    fighter.push(apiData2[i].name);
                }
                if(apiData2[i].tags.includes("Mage")){
                    mage.push(apiData2[i].name);
                }
                if(apiData2[i].tags.includes("Marksman")){
                    marksman.push(apiData2[i].name);
                }
                if(apiData2[i].tags.includes("Support")){
                    support.push(apiData2[i].name);
                }
                if(apiData2[i].tags.includes("Tank")){
                    tank.push(apiData2[i].name);
                }
                
            }

            console.log("data : " + data);
            loadGraph();

        }
        else{
            window.alert("No hay datos cargados en" + window.location.href );
            console.log("INTERNAL FATAL ERROR en" + window.location.href);
            
        }

    }


    
    async function loadGraph(){
        google.charts.load('current', {'packages':['corechart']});

        function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['Name', 'Diffculty'],
          [ name,      difficulty]
        ]);

        var options = {
          title: 'Age vs. Weight comparison',
          hAxis: {title: 'Name', minValue: 0, maxValue: 15},
          vAxis: {title: 'Difficulty', minValue: 0, maxValue: 15},
          legend: 'none'
        };

        var chart = new google.visualization.ScatterChart(document.getElementById('columnchart_material'));

        chart.draw(data, options);
      }


        google.charts.setOnLoadCallback(drawChart);

    }    
    
onMount(getData);


   
</script>

<svelte:head>
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"on:load="{loadGraph}"></script>    
</svelte:head>

<main>
    <div div id="columnchart_material" style="width: 1800px; height: 500px;"></div>
</main>

