<script>
    import { onMount } from "svelte";

    let apiData = [];
    let data = [];
    let name = [];
    let percent = [];

    async function getData(){
        const res = await fetch('https://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v0002/?gameid=440&format=json');
        if(res.ok){
            const arrayData = await res.json();
            apiData = arrayData;
            data = apiData.achievementpercentages.achivements;
            console.log(data.length);

            getLists();
        }
        else{
            window.alert("No hay datos cargados en" + window.location.href );
            console.log("INTERNAL FATAL ERROR en" + window.location.href);
        }
    }

    async function getLists(){
        data.forEach((v) =>{
            name.push(v.name);
            percent.push(v.percent);
        });
        console.log(name);
        console.log(percent);
        loadGraph();

    }

    async function loadGraph(){
        var chart = new CanvasJS.Chart("chartContainer", {
        theme: "dark2", // "light1", "light2", "dark1"
        animationEnabled: true,
        exportEnabled: true,
        title: {
            text: "Percentile of achievements raised by the community in Team Fortress"
        },
        axisX: {
            margin: 10,
            labelPlacement: "inside",
            tickPlacement: "inside"
        },
        axisY2: {
            title: "Percentile",
            titleFontSize: 14,
            includeZero: true,
            suffix: "bn"
        },
        data: [{
            type: "bar",
            axisYType: "secondary",
            yValueFormatString: "#,###.##bn",
            indexLabel: "{y}",
            dataPoints: [
            name.forEach((v) =>{
                return {
                    label: v,
                    y: percent.forEach((v) =>{
                        return v;
                    })
                }
            })
            ]
        }]
        });
        chart.render();
    }

onMount(getData);
</script>

<svelte:head>
    <script src="https://canvasjs.com/assets/script/canvasjs.min.js"></script>
</svelte:head>

<main>
    <div id="chartContainer" style="height: 370px; width: 100%;"></div>
</main>