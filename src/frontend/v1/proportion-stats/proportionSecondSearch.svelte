<script>
    import { onMount } from "svelte";
    import { Chart } from "frappe-charts/dist/frappe-charts.min.esm"

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

    let male2015 = [];
    let female2015 = [];
    let total2015 = [];
    let male2016 = [];
    let female2016 = [];
    let total2016 = [];
    let male2017 = [];
    let female2017 = [];
    let total2017 = [];
    let male2018 = [];
    let female2018 = [];
    let total2018 = [];
    let male2019 = [];
    let female2019 = [];
    let total2019 = [];
    let male2020 = [];
    let female2020 = [];
    let total2020 = [];

    let totalMale2015 = 0;
    let totalFemale2015 = 0;
    let totalTotal2015 = 0;
    let totalMale2016 = 0;
    let totalFemale2016 = 0;
    let totalTotal2016 = 0;
    let totalMale2017 = 0;
    let totalFemale2017 = 0;
    let totalTotal2017 = 0;
    let totalMale2018 = 0;
    let totalFemale2018 = 0;
    let totalTotal2018 = 0;
    let totalMale2019 = 0;
    let totalFemale2019 = 0;
    let totalTotal2019 = 0;
    let totalMale2020 = 0;
    let totalFemale2020 = 0;
    let totalTotal2020 = 0;



    let sumaMale = 0;
    let sumaFemale = 0;
    let sumaTotal = 0;
    let totalSuma = 0;
    let malePercent = 0;
    let femalePercent = 0;
    let totalPercent = 0;


async function getSearch(){
    const res2 = await fetch(`api/v1/proportion-stats/${country}`);
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
                if(element.year == 2015){
                    male2015.push(element.male);
                    female2015.push(element.female);
                    total2015.push(element.total);
                }
                if(element.year == 2016){
                    male2016.push(element.male);
                    female2016.push(element.female);
                    total2016.push(element.total);
                }
                if(element.year == 2017){
                    male2017.push(element.male);
                    female2017.push(element.female);
                    total2017.push(element.total);
                }
                if(element.year == 2018){
                    male2018.push(element.male);
                    female2018.push(element.female);
                    total2018.push(element.total);
                }
                if(element.year == 2019){
                    male2019.push(element.male);
                    female2019.push(element.female);
                    total2019.push(element.total);
                }
                if(element.year == 2020){
                    male2020.push(element.male);
                    female2020.push(element.female);
                    total2020.push(element.total);
                }
                

            });
            
            for(let i = 0; i < total2015.length; i++){
                totalFemale2015 = totalFemale2015 + female2015[i];
                totalMale2015 = totalMale2015 + male2015[i];
                totalTotal2015 = totalTotal2015 + total2015[i];
            }
            for(let i = 0; i < total2016.length; i++){
                totalFemale2016 = totalFemale2016 + female2016[i];
                totalMale2016 = totalMale2016 + male2016[i];
                totalTotal2016 = totalTotal2016 + total2016[i];
            }
            for(let i = 0; i < total2017.length; i++){
                totalFemale2017 = totalFemale2017 + female2017[i];
                totalMale2017 = totalMale2017 + male2017[i];
                totalTotal2017 = totalTotal2017 + total2017[i];
            }
            for(let i = 0; i < total2018.length; i++){
                totalFemale2018 = totalFemale2018 + female2018[i];
                totalMale2018 = totalMale2018 + male2018[i];
                totalTotal2018 = totalTotal2018 + total2018[i];
            }
            for(let i = 0; i < total2019.length; i++){
                totalFemale2019 = totalFemale2019 + female2019[i];
                totalMale2019 = totalMale2019 + male2019[i];
                totalTotal2019 = totalTotal2019 + total2019[i];
            }
            for(let i = 0; i < total2020.length; i++){
                totalFemale2020 = totalFemale2020 + female2020[i];
                totalMale2020 = totalMale2020 + male2020[i];
                totalTotal2020 = totalTotal2020 + total2020[i];
            }

            totalMale2015 = totalMale2015/total2015.length;
            totalFemale2015 = totalFemale2015/total2015.length;
            totalTotal2015 = totalTotal2015/total2015.length;
            totalMale2016 = totalMale2016/total2016.length;
            totalFemale2016 = totalFemale2016/total2016.length;
            totalTotal2016 = totalTotal2016/total2016.length;
            totalMale2017 = totalMale2017/total2017.length;
            totalFemale2017 = totalFemale2017/total2017.length;
            totalTotal2017 = totalTotal2017/total2017.length;
            totalMale2018 = totalMale2018/total2018.length;
            totalFemale2018 = totalFemale2018/total2018.length;
            totalTotal2018 = totalTotal2018/total2018.length;
            totalMale2019 = totalMale2019/total2019.length;
            totalFemale2019 = totalFemale2019/total2019.length;
            totalTotal2019 = totalTotal2019/total2019.length;
            totalMale2020 = totalMale2020/total2020.length;
            totalFemale2020 = totalFemale2020/total2020.length;
            totalTotal2020 = totalTotal2020/total2020.length;
            


        loadGraph();
    }else{
        window.alert("No hay datos cargados");
        console.log("INTERNAL FATAL ERROR");
        window.location.href ='/#/proportion-stats';
    }
}
    
    async function loadGraph(){
        const data = {
            labels: ['2015', '2016', '2017', '2018', '2019', '2020'],
            datasets: [
                {
                    name : "Male", type : "bar",
                    values: [totalMale2015, totalMale2016, totalMale2017, totalMale2018, totalMale2019, totalMale2020]
                },
                {
                    name : "Female", type : "bar",
                    values: [totalFemale2015, totalFemale2016, totalFemale2017, totalFemale2018, totalFemale2019, totalFemale2020]
                },
                {
                    name : "Total", type : "bar",
                    values: [totalTotal2015, totalTotal2016, totalTotal2017, totalTotal2018, totalTotal2019, totalTotal2020]
                }
                
            ]
        }

        const chart = new frappe.Chart("#chart", {  // or a DOM element,
                                            // new Chart() in case of ES6 module with above usage
            title: "My Awesome Chart",
            data: data,
            type: 'bar', // or 'bar', 'line', 'scatter', 'pie', 'percentage'
            height: 250,
            colors: ['#7cd6fd', '#743ee2']
        }) 
     }

        

 onMount(getSearch);
</script>

<svelte:head>
    <script src="https://unpkg.com/frappe-charts@latest"on:load="{loadGraph}"></script>
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
                window.location.href =  `/#/proportionSecondSearch/${country}`;
                location.reload();

            }}
        >
            Buscar
        </Button>
    </div>
    <br />
    <figure>
        <div id="chart"></div>
    </figure>
    <br />
    
</main>

