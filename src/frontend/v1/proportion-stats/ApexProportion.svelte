<script>
    import { onMount } from "svelte";
    import Button from "sveltestrap/src/Button.svelte";

    export let params = {};
    //const delay = (ms) => new Promise((res) => setTimeout(res, ms));

    let apiData = [];
    let country = params.country;
    let pais = [];
    let year = [];
    let male = [];
    let female = [];
    let total = [];

    let sumaMale = 0;
    let sumaFemale = 0;
    let sumaTotal = 0;
    let totalSuma = 0;
    let malePercent = 0;
    let femalePercent = 0;
    let totalPercent = 0;


async function getSearch(){
    const res2 = await fetch(`api/v1/proportion-stats`);
        if (res2.ok) {
            const arrayData = await res2.json();
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
                year.push(element.year);
                male.push(element.male);
                female.push(element.female);
                total.push(element.total);
                //pais.push if element.country is not in the list
                if(!pais.includes(element.country)){
                    pais.push(element.country);
                }

            });
            console.log("Male: " + male);
            console.log("Female" + female);
            console.log("Total" + total);
            console.log("Pais " + pais);

            for(let i = 0; i < male.length; i++){
                sumaMale = sumaMale + male[i];
                sumaFemale = sumaFemale + female[i];
                sumaTotal = sumaTotal + total[i];  
            }
            console.log("sumaMale " + sumaMale);
            console.log("sumaFemale " + sumaFemale);
            console.log("sumaTotal " + sumaTotal);

            totalSuma = sumaMale + sumaFemale + sumaTotal;
            console.log("totalSuma " + totalSuma);

            malePercent = sumaMale / totalSuma;
            femalePercent = sumaFemale / totalSuma;
            totalPercent = sumaTotal / totalSuma;



        loadGraph();
    }else{
        window.alert("No hay datos cargados");
        console.log("INTERNAL FATAL ERROR");
        window.location.href ='/#/proportion-stats';
    }
}
    
    async function loadGraph(){
        var root = am5.Root.new("chartdiv");

        // Set themes
        // https://www.amcharts.com/docs/v5/concepts/themes/
        root.setThemes([
        am5themes_Animated.new(root)
        ]);

        // Create chart
        // https://www.amcharts.com/docs/v5/charts/xy-chart/
        var chart = root.container.children.push(
        am5xy.XYChart.new(root, {
            panX: false,
            panY: false,
            wheelX: "panX",
            wheelY: "zoomX",
            layout: root.verticalLayout,
            arrangeTooltips: false
        })
        );

        // Use only absolute numbers
        chart.getNumberFormatter().set("numberFormat", "#.#s");

        // Add legend
        // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
        var legend = chart.children.push(
        am5.Legend.new(root, {
            centerX: am5.p50,
            x: am5.p50
        })
        );

        // Data
        var data = [
            {
                Year: "2020",
                male: -0.1,
                female: 0.3
            }
        ];

        // Create axes
        // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
        var yAxis = chart.yAxes.push(
        am5xy.CategoryAxis.new(root, {
            categoryField: "age",
            renderer: am5xy.AxisRendererY.new(root, {
            inversed: true,
            cellStartLocation: 0.1,
            cellEndLocation: 0.9
            })
        })
        );

        yAxis.data.setAll(data);

        var xAxis = chart.xAxes.push(
        am5xy.ValueAxis.new(root, {
            renderer: am5xy.AxisRendererX.new(root, {})
        })
        );

        // Add series
        // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
        function createSeries(field, labelCenterX, pointerOrientation, rangeValue) {
        var series = chart.series.push(
            am5xy.ColumnSeries.new(root, {
            xAxis: xAxis,
            yAxis: yAxis,
            valueXField: field,
            categoryYField: "age",
            sequencedInterpolation: true,
            clustered: false,
            tooltip: am5.Tooltip.new(root, {
                pointerOrientation: pointerOrientation,
                labelText: "{categoryY}: {valueX}"
            })
            })
        );

        series.columns.template.setAll({
            height: am5.p100
        });

        series.bullets.push(function() {
            return am5.Bullet.new(root, {
            locationX: 1,
            locationY: 0.5,
            sprite: am5.Label.new(root, {
                centerY: am5.p50,
                text: "{valueX}",
                populateText: true,
                centerX: labelCenterX
            })
            });
        });

        series.data.setAll(data);
        series.appear();

        var rangeDataItem = xAxis.makeDataItem({
            value: rangeValue
        });
        xAxis.createAxisRange(rangeDataItem);
        rangeDataItem.get("grid").setAll({
            strokeOpacity: 1,
            stroke: series.get("stroke")
        });

        var label = rangeDataItem.get("label");
        label.setAll({
            text: field.toUpperCase(),
            fontSize: "1.1em",
            fill: series.get("stroke"),
            paddingTop: 10,
            isMeasured: false,
            centerX: labelCenterX
        });
        label.adapters.add("dy", function() {
            return -chart.plotContainer.height();
        });

        return series;
        }

        createSeries("male", am5.p100, "right", -3);
        createSeries("female", 0, "left", 4);

        // Add cursor
        // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
        var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
        behavior: "zoomY"
        }));
        cursor.lineY.set("forceHidden", true);
        cursor.lineX.set("forceHidden", true);

        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        chart.appear(1000, 100);
    }

        

 onMount(getSearch);
</script>

<svelte:head>
    <script src="https://cdn.amcharts.com/lib/5/index.js"></script>
    <script src="https://cdn.amcharts.com/lib/5/xy.js"></script>
    <script src="https://cdn.amcharts.com/lib/5/themes/Animated.js"on:load="{loadGraph}"></script>
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
                window.location.href =  `/#/graphProportionSearch/${country}`;
                location.reload();

            }}
        >
            Buscar
        </Button>
    </div>
    <br />
    <div id="chartdiv"></div>
</main>

<style>
#chartdiv {
  width: 100%;
  height: 500px;
}
</style>
