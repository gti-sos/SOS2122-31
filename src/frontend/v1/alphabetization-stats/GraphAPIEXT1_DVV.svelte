<script>
    import { onMount } from "svelte";

    let dataEXT = [];
    let dataAPI = [];
    let fechas = [];
    let dPPeople = [];
    let cPPeople = [];
    let tPPeople = [];
    let ar_ym = [];
    let ar_yw = [];
    let ar_ty = [];

    async function getData() {
        const resEXT = await fetch("https://disease.sh/v2/countries");
        const resAPI = await fetch("/api/v2/alphabetization-stats");
        if (resEXT.ok && resAPI.ok) {
            dataEXT = await resEXT.json();
            dataAPI = await resAPI.json();
            const comun = [];
            for (let i = 0; i < dataAPI.length; i++) {
                comun.push(dataAPI[i].country + "/" + dataAPI[i].year);
            }
            dataAPI.sort(function (a, b) {
                var keyA = new Date(a.year),
                    keyB = new Date(b.year);
                // Compare the 2 dates
                if (keyA < keyB) return -1;
                if (keyA > keyB) return 1;
                return 0;
            });
            dataAPI.forEach((data) => {
                let fecha1 = data["country"] + "-" + data.year;
                fechas.push(fecha1);
                if (comun.includes(fecha1)) {
                    let index = comun.indexOf(fecha1);
                    cPPeople.push(dataEXT[index].oneCasePerPeople);
                    dPPeople.push(dataEXT[index].oneDeathPerPeople);
                    tPPeople.push(dataEXT[index].oneTestPerPeople);
                    dataEXT.splice(index, 1);
                } else {
                    cPPeople.push("");
                    dPPeople.push("");
                    tPPeople.push("");
                }
                ar_ym.push(data.ar_ym);
                ar_yw.push(data.ar_yw);
                ar_ty.push(data.ar_ty);
            });
            dataEXT.forEach((data) => {
                fechas.push(data["country"] + "-" + data.year);
                cPPeople.push(data.oneCasePerPeople);
                dPPeople.push(data.oneDeathPerPeople);
                tPPeople.push(data.oneTestPerPeople);
                ar_ym.push("");
                ar_yw.push("");
                ar_ty.push("");
            });
        } else {
            window.alert("No hay datos para este pais");
            console.log("INTERNAL FATAL ERROR");
            window.location.href = `/#/alphabetization-stats`;
        }

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
                        labels: fechas,
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
                            values: cPPeople,
                            "line-color": "#F9E641",
                            "background-color": "#F9E641",
                            aspect: "spline",
                            "alpha-area": "0.2",
                            text: "",
                            "font-family": "Roboto",
                            "font-size": "14px",
                        },
                        {
                            values: dPPeople,
                            "line-color": "#CFEDBE",
                            "background-color": "#CFEDBE",
                            aspect: "spline",
                            "alpha-area": "0.2",
                            text: "",
                            "font-family": "Roboto",
                            "font-size": "14px",
                        },
                        {
                            values: tPPeople,
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
        src="https://cdn.zingchart.com/zingchart.min.js"></script>
</svelte:head>

<main>
    <div id="myChart" />
</main>
