const boton = document.getElementById("btnLogin");

boton.addEventListener("click", login);

async function login(){

    const usuario = document.getElementById("usuario").value;
    const password = document.getElementById("password").value;

    const respuesta = await fetch(
        "https://fuerza-g-grupo-1-2.onrender.com/api/entidades"
    );

    const datos = await respuesta.json();

    console.log(datos);

    if(usuario === "admin" && password === "admin"){

        alert("Bienvenido al sistema");

        alert("Se debe cambiar la contraseña del administrador.");

        localStorage.setItem("usuarioIngresado", usuario);

        localStorage.setItem("passwordIngresado", password);

       window.open("../pages/seguridad.html", "_self");

    }else{

        alert("Usuario o contraseña incorrectos");

    }

}