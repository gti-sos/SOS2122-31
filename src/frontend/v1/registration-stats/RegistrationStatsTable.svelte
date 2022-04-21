<script>
	import { onMount } from "svelte";
	import Table from "sveltestrap/src/Table.svelte";
	import Button from "sveltestrap/src/Button.svelte";
	const BASE_API_URL = "api/v1";
	let registrations = [];
	let newRegistration = {
		country: "",
		year:"",
		primarylevel:"",
        secondarylevel:"",
        tertiarylevel:""
	}
	let errorMsg = "";
	let okMsg = "";
	let visible = false;
	let visibleOk = false;
	onMount(getRegistrations);

	async function getRegistrations(){
        console.log("Fetching entries....");
        const res = await fetch("/api/v1/registration-stats/"); 
        if(res.ok){
            const data = await res.json();
            registrations = data;
            console.log("Received entries: "+registrations.length);
        }
    }

    async function insertRegistration(){
		console.log("Inserting registration...." +JSON.stringify(newRegistration));
		const res = await fetch("/api/v1/registration-stats/",
			{
				method:"POST",
				body: JSON.stringify(newRegistration),
				headers: {
					"Content-Type": "application/json"
				}
			}).then(function(res){
				if(res.ok){
				console.log("Ok.");
				getReg();
				okMsg = "Actualización correcta";
				visibleOk=true;
				visible=false;
				
			}else{
				if(res.status === 404){
					errorMsg ="El dato no ha sido encontrado";
					visibleOk=false;
					visible=true;
					window.alert("ERROR!" + errorMsg);
				}
				if(res.status===409){
					errorMsg ="El dato solicitado ya existe";
					visibleOk=false;
					visible=true;
					window.alert("ERROR!" + errorMsg);
				}
			}
			
			getReg();
			window.alert("ERROR!" + errorMsg);
			}); //con await esperemos a que haya conectado a la api
	}

	async function BorrarRegis(countryDel, yearDel) {
        
        const res = await fetch(BASE_API_URL + "/registration-stats"+ "/" + countryDel + "/" + yearDel, {
            method: "DELETE"
        }).then(function (res) {
            visible = true;
            getRegistrations();      
            if (res.status==200) {
                errorMsg = "Recurso "+countryDel +" " + yearDel+ " borrado correctamente";
                console.log("Deleted " + countryDel);            
            } else if (res.status==404) {
                errorMsg = "No se ha encontrado el objeto " + countryDel;
                console.log("Resource NOT FOUND");            
            } else {
                errorMsg= res.status + ": " + "No se pudo borrar el recurso";
                console.log("ERROR!");
            }      
        });
    }
	async function BorrarRegistros() {
    	console.log("Deleting all data");
   		
		const res = await fetch(BASE_API_URL +"/registration-stats",{
								method: "DELETE"
								
							}).then( function (res) {
							if(res.ok){
								getRegistrations();
								okMsg = "Todos los datos se han eliminado";
								visibleOk=true;
								visible=false;
							}else{
								errorMsg = "No hay datos que borrar";
								visibleOk=false;
								visible=true;
							}
							})
	}
	async function CargarRegistrations(){
        console.log("Loading entries....");
        const res = await fetch("/api/v1/registration-stats/loadInitialData",
			{
				method: "GET"
			}).then(function (res){
				getRegistrations();
			});
    }


</script>

<main>
	{#await registrations}
	loading
		{:then registrations}
	<Table bordered>
		<thead>
			<tr>
				<th>Country</th>
				<th>Year</th>
				<th>primarylevel</th>
				<th>secondarylevel</th>
                <th>tertiarylevel</th>
			</tr>
			
		</thead>
		<tbody>
			<tr>
				<td><input bind:value="{newRegistration.country}"></td>
				<td><input bind:value="{newRegistration.year}"></td>
				<td><input bind:value="{newRegistration.primarylevel}"></td>
                <td><input bind:value="{newRegistration.secondarylevel}"></td>
                <td><input bind:value="{newRegistration.tertiarylevel}"></td>
				<td><Button 
					outline 
					color="primary"
					on:click="{insertRegistration}">Añadir</Button></td>
			</tr>
			{#each registrations as registration}
				<tr>
					<td>{registration.country}</td>
					<td>{registration.year}</td>
					<td>{registration.primarylevel}</td>
                    <td>{registration.secondarylevel}</td>
                    <td>{registration.tertiarylevel}</td>
                    <td><Button outline color="warning" on:click={function (){
						window.location.href = `/#/registration-stats/${registration.country}/${registration.year}`
					}}>
						Editar
					</Button>
					<td><Button outline color="danger" on:click={BorrarRegis(registration.country,registration.year)}>
						Borrar
					</Button>
					</td>
				</tr>
			{/each}
            <tr>
				<td><Button outline color="success" on:click={CargarRegistrations}>
					Cargar datos
				</Button></td>
				<td><Button outline color="danger" on:click={BorrarRegistros}>
					Borrar todo
				</Button></td>
			</tr>
		</tbody>
		
	</Table>
	{/await}
</main>