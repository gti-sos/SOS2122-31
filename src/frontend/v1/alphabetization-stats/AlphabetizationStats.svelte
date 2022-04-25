<script>
	import { onMount } from "svelte";
	import Alert from "sveltestrap/src/Alert.svelte";
	import Table from "sveltestrap/src/Table.svelte";
	import Button from "sveltestrap/src/Button.svelte";
	import { Pagination, PaginationItem, PaginationLink } from "sveltestrap";

	let errorMsg = "";
	let okMsg = "";
	let registrations = [];
	let newRegistration = {
		country: "",
		year: "",
		ar_ym: "",
		ar_yw: "",
		ar_ty: "",
	};
	let visible = false;
	let visibleOk = false;

	let offset1 = 0;
	let offset2 = 0;
	let limit = 10;
	let page = 1;
	let lastPage = 1;
	let total = 0;
	let from = null;
	let to = null;
	onMount(getReg1);

	const BASE_API_URL = "/api/v1";

	async function getReg() {
		console.log("Fetching entries....");
		let cadena = `/api/v1/alphabetization-stats?from=${from}&&to=${to}&&`;
		const res = await fetch(cadena);
		if (res.ok) {
			const data = await res.json();
			registrations = data;
			console.log("Received entries: " + registrations.length);
		} else {
			console.log("Error");
		}
	}

	async function getReg1() {
		console.log("Fetching entries....");
		let cadena =
			"/api/v1/alphabetization-stats?limit=" + limit + "&offset=" + offset1;
		const res = await fetch(cadena);
		if (res.ok) {
			//let cadenaPag = cadena.split("?limit=" + limit + "&offset=" + offset1);
			paginacion();
			const data = await res.json();
			registrations = data;
			console.log("Received entries: " + registrations.length);
		}
	}

	async function paginacion() {
		const data = await fetch(BASE_API_URL + "/alphabetization-stats");
		if (data.status == 200) {
			const json = await data.json();
			total = json.length;
			cambiapag(page, offset1);
		}
	}

	function range(size, start = 0) {
		return [...Array(size).keys()].map((i) => i + start);
	}

	function cambiapag(page1, offset2) {
		lastPage = Math.ceil(total / 10);
		console.log("Last page = " + lastPage);
		if (page1 !== page) {
			offset1 = offset2;
			page = page1;
			getReg1();
			getReg();
		}
	}

	async function insertRegistration() {
		console.log("Inserting data " + JSON.stringify(newRegistration));

		const res = await fetch(BASE_API_URL + "/alphabetization-stats", {
			method: "POST",
			body: JSON.stringify(newRegistration),
			headers: {
				"Content-Type": "application/json",
			},
		}).then((res) => {
			if (res.ok) {
				getReg1();
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

	async function BorrarRegis(country, year) {
		console.log(`Deleting data with name ${country} and date ${year}`);

		const res = await fetch(
			BASE_API_URL + "/alphabetization-stats/" + country + "/" + year,
			{
				method: "DELETE",
			}
		).then(function (res) {
			getReg1();
			getReg();
			okMsg = "Dato eliminado";
			visibleOk = true;
			visible = false;
		});
	}

	async function BorrarRegistros() {
		console.log("Deleting all data");

		const res = await fetch(BASE_API_URL + "/alphabetization-stats", {
			method: "DELETE",
		}).then(function (res) {
			if (res.ok) {
				getReg1();
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
		console.log("Loading entries....");
		const res = await fetch("/api/v1/alphabetization-stats/loadInitialData", {
			method: "GET",
		}).then(function (res) {
			getReg1();
			getReg();
		});
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
				<td><input type="number" min="1970" bind:value={from} /></td>
				<td><input type="number" min="1970" bind:value={to} /></td>
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
				<td><input bind:value={newRegistration.year} /></td>
				<td><input bind:value={newRegistration.ar_ym} /></td>
				<td><input bind:value={newRegistration.ar_yw} /></td>
				<td><input bind:value={newRegistration.ar_ty} /></td>
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
		<div>
			<Pagination ariaLabel="Web pagination">
				<PaginationItem class={page === 1 ? "enable" : ""}>
					<PaginationLink
						previous
						href="#/alphabetization-stats"
						on:click={() => cambiapag(page - 1, offset1 - 10)}
					/>
				</PaginationItem>
				{#each range(lastPage, 1) as page}
					<PaginationItem class={page === page ? "active" : ""}>
						<PaginationLink
							previous
							href="#/alphabetization-stats"
							on:click={() => cambiapag(page, (page - 1) * 10)}
						>
							{page}
						</PaginationLink>
					</PaginationItem>
				{/each}
				<PaginationItem class={page === lastPage ? "disabled" : ""}>
					<PaginationLink
						next
						href="#/alphabetization-stats"
						on:click={() => cambiapag(page + 1, offset1 + 10)}
					/>
				</PaginationItem>
			</Pagination>
		</div>
	</Table>
</main>
