<script>
    let dataEXT = [];
    let dataAPI = [];
    let fechas = [];
    let ages_fifty_seventy = [];
    let ages_zero_fifty = [];
    let ages_seventy = [];
    let ar_ym = [];
    let ar_yw = [];
    let ar_ty = [];
    
    async function loadGraph() {
        const res = await fetch("/remoteApiCancer");
        const res1 = await fetch("/api/v2/alphabetization-stats");
        if (res.ok && res1.ok) {
            dataEXT = await res.json();
            dataAPI = await res1.json();
            const comun = [];
            for (let i = 0; i < dataAPI.length; i++) {
                comun.push(dataAPI[i].country + "/" + dataAPI[i].year);
            }
            dataEXT.sort(function (a, b) {
                var keyA = new Date(a.year),
                    keyB = new Date(b.year);
                // Compare the 2 dates
                if (keyA < keyB) return -1;
                if (keyA > keyB) return 1;
                return 0;
            });
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
                    ages_zero_fifty.push(dataEXT[index].ages_zero_fifty);
                    ages_fifty_seventy.push(dataEXT[index].ages_fifty_seventy);
                    ages_seventy.push(dataEXT[index].ages_seventy);
                    dataEXT.splice(index, 1);
                } else {
                    ages_zero_fifty.push("");
                    ages_fifty_seventy.push("");
                    ages_seventy.push("");
                }
                ar_ym.push(data.ar_ym);
                ar_yw.push(data.ar_yw);
                ar_ty.push(data.ar_ty);
            });
            dataEXT.forEach((data) => {
                fechas.push(data["country"] + "-" + data.year);
                ages_zero_fifty.push(data.ages_zero_fifty);
                ages_fifty_seventy.push(data.ages_fifty_seventy);
                ages_seventy.push(data.ages_seventy);
                ar_ym.push("");
                ar_yw.push("");
                ar_ty.push("");
            });
        } else {
            window.alert("No hay datos para este pais");
            console.log("INTERNAL FATAL ERROR");
            window.location.href = `/#/registration-stats`;
        }
        var options = {
            series: [
                {
                    name: "% Hombres",
                    data: ar_ym,
                },
                {
                    name: "% Mujeres",
                    data: ar_yw,
                },
                {
                    name: "% Media",
                    data: ar_ty,
                },
                {
                    name: "Edad x < 50",
                    data: ages_zero_fifty,
                },
                {
                    name: "Edad 50 < x < 70",
                    data: ages_fifty_seventy,
                },
                {
                    name: "Edad x > 70",
                    data: ages_seventy,
                },
            ],
            chart: {
                height: 450,
                type: "radar",
            },
            dataLabels: {
                enabled: false,
            },

            xaxis: {
                categories: fechas,
            },
            yAxis: {
                title: {
                    text: "Valor",
                },
            },
        };
        var chart = new ApexCharts(document.querySelector("#chart"), options);
        chart.render();
    }
</script>

<svelte:head>
    <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
    <script
        type="text/javascript"
        src="https://cdn.jsdelivr.net/npm/chart.js@3.7.1/dist/chart.min.js"
        on:load={loadGraph}></script>
</svelte:head>

<main>
    <div id="chart" />
</main>
