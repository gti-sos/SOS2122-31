<script>
    import FusionCharts from "fusioncharts";
    import Charts from "fusioncharts/fusioncharts.charts";
    import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
    import SvelteFC, { fcRoot } from "svelte-fusioncharts";
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";
    import {onMount} from 'svelte';
    import UncontrolledAlert from "sveltestrap/src/UncontrolledAlert.svelte";


    export let params = {};
    //const delay = (ms) => new Promise((res) => setTimeout(res, ms));

    fcRoot(FusionCharts, Charts, FusionTheme);
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));

    let apiData = [];
    let country = params.country;
    let pais = [];
    let male = [];
    let female = [];
    let total = [];

    

    let pais2015 = [];
    let pais2016 = [];
    let pais2017 = [];
    let pais2018 = [];
    let pais2019 = [];
    let pais2020 = [];

    let totalJapan = [];
    let totalMexico = [];
    let totalAlbania = [];
    let totalSpain = [];
    let totalHonduras = [];
    let totalIsrael = [];
    let totalMauricio = [];
    let totalColombia = [];
    let totalCyprus = [];
    let totalMaldivas = [];
    let totalRwanda = [];
    let totalAfganistan = [];
    let totalChad = [];
    let totalArgentina = [];
    let totalOthers = [];

    let maleMexico = [];
    let maleJapan = [];
    let maleAlbania = [];
    let maleSpain = [];
    let maleHonduras = [];
    let maleIsrael = [];
    let maleMauricio = [];
    let maleColombia = [];
    let maleCyprus = [];
    let maleMaldivas = [];
    let maleRwanda = [];
    let maleAfganistan = [];
    let maleChad = [];
    let maleArgentina = [];
    let maleOthers = [];

    let femaleMexico = [];
    let femaleJapan = [];
    let femaleAlbania = [];
    let femaleSpain = [];
    let femaleHonduras = [];
    let femaleIsrael = [];
    let femaleMauricio = [];
    let femaleColombia = [];
    let femaleCyprus = [];
    let femaleMaldivas = [];
    let femaleRwanda = [];
    let femaleAfganistan = [];
    let femaleChad = [];
    let femaleArgentina = [];
    let femaleOthers = [];




    var chartConfigs = {};
    var dataSource = {};
    let errorC = null;


