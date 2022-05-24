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
    let cPorPersona = [];
    let mPorPersona = [];
    let tPorPersona = [];

    //API EXTERNA:
    async function loadAPIEXT1() {
        const resEXT = await fetch("https://disease.sh/v2/countries");
        if (resEXT.ok) {
            const arrayEXT = await resEXT.json();
            apiEXT = arrayEXT;
            //Ordenamos valores:
            console.log(apiEXT.length);
            apiEXT.forEach((element) => {
                country.push(element.country);
                cPorPersona.push(element.oneCasePerPeople);
                mPorPersona.push(element.oneDeathPerPeople);
                tPorPersona.push(element.oneTestPerPeople);
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
        const res1 = await fetch(`api/v2/alphabetization-stats/`);
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
            loadAPIEXT1();
            loadGraph();
        } else {
            window.alert("ERROR AL CONECTAR CON LA BASE DE DATOS");
            console.log("INTERNAL FATAL ERROR");
            window.location.href = `/#/alphabetization-stats`;
        }
    }

    async function loadGraph() {
        var myConfig = {
            globals: {
                "font-family": "Roboto",
            },
            graphset: [
                {
                    type: "area",
                    "background-color": "#fff",
                    utc: true,
                    title: {
                        y: "15px",
                        text: "Integración datos propios y api covid",
                        "background-color": "none",
                        "font-color": "#05636c",
                        "font-size": "24px",
                        height: "25px",
                        "adjust-layout": true,
                    },
                    plotarea: {
                        "margin-top": "10%",
                        "margin-right": "dynamic",
                        "margin-bottom": "dynamic",
                        "margin-left": "dynamic",
                        "adjust-layout": true,
                    },
                    labels: [
                        {
                            text: "Test/Persona: %plot-5-value",
                            "default-value": "",
                            color: "#E0BEED",
                            x: "15%",
                            y: 50,
                            width: 120,
                            "text-align": "left",
                            bold: 0,
                            "font-size": "14px",
                            "font-weight": "bold",
                        },
                        {
                            text: "Muerte/Persona: %plot-4-value",
                            "default-value": "",
                            color: "#CFEDBE",
                            x: "30%",
                            y: 50,
                            width: 120,
                            "text-align": "left",
                            bold: 0,
                            "font-size": "14px",
                            "font-weight": "bold",
                        },
                        {
                            text: "Casos/Persona: %plot-3-value",
                            "default-value": "",
                            color: "#F9E641",
                            x: "45%",
                            y: 50,
                            width: 120,
                            "text-align": "left",
                            bold: 0,
                            "font-size": "14px",
                            "font-weight": "bold",
                        },
                        {
                            text: "% Media: %plot-2-value",
                            "default-value": "",
                            color: "#8da0cb",
                            x: "60%",
                            y: 50,
                            width: 120,
                            "text-align": "left",
                            bold: 0,
                            "font-size": "14px",
                            "font-weight": "bold",
                        },
                        {
                            text: "% Mujeres: %plot-1-value",
                            "default-value": "",
                            color: "#66c2a5",
                            x: "75%",
                            y: 50,
                            width: 120,
                            "text-align": "left",
                            bold: 0,
                            "font-size": "14px",
                            "font-weight": "bold",
                        },
                        {
                            text: "% Hombres: %plot-0-value",
                            "default-value": "",
                            color: "#fc8d62",
                            x: "90%",
                            y: 50,
                            width: 120,
                            "text-align": "left",
                            bold: 0,
                            "font-size": "14px",
                            "font-weight": "bold",
                        },
                    ],
                    "scale-x": {
                        label: {
                            text: "Paises",
                            "font-size": "14px",
                            "font-weight": "normal",
                            "offset-x": "10%",
                            "font-angle": 360,
                        },
                        item: {
                            "text-align": "center",
                            "font-color": "#05636c",
                        },
                        zooming: 1,
                        "max-labels": 12,
                        labels: country,
                        "max-items": 12,
                        "items-overlap": true,
                        guide: {
                            "line-width": "0px",
                        },
                        tick: {
                            "line-width": "2px",
                        },
                    },
                    "crosshair-x": {
                        "line-color": "#fff",
                        "line-width": 1,
                        "plot-label": {
                            visible: false,
                        },
                    },
                    "scale-y": {
                        values: "0:2500:50",
                        item: {
                            "font-color": "#05636c",
                            "font-weight": "normal",
                        },
                        label: {
                            text: "",
                            "font-size": "14px",
                        },
                        guide: {
                            "line-width": "0px",
                            alpha: 0.2,
                            "line-style": "dashed",
                        },
                    },
                    plot: {
                        "line-width": 2,
                        marker: {
                            size: 1,
                            visible: false,
                        },
                        tooltip: {
                            "font-family": "Roboto",
                            "font-size": "15px",
                            text: "",
                            "text-align": "left",
                            "border-radius": 5,
                            padding: 10,
                        },
                    },
                    series: [
                        {
                            values: ar_ym,
                            "line-color": "#fc8d62",
                            aspect: "spline",
                            "background-color": "#fc8d62",
                            "alpha-area": ".5",
                            "font-family": "Roboto",
                            "font-size": "14px",
                            text: "",
                        },
                        {
                            values: ar_yw,
                            "line-color": "#66c2a5",
                            "background-color": "#66c2a5",
                            "alpha-area": ".3",
                            text: "",
                            aspect: "spline",
                            "font-family": "Roboto",
                            "font-size": "14px",
                        },
                        {
                            values: ar_ty,
                            "line-color": "#8da0cb",
                            "background-color": "#8da0cb",
                            aspect: "spline",
                            "alpha-area": "0.2",
                            text: "",
                            "font-family": "Roboto",
                            "font-size": "14px",
                        },
                        {
                            values: cPorPersona,
                            "line-color": "#F9E641",
                            "background-color": "#F9E641",
                            aspect: "spline",
                            "alpha-area": "0.2",
                            text: "",
                            "font-family": "Roboto",
                            "font-size": "14px",
                        },
                        {
                            values: mPorPersona,
                            "line-color": "#CFEDBE",
                            "background-color": "#CFEDBE",
                            aspect: "spline",
                            "alpha-area": "0.2",
                            text: "",
                            "font-family": "Roboto",
                            "font-size": "14px",
                        },
                        {
                            values: tPorPersona,
                            "line-color": "#E0BEED",
                            "background-color": "#E0BEED",
                            aspect: "spline",
                            "alpha-area": "0.2",
                            text: "",
                            "font-family": "Roboto",
                            "font-size": "14px",
                        },
                    ],
                },
            ],
        };

        zingchart.render({
            id: "myChart",
            data: myConfig,
        });
    }

    onMount(getData);
</script>

<svelte:head>
    <script
        src="https://cdn.zingchart.com/zingchart.min.js"
        on:load={loadGraph}></script>
</svelte:head>

<main>
    <div id="myChart" />
</main>
