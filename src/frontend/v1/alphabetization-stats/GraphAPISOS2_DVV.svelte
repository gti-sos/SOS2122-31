<script>
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";
    let datos = [];
    let datos1 = [];
    let fechas = [];
    let fechas1 = [];
    let kg = [];
    let tot = [];
    let tpc = [];
    let nivelPrimario = [];
    let nivelSecundario = [];
    let nivelTerciario = [];
    let paisss = [];
    let paisss1 = [];
    async function loadGraph() {
        const res = await fetch(
            "/remoteApiCancer"
        );
        const res1 = await fetch("/api/v2/alphabetization-stats");
        if (res.ok && res1.ok) {
            datos = await res.json();
            datos1 = await res1.json();
            const comun = [];
            for (let i = 0; i < datos1.length; i++) {
                comun.push(datos1[i].country + "/" + datos1[i].year);
            }
            datos1.forEach((data) => {
                let fecha1 = data["country"] + "-" + data.year;
                fechas.push(fecha1);
                if (comun.includes(fecha1)) {
                    let index = comun.indexOf(fecha1);
                    tot.push(datos[index].ages_zero_fifty);
                    kg.push(datos[index].ages_fifty_seventy);
                    tpc.push(datos[index].ages_seventy);
                    datos.splice(index, 1);
                } else {
                    tot.push("");
                    kg.push("");
                    tpc.push("");
                }
                nivelPrimario.push(data.ar_ym);
                nivelSecundario.push(data.ar_yw);
                nivelTerciario.push(data.ar_ty);
            });
            datos.forEach((data) => {
                fechas.push(data["country"] + "-" + data.year);
                tot.push(data.ages_zero_fifty);
                kg.push(data.ages_fifty_seventy);
                tpc.push(data.ages_seventy);
                nivelPrimario.push("");
                nivelSecundario.push("");
                nivelTerciario.push("");
            });
        } else {
            window.alert("No hay datos para este pais");
            console.log("INTERNAL FATAL ERROR");
            window.location.href = `/#/registration-stats`;
        }
        var ctx = document.getElementById("myChart").getContext("2d");
        var myChart = new Chart(ctx, {
            type: "bar",
            data: {
                labels: fechas,
                datasets: [
                    {
                        label: "Nivel Primario",
                        data: nivelPrimario,
                        backgroundColor: ["rgba(255, 99, 132, 0.2)"],
                        borderColor: ["rgba(255, 99, 132, 1)"],
                        borderWidth: 1,
                    },
                    {
                        label: "Nivel Secundario",
                        data: nivelSecundario,
                        backgroundColor: ["rgba(54, 162, 235, 0.2)"],
                        borderColor: ["rgba(54, 162, 235, 1)"],
                        borderWidth: 1,
                    },
                    {
                        label: "Nivel Terciario",
                        data: nivelTerciario,
                        backgroundColor: ["rgba(255, 206, 86, 0.2)"],
                        borderColor: ["rgba(255, 206, 86, 1)"],
                        borderWidth: 1,
                    },
                    {
                        label: "tot",
                        data: tot,
                        backgroundColor: ["rgba(75, 192, 192, 0.2)"],
                        borderColor: ["rgba(75, 192, 192, 1)"],
                        borderWidth: 1,
                    },
                    {
                        label: "kg",
                        data: kg,
                        backgroundColor: ["rgba(153, 102, 255, 0.2)"],
                        borderColor: ["rgba(153, 102, 255, 1)"],
                        borderWidth: 1,
                    },
                    {
                        label: "tpc",
                        data: tpc,
                        backgroundColor: ["rgba(255, 159, 64, 0.2)"],
                        borderColor: ["rgba(255, 159, 64, 1)"],
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });
    }
</script>

<main>
    <br />
    <br />
    <Button id="back" outline color="secondary" on:click={pop}>Atrás</Button>
    <br />
    <br />
    <br />
    <br />
    <h4>
        Gráfico de barras sobre CO2 por pais y año de Jesus Vena Grupo 22
        mezclado con la mia.
    </h4>
    <canvas id="myChart" width="10" height="3" />
</main>

<svelte:head>
    <script
        src="https://cdn.jsdelivr.net/npm/chart.js"
        on:load={loadGraph}></script>
</svelte:head>
