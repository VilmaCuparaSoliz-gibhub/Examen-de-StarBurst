// ======================================
// API
// ======================================

const API =
"https://fuerza-g-grupo-1-2.onrender.com/unidadadmin";

const modal =
document.getElementById("modal");


// ======================================
// ABRIR MODAL + POST
// ======================================

async function abrirModal(){

    try{

        // DATOS DEL FORMULARIO

        const unidad =
        document.getElementById("unidad").value;

        const ciudad =
        document.getElementById("ciudad").value;

        const descripcion =
        document.getElementById("descripcion").value;


        // VALIDAR

        if(
            unidad === "" ||
            ciudad === "" ||
            descripcion === ""
        ){
            alert(
                "Complete todos los campos"
            );
            return;
        }


        // OBJETO API

        const datos = {

            entidadId: 1,

            unidad: parseInt(
                unidad
            ),

            descrip:
            descripcion,

            ciudad:
            ciudad
        };


        // POST

        const respuesta =
        await fetch(API,{

            method:"POST",

            headers:{
                "Content-Type":
                "application/json"
            },

            body:
            JSON.stringify(
                datos
            )
        });


        if(
            respuesta.ok
        ){

            modal.style.display =
            "block";

            console.log(
                "Guardado correctamente"
            );

            obtenerDatos();
        }
        else{

            alert(
                "Error al guardar"
            );
        }

    }
    catch(error){

        console.log(error);

        alert(
            "Error de conexión"
        );
    }
}


// ======================================
// CERRAR MODAL
// ======================================

function cerrarModal(){

    modal.style.display =
    "none";
}


// ======================================
// GET
// ======================================

async function obtenerDatos(){

    try{

        const respuesta =
        await fetch(API);

        const datos =
        await respuesta.json();

        console.log(
            "LISTA API:"
        );

        console.table(
            datos
        );

    }
    catch(error){

        console.log(error);
    }
}


// ======================================
// DELETE
// ======================================

async function eliminarDato(){

    try{

        const id =
        prompt(
            "Ingrese unidad a eliminar"
        );

        if(
            id == null ||
            id == ""
        ){
            return;
        }

        const respuesta =
        await fetch(

            `${API}/${id}`,

            {
                method:
                "DELETE"
            }
        );

        if(
            respuesta.ok
        ){

            alert(
                "Registro eliminado"
            );

            obtenerDatos();
        }
        else{

            alert(
                "No se pudo eliminar"
            );
        }

    }
    catch(error){

        console.log(error);
    }
}


// ======================================
// SALIR
// ======================================

function salirSistema(){

    let salir =
    confirm(
        "¿Desea salir?"
    );

    if(salir){

        window.close();
    }
}


// ======================================
// GET AUTOMATICO
// ======================================

window.onload =
function(){

    obtenerDatos();
}