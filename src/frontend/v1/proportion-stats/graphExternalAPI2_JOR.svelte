<script>
    import { onMount } from "svelte";



    let apiData = [];
    let apiData1 = [];
    let apiData2 = [];
    let apiData3 = [];
    let apiData4 = [];
    let apiData5 = [];


    let title = [];
    let year = [];
    let ratingIMDB = [];
    let ratingRotten = [];
    let ratingMetacritic = [];
    let boxOffice = [];

    async function getData(){
        const res = await fetch('https://www.omdbapi.com/?i=tt0068646&apikey=fb80765d');
        const res1 = await fetch('https://www.omdbapi.com/?i=tt0071562&apikey=fb80765d');
        const res2 = await fetch('https://www.omdbapi.com/?i=tt0099674&apikey=fb80765d');

        const res3 = await fetch('https://www.omdbapi.com/?i=tt1119646&apikey=fb80765d');
        const res4 = await fetch('https://www.omdbapi.com/?i=tt1411697&apikey=fb80765d');
        const res5 = await fetch('https://www.omdbapi.com/?i=tt1951261&apikey=fb80765d');

        

        if(res.ok){
            const arrayData = await res.json();
            apiData = arrayData;
            console.log(apiData);

        }
        else{
            window.alert("No hay datos cargados en" + window.location.href );
            console.log("INTERNAL FATAL ERROR en" + window.location.href);
        }

        if (res1.ok){
            const arrayData1 = await res1.json();
            apiData1 = arrayData1;
            console.log(apiData1);
        }
        else{
            window.alert("No hay datos cargados en" + window.location.href );
            console.log("INTERNAL FATAL ERROR en" + window.location.href);
        }
        if (res2.ok){
            const arrayData2 = await res2.json();
            apiData2 = arrayData2;
            console.log(apiData2);
        }
        else{
            window.alert("No hay datos cargados en" + window.location.href );
            console.log("INTERNAL FATAL ERROR en" + window.location.href);
        }
        if (res3.ok){
            const arrayData3 = await res3.json();
            apiData3 = arrayData3;
            console.log(apiData3);
        }
        else{
            window.alert("No hay datos cargados en" + window.location.href );
            console.log("INTERNAL FATAL ERROR en" + window.location.href);
        }
        if (res4.ok){
            const arrayData4 = await res4.json();
            apiData4 = arrayData4;
            console.log(apiData4);
        }
        else{
            window.alert("No hay datos cargados en" + window.location.href );
            console.log("INTERNAL FATAL ERROR en" + window.location.href);
        }
        if (res5.ok){
            const arrayData5 = await res5.json();
            apiData5 = arrayData5;
            console.log(apiData5);

            getLists();
            
        }
        else{
            window.alert("No hay datos cargados en" + window.location.href );
            console.log("INTERNAL FATAL ERROR en" + window.location.href);
        }

    }

    async function getLists(){
        title.push(apiData.Title);
        title.push(apiData1.Title);
        title.push(apiData2.Title);
        title.push(apiData3.Title);
        title.push(apiData4.Title);
        title.push(apiData5.Title);

        year.push(apiData.Year);
        year.push(apiData1.Year);
        year.push(apiData2.Year);
        year.push(apiData3.Year);
        year.push(apiData4.Year);
        year.push(apiData5.Year);

        ratingIMDB.push(apiData.Ratings[0].Value);
        ratingIMDB.push(apiData1.Ratings[0].Value);
        ratingIMDB.push(apiData2.Ratings[0].Value);
        ratingIMDB.push(apiData3.Ratings[0].Value);
        ratingIMDB.push(apiData4.Ratings[0].Value);
        ratingIMDB.push(apiData5.Ratings[0].Value);

        ratingRotten.push(apiData.Ratings[1].Value);
        ratingRotten.push(apiData1.Ratings[1].Value);
        ratingRotten.push(apiData2.Ratings[1].Value);
        ratingRotten.push(apiData3.Ratings[1].Value);
        ratingRotten.push(apiData4.Ratings[1].Value);
        ratingRotten.push(apiData5.Ratings[1].Value);

        ratingMetacritic.push(apiData.Ratings[2].Value);
        ratingMetacritic.push(apiData1.Ratings[2].Value);
        ratingMetacritic.push(apiData2.Ratings[2].Value);
        ratingMetacritic.push(apiData3.Ratings[2].Value);
        ratingMetacritic.push(apiData4.Ratings[2].Value);
        ratingMetacritic.push(apiData5.Ratings[2].Value);


        loadGraph();
        google.charts.setOnLoadCallback(loadGraph);


    }


    async function loadGraph(){
        google.charts.load('current', {'packages':['bar']});       
        
        
        var data = google.visualization.arrayToDataTable([
            ['Film', 'IMDB', 'Rotten', 'Metacritic'],
            [title[0], ratingIMDB[0], ratingRotten[0], ratingMetacritic[0]],
            [title[1], ratingIMDB[1], ratingRotten[1], ratingMetacritic[1]],
            [title[2], ratingIMDB[2], ratingRotten[2], ratingMetacritic[2]],
            [title[3], ratingIMDB[3], ratingRotten[3], ratingMetacritic[3]],
            [title[4], ratingIMDB[4], ratingRotten[4], ratingMetacritic[4]],
            [title[5], ratingIMDB[5], ratingRotten[5], ratingMetacritic[5]]
        ]);

        var options = {
          chart: {
            title: 'The final VS of triologies',
            subtitle: 'The Goodfather vs The Hangover',
          }
        };

        var chart = new google.charts.Bar(document.getElementById('columnchart_material'));

        chart.draw(data, google.charts.Bar.convertOptions(options));

        

    }

onMount(getData);
</script>

<svelte:head>
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"on:load="{loadGraph}"></script>
</svelte:head>

<main>
    <div div id="columnchart_material" style="width: 800px; height: 500px;"></div>
</main>