async function getSearch(){
    const res3 = await fetch(`api/v1/proportion-stats`);
        if (res3.ok) {
            const arrayData = await res3.json();
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

                
                //pais.push if element.country is not in the list
                if(!pais.includes(element.country)){
                    pais.push(element.country);
                }
                console.log(pais);
                if(element.year == "2015"){
                    pais2015.push(element.country);
                    if(element.country == "Japan"){
                        totalJapan.push(element.total);
                        maleJapan.push(element.male);
                        femaleJapan.push(element.female);
                    }
                    if(element.country == "Mexico"){
                        totalMexico.push(element.total);
                        maleMexico.push(element.male);
                        femaleMexico.push(element.female);
                    }
                    if(element.country == "Albania"){
                        totalAlbania.push(element.total);
                        maleAlbania.push(element.male);
                        femaleAlbania.push(element.female);
                    }
                    if(element.country == "Spain"){
                        totalSpain.push(element.total);
                        maleSpain.push(element.male);
                        femaleSpain.push(element.female);
                    }
                    if(element.country == "Honduras"){
                        totalHonduras.push(element.total);
                        maleHonduras.push(element.male);
                        femaleHonduras.push(element.female);
                    }
                    if(element.country == "Israel"){
                        totalIsrael.push(element.total);
                        maleIsrael.push(element.male);
                        femaleIsrael.push(element.female);
                    }
                    if(element.country == "Mauricio"){
                        totalMauricio.push(element.total);
                        maleMauricio.push(element.male);
                        femaleMauricio.push(element.female);
                    }
                    if(element.country == "Colombia"){
                        totalColombia.push(element.total);
                        maleColombia.push(element.male);
                        femaleColombia.push(element.female);
                    }
                    if(element.country == "Cyprus"){
                        totalCyprus.push(element.total);
                        maleCyprus.push(element.male);
                        femaleCyprus.push(element.female);
                    }
                    if(element.country == "Maldivas"){
                        totalMaldivas.push(element.total);
                        maleMaldivas.push(element.male);
                        femaleMaldivas.push(element.female);
                    }
                    if(element.country == " Rwanda"){
                        totalRwanda.push(element.total);
                        maleRwanda.push(element.male);
                        femaleRwanda.push(element.female);
                    }
                    if(element.country == "Afganistan"){
                        totalAfganistan.push(element.total);
                        maleAfganistan.push(element.male);
                        femaleAfganistan.push(element.female);
                    }
                    if(element.country == "Chad"){
                        totalChad.push(element.total);
                        maleChad.push(element.male);
                        femaleChad.push(element.female);
                    }
                    if(element.country == "Argentina"){
                        totalArgentina.push(element.total);
                        maleArgentina.push(element.male);
                        femaleArgentina.push(element.female);
                    }
                    else{
                        totalOthers.push(element.total);
                        maleOthers.push(element.male);
                        femaleOthers.push(element.female);
                    }
                    
                }
                if(element.year == "2016"){
                    pais2016.push(element.country);
                    if(element.country == "Japan"){
                        totalJapan.push(element.total);
                        maleJapan.push(element.male);
                        femaleJapan.push(element.female);
                    }
                    if(element.country == "Mexico"){
                        totalMexico.push(element.total);
                        maleMexico.push(element.male);
                        femaleMexico.push(element.female);
                    }
                    if(element.country == "Albania"){
                        totalAlbania.push(element.total);
                        maleAlbania.push(element.male);
                        femaleAlbania.push(element.female);
                    }
                    if(element.country == "Spain"){
                        totalSpain.push(element.total);
                        maleSpain.push(element.male);
                        femaleSpain.push(element.female);
                    }
                    if(element.country == "Honduras"){
                        totalHonduras.push(element.total);
                        maleHonduras.push(element.male);
                        femaleHonduras.push(element.female);
                    }
                    if(element.country == "Israel"){
                        totalIsrael.push(element.total);
                        maleIsrael.push(element.male);
                        femaleIsrael.push(element.female);
                    }
                    if(element.country == "Mauricio"){
                        totalMauricio.push(element.total);
                        maleMauricio.push(element.male);
                        femaleMauricio.push(element.female);
                    }
                    if(element.country == "Colombia"){
                        totalColombia.push(element.total);
                        maleColombia.push(element.male);
                        femaleColombia.push(element.female);
                    }
                    if(element.country == "Cyprus"){
                        totalCyprus.push(element.total);
                        maleCyprus.push(element.male);
                        femaleCyprus.push(element.female);
                    }
                    if(element.country == "Maldivas"){
                        totalMaldivas.push(element.total);
                        maleMaldivas.push(element.male);
                        femaleMaldivas.push(element.female);
                    }
                    if(element.country == " Rwanda"){
                        totalRwanda.push(element.total);
                        maleRwanda.push(element.male);
                        femaleRwanda.push(element.female);
                    }
                    if(element.country == "Afganistan"){
                        totalAfganistan.push(element.total);
                        maleAfganistan.push(element.male);
                        femaleAfganistan.push(element.female);
                    }
                    if(element.country == "Chad"){
                        totalChad.push(element.total);
                        maleChad.push(element.male);
                        femaleChad.push(element.female);
                    }
                    if(element.country == "Argentina"){
                        totalArgentina.push(element.total);
                        maleArgentina.push(element.male);
                        femaleArgentina.push(element.female);
                    }
                    else{
                        totalOthers.push(element.total);
                        maleOthers.push(element.male);
                        femaleOthers.push(element.female);
                    }
                    
                }
                if(element.year == "2017"){
                    pais2017.push(element.country);
                    if(element.country == "Japan"){
                        totalJapan.push(element.total);
                        maleJapan.push(element.male);
                        femaleJapan.push(element.female);
                    }
                    if(element.country == "Mexico"){
                        totalMexico.push(element.total);
                        maleMexico.push(element.male);
                        femaleMexico.push(element.female);
                    }
                    if(element.country == "Albania"){
                        totalAlbania.push(element.total);
                        maleAlbania.push(element.male);
                        femaleAlbania.push(element.female);
                    }
                    if(element.country == "Spain"){
                        totalSpain.push(element.total);
                        maleSpain.push(element.male);
                        femaleSpain.push(element.female);
                    }
                    if(element.country == "Honduras"){
                        totalHonduras.push(element.total);
                        maleHonduras.push(element.male);
                        femaleHonduras.push(element.female);
                    }
                    if(element.country == "Israel"){
                        totalIsrael.push(element.total);
                        maleIsrael.push(element.male);
                        femaleIsrael.push(element.female);
                    }
                    if(element.country == "Mauricio"){
                        totalMauricio.push(element.total);
                        maleMauricio.push(element.male);
                        femaleMauricio.push(element.female);
                    }
                    if(element.country == "Colombia"){
                        totalColombia.push(element.total);
                        maleColombia.push(element.male);
                        femaleColombia.push(element.female);
                    }
                    if(element.country == "Cyprus"){
                        totalCyprus.push(element.total);
                        maleCyprus.push(element.male);
                        femaleCyprus.push(element.female);
                    }
                    if(element.country == "Maldivas"){
                        totalMaldivas.push(element.total);
                        maleMaldivas.push(element.male);
                        femaleMaldivas.push(element.female);
                    }
                    if(element.country == " Rwanda"){
                        totalRwanda.push(element.total);
                        maleRwanda.push(element.male);
                        femaleRwanda.push(element.female);
                    }
                    if(element.country == "Afganistan"){
                        totalAfganistan.push(element.total);
                        maleAfganistan.push(element.male);
                        femaleAfganistan.push(element.female);
                    }
                    if(element.country == "Chad"){
                        totalChad.push(element.total);
                        maleChad.push(element.male);
                        femaleChad.push(element.female);
                    }
                    if(element.country == "Argentina"){
                        totalArgentina.push(element.total);
                        maleArgentina.push(element.male);
                        femaleArgentina.push(element.female);
                    }
                    else{
                        totalOthers.push(element.total);
                        maleOthers.push(element.male);
                        femaleOthers.push(element.female);
                    }
                    
                }
                if(element.year == "2018"){
                    pais2018.push(element.country);
                    if(element.country == "Japan"){
                        totalJapan.push(element.total);
                        maleJapan.push(element.male);
                        femaleJapan.push(element.female);
                    }
                    if(element.country == "Mexico"){
                        totalMexico.push(element.total);
                        maleMexico.push(element.male);
                        femaleMexico.push(element.female);
                    }
                    if(element.country == "Albania"){
                        totalAlbania.push(element.total);
                        maleAlbania.push(element.male);
                        femaleAlbania.push(element.female);
                    }
                    if(element.country == "Spain"){
                        totalSpain.push(element.total);
                        maleSpain.push(element.male);
                        femaleSpain.push(element.female);
                    }
                    if(element.country == "Honduras"){
                        totalHonduras.push(element.total);
                        maleHonduras.push(element.male);
                        femaleHonduras.push(element.female);
                    }
                    if(element.country == "Israel"){
                        totalIsrael.push(element.total);
                        maleIsrael.push(element.male);
                        femaleIsrael.push(element.female);
                    }
                    if(element.country == "Mauricio"){
                        totalMauricio.push(element.total);
                        maleMauricio.push(element.male);
                        femaleMauricio.push(element.female);
                    }
                    if(element.country == "Colombia"){
                        totalColombia.push(element.total);
                        maleColombia.push(element.male);
                        femaleColombia.push(element.female);
                    }
                    if(element.country == "Cyprus"){
                        totalCyprus.push(element.total);
                        maleCyprus.push(element.male);
                        femaleCyprus.push(element.female);
                    }
                    if(element.country == "Maldivas"){
                        totalMaldivas.push(element.total);
                        maleMaldivas.push(element.male);
                        femaleMaldivas.push(element.female);
                    }
                    if(element.country == "Rwanda"){
                        totalRwanda.push(element.total);
                        maleRwanda.push(element.male);
                        femaleRwanda.push(element.female);
                    }
                    if(element.country == "Afganistan"){
                        totalAfganistan.push(element.total);
                        maleAfganistan.push(element.male);
                        femaleAfganistan.push(element.female);
                    }
                    if(element.country == "Chad"){
                        totalChad.push(element.total);
                        maleChad.push(element.male);
                        femaleChad.push(element.female);
                    }
                    if(element.country == "Argentina"){
                        totalArgentina.push(element.total);
                        maleArgentina.push(element.male);
                        femaleArgentina.push(element.female);
                    }
                    else{
                        totalOthers.push(element.total);
                        maleOthers.push(element.male);
                        femaleOthers.push(element.female);
                    }
                    
                }
                if(element.year == "2019"){
                    pais2019.push(element.country);
                    if(element.country == "Japan"){
                        totalJapan.push(element.total);
                        maleJapan.push(element.male);
                        femaleJapan.push(element.female);
                    }
                    if(element.country == "Mexico"){
                       totalMexico.push(element.total);
                       maleMexico.push(element.male);
                       femaleMexico.push(element.female);
                   }
                   if(element.country == "Albania"){
                       totalAlbania.push(element.total);
                       maleAlbania.push(element.male);
                       femaleAlbania.push(element.female);
                   }
                   if(element.country == "Spain"){
                       totalSpain.push(element.total);
                       maleSpain.push(element.male);
                       femaleSpain.push(element.female);
                   }
                   if(element.country == "Honduras"){
                       totalHonduras.push(element.total);
                       maleHonduras.push(element.male);
                       femaleHonduras.push(element.female);
                   }
                   if(element.country == "Israel"){
                       totalIsrael.push(element.total);
                       maleIsrael.push(element.male);
                       femaleIsrael.push(element.female);
                   }
                   if(element.country == "Mauricio"){
                       totalMauricio.push(element.total);
                       maleMauricio.push(element.male);
                       femaleMauricio.push(element.female);
                   }
                   if(element.country == "Colombia"){
                       totalColombia.push(element.total);
                       maleColombia.push(element.male);
                       femaleColombia.push(element.female);
                   }
                   if(element.country == "Cyprus"){
                       totalCyprus.push(element.total);
                       maleCyprus.push(element.male);
                       femaleCyprus.push(element.female);
                   }
                   if(element.country == "Maldivas"){
                       totalMaldivas.push(element.total);
                       maleMaldivas.push(element.male);
                       femaleMaldivas.push(element.female);
                   }
                   if(element.country == "Rwanda"){
                       totalRwanda.push(element.total);
                       maleRwanda.push(element.male);
                       femaleRwanda.push(element.female);
                   }
                   if(element.country == "Afganistan"){
                       totalAfganistan.push(element.total);
                       maleAfganistan.push(element.male);
                       femaleAfganistan.push(element.female);
                   }
                   if(element.country == "Chad"){
                       totalChad.push(element.total);
                       maleChad.push(element.male);
                       femaleChad.push(element.female);
                   }
                   if(element.country == "Argentina"){
                       totalArgentina.push(element.total);
                       maleArgentina.push(element.male);
                       femaleArgentina.push(element.female);
                   }
                   else{
                       totalOthers.push(element.total);
                       maleOthers.push(element.male);
                       femaleOthers.push(element.female);
                   }
                

                    
                }
                if(element.year == "2020"){
                    pais2020.push(element.country);
                   if(element.country == "Japan"){
                       totalJapan.push(element.total);
                       maleJapan.push(element.male);
                       femaleJapan.push(element.female);
                   }
                   if(element.country == "Mexico"){
                       totalMexico.push(element.total);
                       maleMexico.push(element.male);
                       femaleMexico.push(element.female);
                   }
                   if(element.country == "Albania"){
                       totalAlbania.push(element.total);
                       maleAlbania.push(element.male);
                       femaleAlbania.push(element.female);
                   }
                   if(element.country == "Spain"){
                       totalSpain.push(element.total);
                       maleSpain.push(element.male);
                       femaleSpain.push(element.female);
                   }
                   if(element.country == "Honduras"){
                       totalHonduras.push(element.total);
                       maleHonduras.push(element.male);
                       femaleHonduras.push(element.female);
                   }
                   if(element.country == "Israel"){
                       totalIsrael.push(element.total);
                       maleIsrael.push(element.male);
                       femaleIsrael.push(element.female);
                   }
                   if(element.country == "Mauricio"){
                       totalMauricio.push(element.total);
                       maleMauricio.push(element.male);
                       femaleMauricio.push(element.female);
                   }
                   if(element.country == "Colombia"){
                       totalColombia.push(element.total);
                       maleColombia.push(element.male);
                       femaleColombia.push(element.female);
                   }
                   if(element.country == "Cyprus"){
                       totalCyprus.push(element.total);
                       maleCyprus.push(element.male);
                       femaleCyprus.push(element.female);
                   }
                   if(element.country == "Maldivas"){
                       totalMaldivas.push(element.total);
                       maleMaldivas.push(element.male);
                       femaleMaldivas.push(element.female);
                   }
                   if(element.country == "Rwanda"){
                       totalRwanda.push(element.total);
                       maleRwanda.push(element.male);
                       femaleRwanda.push(element.female);
                   }
                   if(element.country == "Afganistan"){
                       totalAfganistan.push(element.total);
                       maleAfganistan.push(element.male);
                       femaleAfganistan.push(element.female);
                   }
                   if(element.country == "Chad"){
                       totalChad.push(element.total);
                       maleChad.push(element.male);
                       femaleChad.push(element.female);
                   }
                   if(element.country == "Argentina"){
                       totalArgentina.push(element.total);
                       maleArgentina.push(element.male);
                       femaleArgentina.push(element.female);
                   }
                   else{
                       totalOthers.push(element.total);
                       maleOthers.push(element.male);
                       femaleOthers.push(element.female);
                   }
                   
                }
                

            });
            

            

        
            const dataSource = {
                chart: {
                    caption: "Reach of Social Media Platforms amoung youth",
                    yaxisname: "% of youth on this platform",
                    subcaption: "2012-2016",
                    showhovereffect: "1",
                    numbersuffix: "%",
                    drawcrossline: "1",
                    plottooltext: "<b>$dataValue</b> of youth were on $seriesName",
                    theme: "fusion"
                },
                categories: [
                    {
                    category: [
                        {
                        label: "2015"
                        },
                        {
                        label: "2016"
                        },
                        {
                        label: "2017"
                        },
                        {
                        label: "2018"
                        },
                        {
                        label: "2019"
                        },
                        {
                        label: "2020"
                        }
                    ]
                    }
                ],
                dataset: [
                    {
                    seriesname: "Japan Total",
                    data: [
                        {
                        value: totalJapan[0]
                        },
                        {
                        value: totalJapan[1]
                        },
                        {
                        value: totalJapan[2]
                        },
                        {
                        value: totalJapan[3]
                        },
                        {
                        value: totalJapan[4]
                        }
                    ]
                    },
                    {
                    seriesname: "Japan Male",
                    data: [
                        {
                        value: maleJapan[0]
                        },
                        {
                        value: maleJapan[1]
                        },
                        {
                        value: maleJapan[2]
                        },
                        {
                        value: maleJapan[3]
                        },
                        {
                        value: maleJapan[4]
                        }
                    ]
                    },
                    {
                    seriesname: "Japan Female",
                    data: [
                        {
                        value: femaleJapan[0]
                        },
                        {
                        value: femaleJapan[1]
                        },
                        {
                        value: femaleJapan[2]
                        },
                        {
                        value: femaleJapan[3]
                        },
                        {
                        value: femaleJapan[4]
                        }
                    ]
                    },
                    {
                    seriesname: "Mexico Total",
                    data: [
                        {
                        value: totalMexico[0]
                        },
                        {
                        value: totalMexico[1]
                        },
                        {
                        value: totalMexico[2]
                        },
                        {
                        value: totalMexico[3]
                        },
                        {
                        value: totalMexico[4]
                        }
                    ]
                    },
                    {
                    seriesname: "Mexico Male",
                    data: [
                        {
                        value: maleMexico[0]
                        },
                        {
                        value: maleMexico[1]
                        },
                        {
                        value: maleMexico[2]
                        },
                        {
                        value: maleMexico[3]
                        },
                        {
                        value: maleMexico[4]
                        }
                    ]
                    },
                    {
                    seriesname: "Mexico Female",
                    data: [
                        {
                        value: femaleMexico[0]
                        },
                        {
                        value: femaleMexico[1]
                        },
                        {
                        value: femaleMexico[2]
                        },
                        {
                        value: femaleMexico[3]
                        },
                        {
                        value: femaleMexico[4]
                        }
                    ]
                    },
                    {
                    seriesname: "Albania Total",
                    data: [
                        {
                        value: totalAlbania[0]
                        },
                        {
                        value: totalAlbania[1]
                        },
                        {
                        value: totalAlbania[2]
                        },
                        {
                        value: totalAlbania[3]
                        },
                        {
                        value: totalAlbania[4]
                        }
                    ]
                    },
                    {
                    seriesname: "Albania Male",
                    data: [
                        {
                        value: maleAlbania[0]
                        },
                        {
                        value: maleAlbania[1]
                        },
                        {
                        value: maleAlbania[2]
                        },
                        {
                        value: maleAlbania[3]
                        },
                        {
                        value: maleAlbania[4]
                        }
                    ]
                    },
                    {
                    seriesname: "Albania Female",
                    data: [
                        {
                        value: femaleJapan[0]
                        },
                        {
                        value: femaleJapan[1]
                        },
                        {
                        value: femaleJapan[2]
                        },
                        {
                        value: femaleJapan[3]
                        },
                        {
                        value: femaleJapan[4]
                        }
                    ]
                    },
                    {
                    seriesname: "Spain Total",
                    data: [
                        {
                        value: totalSpain[0]
                        },
                        {
                        value: totalSpain[1]
                        },
                        {
                        value: totalSpain[2]
                        },
                        {
                        value: totalSpain[3]
                        },
                        {
                        value: totalSpain[4]
                        }
                    ]
                    },
                    {
                    seriesname: "Spain Male",
                    data: [
                        {
                        value: maleSpain[0]
                        },
                        {
                        value: maleSpain[1]
                        },
                        {
                        value: maleSpain[2]
                        },
                        {
                        value: maleSpain[3]
                        },
                        {
                        value: maleSpain[4]
                        }
                    ]
                    },
                    {
                    seriesname: "Spain Female",
                    data: [
                        {
                        value: femaleSpain[0]
                        },
                        {
                        value: femaleSpain[1]
                        },
                        {
                        value: femaleSpain[2]
                        },
                        {
                        value: femaleSpain[3]
                        },
                        {
                        value: femaleSpain[4]
                        }
                    ]
                    },
                    {
                    seriesname: "Honduras Total",
                    data: [
                        {
                        value: totalHonduras[0]
                        },
                        {
                        value: totalHonduras[1]
                        },
                        {},
                        {
                        value: totalHonduras[2]
                        },
                        {
                        value: totalHonduras[3]
                        },
                        {
                        value: totalHonduras[4]
                        }
                    ]
                    },
                    {
                    seriesname: "Honduras Male",
                    data: [
                        {
                        value: maleHonduras[0]
                        },
                        {
                        value: maleHonduras[1]
                        },
                        {},
                        {
                        value: maleHonduras[2]
                        },
                        {
                        value: maleHonduras[3]
                        },
                        {
                        value: maleHonduras[4]
                        }
                    ]
                    },
                    {
                    seriesname: "Honduras Female",
                    data: [
                        {
                        value: femaleHonduras[0]
                        },
                        {
                        value: femaleHonduras[1]
                        },
                        {},
                        {
                        value: femaleHonduras[2]
                        },
                        {
                        value: femaleHonduras[3]
                        },
                        {
                        value: femaleHonduras[4]
                        }
                    ]
                    },
                    {
                    seriesname: "Israel Total",
                    data: [
                        {
                        value: totalIsrael[0]
                        },
                        {
                        value: totalIsrael[1]
                        },
                        {
                        value: totalIsrael[2]
                        },
                        {
                        value: totalIsrael[3]
                        },
                        {
                        value: totalIsrael[4]
                        }
                    ]
                    },
                    {
                    seriesname: "Israel Male",
                    data: [
                        {
                        value: maleIsrael[0]
                        },
                        {
                        value: maleIsrael[1]
                        },
                        {
                        value: maleIsrael[2]
                        },
                        {
                        value: maleIsrael[3]
                        },
                        {
                        value: maleIsrael[4]
                        }
                    ]
                    },
                    {
                    seriesname: "Israel Female",
                    data: [
                        {
                        value: femaleIsrael[0]
                        },
                        {
                        value: femaleIsrael[1]
                        },
                        {
                        value: femaleIsrael[2]
                        },
                        {
                        value: femaleIsrael[3]
                        },
                        {
                        value: femaleIsrael[4]
                        }
                    ]
                    },
                    {
                    seriesname: "Mauricio Total",
                    data: [
                        {
                        value: totalMauricio[0]
                        },
                        {
                        value: totalMauricio[1]
                        },
                        {
                        value: totalMauricio[2]
                        },
                        {
                        value: totalMauricio[3]
                        },
                        {
                        value: totalMauricio[4]
                        }
                    ]
                    },
                    {
                    seriesname: "Mauricio Male",
                    data: [
                        {
                        value: maleMauricio[0]
                        },
                        {
                        value: maleMauricio[1]
                        },
                        {
                        value: maleMauricio[2]
                        },
                        {
                        value: maleMauricio[3]
                        },
                        {
                        value: maleMauricio[4]
                        }
                    ]
                    },
                    {
                    seriesname: "Mauricio Female",
                    data: [
                        {
                        value: femaleMauricio[0]
                        },
                        {
                        value: femaleMauricio[1]
                        },
                        {
                        value: femaleMauricio[2]
                        },
                        {
                        value: femaleMauricio[3]
                        },
                        {
                        value: femaleMauricio[4]
                        }
                    ]
                    },
                    {
                    seriesname: "Colombia Total",
                    data: [
                        {
                        value: totalColombia[0]
                        },
                        {
                        value: totalColombia[1]
                        },
                        {
                        value: totalColombia[2]
                        },
                        {
                        value: totalColombia[3]
                        }
                    ]
                    },
                    {
                    seriesname: "Colombia Male",
                    data: [
                        {
                        value: maleColombia[0]
                        },
                        {
                        value: maleColombia[1]
                        },
                        {
                        value: maleColombia[2]
                        },
                        {
                        value: maleColombia[3]
                        }
                    ]
                    },
                    {
                    seriesname: "Colombia Female",
                    data: [
                        {
                        value: femaleColombia[0]
                        },
                        {
                        value: femaleColombia[1]
                        },
                        {
                        value: femaleColombia[2]
                        },
                        {
                        value: femaleColombia[3]
                        }
                    ]
                    },
                    {
                    seriesname: "Cyprus Total",
                    data: [
                        {
                        value: totalCyprus[0]
                        },
                        {
                        value: totalCyprus[1]
                        },
                        {
                        value: totalCyprus[2]
                        },
                        {
                        value: totalCyprus[3]
                        },
                        {
                        value: totalCyprus[4]
                        }
                    ]
                    },
                    {
                    seriesname: "Cyprus Male",
                    data: [
                        {
                        value: maleCyprus[0]
                        },
                        {
                        value: maleCyprus[1]
                        },
                        {
                        value: maleCyprus[2]
                        },
                        {
                        value: maleCyprus[3]
                        },
                        {
                        value: maleCyprus[4]
                        }
                    ]
                    },
                    {
                    seriesname: "Cyprus Female",
                    data: [
                        {
                        value: femaleCyprus[0]
                        },
                        {
                        value: femaleCyprus[1]
                        },
                        {
                        value: femaleCyprus[2]
                        },
                        {
                        value: femaleCyprus[3]
                        },
                        {
                        value: femaleCyprus[4]
                        }
                    ]
                    },
                    {
                    seriesname: "Maldivas Total",
                    data: [
                        {
                        value: totalMaldivas[0]
                        },
                        {
                        value: totalMaldivas[1]
                        },
                        {
                        value: totalMaldivas[2]
                        },
                        {
                        value: totalMaldivas[3]
                        },
                        {
                        value: totalMaldivas[4]
                        }
                    ]
                    },
                    {
                    seriesname: "Maldivas Male",
                    data: [
                        {
                        value: maleMaldivas[0]
                        },
                        {
                        value: maleMaldivas[1]
                        },
                        {
                        value: maleMaldivas[2]
                        },
                        {
                        value: maleMaldivas[3]
                        },
                        {
                        value: maleMaldivas[4]
                        }
                    ]
                    },
                    {
                    seriesname: "Maldivas Female",
                    data: [
                        {
                        value: femaleMaldivas[0]
                        },
                        {
                        value: femaleMaldivas[1]
                        },
                        {
                        value: femaleMaldivas[2]
                        },
                        {
                        value: femaleMaldivas[3]
                        },
                        {
                        value: femaleMaldivas[4]
                        }
                    ]
                    },
                    {
                    seriesname: "Rwanda Total",
                    data: [
                        {},
                        {},
                        {},
                        {
                        value: totalRwanda[0]
                        },
                        {
                        value: totalRwanda[1]
                        
                        }
                    ]
                    },
                    
                    {
                    seriesname: "Rwanda Male",
                    data: [
                        {},
                        {},
                        {},
                        {
                        value: maleRwanda[0]
                        },
                        {
                        value: maleRwanda[1]
                        }
                    ]
                    },
                    {
                    seriesname: "Rwanda Female",
                    data: [
                        {},
                        {},
                        {},
                        {
                        value: femaleRwanda[0]
                        },
                        {
                        value: femaleRwanda[1]
                        }
                    ]
                    },
                    {
                    seriesname: "Afganistan Total",
                    data: [
                        {},
                        {},
                        {
                        value: totalAfganistan[0]
                        },
                        {},
                        {
                        value: totalAfganistan[1]
                        }
                    ]
                    },
                    {
                    seriesname: "Afganistan Male",
                    data: [
                        {},
                        {},
                        {
                        value: maleAfganistan[0]
                        },
                        {},
                        {
                        value: maleAfganistan[1]
                        }
                    ]
                    },
                    {
                    seriesname: "Afganistan Female",
                    data: [
                        {},
                        {},
                        {
                        value: femaleAfganistan[0]
                        },
                        {},
                        {
                        value: femaleAfganistan[1]
                        }
                    ]
                    },
                    {
                    seriesname: "Chad Total",
                    data: [
                        {
                        value: totalChad[0]
                        },
                        {
                        },
                        {
                        },
                        {
                        },
                        {
                        }
                    ]
                    },
                    {
                    seriesname: "Chad Male",
                    data: [
                        {
                        value: maleChad[0]
                        },
                        {
                        },
                        {
                        },
                        {
                        },
                        {
                        }
                    ]
                    },
                    {
                    seriesname: "Chad Female",
                    data: [
                        {
                        value: femaleChad[0]
                        },
                        {
                        },
                        {
                        },
                        {
                        },
                        {
                        }
                    ]
                    },
                    {
                    seriesname: "Argentina Total",
                    data: [
                        {
                        value: totalArgentina[0]
                        },
                        {},
                        {},
                        {},
                        {
                        value: totalArgentina[1]
                        }
                    ]
                    },
                    {
                    seriesname: "Argentina Male",
                    data: [
                        {
                        value: maleArgentina[0]
                        },
                        {},
                        {},
                        {},
                        {
                        value: maleArgentina[1]
                        }
                    ]
                    },
                    {
                    seriesname: "Argentina Female",
                    data: [
                        {
                        value: femaleArgentina[0]
                        },
                        {},
                        {},
                        {},
                        {
                        value: femaleArgentina[1]
                        }
                    ]
                    }
                    
                ]
            };

            
        

            loadGraph();
        }else{
            window.alert("No hay datos cargados");
            console.log("INTERNAL FATAL ERROR");
            window.location.href ='/#/proportion-stats';
        }
    }
    
    async function loadGraph(){
        const chartConfigs = {
            type: 'msline',
            width: 600,
            height: 400,
            dataFormat: 'json',
            dataSource
        };
    }

        

 onMount(getSearch);


</script>

{#if errorC === 404}
<UncontrolledAlert  color="danger" >
    El país introducido no tiene registros.
</UncontrolledAlert>
{/if}

    <div align="center">
            <h3>Buscar otro País</h3>
            <input
                type="text"
                style="text-align : center;  border-radius: 5px;"
                bind:value={country}
            />
            <Button outline color="success"
                on:click={() => {
                    window.location.href = `/#/energy-consumptions/graph/${country}`;
                    location.reload();
                }}
            >
                Buscar
            </Button>
            <Button outline color="warning" on:click="{()=>{
                pop();
            }}">
            Volver
            </Button>
    </div>
    <div >
        <SvelteFC {...chartConfigs}/>
    </div>
       