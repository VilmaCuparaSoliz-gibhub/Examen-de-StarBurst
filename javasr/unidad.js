const url = "https://fuerza-g-grupo-1-2.onrender.com";

let filaSeleccionada = null;   
let modoEdicion = false;       
async function cargarUnidades() {
    const tbody = document.getElementById("seiya");
    tbody.innerHTML = `<tr><td colspan="3" style="text-align:center;padding:10px;"> Cargando datos...</td></tr>`;
    setMensaje("");

    try {
        const res = await fetch(`${url}/unidadadmin`, {
            method: "GET",
            headers: { "Accept": "application/json" },
            mode: "cors"
        });

        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);

        const datos = await res.json();
        tbody.innerHTML = "";
        filaSeleccionada = null;

        if (!datos.length) {
            tbody.innerHTML = `<tr><td colspan="3" style="text-align:center;padding:10px;">Sin registros</td></tr>`;
            return;
        }

        datos.forEach(item => {
            const fila = document.createElement("tr");
            fila.dataset.unidad   = item.unidad  ?? "";
            fila.dataset.descrip  = item.descrip ?? "";
            fila.dataset.ciudad   = item.ciudad  ?? "";
            fila.dataset.entidad  = item.entidad ?? "";

            fila.innerHTML = `
                <td>${item.unidad  ?? "-"}</td>
                <td>${item.descrip ?? "-"}</td>
                <td>${item.ciudad  ?? "-"}</td>
            `;

            fila.addEventListener("click", () => seleccionarFila(fila));
            tbody.appendChild(fila);
        });

    } catch (err) {
        console.error(err);
        tbody.innerHTML = `<tr><td colspan="3" style="color:red;text-align:center;padding:10px;"> ${err.message}</td></tr>`;
    }
}
function seleccionarFila(fila) {
    if (filaSeleccionada) filaSeleccionada.classList.remove("seleccionado");
    filaSeleccionada = fila;
    fila.classList.add("seleccionado");
    setMensaje(` Seleccionado: ${fila.dataset.descrip} — ${fila.dataset.ciudad}`);
}
function nuevouni() {
    modoEdicion = false;
    limpiarModal();
    document.getElementById("modal-titulo-texto").textContent = "Nueva Unidad Administrativa";
    document.getElementById("input-unidad").disabled = false;
    abrirModal();
}
function editaruni() {
    if (!filaSeleccionada) {
        setMensaje(" Seleccioná una fila primero.");
        return;
    }
    modoEdicion = true;
    document.getElementById("modal-titulo-texto").textContent = "Editar Unidad Administrativa";
    document.getElementById("input-unidad").value   = filaSeleccionada.dataset.unidad;
    document.getElementById("input-descrip").value  = filaSeleccionada.dataset.descrip;
    document.getElementById("input-ciudad").value   = filaSeleccionada.dataset.ciudad;
    document.getElementById("input-entidad").value  = filaSeleccionada.dataset.entidad;
    document.getElementById("input-unidad").disabled = true; 
    abrirModal();
}
async function guardarUnidad() {
    const unidad  = document.getElementById("input-unidad").value.trim();
    const descrip = document.getElementById("input-descrip").value.trim();
    const ciudad  = document.getElementById("input-ciudad").value.trim();
    const entidad = document.getElementById("input-entidad").value.trim();

    if (!unidad || !descrip || !ciudad || !entidad) {
        setMensaje(" Completá todos los campos.");
        return;
    }

    const body = {
        unidad:  parseInt(unidad),
        descrip: descrip,
        ciudad:  ciudad,
        entidad: parseInt(entidad)
    };

    try {
        let res;
        if (modoEdicion) {
            res = await fetch(`${url}/unidadadmin/${unidad}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                mode: "cors",
                body: JSON.stringify(body)
            });
        } else {
            res = await fetch(`${url}/unidadadmin`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                mode: "cors",
                body: JSON.stringify(body)
            });
        }

        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);

        cerrarModal();
        setMensaje(modoEdicion ? " Registro actualizado." : " Registro guardado.");
        await cargarUnidades();

    } catch (err) {
        console.error(err);
        setMensaje(`Error al guardar: ${err.message}`);
    }
}
function eliminaruni() {
    if (!filaSeleccionada) {
        setMensaje("⚠ Seleccioná una fila primero.");
        return;
    }
    document.getElementById("texto-eliminar").textContent =
        `¿Seguro que querés eliminar la unidad "${filaSeleccionada.dataset.descrip}" (${filaSeleccionada.dataset.ciudad})?`;
    document.getElementById("modal-eliminar").classList.add("activo");
}

async function confirmarEliminar() {
    const unidad = filaSeleccionada.dataset.unidad;
    try {
        const res = await fetch(`${url}/unidadadmin/${unidad}`, {
            method: "DELETE",
            mode: "cors"
        });
        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);

        cerrarModalEliminar();
        setMensaje(" Registro eliminado.");
        filaSeleccionada = null;
        await cargarUnidades();

    } catch (err) {
        console.error(err);
        setMensaje(` Error al eliminar: ${err.message}`);
        cerrarModalEliminar();
    }
}

function cerrarModalEliminar() {
    document.getElementById("modal-eliminar").classList.remove("activo");
}
function seleccionaruni() {
    if (!filaSeleccionada) {
        setMensaje(" Hacé click en una fila de la tabla primero.");
        return;
    }
    setMensaje(` Unidad: ${filaSeleccionada.dataset.unidad} | Descripción: ${filaSeleccionada.dataset.descrip} | Ciudad: ${filaSeleccionada.dataset.ciudad}`);
}
function saliruni() {
    window.location.href = "../index.html";
}

function abrirModal() {
    document.getElementById("modal-form").classList.add("activo");
}

function cerrarModal() {
    document.getElementById("modal-form").classList.remove("activo");
    limpiarModal();
}

function limpiarModal() {
    ["input-unidad", "input-descrip", "input-ciudad", "input-entidad"]
        .forEach(id => document.getElementById(id).value = "");
}

function setMensaje(texto) {
    document.getElementById("mensaje-estado").textContent = texto;
}

cargarUnidades();