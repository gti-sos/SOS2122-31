<script>
	import { onMount } from "svelte";
	import Table from "sveltestrap/src/Table.svelte";
	import Button from "sveltestrap/src/Button.svelte";
	import Alert from "sveltestrap/src/Alert.svelte";

	let registrations = [];

	let from = null;
	let to = null;
	let offset = 0;
	let limit = 10;

	let paginasMax = 0;
	let numEntries;

	let errorMsg = "";
	let okMsg = "";
	let newRegistration = {
		country: "",
		year: "",
		ar_ym: "",
		ar_yw: "",
		ar_ty: "",
	};
	let visible = false;
	let visibleOk = false;

	onMount(getReg);

	async function getReg() {
		console.log("Fetching registrations....");
		let c = `/api/v2/alphabetization-stats?limit=${limit}&&offset=${
			offset * 10
		}&&`;
		if (from != null) {
			c = c + `from=${from}&&`;
		}
		if (to != null) {
			c = c + `to=${to}&&`;
		}
		const res = await fetch(c);
		if (res.ok) {
			let cadenaPag = c.split(`limit=${limit}&&offset=${offset * 10}`);
			maxPagesFunction(cadenaPag[0] + cadenaPag[1]);
			const data = await res.json();
			registrations = data;
			numEntries = registrations.length;
			console.log("Received entries: " + registrations.length);
		} else {
			if (res.status == 200 || res.status == 201) {
				const data = await res.json();
				registrations = data;
				if (registrations.length == 1) {
					errorMsg =
						"Se ha encontrado " + registrations.length + " dato";
				} else {
					errorMsg = "No se ha encontrado el dato con país:";
				}
			} else if (res.status == 404) {
				errorMsg =
					"No se ha encontrado datos con los parámetros introducidos.";
			}
			window.alert(errorMsg);
		}
	}

	async function insertRegistration() {
		console.log("Inserting data " + JSON.stringify(newRegistration));

		const res = await fetch("/api/v2/alphabetization-stats", {
			method: "POST",
			body: JSON.stringify(newRegistration),
			headers: {
				"Content-Type": "application/json",
			},
		}).then((res) => {
			if (res.ok) {
				getReg();
				okMsg = "El dato se introdujo correctamente";
				visibleOk = true;
				visible = false;
			} else if (res.status === 409) {
				errorMsg = "Ya existe ese dato";
				visibleOk = false;
				visible = true;
			} else if (res.status === 400) {
				errorMsg = "Campo mal introducido";
				visibleOk = false;
				visible = true;
			}
		});
	}

	async function BorrarRegis(countryDelete, yearDelete) {
		const res = await fetch(
			"/api/v2/alphabetization-stats/" + countryDelete + "/" + yearDelete,
			{
				method: "DELETE",
			}
		).then(function (res) {
			if (res.ok) {
				if (numEntries == 1) {
					from = null;
					to = null;
				}
				getReg();
				okMsg = "Dato eliminado";
				visibleOk = true;
				visible = false;
			}
		});
	}

	async function BorrarRegistros() {
		console.log("Deleting registrations....");
		const res = await fetch("/api/v2/alphabetization-stats/", {
			method: "DELETE",
		}).then(function (res) {
			from = null;
			to = null;
			if (res.ok) {
				getReg();
				okMsg = "Todos los datos se han eliminado";
				visibleOk = true;
				visible = false;
			} else {
				errorMsg = "No hay datos que borrar";
				visibleOk = false;
				visible = true;
			}
		});
	}

	async function CargarRegistrations() {
		console.log("Loading registrations....");
		const res = await fetch(
			"/api/v2/alphabetization-stats/loadInitialData",
			{
				method: "GET",
			}
		).then(function (res) {
			getReg();
			window.alert("TODO CARGADO");
		});
	}

	async function maxPagesFunction(cadena) {
		let num;
		const res = await fetch(cadena, {
			method: "GET",
		});
		if (res.ok) {
			const data = await res.json();
			paginasMax = Math.floor(data.length / 10);
			if (paginasMax === data.length / 10) {
				paginasMax = paginasMax - 1;
			}
		}
	}
</script>

<main>
	<Alert color="danger" isOpen={visible} toggle={() => (visible = false)}>
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
	<Table bordered>
		<thead>
			<tr>
				<th>Fecha inicio</th>
				<th>Fecha fin</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><input type="number" min="1900" bind:value={from} /></td>
				<td><input type="number" min="1900" bind:value={to} /></td>
				<td align="center"
					><Button
						outline
						color="dark"
						on:click={() => {
							if (from == null || to == null) {
								window.alert(
									"Los campos fecha inicio y fecha fin no pueden estar vacíos"
								);
							} else {
								getReg();
							}
						}}
					>
						Buscar
					</Button>
				</td>
				<td align="center"
					><Button
						outline
						color="primary"
						on:click={() => {
							from = null;
							to = null;
							getReg();
						}}
					>
						Limpiar Búsqueda
					</Button>
				</td>
			</tr>
		</tbody>
	</Table>
	<Table bordered>
		<thead>
			<tr>
				<td
					><Button id="charge" on:click={CargarRegistrations}
						>Cargar datos</Button
					></td
				>
				<td
					><Button id="delete" on:click={BorrarRegistros}
						>Borrar datos</Button
					></td
				>
			</tr>

			<tr>
				<th>Ciudad</th>
				<th>Año</th>
				<th>Hombre</th>
				<th>Mujer</th>
				<th>Total</th>
				<th>Acciones</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><input bind:value={newRegistration.country} /></td>
				<td
					><input
						type="number"
						bind:value={newRegistration.year}
					/></td
				>
				<td
					><input
						type="number"
						bind:value={newRegistration.ar_ym}
					/></td
				>
				<td
					><input
						type="number"
						bind:value={newRegistration.ar_yw}
					/></td
				>
				<td
					><input
						type="number"
						bind:value={newRegistration.ar_ty}
					/></td
				>
				<td
					><Button
						outline
						color="primary"
						on:click={insertRegistration}>Añadir</Button
					></td
				>
			</tr>
			{#each registrations as registration}
				<tr>
					<td>{registration.country}</td>
					<td>{registration.year}</td>
					<td>{registration.ar_ym}</td>
					<td>{registration.ar_yw}</td>
					<td>{registration.ar_ty}</td>
					<td
						><Button
							outline
							color="warning"
							on:click={function () {
								window.location.href = `/#/alphabetization-stats/${registration.country}/${registration.year}`;
							}}
						>
							Editar
						</Button>
					</td><td
						><Button
							outline
							color="danger"
							on:click={BorrarRegis(
								registration.country,
								registration.year
							)}
						>
							Borrar
						</Button>
					</td>
				</tr>
			{/each}
		</tbody>
		<div />
		<div align="left">
			{#each Array(paginasMax + 1) as _, page}
				<Button
					outline
					color="secondary"
					on:click={() => {
						offset = page;
						getReg();
					}}
					>{page}
				</Button>&nbsp
			{/each}
		</div>
	</Table>
</main>
