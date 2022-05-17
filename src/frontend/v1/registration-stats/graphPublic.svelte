<script>
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";

    let datos = [];
    let datos1 = [];
    let fechas = [];
    let public_expenditure = ["public_expenditure"];
    let pe_to_gdp = ["pe_to_gdp"];
    let pe_on_defence = ["pe_on_defence"];
    let nivelPrimario = ["nivelPrimario"];
    let nivelSecundario = ["nivelSecundario"];
    let nivelTerciario = ["nivelTerciario"];

    async function loadGraph2(){
        var chart = bb.generate({
            data: { 
                columns: [
                ],
                type: "bar", // for ESM specify as: bar()
            },
            bar: {
                width: {
                    ratio: 0.5,
                },
            },
            bindto: "#barChart_1",
        });
        setTimeout(function () {
            chart.load({
                columns: [nivelPrimario],
                type: "bar"
            });
        }, 1000);
        setTimeout(function () {
            chart.load({
                columns: [nivelSecundario],
                type: "bar"
            });
        }, 2000);
        setTimeout(function () {
            chart.load({
                columns: [nivelTerciario],
                type: "bar"
            });
        }, 3000);
        setTimeout(function () {
            chart.load({
                columns: [public_expenditure],
                type: "bar"
            });
        }, 4000);
        setTimeout(function () {
            chart.load({
                columns: [pe_to_gdp],
                type: "bar"
            });
        }, 5000);
        setTimeout(function () {
            chart.load({
                columns: [pe_on_defence],
                type: "bar"
            });
        }, 6000);
    }

    async function loadGraph() {
        const res = await fetch("/remoteAPI");
        const res1 = await fetch("/api/v2/registration-stats");
        if (res.ok) {
            datos = await res.json();
            console.log(datos);
            console.log(JSON.stringify(datos, null, 2));
            datos.forEach((data) => {
                fechas.push(data["country"] + "-" + data.year);
                public_expenditure.push(data.public_expenditure);
                pe_to_gdp.push(data.pe_to_gdp);
                pe_on_defence.push(data.pe_on_defence);
            });
            datos1 = await res1.json();
            console.log(datos1);
            console.log(JSON.stringify(datos1, null, 2));
            datos1.forEach((data) => {
                fechas.push(data["country"] + "-" + data.year);
                nivelPrimario.push(data.primarylevel);
                nivelSecundario.push(data.secondarylevel);
                nivelTerciario.push(data.tertiarylevel);
            });
            loadGraph2();
        } else {
            window.alert("No hay datos para este pais");
            console.log("INTERNAL FATAL ERROR");
            window.location.href = `/#/registration-stats`;
        }
    }
</script>

<svelte:head>
    <script src="https://d3js.org/d3.v5.min.js"></script> 
    <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/billboard.js/3.4.1/billboard.min.css"/>
    <script
        src="https://cdnjs.cloudflare.com/ajax/libs/billboard.js/3.4.1/billboard.min.js"
        on:load={loadGraph}></script>
</svelte:head>

<main>
    <br />
    <br />
    <Button id="back" outline color="secondary" on:click={pop}>Atrás</Button>
    <div id="barChart_1"></div>
</main>
