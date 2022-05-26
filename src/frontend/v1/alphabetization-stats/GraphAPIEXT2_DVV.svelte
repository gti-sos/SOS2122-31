<script>
    import { onMount } from "svelte";

    //Atributos API Externa:
    let apiEXT = [];
    let apiData = [];
    let name = [];
    let population = [];
    let country = [];
    let ar_ym = [];
    let ar_yw = [];
    let ar_ty = [];

    async function getData() {
        const resEXT = await fetch("https://restcountries.com/v2/lang/es");
        if (resEXT.ok) {
            const arrayEXT = await resEXT.json();
            apiEXT = arrayEXT;
            //Ordenamos valores:
            console.log(apiEXT);
            apiEXT.forEach((element) => {
                name.push(element["name"] + " // " + element.year);
                population.push(element.population);
            });
        } else {
            window.alert("ERROR AL CONECTAR CON LA BASE DE DATOS");
            console.log("INTERNAL FATAL ERROR");
        }
        const res1 = await fetch("api/v2/alphabetization-stats/");
        if (res1.ok) {
            const arrayData = await res1.json();
            apiData = arrayData;
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
            apiData.forEach((element) => {
                country.push(element["country"] + " // " + element.year);
                ar_ym.push(element.ar_ym);
                ar_yw.push(element.ar_yw);
                ar_ty.push(element.ar_ty);
            });
            loadGraph();
        } else {
            window.alert("ERROR AL CONECTAR CON LA BASE DE DATOS");
            console.log("INTERNAL FATAL ERROR");
            window.location.href = `/#/alphabetization-stats`;
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
        var porcH = {
            x: country,
            y: ar_ym,
            mode: "lines+markers",
            type: "scatter",
            name: "% Hombres alfabetizados",
        };
        var porcM = {
            x: country,
            y: ar_yw,
            mode: "lines+markers",
            type: "scatter",
            name: "% Mujeres alfabetizados",
        };
        var porcMe = {
            x: country,
            y: ar_ty,
            mode: "lines+markers",
            type: "scatter",
            name: "% Media alfabetizados",
        };

        var dataPlot = [porcH, porcM, porcMe, habPaises];
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
