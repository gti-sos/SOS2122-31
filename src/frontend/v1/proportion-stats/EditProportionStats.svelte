<script>
    import { onMount } from "svelte";
    import { pop } from "svelte-spa-router";
    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";
    import Alert from 'sveltestrap/src/Alert.svelte';

    const colors = [
        "primary",
        "secondary",
        "success",
        "danger",
        "warning",
        "info",
        "light",
        "dark",
    ];

    const BASE_API_URL = "/api/v1";
    export let params = {};
    let reg = {};
    let upcountry = "XXXX";
    let upYear;
    let up_male;
    let up_female;
    let up_total;
    let errorMsg = "";
    let okMsg = "";
    let visible = false;
    let visibleOk = false;
    onMount(getReg);
    async function getReg() {
        console.log("Fetching data..." + params.country + " " + params.year);
        const res = await fetch(
            BASE_API_URL +
                "/proportion-stats/" +
                params.country +
                "/" +
                params.year
        );
        if (res.ok) {
            console.log("Ok:");
            const json = await res.json();
            reg = json;

            upcountry = reg.country;
            upYear = parseInt(reg.year);
            up_male = parseInt(reg.male);
            up_female = parseInt(reg.female);
            up_total = parseInt(reg.total);

            console.log(JSON.stringify(reg));
            console.log("Received data.");
        } else {
            if (res.status === 404) {
                errorMsg = `No existe dato con pais: ${params.country} y fecha: ${params.year}`;
                console.log("ERROR!" + errorMsg);
                visibleOk = false;
                visible = true;
            } else if (res.status === 500) {
                errorMsg = "No se han podido acceder a la base de datos";
            }

            console.log("ERROR!" + errorMsg);
        }
    }
    async function updateReg() {
        console.log(
            "Updating data..." +
                JSON.stringify(params.country) +
                ", " +
                JSON.stringify(params.year)
        );
        let year = parseInt(params.year);

        const res = await fetch(
            BASE_API_URL +
                "/proportion-stats/" +
                params.country +
                "/" +
                params.year,
            {
                method: "PUT",
                body: JSON.stringify({
                    country: params.country,
                    year: year,
                    male: parseInt(up_male),
                    female: parseInt(up_female),
                    total: parseInt(up_total),
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        ).then(function (res) {
            visible = true;
            getReg();
            if (res.status == 200 || res.status == 201) {
                okMsg = "Actualización correcta";
                visibleOk = true;
            } else {
                if (res.status === 400) {
                    errorMsg = "Rellene los campos.";
                    visibleOk = false;
                }

                if (res.status === 404) {
                    errorMsg = "El dato solicitado no existe";
                    visibleOk = false;
                    window.alert(errorMsg);
                }
            }
        });
    }
</script>

<main>
    <h3>
        Editar entrada <strong>{params.country}</strong><strong
            >{params.year}</strong
        >
    </h3>
    {#await reg}
        loading
    {:then reg}
        <Table bordered>
            <thead>
                <div>
                    <Alert
                        color="danger"
                        isOpen={visible}
                        toggle={() => (visible = false)}
                    >
                        {#if errorMsg}
                            <p>ERROR: {errorMsg}</p>
                        {/if}
                    </Alert>
                    <Alert
                        color="success"
                        isOpen={visibleOk}
                        toggle={() => (visibleOk = false)}
                    >
                        {#if okMsg}
                            <p>Correcto: {okMsg}</p>
                        {/if}
                    </Alert>
                </div>

                <tr>
                    <th>Pais</th>
                    <th>Año</th>
                    <th>Hombre</th>
                    <th>Mujer</th>
                    <th>Total</th>
                    <th>Acción</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td>{upcountry}</td>
                    <td>{upYear}</td>
                    <td><input type="number" bind:value={up_male} /></td>
                    <td><input type="number" bind:value={up_female} /></td>
                    <td><input type="number" bind:value={up_total} /></td>
                    <td><Button on:click={updateReg}>Actualizar</Button></td>
                </tr>
            </tbody>
        </Table>
    {/await}

    <Button outline color="secondary" on:click={pop}>Volver</Button>
</main>