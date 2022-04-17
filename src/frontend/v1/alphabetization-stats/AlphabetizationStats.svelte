<script>
	import { onMount } from "svelte";
	import Table from "sveltestrap/src/Table.svelte";
	import Button from "sveltestrap/src/Button.svelte";
	const BASE_API_URL = "api/v1";
	let alphabetizations = [];
	let newalphabetization = {
		country: "",
		year:"",
		ar_ym:"",
        ar_yw:"",
        ar_ty:""
	}
	let errorMsg = "";
	let okMsg = "";
	let visible = false;
	let visibleOk = false;
	onMount(getalphabetizations);

	async function getalphabetizations(){
        console.log("Fetching entries....");
        const res = await fetch("/api/v1/alphabetization-stats/"); 
        if(res.ok){
            const data = await res.json();
            alphabetizations = data;
            console.log("Received entries: "+alphabetizations.length);
        }
    }

    async function insertalphabetization(){
		console.log("Inserting alphabetization...." +JSON.stringify(newalphabetization));
		const res = await fetch("/api/v1/alphabetization-stats/",
			{
				method:"POST",
				body: JSON.stringify(newalphabetization),
				headers: {
					"Content-Type": "application/json"
				}
			}).then(function(res){
				getalphabetizations();
			}); //con await esperemos a que haya conectado a la api
	}

	async function BorrarRegis(countryD, yearD) {
        
        const res = await fetch(BASE_API_URL + "/alphabetization-stats"+ "/" + countryD + "/" + yearD, {
            method: "DELETE"
        }).then(function (res) {
            visible = true;
            getalphabetizations();      
            if (res.status==200) {
                errorMsg = "Recurso "+countryD+" "+yearD+ " borrado correctamente";
                console.log("Deleted " + countryD);            
            } else if (res.status==404) {
                errorMsg = "No se ha encontrado el objeto " + countryD;
                console.log("Resource NOT FOUND");            
            } else {
                errorMsg= res.status + ": " + "No se pudo borrar el recurso";
                console.log("ERROR!");
            }      
        });
    }
	async function BorrarRegistros(country, year) {
    	console.log("Deleting all data");
   		
		const res = await fetch(BASE_API_URL +"/alphabetization-stats",{
								method: "DELETE"
								
							}).then( function (res) {
							if(res.ok){
								getalphabetizations();
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
	async function Cargaralphabetizations(){
        console.log("Loading entries....");
        const res = await fetch("/api/v1/alphabetization-stats/loadInitialData",
			{
				method: "GET"
			}).then(function (res){
				getalphabetizations();
			});
    }


</script>

<main>
	{#await alphabetizations}
	loading
		{:then alphabetizations}
	<Table bordered>
		<thead>
			<tr>
				<th>Country</th>
				<th>Year</th>
				<th>ar_ym</th>
				<th>ar_yw</th>
                <th>ar_ty</th>
			</tr>
			
		</thead>
		<tbody>
			<tr>
				<td><input bind:value="{newalphabetization.country}"></td>
				<td><input bind:value="{newalphabetization.year}"></td>
				<td><input bind:value="{newalphabetization.ar_ym}"></td>
                <td><input bind:value="{newalphabetization.ar_yw}"></td>
                <td><input bind:value="{newalphabetization.ar_ty}"></td>
				<td><Button 
					outline 
					color="primary"
					on:click="{insertalphabetization}">Añadir</Button></td>
			</tr>
			{#each alphabetizations as alphabetization}
				<tr>
					<td>{alphabetization.country}</td>
					<td>{alphabetization.year}</td>
					<td>{alphabetization.ar_ym}</td>
                    <td>{alphabetization.ar_yw}</td>
                    <td>{alphabetization.ar_ty}</td>
                    <td><Button outline color="warning" on:click={function (){
						window.location.href = `/#/alphabetization-stats/${alphabetization.country}/${alphabetization.year}`
					}}>
						Editar
					</Button>
					<td><Button outline color="danger" on:click={BorrarRegis(alphabetization.country,alphabetization.year)}>
						Borrar
					</Button>
					</td>
				</tr>
			{/each}
            <tr>
				<td><Button outline color="success" on:click={Cargaralphabetizations}>
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