<script>
    import { onMount } from "svelte";

    //Atributos API Propia:
    let apiData = [];
    let country = [];
    let year = [];
    let ar_ym = [];
    let ar_yw = [];
    let ar_ty = [];

    //Atributos API Externa:
    let apiEXT = [];
    let cSOS = [];
    let ySOS = [];
    let paeSOS = [];
    let nrecSOS = [];
    let renSOS = [];

    //API EXTERNA:
    async function loadAPISOS1() {
        const resEXT = await fetch(
            "https://sos2122-10.herokuapp.com/api/v2/energy-consumptions"
        );
        if (resEXT.ok) {
            const arrayEXT = await resEXT.json();
            apiEXT = arrayEXT;
            //Ordenamos valores:
            console.log(apiEXT.length);
            apiEXT.forEach((element) => {
                cSOS.push(element.country);
                ySOS.push(element.year);
                paeSOS.push(element.percentages_access_elecetricity);
                nrecSOS.push(element.non_renewable_energy_consumptions);
                renSOS.push(element.renewable_energy_consumptions);
            });
            //await delay(1000);
            loadGraph();
        } else {
            window.alert("No hay datos para este pais");
            console.log("INTERNAL FATAL ERROR");
            window.location.href = `/#/alphabetization-stats`;
        }
    }

    //API PROPIA:
    async function getData() {
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
                country.push(element.country);
                year.push(element.year);
                ar_ym.push(element.ar_ym);
                ar_yw.push(element.ar_yw);
                ar_ty.push(element.ar_ty);
            });
            //await delay(1000);
            loadAPISOS1();
            loadGraph();
        } else {
            window.alert("ERROR AL CONECTAR CON LA BASE DE DATOS");
            console.log("INTERNAL FATAL ERROR");
            window.location.href = `/#/alphabetization-stats`;
        }
    }

    async function loadGraph() {
        var porcHombres = {
            x: country,
            y: ar_ym,
            name: "% Hombres",
            type: "bar",
        };
        var porcMujeres = {
            x: country,
            y: ar_yw,
            name: "% Mujeres",
            type: "bar",
        };        
        var porcMedia = {
            x: country,
            y: ar_ty,
            name: "% Media",
            type: "bar",
        };
        var porcAcElec = {
            x: cSOS,
            y: paeSOS,
            name: "% Acceso Electricidad",
            type: "bar",
        };
        var porcENR = {
            x: cSOS,
            y: nrecSOS,
            name: "% Consumo Energía No Renovable",
            type: "bar",
        };        
        var porcER = {
            x: cSOS,
            y: renSOS,
            name: "% Consumo Energía Renovable",
            type: "bar",
        };

        var data = [porcHombres, porcMujeres, porcMedia, porcAcElec, porcENR, porcER];

        var layout = { barmode: "group" };

        Plotly.newPlot("myDiv", data, layout);
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
