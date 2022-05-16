<script>
    import Button from "sveltestrap/src/Button.svelte";
    import Highcharts from "highcharts";
    import { pop } from "svelte-spa-router";

    let datos = [];
    let datos1 = [];
    let fechas = [];
    let public_expenditure = [];
    let pe_to_gdp = [];
    let pe_on_defence = [];
    let nivelPrimario = [];
    let nivelSecundario = [];
    let nivelTerciario = [];

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
        } else {
            window.alert("No hay datos para este pais");
            console.log("INTERNAL FATAL ERROR");
            window.location.href = `/#/registration-stats`;
        }
    
        var myConfig = {
  "globals": {
    "font-family": "Roboto"
  },
  "graphset": [{
    "type": "area",
    "background-color": "#fff",
    "utc": true,
    "title": {
      "y": "15px",
      "text": "Website Traffic Metrics",
      "background-color": "none",
      "font-color": "#05636c",
      "font-size": "24px",
      "height": "25px",
      "adjust-layout": true
    },
    "plotarea": {
      "margin-top": "10%",
      "margin-right": "dynamic",
      "margin-bottom": "dynamic",
      "margin-left": "dynamic",
      "adjust-layout": true
    },
    "labels": [{
        "text": "Visitors: %plot-2-value",
        "default-value": "",
        "color": "#8da0cb",
        "x": "20%",
        "y": 50,
        "width": 120,
        "text-align": "left",
        "bold": 0,
        "font-size": "14px",
        "font-weight": "bold"
      },
      {
        "text": "Clicks: %plot-1-value",
        "default-value": "",
        "color": "#66c2a5",
        "x": "45%",
        "y": 50,
        "width": 120,
        "text-align": "left",
        "bold": 0,
        "font-size": "14px",
        "font-weight": "bold"
      },
      {
        "text": "Returns: %plot-0-value",
        "default-value": "",
        "color": "#fc8d62",
        "x": "70%",
        "y": 50,
        "width": 120,
        "text-align": "left",
        "bold": 0,
        "font-size": "14px",
        "font-weight": "bold"
      }
    ],
    "scale-x": {
      "label": {
        "text": "Date Range",
        "font-size": "14px",
        "font-weight": "normal",
        "offset-x": "10%",
        "font-angle": 360
      },
      "item": {
        "text-align": "center",
        "font-color": "#05636c"
      },
      "zooming": 1,
      "max-labels": 12,
      "labels": [
        "Sept<br>19",
        "Sept<br>20",
        "Sept<br>21",
        "Sept<br>22",
        "Sept<br>23",
        "Sept<br>24",
        "Sept<br>25",
        "Sept<br>26",
        "Sept<br>27",
        "Sept<br>28",
        "Sept<br>29",
        "Sept<br>30"
      ],
      "max-items": 12,
      "items-overlap": true,
      "guide": {
        "line-width": "0px"
      },
      "tick": {
        "line-width": "2px"
      },
    },
    "crosshair-x": {
      "line-color": "#fff",
      "line-width": 1,
      "plot-label": {
        "visible": false
      }
    },
    "scale-y": {
      "values": "0:2500:500",
      "item": {
        "font-color": "#05636c",
        "font-weight": "normal"
      },
      "label": {
        "text": "Metrics",
        "font-size": "14px"
      },
      "guide": {
        "line-width": "0px",
        "alpha": 0.2,
        "line-style": "dashed"
      }
    },
    "plot": {
      "line-width": 2,
      "marker": {
        "size": 1,
        "visible": false
      },
      "tooltip": {
        "font-family": "Roboto",
        "font-size": "15px",
        "text": "There were %v %t on %data-days",
        "text-align": "left",
        "border-radius": 5,
        "padding": 10
      }
    },
    "series": [
                {
                    name: "public_expenditure",
                    points: public_expenditure,
                },
                {
                    name: "pe_to_gdp",
                    points: pe_to_gdp,
                },
                {
                    name: "pe_on_defence",
                    points: pe_on_defence,
                },
                {
                    name: "Nivel Primario",
                    points: nivelPrimario,
                },
                {
                    name: "Nivel Secundario",
                    points: nivelSecundario,
                },
                {
                    name: "Nivel Terciario",
                    points: nivelTerciario,
                },
            ],
  }]
};
 
zingchart.render({
  id: 'myChart',
  data: myConfig,
  height: '100%',
  width: '100%'
});
    }
</script>

<svelte:head>
    
    <script src="path/to/zingchart.min.js"></script>
    <script src="path/to/modules/zingchart-grid.min.js"></script>
    <script src="path/to/modules/zingchart-maps.min.js"></script>
    <script src="path/to/modules/zingchart-maps-usa.min.js" on:load={loadGraph}></script>
</svelte:head>

<main>
    <br />
    <br />
    <Button id="back" outline color="secondary" on:click={pop}>Atrás</Button>
    <div style="margin:auto;">
        <figure class="highcharts-figure">
            <div id="container" />
            <p class="highcharts-description">
                Datos de gastos públicos en dolares, en defensa y PIB de Roque
                Fernandez Iglesias grupo 27 mezclado con la mia.
            </p>
        </figure>
    </div>
</main>
