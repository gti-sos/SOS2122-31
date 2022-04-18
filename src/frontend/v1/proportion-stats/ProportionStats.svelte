<script>
    import{onMount} from "svelte";
    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";
    const BASE_API_URL = "api/v1";
    let proportions = [];
    let newproportion = {
        country: "",
        year:"",
        male:"",
        female:"",
        total:""
    }

    let errorMsg = "";
	let okMsg = "";
	let visible = false;
	let visibleOk = false;
	onMount(getproportions);

    async function getproportions(){
        console.log("Fetching entries....");
        const res = await fetch("/api/v1/proportion-stats/");
        if(res.ok){
            const data = await res.json();
            proportions = data;
            console.log("Received entries: "+proportions.length);
        }
    }

    async function insertproportion(){
        console.log("Inserting proportion...." +JSON.stringify(newproportion));
        const res = await fetch("/api/v1/proportion-stats/",
            {
                method:"POST",
                body: JSON.stringify(newproportion),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(function(res){
                getproportions();
            }); //esperamos que conecte la api
    }

    async function BorrarRegistro(countryD, yearD){
        console.log("Borrando registro...." + countryD + " " + yearD);
        const res = await fetch(BASE_API_URL + "/proportion-stats"+ "/" + countryD + "/" + yearD, {
            method: "DELETE"
        }).then(function (res) {
            visible = true;
            getproportions();      
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

    async function BorrarRegistros(country, year){
        console.log("Deleting all data");

        const res = await fetch(BASE_API_URL +"/proportion-stats", {
            method: "DELETE"
        }).then(function (res) {
            if(res.ok){
                getproportions();
                visible = false;
                okMsg = "Todos los registros borrados correctamente";
                visibleOk = true;
            }else{
                errorMsg = "No se pudo borrar los registros";
                visible = true;
                visibleOk = false;
            }
            })    
    
    }

    async function CargarProportions(){
        console.log("Cargando datos....");
        const res = await fetch("/api/v1/proportion-stats/loadInitialData",
        {
            method: "GET"
        }).then(function(res){
            getproportions();
        });
        
    }



</script>

<main>
    {#await proportions}
    loading
        {:then proportions}
    
    <Table bordered>
        <thead>
			<tr>
				<th>Country</th>
				<th>Year</th>
				<th>male</th>
				<th>female</th>
                <th>total</th>
			</tr>
			
		</thead>
        <tbody>
			<tr>
				<td><input bind:value="{newproportion.country}"></td>
				<td><input bind:value="{newproportion.year}"></td>
				<td><input bind:value="{newproportion.male}"></td>
                <td><input bind:value="{newproportion.female}"></td>
                <td><input bind:value="{newproportion.total}"></td>
				<td><Button 
					outline 
					color="primary"
					on:click="{insertproportion}">Añadir</Button></td>
			</tr>
			{#each proportions as proportion}
				<tr>
					<td>{proportion.country}</td>
					<td>{proportion.year}</td>
					<td>{proportion.male}</td>
                    <td>{proportion.female}</td>
                    <td>{proportion.total}</td>
                    <td><Button outline color="warning" on:click={function (){
						window.location.href = `/#/proportion-stats/${proportion.country}/${proportion.year}`
					}}>
						Editar
					</Button>
					<td><Button outline color="danger" on:click={BorrarRegis(proportion.country,proportion.year)}>
						Borrar
					</Button>
					</td>
				</tr>
			{/each}
            <tr>
				<td><Button outline color="success" on:click={CargarProportions}>
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