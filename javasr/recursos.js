
const API_BASE_url = "https://fuerza-g-grupo-1-2.onrender.com";
function abrirModal() {
    document.getElementById("modal").style.display = "flex";
}

function cerrarModal() {
    document.getElementById("modal").style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
    
    
    const btnCerrar = document.getElementById("btnCerrar");
    const btnCambiar = document.getElementById("btnCambiar");
    const btnImportar = document.getElementById("btnImportar");
    const btnIndices = document.getElementById("btnIndices");
    const btnSeguridad = document.getElementById("btnSeguridad");
    const btnReindexar = document.getElementById("btnReindexar");
    const btnMigrador = document.getElementById("btnMigrador");
    const btnSalir = document.getElementById("btnSalir");
    const btnCerrarModal = document.getElementById("btnCerrarModal");
    const btnGuardarModal = document.getElementById("btnGuardarModal");

    
    const txtAreaPanel = document.querySelector(".vfp-textarea");



    if (btnCerrar) {
        btnCerrar.addEventListener("click", () => {
            txtAreaPanel.value = "Ejecutando: Procesando el cierre del año fiscal y consolidación de Activos Fijos...";
            alert("Se ha iniciado el proceso de Cierre de Gestión.");
        });
    }

    if (btnCambiar) {
        btnCambiar.addEventListener("click", abrirModal);
    }

    if (btnImportar) {
        btnImportar.addEventListener("click", () => {
            txtAreaPanel.value = "Ejecutando: Conectando con las herramientas de transferencia de datos...\nEsperando archivos .csv o .xls o conexión a la API REST.";
        });
    }

    if (btnIndices) {
        btnIndices.addEventListener("click", () => {
            txtAreaPanel.value = "Ejecutando: Calculando la revalorización de activos fijos basándose en los índices de la UFV actuales...";
        });
    }

    if (btnSeguridad) {
        btnSeguridad.addEventListener("click", () => {
            txtAreaPanel.value = "Ejecutando: Abriendo el módulo de auditoría, permisos de usuario y roles del sistema.";
        });
    }

    if (btnReindexar) {
        btnReindexar.addEventListener("click", () => {
            txtAreaPanel.value = "Ejecutando: Re-organizando los índices de las tablas en la base de datos para optimizar las búsquedas de activos.";
            alert("Base de datos re-indexada con éxito.");
        });
    }

    if (btnMigrador) {
        btnMigrador.addEventListener("click", () => {
            txtAreaPanel.value = "Ejecutando: Migrador de datos activo. Listo para transferir el histórico de activos fijos antiguos a la nueva estructura.";
        });
    }

    if (btnSalir) {
        btnSalir.addEventListener("click", () => {
            if(confirm("¿Está seguro de que desea salir de la Administración de Recursos?")) {
                window.location.href = "index.html"; 
            }
        });
    }

    if (btnCerrarModal) {
        btnCerrarModal.addEventListener("click", cerrarModal);
    }
   
    if (btnGuardarModal) {
        btnGuardarModal.addEventListener("click", () => {
            txtAreaPanel.value = "Configuración: Se ha actualizado la gestión activa del sistema exitosamente.";
            cerrarModal(); 
            alert("Cambios guardados.");
        });
    }
});
