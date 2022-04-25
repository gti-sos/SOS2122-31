<script>
    import{onMount} from "svelte";
    import {pop} from "svelte-spa-router";
    import {Table, Button} from "sveltestrap";
    const BASE_API_URL = "api/v1/proportion-stats";


    let proportions = [];
    let errorMsg = "";
	let okMsg = "";
	let cargados = false;
    onMount(getproportions);
    
    /*pagination*/
    let limit = 10;
    let offset = 0;
    let numDataPages = 0;
    let maxPage = false;

    /*insertando datos*/
    let newproportion = {
        country: "",
        year: "",
        male: "",
        female: "",
        total: "",
    };

    /*busqueda*/
    let currentCountry = "";
    let currentYear = "";
    let search = false;
    let searchData = {
        country: "",
        year: "",
        male: "", 
        female: "",
        tota: "",
    };
	
    async function loadProportions(){
        console.log("Loading data...");
        const res = await fetch(BASE_API_URL + "loadInitialData");
        cargados = true;
        if (res.ok) {
            console.log("OK :");
            getproportions();
            errorMsg = "";
            okMsg = "Datos cargados correctamente";
            
        }
        else{
            console.log("ERROR!");
        }
    
    }

    async function getproportions() {
        if (res.ok) {
            cargados = true;
            console.log("Ok loading data...");
            const json = await res.json();
            proportions = json;
            numDataPages = proportions.length;
            if(numDataPages < limit){
                maxPage = true;
            }else{
                maxPage = false;
            }
            console.log('Received ${numDataPages} data.');
        }
        else if(res.status === 500){
            errorMsg = "No se han podido acceder a la base de datos";
            okMsg = "";
        }
        else if(res.status === 404){
            errorMsg = "No existe dato con Ciudad: ${params.country} y fecha: ${params.year}";
            okMsg = "";
        }
        else{
            errorMsg = res.status + ": " + res.statusText;
            okMsg = "";
                }

    }

    

    async function insertproportion(){
        console.log("Inserting proportion...." +JSON.stringify(newproportion) + "...");
        
        if(!newproportion.country || !newproportion.year){
            alert("Debe rellenar los campos de Pais y Año como mínimo");
        }
        else{
            const res = await fetch(BASE_API_URL, {
                method: 'POST',
                body: JSON.stringify(newproportion),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function(res){
                if(res,ok){
                    console.log ("OK");
                    getproportions();
                    errorMsg = "";
                    okMsg = "Datos insertados correctamente";
                }
                else if (res.status == 409){
                    okMsg = "";
                    errorMsg = "Ya existe un dato con esa combinación de País y Año";
                    console.log("ERROR: " + res.status + ": " + res.statusText);
                }
                else{
                    okMsg = "";
                    errorMsg = "No se ha podido insertar el dato";
                    console.log("ERROR: " + res.status + ": " + res.statusText);
                }
            });
        }
    }

    async function BorrarRegistro(countryD, yearD){
        console.log("Borrando registro...." + countryD + " " + yearD);
        const res = await fetch(BASE_API_URL+ "/" + countryD + "/" + yearD, 
        {
            method: "DELETE"
            

        }).then(function (res) {
            if(res.ok){
                okMsg = 'El dato con país: ${countryD} y año: ${year} se ha eliminado correctamente';
                errorMsg = "";
                console.log("OK: " + res.status + ": " + res.statusText);
                getproportions();
            } 
            else if(res.status == 404){
                okMsg = "";
                errorMsg = "No existe dato con esa combinación de País y Año";
                console.log("ERROR: " + res.status + ": " + res.statusText);
            }
            else{
                okMsg = "";
                errorMsg = "No se ha podido acceder a la base de datos";
                console.log("ERROR: " + res.status + ": " + res.statusText);
            }
        });
    }

    async function BorrarRegistros(){
        console.log("Deleting all data");

        cargados = false;
        const res = await fetch(BASE_API_URL, {
            method: "DELETE"
        
        }).then(function (res){
            if(res.ok){
                console.log("OK: " + res.status + ": " + res.statusText);
                proportions = [];
                errorMsg = "";
                okMsg = "Datos eliminados correctamente";

            }
            else if(res.status == 404){
                okMsg = "";
                errorMsg = "No existe dato con esa combinación de País y Año";
                console.log("ERROR: " + res.status + ": " + res.statusText);
            }
            else{
                okMsg = "";
                errorMsg = "No se ha podido acceder a la base de datos";
                console.log("ERROR: " + res.status + ": " + res.statusText);
            }
        });
    
    }

    async function BuscarProportion(country, year){
        offset = 0;
        const res = await fetch(BASE_API_URL + "/" + country + "/" + year);

        if(res.ok){
            cargados = true;
            search = true;
            okMsg = "";
            console.log("OK. Searching data...");
            const json = await res.json();
            searchData = json;
            console.log("Dato recibido: " + JSON.stringify(searchData));
        }
        else if(res.status == 500){
            okMsg = "";
            errorMsg = "No se han podido acceder a la base de datos";
            console.log("ERROR: " + res.status + ": " + res.statusText);
        }
        else if(res.status == 404){
            okMsg = "";
            errorMsg = "No existe dato con esa combinación de País y Año";
            console.log("ERROR: " + res.status + ": " + res.statusText);
        }
        else{
            okMsg = "";
            errorMsg = "No se ha podido acceder a la base de datos";
            console.log("ERROR: " + res.status + ": " + res.statusText);
        }
    }

    async function reset(){
        search= false;
    };

    async function PrevPage(){
        okMsg = "";
        errorMsg = "";
        if(offset >= 10){
            offset = offset - limit;
            
        }
        getproportions();
    }

    async function NextPage(){
        okMsg = "";
        errorMsg = "";
        offset = offset + limit;
        getproportions();
    }



</script>

<main>
    <div>
        {#if cargados}
        <Button outline color = "primary" disabled> Cargar datos iniciales </Button>
        {:else}
        <Button outline color = "primary" on:click = {loadProportions}> Cargar datos iniciales </Button>
        {/if}
        <Button outline color = "danger" on:click = {BorrarRegistros}> Borrar todos los datos </Button>

    </div>

    <h4>Búsqueda por país y año</h4>
        <Table bordered style= "text-align: center;">
            <thead>
                <tr>
                    <th>País</th>
                    <th>Año</th>
                    <th>Acciones</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td>
                        <input id="country" placeholder="País" bind:value="{currentCountry}" />
                    </td>
                    <td>
                        <input id="year" placeholder="Año" bind:value="{currentYear}" />
                    </td>
                    <td>
                        <Button id= "search_button" outline color= "info" on:click{()=>BuscarProportion(currentCountry, currentYear)}>Buscar</Button>
                        <Button style="background-color: darkgrey" on:click{()=>reset}>Restaurar</Button>
                    </td>
                </tr>
            </tbody>
        </Table>

        {#if proportions.length!= 0}
        <br/>

        <Table bordered style = "text-align: center;">
            <thead>
                <tr>
                    <th>Pais</th>
                    <th>Año</th>
                    <th>Hombres</th>
                    <th>Mujeres</th>
                    <th>Total</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td><input id="insert_input_country" placeholder="Ej. España" bind:value="{newproportion.country}"></td>
                    <td><input id="insert_input_year" placeholder="Ej. 2018" bind:value="{newproportion.year}"></td>
                    <td><input id="insert_male" placeholder="Ej. 23" bind:value="{newproportion.male}"></td>
                    <td><input id="insert_female" placeholder="Ej. 23" bind:value="{newproportion.female}"></td>
                    <td><input id="insert_total" placeholder="Ej. 23" bind:value="{newproportion.total}"></td>

                    <td><Button id="insert_button" outline color= "primary" on:click{insertproportion}>Insertar</Button></td>


                </tr>

                {#if search}
                <tr>
                    <td>{searchData.country}</td>
                    <td>{searchData.year}</td>
                    <td><a href="#/proportion-stats/{searchData.country}/{searchData.date}">
                    <Button id="edit_button_{searchData.country}_{searchData.year}" style="background-color:yellowgreen">Editar</Button></a>
                    <Button id="delete_button"_{searchData.country}_{searchData.year}" style="margin-right: 10px" color="danger" on:click{()=>BorrarRegistro(searchData.country, searchData.year)}>Borrar</Button>
                </td>

                
                </tr>

                {:else}
                    {#each proportions as proportion} 
                    <tr>
                        <td>{proportion.country}</td>
                        <td>{proportion.year}</td>
                        <td>{proportion["male"]}</td>
                        <td>{proportion["female"]}</td>
                        <td>{proportion["total"]}</td>

                        <td><a href="#/proportion-stats"{proportion.country}/{proportion.year}>
                            <Button 
                            id="edit_button_{proportion.country}_{proportion.year}" style="background-color: yellowgreen;"> Editar </Button>
                            </a>
                            <Button id="delete_button_{proportion.country}_{proportion.year}" outline style="margin-right: 10px;"  color="danger" on:click={()=>deleteLifeStat(proportion.country, proportion.year)}>
                            Borrar </Button> 
                            </td> 
                        </td>
                        
                    {/each}

                {/if}
            </tbody>

        </Table>


        {#if maxPage} <!--si hemos llegado al maximo de paginas, no saldrá el botón siguiente-->
            <Button color="info" on:click={PrevPage}>ANTERIOR</Button>        
                Número de datos en esta página: {numDataPages}
            
        {:else}
            <Button color="info" on:click={PrevPage}>ANTERIOR</Button>        
            Número de datos en esta página: {numDataPages}       
            <Button color="info" on:click={NextPage}>SIGUIENTE</Button>      
            
        {/if}

        <br/> <br/><Button style="background-color:darkgray " on:click="{pop}"> Volver </Button>

        {:else}
            <br/>
            <p class="inicio"> Para ver los datos cárguelos.</p>
                
            <Button style="background-color:darkgray" on:click="{pop}"> Volver </Button>
        {/if}

        {#if errorMsg}
                <p class="error">ERROR: {errorMsg}</p>
        {/if}
        {#if okMsg}
                <p class="correcto">{okMsg}</p>
        {/if} 

</main>