<script>
    import Button from "sveltestrap/src/Button.svelte";
    import Highcharts from "highcharts";
    import { pop } from "svelte-spa-router";
async function getData(){
    const res = await fetch("https://ddragon.leagueoflegends.com/cdn/12.9.1/data/en_US/champion.json");
    const p = await res.json();
    //use each champion as the key and the value is a list of all tags that the champion has
    console.log(p);

    let champions = [];
    let tagAssasin = [];
    let tagFighter = [];
    let tagMage = [];
    let tagMarksman = [];
    let tagSupport = [];
    let tagTank = [];
    let tags = [];
    let partype = [];

    let c_partype = {};

    let c={};


    

    p.data.forEach((v) =>{
        if(v.tags.includes("Assassin")){
            tagAssasin.push(v.id);
        }
        else if(v.tags.includes("Fighter")){
            tagFighter.push(v.id);
        }
        else if(v.tags.includes("Mage")){
            tagMage.push(v.id);
        }
        else if(v.tags.includes("Marksman")){
            tagMarksman.push(v.id);
        }
        else if(v.tags.includes("Support")){
            tagSupport.push(v.id);
        }
        else if(v.tags.includes("Tank")){
            tagTank.push(v.id);
        }

        //añado el tag a la lista de tags si no esta
        if(!tags.includes(v.tags)){
            tags.push(v.tags);
        }
        
        //añado el partype a la lista de partypes si no esta
        if(!partype.includes(v.partype)){
            partype.push(v.partype);
        }

        //añado el id a la lista de ids si no esta
        if(!champions.includes(v.id)){
            champions.push(v.id);
        }

        //por cada i en champions añado una key con el id del campeon y una lista vacia
        for(let i = 0; i < champions.length; i++){
            if(!(champions[i] in c)){
                c_partype[champions[i]] = [];
            }
        }

        //por cada i en champions añado como valor a la key el partype del campeon
        for(let i = 0; i < champions.length; i++){
            c_partype[champions[i]].push(v.partype);
        }


        
    });
    tags.forEach((tag) =>{
        if (tag == "Assasin"){
            c[tag] = tagAssasin;
        }
        else if(tag == "Fighter"){
            c[tag] = tagFighter;
        }
        else if(tag == "Mage"){
            c[tag] = tagMage;
        }
        else if(tag == "Marksman"){
            c[tag] = tagMarksman;
        }
        else if(tag == "Support"){
            c[tag] = tagSupport;
        }
        else if(tag == "Tank"){
            c[tag] = tagTank;
        }
    });

    console.log(c);



    Highcharts.chart('container', {
    chart: {
        type: 'packedbubble',
        height: '100%'
    },
    title: {
        text: 'League of Legends Champions for each role'
    },
    tooltip: {
        useHTML: true,
        pointFormat: '<b>{point.name}:</b> {point.value}m CO<sub>2</sub>'
    },
    plotOptions: {
        packedbubble: {
            minSize: '20%',
            maxSize: '100%',
            zMin: 0,
            zMax: 1000,
            layoutAlgorithm: {
                gravitationalConstant: 0.05,
                splitSeries: true,
                seriesInteraction: false,
                dragBetweenSeries: true,
                parentNodeLimit: true
            },
            dataLabels: {
                enabled: true,
                format: '{point.name}',
                filter: {
                    property: 'y',
                    operator: '>',
                    value: 250
                },
                style: {
                    color: 'black',
                    textOutline: 'none',
                    fontWeight: 'normal'
                }
            }
        }
    },
    series: [{
        name : 'Assasin',
        //select the values from c with the key Assasin 
        data : c.Assasin,
        //select the key of c_partype if the value of the key includes c.Assasin
        value: c_partype[c.Assasin]
    },{

        name : 'Fighter',
        data : c.Fighter,
        value: c_partype[c.Fighter]
    },{
        name : 'Mage',
        data : c.Mage,
        value: c_partype[c.Mage]
    },{
        name : 'Marksman',
        data : c.Marksman,
        value: c_partype[c.Marksman]
    },{
        name : 'Support',
        data : c.Support,
        value: c_partype[c.Support]
    },{
        name : 'Tank',
        data : c.Tank,
        value: c_partype[c.Tank]
    }]
        

    
});

}


   
</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js" on:load={getData}></script>
    <script src="https://code.highcharts.com/highcharts-more.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
</svelte:head>

<main>
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
            This chart shows the champs for each role and the partype of each champ.
        </p>
    </figure>
    <Button id="back" outline color="secondary" on:click="{pop}"> Atrás</Button>

</main>

<style>
.highcharts-figure,
.highcharts-data-table table {
    min-width: 320px;
    max-width: 800px;
    margin: 1em auto;
}

.highcharts-data-table table {
    font-family: Verdana, sans-serif;
    border-collapse: collapse;
    border: 1px solid #ebebeb;
    margin: 10px auto;
    text-align: center;
    width: 100%;
    max-width: 500px;
}

.highcharts-data-table caption {
    padding: 1em 0;
    font-size: 1.2em;
    color: #555;
}

.highcharts-data-table th {
    font-weight: 600;
    padding: 0.5em;
}

.highcharts-data-table td,
.highcharts-data-table th,
.highcharts-data-table caption {
    padding: 0.5em;
}

.highcharts-data-table thead tr,
.highcharts-data-table tr:nth-child(even) {
    background: #f8f8f8;
}

.highcharts-data-table tr:hover {
    background: #f1f7ff;
}
</style>