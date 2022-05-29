<script>
    import { onMount } from "svelte";



    let apiData = [];
    let apiData1 = [];

    let total2015 = [];
    let total2016 = [];
    let total2017 = [];
    let total2018 = [];
    let total2019 = [];
    let total2020 = [];

    let male2015 = [];
    let male2016 = [];
    let male2017 = [];
    let male2018 = [];
    let male2019 = [];
    let male2020 = [];

    let female2015 = [];
    let female2016 = [];
    let female2017 = [];
    let female2018 = [];
    let female2019 = [];
    let female2020 = [];


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

    let coeff2015 = [];
    let education2015 = [];
    let life2015 = [];

    let coeff2018 = [];
    let education2018 = [];
    let life2018 = [];

    let coeff2019 = [];
    let education2019 = [];
    let life2019 = [];

    let totalcoeff2015 = 0;
    let totalcoeff2018 = 0;
    let totalcoeff2019 = 0;
    
    let totaleducation2015 = 0;
    let totaleducation2018 = 0;
    let totaleducation2019 = 0;

    let totallife2015 = 0;
    let totallife2018 = 0;
    let totallife2019 = 0;


   


    

    async function getData(){
        const res = await fetch(`api/v1/proportion-stats`);
        const res1 = await fetch('https://sos2122-11.herokuapp.com/api/v2/inequality-stats');
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

            const arrayData1 = await res1.json();
            apiData1 = arrayData1;

            console.log("apiData1: ", apiData1);

            apiData1.forEach((v) =>{
                if(v.year == 2015){
                    coeff2015.push(v.coefficients);
                    education2015.push(v.educations);
                    life2015.push(v.lifes);

                    
                }
                if(v.year == 2018){
                    coeff2018.push(v.coefficients);
                    education2018.push(v.educations);
                    life2018.push(v.lifes);

                  
                }
                if(v.year == 2019){
                    coeff2019.push(v.coefficients);
                    education2019.push(v.educations);
                    life2019.push(v.lifes);

                    
                }

                console.log("Coeff2015: " + coeff2015);
                console.log("Education2015: " + education2015);
                console.log("Life2015: " + life2015);
            });

            
            
            //convert the string from coeff2015 to numbers
            for(let i = 0; i < coeff2015.length; i++){
                coeff2015[i] = parseFloat(coeff2015[i]);
            }
            for(let i = 0; i < education2015.length; i++){
                education2015[i] = parseFloat(education2015[i]);
            }
            for(let i = 0; i < life2015.length; i++){
                life2015[i] = parseFloat(life2015[i]);
            }
            for(let i = 0; i < coeff2018.length; i++){
                coeff2018[i] = parseFloat(coeff2018[i]);
            }
            for(let i = 0; i < education2018.length; i++){
                education2018[i] = parseFloat(education2018[i]);
            }
            for(let i = 0; i < life2018.length; i++){
                life2018[i] = parseFloat(life2018[i]);
            }
            for(let i = 0; i < coeff2019.length; i++){
                coeff2019[i] = parseFloat(coeff2019[i]);
            }
            for(let i = 0; i < education2019.length; i++){
                education2019[i] = parseFloat(education2019[i]);
            }
            for(let i = 0; i < life2019.length; i++){
                life2019[i] = parseFloat(life2019[i]);
            }

            for(let i = 0; i < coeff2015.length; i++){
                totalcoeff2015 = totalcoeff2015 + coeff2015[i];
                totaleducation2015 = totaleducation2015 + education2015[i];
                totallife2015 = totallife2015 + life2015[i];
            }
            for(let i = 0; i < coeff2018.length; i++){
                totalcoeff2018 = totalcoeff2018 + coeff2018[i];
                totaleducation2018 = totaleducation2018 + education2018[i];
                totallife2018 = totallife2018 + life2018[i];
            }
            for(let i = 0; i < coeff2019.length; i++){
                totalcoeff2019 = totalcoeff2019 + coeff2019[i];
                totaleducation2019 = totaleducation2019 + education2019[i];
                totallife2019 = totallife2019 + life2019[i];
            }




            console.log("Coeff2015: " + coeff2015);


            totalcoeff2015 = totalcoeff2015/(coeff2015.length * 1);
            totaleducation2015 = totaleducation2015/(education2015.length * 1);
            totallife2015 = totallife2015/(life2015.length * 1);
            totalcoeff2018 = totalcoeff2018/(coeff2018.length * 1);
            totaleducation2018 = totaleducation2018/(education2018.length * 1);
            totallife2018 = totallife2018/(life2018.length * 1);
            totalcoeff2019 = totalcoeff2019/(coeff2019.length * 1);
            totaleducation2019 = totaleducation2019/(education2019.length * 1);
            totallife2019 = totallife2019/(life2019.length * 1);


            console.log("totalcoeff2015: " + totalcoeff2015);
            console.log("totaleducation2015: " + totaleducation2015);
            console.log("totallife2015: " + totallife2015);



            loadGraph();
    }else{
        window.alert("No hay datos cargados");
        console.log("INTERNAL FATAL ERROR");
        await fetch('https://sos2122-11.herokuapp.com/api/v2/inequality-stats/loadInitialData');
    }


}

  

    async function loadGraph(){
        google.charts.load('current', {'packages':['corechart']});
        
        var data = google.visualization.arrayToDataTable([
            ['Year', 'Male Capacitation', 'Female Capacitation', 'Total Capacitation', 'Total Coefficients', 'Total Education', 'Total Life'],
            ['2015', totalMale2015, totalFemale2015, totalTotal2015, totalcoeff2015, totaleducation2015, totallife2015],
            ['2016', totalMale2016, totalFemale2016, totalTotal2016, null, null, null],
            ['2017', totalMale2017, totalFemale2017, totalTotal2017, null, null, null],
            ['2018', totalMale2018, totalFemale2018, totalTotal2018, totalcoeff2018, totaleducation2018, totallife2018],
            ['2019', totalMale2019, totalFemale2019, totalTotal2019, totalcoeff2019, totaleducation2019, totallife2019],
            ['2020', totalMale2020, totalFemale2020, totalTotal2020, null, null, null]
        ]);

        var options = {
          title: 'Capacitation and inequality',
          curveType: 'function',
          legend: { position: 'bottom' }
        };

        var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

        chart.draw(data, options);

        

    }

onMount(getData);
</script>

<svelte:head>
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"on:load="{loadGraph}"></script>
</svelte:head>

<main>
    <div div id="curve_chart" style="width: 1800px; height: 500px;"></div>
</main>