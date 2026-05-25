const API_URL = "https://fuerza-g-grupo-l-2.onrender.com/api/Seguridad";
let usuarios = [];
let registroActual = 0;
let copiaRespaldo;

window.onload = function() {
    const usuarioIngresado = localStorage.getItem("usuarioIngresado");
    const claveNueva = localStorage.getItem("passwordIngresado");
    cargarDatos(usuarioIngresado, claveNueva);
}

async function cargarDatos(usuarioDesdeLogin, claveDesdeLogin) {
    try {
        let res = await fetch(API_URL);
        if (!res.ok) throw new Error("Error");
        usuarios = await res.json();
        
        if (usuarios.length === 0) {
            usuarios = crearDatosPorDefecto(usuarioDesdeLogin, claveDesdeLogin);
        }
    } catch (e) {
        usuarios = crearDatosPorDefecto(usuarioDesdeLogin, claveDesdeLogin);
    }
    mostrarRegistro();
}

function crearDatosPorDefecto(usuario, clave) {
    return [
        { 
            id:1, 
            usuario: usuario || "admin", 
            clave: clave || "***", 
            nombre:"administrador", 
            descripcion:"", 
            tipo:"administrador" 
        },
        { 
            id:2, 
            usuario:"op1", 
            clave:"1234", 
            nombre:"Operador Caja", 
            descripcion:"", 
            tipo:"operador" 
        }
    ];
}

function mostrarRegistro() {
    if(!usuarios || usuarios.length === 0) return;
    let u = usuarios[registroActual];
    
    if(document.getElementById('usuario')) document.getElementById('usuario').value = u.usuario || "";
    if(document.getElementById('clave')) document.getElementById('clave').value = u.clave || "";
    if(document.getElementById('nombre')) document.getElementById('nombre').value = u.nombre || "";
    if(document.getElementById('descripcion')) document.getElementById('descripcion').value = u.descripcion || "";

    if(document.getElementById('op1')) document.getElementById('op1').checked = (u.tipo === "operador");
    if(document.getElementById('op2')) document.getElementById('op2').checked = (u.tipo === "administrador");

    bloquearTodo();
}

function bloquearTodo() {
    let campos = ['usuario','clave','nombre','descripcion'];
    campos.forEach(id => {
        let el = document.getElementById(id);
        if(el) el.readOnly = true;
    });
    document.querySelectorAll('input[name="tipo"]').forEach(r => r.disabled = true);
}

function desbloquearTodo() {
    let campos = ['usuario','clave','nombre','descripcion'];
    campos.forEach(id => {
        let el = document.getElementById(id);
        if(el) el.readOnly = false;
    });
    document.querySelectorAll('input[name="tipo"]').forEach(r => r.disabled = false);
}

async function guardarCambios(datos) {
    try {
        if(datos.id) {
            await fetch(API_URL + "/" + datos.id, {
                method: "PUT",
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(datos)
            });
        } else {
            await fetch(API_URL, {
                method: "POST",
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(datos)
            });
        }
        alert("✅ Guardado correctamente");
    } catch(e) {
        alert("⚠️ Guardado en memoria (servidor en espera)");
    }
    await cargarDatos();
}

// ==============================================
// ✅ BOTONES
// ==============================================

document.getElementById('b1').onclick = () => { 
    registroActual=0; 
    mostrarRegistro(); 
};

document.getElementById('b2').onclick = () => { 
    if(registroActual>0){
        registroActual--; 
        mostrarRegistro(); 
    }
};

document.getElementById('b3').onclick = () => { 
    if(registroActual<usuarios.length-1){
        registroActual++; 
        mostrarRegistro(); 
    }
};

document.getElementById('b4').onclick = () => { 
    registroActual=usuarios.length-1; 
    mostrarRegistro(); 
};

document.getElementById('b5').onclick = () => {
    ['usuario','clave','nombre','descripcion'].forEach(id=>{
        let el = document.getElementById(id);
        if(el) el.value="";
    });
    if(document.getElementById('op1')) document.getElementById('op1').checked=true;
    desbloquearTodo();
    registroActual = -1;
};

document.getElementById('b6').onclick = () => {
    if (usuarios[registroActual]) {
        copiaRespaldo = {...usuarios[registroActual]};
        desbloquearTodo();
    }
};

document.getElementById('b7').onclick = async () => {
    let datos = {
        usuario: document.getElementById('usuario').value.trim(),
        clave: document.getElementById('clave').value.trim(),
        nombre: document.getElementById('nombre').value.trim(),
        descripcion: document.getElementById('descripcion').value.trim(),
        tipo: document.querySelector('input[name="tipo"]:checked')?.value || "operador"
    };

    if(!datos.usuario) return alert("⚠️ El campo USUARIO no puede estar vacío");
    if(registroActual >= 0 && usuarios[registroActual]?.id) datos.id=usuarios[registroActual].id;
    await guardarCambios(datos);
};

document.getElementById('b10').onclick = () => {
    if(registroActual < 0 || !usuarios[registroActual]) return alert("⚠️ Selecciona un usuario primero");

    let nuevaClave = prompt("📝 Cambiar contraseña, por ejemplo a 123");

    if(nuevaClave !== null && nuevaClave.trim() !== "") {
        usuarios[registroActual].clave = nuevaClave.trim();
        guardarCambios(usuarios[registroActual]);
        localStorage.setItem("passwordIngresado", nuevaClave.trim());
    } else {
        alert("❌ No se realizó ningún cambio");
    }
};

document.getElementById('b8').onclick = () => {
    if(copiaRespaldo && registroActual >= 0){
        usuarios[registroActual]=copiaRespaldo;
        mostrarRegistro();
    } else {
        cargarDatos();
    }
};

// ✅ AQUÍ ESTÁ EL CAMBIO REAL: LA RUTA ES AHORA ../../index.html
document.getElementById('b9').onclick = () => { 
    if(confirm("¿Seguro que deseas salir?")) {
        localStorage.clear();
        // 🔥 ESTA ES LA LÍNEA DIFERENTE: SUBES DOS CARPETAS HASTA LLEGAR AL INDEX
        window.location.href = "../../index.html"; 
    }
};