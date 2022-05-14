<script>
    import { onMount } from "svelte";
    import Button from "sveltestrap/src/Button.svelte";
    import ApexCharts from "apexcharts";

    export let params = {};
    //const delay = (ms) => new Promise((res) => setTimeout(res, ms));

    let apiData = [];
    let country = params.country;
    let year = [];
    let ar_ym = [];
    let ar_yw = [];
    let ar_ty = [];

    async function getData() {
        const res1 = await fetch(`/api/v2/alphabetization-stats/${country}`);
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
            console.log(apiData);
            apiData.forEach((element) => {
                year.push(element.year);
                ar_ym.push(element.ar_ym);
                ar_yw.push(element.ar_yw);
                ar_ty.push(element.ar_ty);
            });
            //await delay(1000);
            loadGraph();
        } else {
            window.alert("No hay datos para este pais");
            console.log("INTERNAL FATAL ERROR");
            window.location.href = `/#/alphabetization-stats`;
        }
    }

    async function loadGraph() {
        var options = {
            chart: {
                type: "bar",
            },
            series: [
                {
                    name: "sales",
                    data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
                },
            ],
            xaxis: {
                categories: [
                    1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999,
                ],
            },
        };

        var chart = new ApexCharts(document.querySelector("#chart"), options);
        chart.render();
    }

    onMount(getData);
</script>

<svelte:head>
    <script
        src="https://cdn.jsdelivr.net/npm/apexcharts"
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
                window.location.href = `/#/graphApexCharts/${country}`;
                location.reload();
            }}
        >
            Buscar
        </Button>
    </div>
    <br />
    <p>
        Gráfica donde se muestra para el pais indicado el avance que ha tenido
        la alfabetización a lo largo de los años.
    </p>
</main>
