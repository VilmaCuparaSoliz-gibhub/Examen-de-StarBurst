

const API =
"https://fuerza-g-grupo-1-2.onrender.com/unidadadmin";

const modal =
document.getElementById("modal");



async function abrirModal(){

    try{



        const unidad =
        document.getElementById("unidad").value;

        const ciudad =
        document.getElementById("ciudad").value;

        const descripcion =
        document.getElementById("descripcion").value;



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


function cerrarModal(){

    modal.style.display =
    "none";
}


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


function salirSistema(){

    let salir =
    confirm(
        "¿Desea salir?"
    );

    if(salir){

        window.close();
    }
}


window.onload =
function(){

    obtenerDatos();
}