<script>
	import {onMount} from "svelte";
	import Alert from 'sveltestrap/src/Alert.svelte';
	import Table from "sveltestrap/src/Table.svelte";
	import Button from "sveltestrap/src/Button.svelte";
	import {Pagination, PaginationItem, PaginationLink } from "sveltestrap";

	let errorMsg = "";
	let okMsg = "";
	let registrations = [];
	let newRegistration = {
		country: "",
		year: "",
		primarylevel: "",
		secondarylevel: "",
		tertiarylevel: "",
		
	};
	let visible = false;
	let visibleOk = false;
	
	let c_offset = 0;
    let offset = 0;
    let limit = 10;
    let c_page = 1;
    let lastPage = 1;
    let total = 0;
	
	onMount(getReg);

	const BASE_API_URL = "/api/v1";
		  
	async function getReg(){
        console.log("Fetching entries....");
        const res = await fetch("/api/v1/registration-stats/"); 
        if(res.ok){
            const data = await res.json();
            registrations = data;
			paginacion();
            console.log("Received entries: "+registrations.length);
        }else{
			console.log("Error");
			
		}
    }

	async function getOlimpic1() {
    	console.log("Fetching data...");
   		const res = await fetch(BASE_API_URL +"/registration-stats"+ "?limit=" + limit + "&offset=" + c_offset);
		
        if(res.ok){
			console.log("Ok.");
			const json = await res.json();
			registrations = json;
			console.log(`We have ${registrations.length} olimpic.`);
			for(let i=0; i<registrations.length ; i++){
				let c = [];
				let y = registrations[i].year;
				if(y > yFrom && y<yTo){
					c.push(y);
					registrations = c;
				}
			}
			paginacion();
		}else{
			console.log("Error");
			
		}
  	}

	async function paginacion() {
      const data = await fetch(BASE_API_URL + "/registration-stats");
      if (data.status == 200) {
        const json = await data.json();
        total = json.length;
        cambiapag(c_page, c_offset);
      } 
    }
	
    function range(size, start = 0) {
      return [...Array(size).keys()].map((i) => i + start);
	}
	 
	function cambiapag(page, offset) {
      
      lastPage = Math.ceil(total/10);
      console.log("Last page = " + lastPage);
      if (page !== c_page) {
        c_offset = offset;
        c_page = page;
        getReg();
		getOlimpic1();
      }
    } 
    
	async function insertRegistration() {
    	console.log("Inserting data "+ JSON.stringify(newRegistration));
   		
		const res = await fetch(BASE_API_URL +"/registration-stats",
							{
								method: "POST",
								body: JSON.stringify(newRegistration),
								headers:{
									"Content-Type": "application/json"
								}
							}
		).then((res) => {
			
			if(res.ok){
				getReg();
				getOlimpic1();
				okMsg = "El dato se introdujo correctamente";
				visibleOk=true;
				visible=false;
			}else if(res.status === 409){
                errorMsg = "Ya existe ese dato";
				visibleOk=false;
				visible=true;
			}else if(res.status === 400){
				errorMsg = "Campo mal introducido";
				visibleOk=false;
				visible=true;
			}
            
		});
	}	
	
	async function BorrarRegis(country, year) {
    	console.log(`Deleting data with name ${city} and date ${year}`);
   		
		const res = await fetch(BASE_API_URL +"/registration-stats/"+country+"/"+year,
							{
								method: "DELETE"
								
							}).then( function (res) {
								getReg();
								getOlimpic1();
								okMsg = "Dato eliminado";
								visibleOk=true;
								visible=false;
							})
	}
	
	async function BorrarRegistros() {
    	console.log("Deleting all data");
   		
		const res = await fetch(BASE_API_URL +"/registration-stats",{
								method: "DELETE"
								
							}).then( function (res) {
							if(res.ok){
								getReg();
								getOlimpic1();
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
				getReg();
				getOlimpic1();
			});
    }

	
	var currentTime = new Date();
	let yFrom = currentTime.getFullYear();
	let yTo = currentTime.getFullYear()

</script>


<main>
	
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
			<Table bordered>
			
				<thead>
					<tr>
						<td><Button id='charge' on:click={CargarRegistrations}>Cargar datos</Button></td>
						<td><Button id='delete' on:click={BorrarRegistros}>Borrar datos</Button></td>
							
					</tr>
					
					<tr>
						<th>Ciudad</th>
						<th>Año</th>
						<th>Nivel Primario</th>
						<th>Nivel Secundario</th>
						<th>Nivel Terciario</th>
						<th>Acciones</th>
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
					
				</tbody>
		<div>
    		
			<Pagination ariaLabel="Web pagination">
			  <PaginationItem class = {c_page === 1 ? "enable" : ""}>
					<PaginationLink previous href="#/registration-stats" on:click={() => cambiapag(c_page - 1, c_offset - 10)}/>
			  </PaginationItem>
			  {#each range(lastPage, 1) as page}
					<PaginationItem class = {c_page === page ? "active" : ""}>
					  <PaginationLink previous href="#/registration-stats" on:click={() => cambiapag(page, (page - 1) * 10)}>
						  {page}
					  </PaginationLink>
					</PaginationItem>
			  {/each}
			  <PaginationItem class = {c_page === lastPage ? "disabled" : ""}>
					<PaginationLink next href="#/registration-stats" on:click={() => cambiapag(c_page + 1, c_offset + 10)}/>
			  </PaginationItem>
			</Pagination>
  
	  </div>
		
	</Table>
</main>