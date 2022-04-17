<script>
    export let params = {};
    import {pop} from "svelte-spa-router";
    import { onMount } from 'svelte';
    import Button from 'sveltestrap/src/Button.svelte';
    import Table from 'sveltestrap/src/Table.svelte';
    let reg = {};
    let updatedCountry;
    let updatedYear;
    let updatedprimarylevel;
    let updatedsecondarylevel;
    let updatedtertiarylevel;
    onMount(getRegistrations);


    async function getRegistrations(){
        console.log("Fetching entries....");
        const res = await fetch("/api/v1/registration-stats/"+params.country+"/"+params.year); 
        if(res.ok){
            const data = await res.json();
            reg = data;
            updatedCountry = reg.country;
            updatedYear = reg.year;
            updatedprimarylevel = reg.primarylevel;
            updatedsecondarylevel = reg.secondarylevel;
            updatedtertiarylevel = reg.tertiarylevel;
        }else{
            Errores(res.status,params.country+"/"+params.year);
            pop();
        }
    }
    async function EditReg(){
        console.log("Updating registration...."+updatedCountry);
        const res = await fetch("/api/v1/registration-stats/"+params.country+"/"+params.year,
			{
				method: "PUT",
				body: JSON.stringify({
                    country: updatedCountry,
                    year: updatedYear,
                    primarylevel: updatedprimarylevel,
                    secondarylevel: updatedsecondarylevel,
                    tertiarylevel: updatedtertiarylevel
                }),
				headers: {
					"Content-Type": "application/json"
				}
			}); 
    }
    async function Errores(code,entrada){
        
        let msg;
        if(code == 404){
            msg = "La entrada "+entrada+" no existe"
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
    <h1>Editar entrada "{params.country}"/"{params.year}"</h1>
    {#await reg}
    loading
        {:then reg}
        
    
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
                    <td><input bind:value="{updatedprimarylevel}"></td>
                    <td><input bind:value="{updatedsecondarylevel}"></td>
                    <td><input bind:value="{updatedtertiarylevel}"></td>
                    <td><Button outline color="primary" on:click="{EditReg}">
                        Editar
                        </Button>
                    </td>
                </tr>
            </tbody>
        </Table>
    {/await}
    
    <Button outline color="secondary" on:click="{pop}">Volver</Button>

    </main>