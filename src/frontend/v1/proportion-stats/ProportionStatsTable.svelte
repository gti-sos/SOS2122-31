<script>
	import { onMount } from "svelte";
	import Table from "sveltestrap/src/Table.svelte";
	import Button from "sveltestrap/src/Button.svelte";
	import Alert from "sveltestrap/src/Alert.svelte";

	let proportions = [];

	let from = null;
	let to = null;
	let offset = 0;
	let limit = 10;
	const BASE_API_URL = "/api/v1";

	let paginasMax = 0;
	let numEntries;

	let errorMsg = "";
	let okMsg = "";
	let newProportion = {
		country: "",
		year: "",
		male: "",
		female: "",
		total: "",
	};

	let visible = false;
	let visibleOk = false;

	onMount(getReg);

	async function getReg() {
		console.log("Fetching proportions....");
		let c = `/api/v1/proportion-stats?limit=${limit}&&offset=${
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
			proportions = data;
			numEntries = proportions.length;
			console.log("Received entries: " + proportions.length);
		} else {
			if (res.status == 200 || res.status == 201) {
				const data = await res.json();
				proportions = data;
				if (proportions.length == 1) {
					errorMsg =
						"Se ha encontrado " + proportions.length + " dato";
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

	async function insertProportion() {
		console.log("Inserting data " + JSON.stringify(newProportion));

		const res = await fetch(BASE_API_URL + "/proportion-stats", {
			method: "POST",
			body: JSON.stringify(newProportion),
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
			"/api/v1/proportion-stats/" + countryDelete + "/" + yearDelete,
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
		console.log("Deleting proportions....");
		const res = await fetch("/api/v1/proportion-stats/", {
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

	async function CargarProportions() {
		console.log("Loading proportions....");
		const res = await fetch(
			"/api/v1/proportion-stats/loadInitialData",
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
					><Button id="charge" on:click={CargarProportions}
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
				<th>Pais</th>
				<th>Año</th>
				<th>Hombre</th>
				<th>Mujer</th>
				<th>Total</th>
				<th>Acciones</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><input bind:value={newProportion.country} /></td>
				<td
					><input
						type="number"
						bind:value={newProportion.year}
					/></td
				>
				<td
					><input
						type="number"
						bind:value={newProportion.male}
					/></td
				>
				<td
					><input
						type="number"
						bind:value={newProportion.female}
					/></td
				>
				<td
					><input
						type="number"
						bind:value={newProportion.total}
					/></td
				>
				<td
					><Button
						outline
						color="primary"
						on:click={insertProportion}>Añadir</Button
					></td
				>
			</tr>
			{#each proportions as proportion}
				<tr>
					<td>{proportion.country}</td>
					<td>{proportion.year}</td>
					<td>{proportion.male}</td>
					<td>{proportion.female}</td>
					<td>{proportion.total}</td>
					<td
						><Button
							outline
							color="warning"
							on:click={function () {
								window.location.href = `/#/proportion-stats/${proportion.country}/${proportion.year}`;
							}}
						>
							Editar
						</Button>
					</td><td
						><Button
							outline
							color="danger"
							on:click={BorrarRegis(
								proportion.country,
								proportion.year
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