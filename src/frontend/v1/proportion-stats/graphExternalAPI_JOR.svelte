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
    let bloodWell = 0;
    let mana = 0;
    let energy = 0;
    let courage = 0;
    let shield = 0;
    let rage = 0;
    let fury = 0;
    let ferocity = 0;
    let none = 0;
    let heat = 0;
    let grit = 0;
    let crimsonRush = 0;
    let flow = 0;


    
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
            

            for (let i in partype){
                if(partype[i] == "Blood Well"){
                    bloodWell++;
                }
                if(partype[i] == "Mana"){
                    mana++;
                }
                if(partype[i] == "Energy"){
                    energy++;
                }
                if(partype[i] == "Courage"){
                    courage++;
                }
                if(partype[i] == "Shield"){
                    shield++;
                }
                if(partype[i] == "Rage"){
                    rage++;
                }
                if(partype[i] == "Fury"){
                    fury++;
                }
                if(partype[i] == "Ferocity"){
                    ferocity++;
                }
                if(partype[i] == "None"){
                    none++;
                }
                if(partype[i] == "Heat"){
                    heat++;
                }
                if(partype[i] == "Grit"){
                    grit++;
                }
                if(partype[i] == "Crimson Rush"){
                    crimsonRush++;
                }
                if(partype[i] == "Flow"){
                    flow++;
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
                ['Recurso', 'Número de campeones que lo usan'],
                ['Blood Well', bloodWell],
                ['Mana', mana],
                ['Energy', energy],
                ['Courage', courage],
                ['Shield', shield],
                ['Rage', rage],
                ['Fury', fury],
                ['Ferocity', ferocity],
                ['None', none],
                ['Heat', heat],
                ['Grit', grit],
                ['Crimson Rush', crimsonRush],
                ['Flow', flow]
            ]);

            var options = {
                title: 'Campeones por tipo de recurso',
                pieHole: 0.4,
                legend: { position: 'labeled' },
                slices: {
                    3: { offset: 0.2 },
                    4: { offset: 0.3 },
                    5: { offset: 0.4 },
                    7: { offset: 0.5 },
                    9: { offset: 0.6 },
                    10: { offset: 0.2 },
                    11: { offset: 0.3 },
                    12: { offset: 0.4 },
                    0: { offset: 0.5, color: 'red' },
                    1: { color : 'blue'},
                },
                backgroundColor: '#dccbab',
            };

            var chart = new google.visualization.PieChart(document.getElementById('columnchart_material'));

            chart.draw(data, options);
            
      }

      function drawchart2(){
        var data = google.visualization.arrayToDataTable([
          ['Location', 'Parent', 'Attack, Magic, Defense media (tamaño)', 'Difficulty (color)'],
          ['Rol',    null,                 0,                               0],
          ['Assasin',   'Rol',             assasin.length,                               0],
          ['Tank',    'Rol',             tank.length,                               0],
          ['Fighter',      'Rol',             fighter.length,                               0],
          ['Mage', 'Rol',             mage.length,                               0],
          ['Marksman',    'Rol',             marksman.length,                               0],
          ['Support', 'Rol', support.length, 0],

          [marksman[0], 'Marksman', mediaMarksman[0], difficultyMarksman[0]],
            [marksman[2], 'Marksman', mediaMarksman[2], difficultyMarksman[2]],
            [marksman[4], 'Marksman', mediaMarksman[4], difficultyMarksman[4]],
            [marksman[5], 'Marksman', mediaMarksman[5], difficultyMarksman[5]],
            [marksman[6], 'Marksman', mediaMarksman[6], difficultyMarksman[6]],
            [marksman[7], 'Marksman', mediaMarksman[7], difficultyMarksman[7]],
            [marksman[8], 'Marksman', mediaMarksman[8], difficultyMarksman[8]],
            [marksman[10], 'Marksman', mediaMarksman[10], difficultyMarksman[10]],
            [marksman[11], 'Marksman', mediaMarksman[11], difficultyMarksman[11]],
            [marksman[12], 'Marksman', mediaMarksman[12], difficultyMarksman[12]],
            [marksman[13], 'Marksman', mediaMarksman[13], difficultyMarksman[13]],
            [marksman[15], 'Marksman', mediaMarksman[15], difficultyMarksman[15]],
            [marksman[16], 'Marksman', mediaMarksman[16], difficultyMarksman[16]],
            [marksman[17], 'Marksman', mediaMarksman[17], difficultyMarksman[17]],
            [marksman[18], 'Marksman', mediaMarksman[18], difficultyMarksman[18]],
            [marksman[19], 'Marksman', mediaMarksman[19], difficultyMarksman[19]],
            [marksman[20], 'Marksman', mediaMarksman[20], difficultyMarksman[20]],
            [marksman[21], 'Marksman', mediaMarksman[21], difficultyMarksman[21]],
            [marksman[23], 'Marksman', mediaMarksman[23], difficultyMarksman[23]],
            [marksman[24], 'Marksman', mediaMarksman[24], difficultyMarksman[24]],
            [marksman[25], 'Marksman', mediaMarksman[25], difficultyMarksman[25]],
            [marksman[26], 'Marksman', mediaMarksman[26], difficultyMarksman[26]],
            [marksman[27], 'Marksman', mediaMarksman[27], difficultyMarksman[27]],
            [marksman[28], 'Marksman', mediaMarksman[28], difficultyMarksman[28]],
            [marksman[29], 'Marksman', mediaMarksman[29], difficultyMarksman[29]],
            [marksman[30], 'Marksman', mediaMarksman[30], difficultyMarksman[30]],

            [support[0], 'Support', mediaSupport[0], difficultySupport[0]],
            [support[3], 'Support', mediaSupport[3], difficultySupport[3]],
            [support[4], 'Support', mediaSupport[4], difficultySupport[4]],
            [support[7], 'Support', mediaSupport[7], difficultySupport[7]],
            [support[8], 'Support', mediaSupport[8], difficultySupport[8]],
            [support[9], 'Support', mediaSupport[9], difficultySupport[9]],
            [support[10], 'Support', mediaSupport[10], difficultySupport[10]],
            [support[11], 'Support', mediaSupport[11], difficultySupport[11]],
            [support[12], 'Support', mediaSupport[12], difficultySupport[12]],
            [support[14], 'Support', mediaSupport[14], difficultySupport[14]],
            [support[15], 'Support', mediaSupport[15], difficultySupport[15]],
            [support[16], 'Support', mediaSupport[16], difficultySupport[16]],
            [support[18], 'Support', mediaSupport[18], difficultySupport[18]],
            [support[19], 'Support', mediaSupport[19], difficultySupport[19]],
            [support[20], 'Support', mediaSupport[20], difficultySupport[20]],
            [support[22], 'Support', mediaSupport[22], difficultySupport[22]],
            [support[23], 'Support', mediaSupport[23], difficultySupport[23]],
            [support[24], 'Support', mediaSupport[24], difficultySupport[24]],
            [support[26], 'Support', mediaSupport[26], difficultySupport[26]],
            [support[28], 'Support', mediaSupport[28], difficultySupport[28]],
            [support[29], 'Support', mediaSupport[29], difficultySupport[29]],
            [support[30], 'Support', mediaSupport[30], difficultySupport[30]],
            [support[31], 'Support', mediaSupport[31], difficultySupport[31]],
            [support[33], 'Support', mediaSupport[33], difficultySupport[33]],

            [assasin[0], 'Assasin', mediaAssasin[0], difficultyAssasin[0]],
            [assasin[1], 'Assasin', mediaAssasin[1], difficultyAssasin[1]],
            [assasin[3], 'Assasin', mediaAssasin[3], difficultyAssasin[3]],
            [assasin[4], 'Assasin', mediaAssasin[4], difficultyAssasin[4]],
            [assasin[6], 'Assasin', mediaAssasin[6], difficultyAssasin[6]],
            [assasin[7], 'Assasin', mediaAssasin[7], difficultyAssasin[7]],
            [assasin[11], 'Assasin', mediaAssasin[11], difficultyAssasin[11]],
            [assasin[13], 'Assasin', mediaAssasin[13], difficultyAssasin[13]],
            [assasin[14], 'Assasin', mediaAssasin[14], difficultyAssasin[14]],
            [assasin[17], 'Assasin', mediaAssasin[17], difficultyAssasin[17]],
            [assasin[18], 'Assasin', mediaAssasin[18], difficultyAssasin[18]],
            [assasin[19], 'Assasin', mediaAssasin[19], difficultyAssasin[19]],
            [assasin[22], 'Assasin', mediaAssasin[22], difficultyAssasin[22]],
            [assasin[24], 'Assasin', mediaAssasin[24], difficultyAssasin[24]],
            [assasin[25], 'Assasin', mediaAssasin[25], difficultyAssasin[25]],
            [assasin[26], 'Assasin', mediaAssasin[26], difficultyAssasin[26]],
            [assasin[27], 'Assasin', mediaAssasin[27], difficultyAssasin[27]],
            [assasin[28], 'Assasin', mediaAssasin[28], difficultyAssasin[28]],
            [assasin[35], 'Assasin', mediaAssasin[35], difficultyAssasin[35]],
            [assasin[36], 'Assasin', mediaAssasin[36], difficultyAssasin[36]],
            [assasin[37], 'Assasin', mediaAssasin[37], difficultyAssasin[37]],
            [assasin[38], 'Assasin', mediaAssasin[38], difficultyAssasin[38]],
            [assasin[39], 'Assasin', mediaAssasin[39], difficultyAssasin[39]],

          [fighter[0], 'Fighter', mediaFighter[0], difficultyFighter[0]],
            [fighter[2], 'Fighter', mediaFighter[2], difficultyFighter[2]],
            [fighter[3], 'Fighter', mediaFighter[3], difficultyFighter[3]],
            [fighter[8], 'Fighter', mediaFighter[8], difficultyFighter[8]],
            [fighter[10], 'Fighter', mediaFighter[10], difficultyFighter[10]],
            [fighter[11], 'Fighter', mediaFighter[11], difficultyFighter[11]],
            [fighter[12], 'Fighter', mediaFighter[12], difficultyFighter[12]],
            [fighter[15], 'Fighter', mediaFighter[15], difficultyFighter[15]],
            [fighter[16], 'Fighter', mediaFighter[16], difficultyFighter[16]],
            [fighter[17], 'Fighter', mediaFighter[17], difficultyFighter[17]],
            [fighter[18], 'Fighter', mediaFighter[18], difficultyFighter[18]],
            [fighter[19], 'Fighter', mediaFighter[19], difficultyFighter[19]],
            [fighter[20], 'Fighter', mediaFighter[20], difficultyFighter[20]],
            [fighter[22], 'Fighter', mediaFighter[22], difficultyFighter[22]],
            [fighter[23], 'Fighter', mediaFighter[23], difficultyFighter[23]],
            [fighter[24], 'Fighter', mediaFighter[24], difficultyFighter[24]],
            [fighter[28], 'Fighter', mediaFighter[28], difficultyFighter[28]],
            [fighter[29], 'Fighter', mediaFighter[29], difficultyFighter[29]],
            [fighter[30], 'Fighter', mediaFighter[30], difficultyFighter[30]],
            [fighter[34], 'Fighter', mediaFighter[34], difficultyFighter[34]],
            [fighter[36], 'Fighter', mediaFighter[36], difficultyFighter[36]],
            [fighter[40], 'Fighter', mediaFighter[40], difficultyFighter[40]],
            [fighter[41], 'Fighter', mediaFighter[41], difficultyFighter[41]],
            [fighter[47], 'Fighter', mediaFighter[47], difficultyFighter[47]],
            [fighter[48], 'Fighter', mediaFighter[48], difficultyFighter[48]],
            [fighter[49], 'Fighter', mediaFighter[49], difficultyFighter[49]],
            [fighter[55], 'Fighter', mediaFighter[55], difficultyFighter[55]],
            [fighter[56], 'Fighter', mediaFighter[56], difficultyFighter[56]],
            [fighter[57], 'Fighter', mediaFighter[57], difficultyFighter[57]],
            [fighter[58], 'Fighter', mediaFighter[58], difficultyFighter[58]],
            [fighter[59], 'Fighter', mediaFighter[59], difficultyFighter[59]],
            [fighter[61], 'Fighter', mediaFighter[61], difficultyFighter[61]],
            [fighter[62], 'Fighter', mediaFighter[62], difficultyFighter[62]],
            [fighter[66], 'Fighter', mediaFighter[66], difficultyFighter[66]],

            [mage[2], 'Mage', mediaMage[2], difficultyMage[2]],
            [mage[3], 'Mage', mediaMage[3], difficultyMage[3]],
            [mage[4], 'Mage', mediaMage[4], difficultyMage[4]],
            [mage[5], 'Mage', mediaMage[5], difficultyMage[5]],
            [mage[7], 'Mage', mediaMage[7], difficultyMage[7]],
            [mage[8], 'Mage', mediaMage[8], difficultyMage[8]],
            [mage[11], 'Mage', mediaMage[11], difficultyMage[11]],
            [mage[14], 'Mage', mediaMage[14], difficultyMage[14]],
            [mage[15], 'Mage', mediaMage[15], difficultyMage[15]],
            [mage[16], 'Mage', mediaMage[16], difficultyMage[16]],
            [mage[17], 'Mage', mediaMage[17], difficultyMage[17]],
            [mage[22], 'Mage', mediaMage[22], difficultyMage[22]],
            [mage[23], 'Mage', mediaMage[23], difficultyMage[23]],
            [mage[25], 'Mage', mediaMage[25], difficultyMage[25]],
            [mage[28], 'Mage', mediaMage[28], difficultyMage[28]],
            [mage[29], 'Mage', mediaMage[29], difficultyMage[29]],
            [mage[31], 'Mage', mediaMage[31], difficultyMage[31]],
            [mage[32], 'Mage', mediaMage[32], difficultyMage[32]],
            [mage[38], 'Mage', mediaMage[38], difficultyMage[38]],
            [mage[40], 'Mage', mediaMage[40], difficultyMage[40]],
            [mage[41], 'Mage', mediaMage[41], difficultyMage[41]],
            [mage[45], 'Mage', mediaMage[45], difficultyMage[45]],
            [mage[47], 'Mage', mediaMage[47], difficultyMage[47]],
            [mage[48], 'Mage', mediaMage[48], difficultyMage[48]],
            [mage[49], 'Mage', mediaMage[49], difficultyMage[49]],
            [mage[51], 'Mage', mediaMage[51], difficultyMage[51]],
            [mage[52], 'Mage', mediaMage[52], difficultyMage[52]],
            [mage[53], 'Mage', mediaMage[53], difficultyMage[53]],
            [mage[54], 'Mage', mediaMage[54], difficultyMage[54]],
            [mage[55], 'Mage', mediaMage[55], difficultyMage[55]],
            [mage[56], 'Mage', mediaMage[56], difficultyMage[56]],
            [mage[58], 'Mage', mediaMage[58], difficultyMage[58]],
            [mage[60], 'Mage', mediaMage[60], difficultyMage[60]],

            [tank[2], 'Tank', mediaTank[2], difficultyTank[2]],
            [tank[6], 'Tank', mediaTank[6], difficultyTank[6]],
            [tank[8], 'Tank', mediaTank[8], difficultyTank[8]],
            [tank[17], 'Tank', mediaTank[17], difficultyTank[17]],
            [tank[18], 'Tank', mediaTank[18], difficultyTank[18]],
            [tank[21], 'Tank', mediaTank[21], difficultyTank[21]],
            [tank[22], 'Tank', mediaTank[22], difficultyTank[22]],
            [tank[24], 'Tank', mediaTank[24], difficultyTank[24]],
            [tank[25], 'Tank', mediaTank[25], difficultyTank[25]],
            [tank[26], 'Tank', mediaTank[26], difficultyTank[26]],
            [tank[27], 'Tank', mediaTank[27], difficultyTank[27]],
            [tank[29], 'Tank', mediaTank[29], difficultyTank[29]],
            [tank[31], 'Tank', mediaTank[31], difficultyTank[31]],
            [tank[34], 'Tank', mediaTank[34], difficultyTank[34]],
            [tank[35], 'Tank', mediaTank[35], difficultyTank[35]],
            [tank[43], 'Tank', mediaTank[43], difficultyTank[43]]

          



          

          
        ]);

        var tree = new google.visualization.TreeMap(document.getElementById('columnchart_material2'));

        var optionsV50 = { // For v50+
            enableHighlight: true,
            maxDepth: 1,
            maxPostDepth: 2,
            minHighlightColor: '#8c6bb1',
            midHighlightColor: '#9ebcda',
            maxHighlightColor: '#edf8fb',
            minColor: '#009688',
            midColor: '#f7f7f7',
            maxColor: '#ee8100',
            headerHeight: 15,
            showScale: true,
            height: 500,
            // Use click to highlight and double-click to drill down.
            eventsConfig: {
            highlight: ['mouseover'],
            unhighlight: ['mouseout'],
            rollup: ['contextmenu'],
            drilldown: ['click'],
            },
            

            
        };

        tree.draw(data, optionsV50);

        


        
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
    <body>
        <h1>Gráficas de los campeones de League of Legends</h1>
        <div id="columnchart_material" align="center" style="width: 1800px; height: 710px;"></div>
        <h3>Rol/Campeón según la media entre Attack, Magic y Defense; siendo el color la dificultad </h3>
        <div id="columnchart_material2" align="center" style="width: 1800px; height: 500px;"></div>
        <div></div>
    </body>
    

    <!-- set the color of the background to #dccbab -->
    <style>
        body {
            background-color: #dccbab;
        }
    </style>

</main>

