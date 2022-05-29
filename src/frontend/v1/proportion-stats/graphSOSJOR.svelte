<script>
    import { onMount } from "svelte";
    import { Chart } from "frappe-charts/dist/frappe-charts.min.esm"

    import Button from "sveltestrap/src/Button.svelte";
import { element } from "svelte/internal";

    export let params = {};
    //const delay = (ms) => new Promise((res) => setTimeout(res, ms));

    let apiData = [];
    let apiData1 = [];
    let country = params.country;
    

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

    

    let export2010 = [];
    let import2010 = [];
    let balance2010 = [];

    let export2013 = [];
    let import2013 = [];
    let balance2013 = [];

    let export2015 = [];
    let import2015 = [];
    let balance2015 = [];

    let export2016 = [];
    let import2016 = [];
    let balance2016 = [];

    let export2017 = [];
    let import2017 = [];
    let balance2017 = [];

    let export2018 = [];
    let import2018 = [];
    let balance2018 = [];

    let totalExport2010 = 0;
    let totalImport2010 = 0;
    let totalBalance2010 = 0;

    let totalExport2013 = 0;
    let totalImport2013 = 0;
    let totalBalance2013 = 0;

    let totalExport2015 = 0;
    let totalImport2015 = 0;
    let totalBalance2015 = 0;

    let totalExport2016 = 0;
    let totalImport2016 = 0;
    let totalBalance2016 = 0;

    let totalExport2017 = 0;
    let totalImport2017 = 0;
    let totalBalance2017 = 0;

    let totalExport2018 = 0;
    let totalImport2018 = 0;
    let totalBalance2018 = 0;



async function getSearch(){
    const res = await fetch(`api/v1/proportion-stats`);
    const res1 = await fetch('https://sos2122-22.herokuapp.com/api/v2/trade-stats');
        if (res.ok && res1.ok) {
            const arrayData = await res.json();
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

            console.log("totalMale2015" + totalMale2015);


            const arrayData1 = await res1.json();
            apiData1 = arrayData1;
            console.log(apiData1);
            apiData1.forEach((v) => {
                if(v.year == 2010){
                    export2010.push(v.export);
                    import2010.push(v.import);
                    balance2010.push(v.balance);
                }
                if(v.year == 2013){
                    export2013.push(v.export);
                    import2013.push(v.import);
                    balance2013.push(v.balance);
                }
                if(v.year == 2015){
                    export2015.push(v.export);
                    import2015.push(v.import);
                    balance2015.push(v.balance);
                }
                if(v.year == 2016){
                    export2016.push(v.export);
                    import2016.push(v.import);
                    balance2016.push(v.balance);
                }
                if(v.year == 2017){
                    export2017.push(v.export);
                    import2017.push(v.import);
                    balance2017.push(v.balance);
                }
                if(v.year == 2018){
                    export2018.push(v.export);
                    import2018.push(v.import);
                    balance2018.push(v.balance);
                }

            });
            for(let i = 0; i < export2010.length; i++){
                totalExport2010 = totalExport2010 + export2010[i];
                totalImport2010 = totalImport2010 + import2010[i];
                totalBalance2010 = totalBalance2010 + balance2010[i];
            }
            for(let i = 0; i < export2013.length; i++){
                totalExport2013 = totalExport2013 + export2013[i];
                totalImport2013 = totalImport2013 + import2013[i];
                totalBalance2013 = totalBalance2013 + balance2013[i];
            }
            for(let i = 0; i < export2015.length; i++){
                totalExport2015 = totalExport2015 + export2015[i];
                totalImport2015 = totalImport2015 + import2015[i];
                totalBalance2015 = totalBalance2015 + balance2015[i];
            }
            for(let i = 0; i < export2016.length; i++){
                totalExport2016 = totalExport2016 + export2016[i];
                totalImport2016 = totalImport2016 + import2016[i];
                totalBalance2016 = totalBalance2016 + balance2016[i];
            }
            for(let i = 0; i < export2017.length; i++){
                totalExport2017 = totalExport2017 + export2017[i];
                totalImport2017 = totalImport2017 + import2017[i];
                totalBalance2017 = totalBalance2017 + balance2017[i];
            }
            for(let i = 0; i < export2018.length; i++){
                totalExport2018 = totalExport2018 + export2018[i];
                totalImport2018 = totalImport2018 + import2018[i];
                totalBalance2018 = totalBalance2018 + balance2018[i];
            }


            






        loadGraph();
    }else{
        window.alert("No hay datos cargados");
        console.log("INTERNAL FATAL ERROR");
        window.location.href ='/#/proportion-stats';
    }
}
    
    async function loadGraph(){
        const data = {
            labels: ['2010','2013','2015', '2016', '2017', '2018', '2019', '2020'],
            datasets: [
                {
                    name: "Total Capacitation proportion",
                    values: [0,0, totalTotal2015, totalTotal2016, totalTotal2017, totalTotal2018, totalTotal2019, totalTotal2020],
                    chartType: 'bar'
                },
                {
                    name: "Male Capacitation proportion",
                    values: [0,0, totalMale2015, totalMale2016, totalMale2017, totalMale2018, totalMale2019, totalMale2020],
                    chartType: 'line'
                },
                {
                    name: "Female Capacitation proportion",
                    values: [0,0, totalFemale2015, totalFemale2016, totalFemale2017, totalFemale2018, totalFemale2019, totalFemale2020],
                    chartType: 'line'
                },
                {
                    name: "Media Exports",
                    values: [totalExport2010, totalExport2013, totalExport2015, totalExport2016, totalExport2017, totalExport2018, 0, 0],
                    chartType: 'bar'
                },
                {
                    name: "Media Imports",
                    values: [totalImport2010, totalImport2013, totalImport2015, totalImport2016, totalImport2017, totalImport2018, 0, 0],
                    chartType: 'line'
                },
                {
                    name: "Media Balances",
                    values: [totalBalance2010, totalBalance2013, totalBalance2015, totalBalance2016, totalBalance2017, totalBalance2018, 0, 0],
                    chartType: 'line'
                }
            ]
        }

        const chart = new frappe.Chart("#chart", {  // or a DOM element,
                                            // new Chart() in case of ES6 module with above usage
            title: "My Awesome Chart",
            data: data,
            type: 'axis-mixed', // or 'bar', 'line', 'scatter', 'pie', 'percentage'
            weight: 800,
            height: 500,
            colors: ['#7cd6fd', '#743ee2', '#6080ff', '#ff6600', '#ffcc00', '#cbd4ff']
        }) 
     }

        

 onMount(getSearch);
</script>

<svelte:head>
    <script src="https://unpkg.com/frappe-charts@latest"on:load="{loadGraph}"></script>
</svelte:head>

<main>
    
    <figure>
        <div id="chart"></div>
    </figure>
    <br />
    
</main>

