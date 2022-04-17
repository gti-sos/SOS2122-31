<script>
	import { onMount } from "svelte";
	import Table from "sveltestrap/src/Table.svelte";
	import Button from "sveltestrap/src/Button.svelte";
	
	let registrations = [];
	let newRegistration = {
		country: "",
		year:"",
		primarylevel:"",
        secondarylevel:"",
        tertiarylevel:""
	}
	let loading = true;
	onMount(getRegistrations);

	async function getRegistrations(){
		console.log("Fetching contacts....");
		const res = await fetch("/api/v1/registration-stats"); //con await esperemos a que haya conectado a la api
		if(res.ok){
			const data = await res.json();
			registrations = data;
			console.log("Recived contacts:" + registrations.length);
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
				getRegistrations();
			}); //con await esperemos a que haya conectado a la api
	}

    async function BorrarRegistration(countryDelete, yearDelete){
        console.log("Deleting registration....");
        const res = await fetch("/api/v1/registration-stats/"+ countryDelete +"/"+ yearDelete,
			{
				method: "DELETE"
			}).then(function (res){
                if(res.status == 201){
					getRegistrations();
					window.alert("Entrada introducida con éxito");
				}else{
					Errores(res.status);
				}
			});
    }
	async function BorrarRegistrations(){
        console.log("Deleting registrations....");
        const res = await fetch("/api/v1/registration-stats/",
			{
				method: "DELETE"
			}).then(function (res){
				getRegistrations();
                window.alert("Entradas elimidas con éxito");
			});
    }
	async function CargarRegistrations(){
        console.log("Loading registrations....");
        const res = await fetch("/api/v1/registration-stats/loadInitialData",
			{
				method: "GET"
			}).then(function (res){
				getRegistrations();
                window.alert("Entradas cargadas con éxito");
			});
    }


    async function Errores(code){
        
        let msg;
        if(code == 404){
            msg = "La entrada seleccionada no existe"
        }
        if(code == 400){
            msg = "La petición no está correctamente formulada"
        }
        if(code == 409){
            msg = "El dato introducido ya existe"
        }
        if(code == 401){
            msg = "No autorizado"
        }
        if(code == 405){
            msg = "Método no permitido"
        }
        window.alert(msg)
            return;
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
					<td><Button outline color="danger" on:click={BorrarRegistration(registration.country,registration.year)}>
						Borrar
					</Button>
					</td>
				</tr>
			{/each}
            <tr>
				<td><Button outline color="success" on:click={CargarRegistrations}>
					Cargar datos
				</Button></td>
				<td><Button outline color="danger" on:click={BorrarRegistrations}>
					Borrar todo
				</Button></td>
			</tr>
		</tbody>
		
	</Table>
	{/await}
</main>