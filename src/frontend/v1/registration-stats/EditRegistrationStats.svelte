<script>
    export let params = {};
    import { onMount } from 'svelte';
    import Button from 'sveltestrap/src/Button.svelte';
    import Table from 'sveltestrap/src/Table.svelte';
    import { pop } from "svelte-spa-router";


    let registration = {};
    let updatedCountry;
    let updatedYear;
    let updatedPrimaryLevel;
    let updateSecondaryLevel;
    let updateTertiaryLevel;

    onMount(getRegistrations);

    async function getRegistrations(){
        console.log("Fetching registrations....");
        const res = await fetch("/api/v1/registration-stats/"+params.country+"/"+params.year); 
        if(res.ok){
            const data = await res.json();
            registration = data;
            updatedCountry = registration.country;
            updatedYear = registration.year;
            updatedPrimaryLevel = registration.primaryLevel;
            updateSecondaryLevel = registration.secondaryLevel;
            updateTertiaryLevel = registration.tertiaryLevel;
        }else{
            Errores(res.status, params.country, params.year);
            pop();
        }
    }
    async function editRegistration(){
        console.log("Updating registration...."+ updatedCountry);
        const res = await fetch("/api/v1/registration-stats/"+ params.country+"/"+ params.year,
			{
				method: "PUT",
				body: JSON.stringify({
                    country: updatedCountry,
                    year: updatedYear,
                    primaryLevel: updatedPrimaryLevel,
                    secondaryLevel: updateSecondaryLevel,
                    tertiaryLevel: updateTertiaryLevel
                }),
				headers: {
					"Content-Type": "application/json"
				}
			}).then(function(res){
				window.alert("Actualizado con éxito");
                window.location.href = `/#/registration-stats`; 
			});
            
            
    }
    async function Errores(code, country, year){
        
        let msg;
        if(code == 404){
            msg = "No existe un dato con el pais " + country + " en el año " + year
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
    <h1>Editar registro "{params.country}"/"{params.year}"</h1>
    {#await registration}
    loading
        {:then registration}
        
    
        <Table bordered>
            <thead>
                <tr>
                    <th>País</th>
                    <th>Año</th>
                    <th>Nivel Primario</th>
                    <th>Nivel Secundario</th>
                    <th>Nivel Terciario</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{updatedCountry}</td>
                    <td>{updatedYear}</td>
                    <td><input bind:value="{updatedPrimaryLevel}"></td>
                    <td><input bind:value="{updateSecondaryLevel}"></td>
                    <td><input bind:value="{updateTertiaryLevel}"></td>
                    <td><Button outline color="primary" on:click="{editRegistration}">
                        Editar
                        </Button>
                    </td>
                </tr>
            </tbody>
        </Table>
    {/await}
    
    <Button outline color="secondary" on:click="{pop}">Volver</Button>

    </main>