<script>
    import {onMount} from "svelte";
    import {pop} from "svelte-spa-router";
    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";
	
	const colors= [
   	 	'primary',
   		'secondary',
   		 'success',
   		 'danger',
   		 'warning',
   		 'info',
   		 'light',
   		 'dark'
 	];
	
	const BASE_API_URL = "/api/v1/proportion-stats";
    export let params = {};
    let reg = {};
	let upcountry = "XXXX";
	let upYear;
	let upMale;
	let upFemale;
	let upTotal;
    let errorMsg = "";
 	let okMsg = "";
	let visible = false;
	let visibleOk = false;
    onMount(getReg);


    async function getReg() {
        console.log("Fetching data..." + params.country + " " + params.year);
        const res = await fetch(BASE_API_URL + params.country +"/" + params.year);
        if (res.ok) {
            console.log("Ok:");
            const json = await res.json();
            reg = json;
			
			upcountry = reg.country;
	 		upYear = parseInt(reg.year);
			upMale = parseInt(reg.male);
	 		upFemale = parseInt(reg.female);
	 		upTotal = parseInt(reg.total);
			
			console.log(JSON.stringify(reg));
            console.log("Received data.");
        } else {
			if(res.status === 404){
            	errorMsg = `No existe dato con Ciudad: ${params.country} y fecha: ${params.year}`;
            	console.log("ERROR!" + errorMsg);
				visibleOk=false;
				visible=true;
			} else if (res.status === 500) {
        		errorMsg = "No se han podido acceder a la base de datos";
      		}
			
      		console.log("ERROR!" + errorMsg);
        }
    }
    async function updateReg() {
        console.log("Updating data..." + JSON.stringify(params.country) + ", " + JSON.stringify(params.year));
		let year = parseInt(params.year);
		
		
        const res = await fetch(BASE_API_URL +"/proportion-stats/" + params.country  +"/" + params.year, {
            method: "PUT",
            body: JSON.stringify({
               	country: params.country,
          		year: year,
          		male: parseInt(upMale),
          		female: parseInt(upFemale),
          		total: parseInt(upTotal),
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (res) {
			if(res.ok){
				console.log("Ok.");
				getReg();
				okMsg = "Actualización correcta";
				visibleOk=true;
				visible=false;
				
			}else{
				if(res.status === 404){
					errorMsg ="El dato solicitado no existe";
					visibleOk=false;
					visible=true;
				}
			}
			
			getReg();
			console.log("ERROR!" + errorMsg);
            
        });
    }
	
	
</script>

<main>
    <h1>Editar entrada "{params.country}"/"{params.year}"</h1>
    {#await reg}
    loading
        {:then reg}
        
    
        <Table bordered>
            <thead>
                <tr>
                    <th>País</th>
                    <th>Año</th>
                    <th>Hombres</th>
                    <th>Mujeres</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{upcountry}</td>
                    <td>{upYear}</td>
                    <td><input bind:value="{upMale}"></td>
                    <td><input bind:value="{upFemale}"></td>
                    <td><input bind:value="{upTotal}"></td>
                    <td><Button outline color="dark" on:click="{updateReg}">
                        Editar
                        </Button>
                    </td>
                </tr>
            </tbody>
        </Table>
        <Button id="volver" style="background-color:darkgray" on:click="{pop}">Volver</Button>
    {/await}

    {#if errorMsg}
        <div class="alert alert-danger" role="alert">
            {errorMsg}
        </div>
    {/if}
    {#if okMsg}
        <div class="alert alert-success" role="alert">
            {okMsg}
        </div>
    {/if}
   
    
    <Button outline color="secondary" on:click="{pop}">Volver</Button>

    </main>