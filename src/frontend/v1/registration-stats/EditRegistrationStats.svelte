<script>
    import {onMount} from "svelte";
    import {pop} from "svelte-spa-router";
    import Alert from 'sveltestrap/src/Alert.svelte';
    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";
	
	const BASE_API_URL = "/api/v1";
    export let params = {};
    let registration = {};
	let upcountry = "";
	let upyear = "";
	let upprimarylevel = "";
	let upsecondarylevel = "";
	let uptertiarylevel = "";
    let errorMsg = "";
 	let okMsg = "";
	let visible = false;
	let visibleOk = false;

    onMount(getReg);

    async function getReg() {
        console.log("Fetching data..." + params.country + " " + params.year);
        const res = await fetch(BASE_API_URL +"/registration-stats/" + params.country +"/" + params.year);
        if (res.ok) {
            console.log("Ok:");
            const json = await res.json();
            registration = json;
			
			upcountry = registration.country;
            upyear = parseInt(registration.year);
			upprimarylevel = parseInt(registration.primarylevel);
            upsecondarylevel = parseInt(registration.secondarylevel);
	 		uptertiarylevel = parseInt(registration.tertiarylevel);
			
			console.log(JSON.stringify(registration));
            console.log("Received data.");
        } else {
			if(res.status === 404){
            	errorMsg = `No existe dato con Ciudad: ${params.country} y fecha: ${params.year}`;
            	console.log("ERROR!" + errorMsg);
				visibleOk=false;
				visible=true;
                pop();
			} else if (res.status === 500) {
        		errorMsg = "No se han podido acceder a la base de datos";
                pop();
      		}
			
      		console.log("ERROR!" + errorMsg);
        }
    }
    async function updateReg() {
        console.log("Updating data..." + JSON.stringify(params.country) + ", " + JSON.stringify(params.year));
		let year = parseInt(params.year);
		
		
        const res = await fetch(BASE_API_URL +"/registration-stats/" + params.country +"/" + params.year, {
            method: "PUT",
            body: JSON.stringify({
               	country: params.country,
          		year: year,
          		primarylevel: parseInt(upprimarylevel),
          		secondarylevel: parseInt(upsecondarylevel),
          		tertiarylevel: parseInt(uptertiarylevel)
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (res) {
			if(res.ok){
				console.log("Ok.");
				okMsg = "Actualización correcta";
                pop();
				visibleOk=true;
				visible=false;
				
			}else{
				if(res.status === 404){
					errorMsg ="El dato solicitado no existe";
					visibleOk=false;
					visible=true;
				}
			}
            
        });
    }
	
	
	
</script>

<main>
    <h3>Editar campos <strong>{params.country}</strong><strong>{params.year}</strong></h3>
    <Table bordered>
        <thead>
            <div>
                <Alert color="danger" isOpen={visible} toggle={() => (visible = false)}>
                    {#if errorMsg}
                        <p>ERROR: {errorMsg}</p>
                       {/if}
                </Alert>
                <Alert color="success" isOpen={visibleOk} toggle={() => (visibleOk = false)}>
                    {#if okMsg}
                        <p>Correcto: {okMsg}</p>
                        {/if}
                </Alert>
            </div>
        
        
            <tr>
                <th>Ciudad</th>
                <th>Año</th>
                <th>Medallas de oro</th>
                <th>Medallas de plata</th>
                <th>Medallas de bronce</th>
                <th>Acción</th>
            </tr>
        </thead>
        
        <tbody>
        
            <tr>
                <td>{upcountry}</td>
                <td>{upyear}</td>
                <td><input type=number bind:value="{upprimarylevel}"></td>
                <td><input type=number bind:value="{upsecondarylevel}"></td>
                <td><input type=number bind:value="{uptertiarylevel}"></td>
                <td><Button on:click={updateReg}>Actualizar</Button></td>
                
            </tr>
        </tbody>
    </Table>
    
    
    <Button outline color="secondary" on:click="{pop}">Volver</Button>

    </main>