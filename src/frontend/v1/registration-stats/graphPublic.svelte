<script>
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";
    import { onMount } from "svelte";

    let datos = [];
    let datos1 = [];
    let fechas = [];
    let public_expenditure = ["public_expenditure"];
    let pe_to_gdp = ["pe_to_gdp"];
    let pe_on_defence = ["pe_on_defence"];
    let nivelPrimario = ["nivelPrimario"];
    let nivelSecundario = ["nivelSecundario"];
    let nivelTerciario = ["nivelTerciario"];

    onMount(loadGraph);
    async function loadGraph2() {
        var chart3 = bb.generate({
            data: {
                columns: [
                    nivelPrimario,
                    nivelSecundario,
                    nivelTerciario,
                    public_expenditure,
                    pe_to_gdp,
                    pe_on_defence,
                ],
                type: "bar", // for ESM specify as: bar()
            },
            axis: {
                x: {
                type: "category",
                categories: fechas
                },
            },
            bar: {
                width: {
                    ratio: 0.5,
                },
            },
            bindto: "#barChart_111",
        });
    }

    async function loadGraph() {
        const res = await fetch("/remoteAPI");
        const res1 = await fetch("/api/v2/registration-stats");
        if (res.ok && res1.ok) {
            datos = await res.json();
            datos1 = await res1.json();
            const comun = [];
            for (let i = 0; i < datos1.length; i++) {
                comun.push(datos[i].country + "/" + datos[i].year);
                //death_rate.push(datos[i].death_rate);
                //life_expectancy_birth.push(datos[i].life_expectancy_birth);
                //birth_rate.push(datos[i].birth_rate);
            }
            datos1.forEach((data) => {
                let fecha1 = data["country"] + "-" + data.year;
                fechas.push(fecha1);
                if (comun.includes(fecha1)) {
                    let index = comun.indexOf(fecha1);
                    public_expenditure.push(datos[index].public_expenditure);
                    pe_to_gdp.push(
                        datos[index].pe_to_gdp
                    );
                    pe_on_defence.push(datos[index].pe_on_defence);
                    datos.splice(index, 1);
                } else {
                    public_expenditure.push("");
                    pe_to_gdp.push("");
                    pe_on_defence.push("");
                }
                nivelPrimario.push(data.primarylevel);
                nivelSecundario.push(data.secondarylevel);
                nivelTerciario.push(data.tertiarylevel);
            })
            datos.forEach((data) => {
                fechas.push(data["country"] + "-" + data.year);
                public_expenditure.push(data.public_expenditure);
                pe_to_gdp.push(data.pe_to_gdp);
                pe_on_defence.push(data.pe_on_defence);
                nivelPrimario.push("");
                nivelSecundario.push("");
                nivelTerciario.push("");
            })
            
            loadGraph2();
        } else {
            window.alert("No hay datos para este pais");
            console.log("INTERNAL FATAL ERROR");
            window.location.href = `/#/registration-stats`;
        }
    }
</script>

<svelte:head>
    <script src="https://d3js.org/d3.v6.min.js"></script>
    <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/billboard.js/3.4.1/billboard.min.css"
    />
    <script
        src="https://cdnjs.cloudflare.com/ajax/libs/billboard.js/3.4.1/billboard.min.js"
        on:load={loadGraph}></script>
</svelte:head>

<main>
    <br />
    <br />
    <br />
    <div id="barChart_111" />
    <br />
    <br />
    <Button
        outline
        color="dark"
        on:click={() => {
            pop();
        }}
    >
        Volver
    </Button>
    <br /><br />
</main>
