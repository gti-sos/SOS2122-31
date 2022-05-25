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
    let assasin = [];
    let tank = [];
    let fighter = [];
    let mage = [];
    let marksman = [];
    let support = [];
    let apiData2 = [];
    let attackAssasin = [];
    let attackTank = [];
    let attackFighter = [];
    let attackMage = [];
    let attackMarksman = [];
    let attackSupport = [];
    let defenseAssasin = [];
    let defenseTank = [];
    let defenseFighter = [];
    let defenseMage = [];
    let defenseMarksman = [];
    let defenseSupport = [];
    let magicAssasin = [];
    let magicTank = [];
    let magicFighter = [];
    let magicMage = [];
    let magicMarksman = [];
    let magicSupport = [];
    let difficultyAssasin = [];
    let difficultyTank = [];
    let difficultyFighter = [];
    let difficultyMage = [];
    let difficultyMarksman = [];
    let difficultySupport = [];
    let mediaAssasin = [];
    let mediaTank = [];
    let mediaFighter = [];
    let mediaMage = [];
    let mediaMarksman = [];
    let mediaSupport = [];


    
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

                if(apiData2[i].tags.includes("Assassin")){
                    attackAssasin.push(apiData2[i].info.attack);
                }
                if(apiData2[i].tags.includes("Fighter")){
                    attackFighter.push(apiData2[i].info.attack);
                }
                if(apiData2[i].tags.includes("Mage")){
                    attackMage.push(apiData2[i].info.attack);
                }
                if(apiData2[i].tags.includes("Marksman")){
                    attackMarksman.push(apiData2[i].info.attack);
                }
                if(apiData2[i].tags.includes("Support")){
                    attackSupport.push(apiData2[i].info.attack);
                }
                if(apiData2[i].tags.includes("Tank")){
                    attackTank.push(apiData2[i].info.attack);
                }

                if(apiData2[i].tags.includes("Assassin")){
                    defenseAssasin.push(apiData2[i].info.defense);
                }
                if(apiData2[i].tags.includes("Fighter")){
                    defenseFighter.push(apiData2[i].info.defense);
                }
                if(apiData2[i].tags.includes("Mage")){
                    defenseMage.push(apiData2[i].info.defense);
                }
                if(apiData2[i].tags.includes("Marksman")){
                    defenseMarksman.push(apiData2[i].info.defense);
                }
                if(apiData2[i].tags.includes("Support")){
                    defenseSupport.push(apiData2[i].info.defense);
                }
                if(apiData2[i].tags.includes("Tank")){
                    defenseTank.push(apiData2[i].info.defense);
                }

                if(apiData2[i].tags.includes("Assassin")){
                    magicAssasin.push(apiData2[i].info.magic);
                }
                if(apiData2[i].tags.includes("Fighter")){
                    magicFighter.push(apiData2[i].info.magic);
                }
                if(apiData2[i].tags.includes("Mage")){
                    magicMage.push(apiData2[i].info.magic);
                }
                if(apiData2[i].tags.includes("Marksman")){
                    magicMarksman.push(apiData2[i].info.magic);
                }
                if(apiData2[i].tags.includes("Support")){
                    magicSupport.push(apiData2[i].info.magic);
                }
                if(apiData2[i].tags.includes("Tank")){
                    magicTank.push(apiData2[i].info.magic);
                }

                if(apiData2[i].tags.includes("Assassin")){
                    difficultyAssasin.push(apiData2[i].info.difficulty);
                }
                if(apiData2[i].tags.includes("Fighter")){
                    difficultyFighter.push(apiData2[i].info.difficulty);
                }
                if(apiData2[i].tags.includes("Mage")){
                    difficultyMage.push(apiData2[i].info.difficulty);
                }
                if(apiData2[i].tags.includes("Marksman")){
                    difficultyMarksman.push(apiData2[i].info.difficulty);
                }
                if(apiData2[i].tags.includes("Support")){
                    difficultySupport.push(apiData2[i].info.difficulty);
                }
                if(apiData2[i].tags.includes("Tank")){
                    difficultyTank.push(apiData2[i].info.difficulty);
                }
                

                
            }
            let countAssasin = 0;
            let countFighter = 0;
            let countMage = 0;
            let countMarksman = 0;
            let countSupport = 0;
            let countTank = 0;

            attackAssasin.forEach((v)=>{
                mediaAssasin.push((v + defenseAssasin[countAssasin] +  magicAssasin[countAssasin])/3);
            });
            attackFighter.forEach((v)=>{
                mediaFighter.push((v + defenseFighter[countFighter] +  magicFighter[countFighter])/3);
            });
            attackMage.forEach((v)=>{
                mediaMage.push((v + defenseMage[countMage] +  magicMage[countMage])/3);
            });
            attackMarksman.forEach((v)=>{
                mediaMarksman.push((v + defenseMarksman[countMarksman] +  magicMarksman[countMarksman])/3);
            });
            attackSupport.forEach((v)=>{
                mediaSupport.push((v + defenseSupport[countSupport] +  magicSupport[countSupport])/3);
            });
            attackTank.forEach((v)=>{
                mediaTank.push((v + defenseTank[countTank] +  magicTank[countTank])/3);
            });

            

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
        google.charts.load('current', {'packages':['treemap']});


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

      function drawchart2(){
        var data = google.visualization.arrayToDataTable([
          ['Location', 'Parent', 'Market trade volume (size)', 'Market increase/decrease (color)'],
          ['Global',    null,                 0,                               0],
          ['Assasin',   'Global',             assasin.length,                               0],
          ['Tank',    'Global',             tank.length,                               0],
          ['Fighter',      'Global',             fighter.length,                               0],
          ['Mage', 'Global',             mage.length,                               0],
          ['Marksman',    'Global',             marksman.length,                               0],
          ['Support', 'Global', support.length, 0],
          ['Akshan', 'Marksman', mediaMarksman[1], difficultyMarksman[1]],
          ['Aphelios', 'Marksman', mediaMarksman[2], difficultyMarksman[2]],
          ['Ashe', 'Marksman', mediaMarksman[3], difficultyMarksman[3]],
          ['Azir', 'Marksman', mediaMarksman[4], difficultyMarksman[4]],
          ['Caitlyn', 'Marksman', mediaMarksman[5], difficultyMarksman[5]],
          ['Corki', 'Marksman', mediaMarksman[6], difficultyMarksman[6]],
          ['Draven', 'Marksman', mediaMarksman[7], difficultyMarksman[7]],
          ['Ezreal', 'Marksman', mediaMarksman[8], difficultyMarksman[8]],
          ['Graves', 'Marksman', mediaMarksman[9], difficultyMarksman[9]],
          ['Jayce', 'Marksman', mediaMarksman[10], difficultyMarksman[10]],
          ['Jhin', 'Marksman', mediaMarksman[11], difficultyMarksman[11]],
          ['Jinx', 'Marksman', mediaMarksman[12], difficultyMarksman[12]],
          ['Kai Sa', 'Marksman', mediaMarksman[13], difficultyMarksman[13]],
          ['Kalista', 'Marksman', mediaMarksman[14], difficultyMarksman[14]],
          ['Kennen', 'Marksman', mediaMarksman[15], difficultyMarksman[15]],
          ['Kindred', 'Marksman', mediaMarksman[16], difficultyMarksman[16]],
          ['Kog Maw', 'Marksman', mediaMarksman[17], difficultyMarksman[17]],
          ['Lucian', 'Marksman', mediaMarksman[18], difficultyMarksman[18]],
          ['Miss Fortune', 'Marksman', mediaMarksman[19], difficultyMarksman[19]],
          ['Quinn', 'Marksman', mediaMarksman[20], difficultyMarksman[20]],
          ['Samira', 'Marksman', mediaMarksman[21], difficultyMarksman[21]],
          ['Sivir', 'Marksman', mediaMarksman[23], difficultyMarksman[23]],
          ['Teemo', 'Marksman', mediaMarksman[24], difficultyMarksman[24]],
          ['Tristana', 'Marksman', mediaMarksman[25], difficultyMarksman[25]],
          ['Twitch', 'Marksman', mediaMarksman[26], difficultyMarksman[26]],
          ['Varus', 'Marksman', mediaMarksman[27], difficultyMarksman[27]],
          ['Vayne', 'Marksman', mediaMarksman[28], difficultyMarksman[28]],
          ['Xayah', 'Marksman', mediaMarksman[29], difficultyMarksman[29]],
          ['Zeri', 'Marksman', mediaMarksman[30], difficultyMarksman[30]],

          ['Alistar', 'Support', mediaSupport[1], difficultySupport[1]],
          ['Anivia', 'Support', mediaSupport[2], difficultySupport[2]],
          ['Bard', 'Support', mediaSupport[4], difficultySupport[4]],
          ['Braum', 'Support', mediaSupport[5], difficultySupport[5]],
          ['Fiddlesticks', 'Support', mediaSupport[6], difficultySupport[6]],
          ['Heimerdinger', 'Support', mediaSupport[7], difficultySupport[7]],
          ['Ivern', 'Support', mediaSupport[8], difficultySupport[8]],
          ['Janna', 'Support', mediaSupport[9], difficultySupport[9]],
          ['Karma', 'Support', mediaSupport[10], difficultySupport[10]],
          ['Kayle', 'Support', mediaSupport[11], difficultySupport[11]],
          ['Leona', 'Support', mediaSupport[12], difficultySupport[12]],
          ['Lulu', 'Support', mediaSupport[13], difficultySupport[13]],
          ['Lux', 'Support', mediaSupport[14], difficultySupport[14]],
          ['Morgana', 'Support', mediaSupport[15], difficultySupport[15]],
          ['Nami', 'Support', mediaSupport[16], difficultySupport[16]],
          ['Neeko', 'Support', mediaSupport[17], difficultySupport[17]],
          ['Orianna', 'Support', mediaSupport[18], difficultySupport[18]],
          ['Pyke', 'Support', mediaSupport[19], difficultySupport[19]],
          ['Rakan', 'Support', mediaSupport[20], difficultySupport[20]],
          ['Renata Glasc', 'Support', mediaSupport[21], difficultySupport[21]],
          ['Senna', 'Support', mediaSupport[22], difficultySupport[22]],
          ['Seraphine', 'Support', mediaSupport[23], difficultySupport[23]],
          ['Sona', 'Support', mediaSupport[24], difficultySupport[24]],
          ['Soraka', 'Support', mediaSupport[25], difficultySupport[25]],
          ['Syndra', 'Support', mediaSupport[26], difficultySupport[26]],
          ['Tahm Kench', 'Support', mediaSupport[27], difficultySupport[27]],
          ['Taliyah', 'Support', mediaSupport[28], difficultySupport[28]],
          ['Taric', 'Support', mediaSupport[29], difficultySupport[29]],
          ['Thresh', 'Support', mediaSupport[30], difficultySupport[30]],
          ['Yuumi', 'Support', mediaSupport[31], difficultySupport[31]],
          ['Zilean', 'Support', mediaSupport[32], difficultySupport[32]],
          ['Zoe', 'Support', mediaSupport[33], difficultySupport[33]],
          ['Zyra', 'Support', mediaSupport[34], difficultySupport[34]]



          

          
        ]);

        var tree = new google.visualization.TreeMap(document.getElementById('columnchart_material2'));

        tree.draw(data, {
          minColor: '#f00',
          midColor: '#ddd',
          maxColor: '#0d0',
          headerHeight: 15,
          fontColor: 'black',
          showScale: true
        });


        
      }


        google.charts.setOnLoadCallback(drawChart);
        google.charts.setOnLoadCallback(drawchart2);

    }    
    
onMount(getData);


   
</script>

<svelte:head>
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"on:load="{loadGraph}"></script>    
</svelte:head>

<main>
    <div div id="columnchart_material" style="width: 1800px; height: 500px;"></div>
    <div id="columnchart_material2" style="width: 900px; height: 500px;"></div>


</main>

