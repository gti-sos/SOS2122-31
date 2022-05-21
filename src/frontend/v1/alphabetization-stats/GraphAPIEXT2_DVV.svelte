<script>
    import { onMount } from "svelte";

    //Atributos API Externa:
    let apiEXT = [];
    let name = [];
    let population = [];

    //API EXTERNA:
    async function getData() {
        const resEXT = await fetch("https://restcountries.com/v2/lang/es");
        if (resEXT.ok) {
            const arrayEXT = await resEXT.json();
            apiEXT = arrayEXT;
            //Ordenamos valores:
            console.log(apiEXT);
            apiEXT.forEach((element) => {
                name.push(element.name);
                population.push(element.population);
            });
            loadGraph();
            console.log(population[0]);
        } else {
            window.alert("ERROR AL CONECTAR CON LA BASE DE DATOS");
            console.log("INTERNAL FATAL ERROR");
        }
    }

    async function loadGraph() {
        var habPaises = {
            x: name,
            y: population,
            mode: "lines+markers",
            type: "scatter",
            name: "Nº Habitantes por país",
        };

        var dataPlot = [habPaises];
        Plotly.newPlot("myDiv", dataPlot);
    }

    onMount(getData);
</script>

<svelte:head>
    <script
        src="https://cdn.plot.ly/plotly-2.11.1.min.js"
        on:load={loadGraph}></script>
</svelte:head>

<main>
    <div id="myDiv"><!-- Plotly chart will be drawn inside this DIV --></div>
</main>
