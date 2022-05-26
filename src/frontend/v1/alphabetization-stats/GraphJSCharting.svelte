<script>
    import { onMount } from "svelte";
    import Button from "sveltestrap/src/Button.svelte";
    import JSC from "jscharting";

    export let params = {};
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));

    let apiData = [];
    let country = params.country;
    let year = [];
    let ar_ym = [];
    let ar_yw = [];
    let ar_ty = [];

    async function getData() {
        const res1 = await fetch(`api/v2/alphabetization-stats/${country}`);
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
                year.push(country + " // " + element.year);
                ar_ym.push(element.ar_ym);
                ar_yw.push(element.ar_yw);
                ar_ty.push(element.ar_ty);
            });
            await delay(1000);
            loadGraph();
        } else {
            window.alert("No hay datos para este pais");
            console.log("INTERNAL FATAL ERROR");
            window.location.href = `/#/alphabetization-stats`;
        }
    }

    async function loadGraph() {
        // JS
        JSC.chart("chartDiv", {
            debug: true,
            defaultSeries_type: "column",
            title_label_text: "Gráfica con JSCharting",
            yAxis: { label_text: "Percentages" },
            xAxis: {
                label_text: "Pais // Año",
                categories: year,
            },
            series: [
                {
                    name: "% Hombres",
                    points: ar_ym,
                },
                {
                    name: "% Mujeres",
                    points: ar_yw,
                },
                {
                    name: "% Media",
                    points: ar_ty,
                },
            ],
        });
    }

    onMount(getData);
</script>

<svelte:head>
    <script
        src="https://code.jscharting.com/latest/jscharting.js"
        on:load={loadGraph}></script>
</svelte:head>

<main>
    <br />
    <h1 align="center">Pais al que buscar gráfica:</h1>
    <div align="center">
        <input type="text" bind:value={country} />
        <Button
            outline
            color="info"
            on:click={() => {
                window.location.href = `/#/graphJSCharting/${country}`;
                location.reload();
            }}
        >
            Buscar
        </Button>
    </div>
    <br />
    <div
        id="chartDiv"
        style="max-width: 740px;height: 400px;margin: 0px auto;"
    />
    <p>
        Gráfica donde se muestra para el pais indicado el avance que ha tenido
        la alfabetización a lo largo de los años.
    </p>
</main>
