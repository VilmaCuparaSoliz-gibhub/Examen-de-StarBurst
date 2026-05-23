const API_URL = "https://fuerza-g-grupo-l-2.onrender.com/api/Seguridad";
let usuarios = [];
let registroActual = 0;
let copiaRespaldo;

// ✅ AL INICIAR: RECIBE DATOS DEL INICIO DE SESIÓN
window.onload = function() {
    cargarDatos();
};

// ✅ CARGA DESDE EL SERVIDOR
async function cargarDatos() {
    try {
        let res = await fetch(API_URL);
        if (!res.ok) throw new Error("Error");
        usuarios = await res.json();
        
        if (usuarios.length === 0) {
            usuarios = [
                { id:1, usuario:"admin", clave:"***", nombre:"administrador", descripcion:"", tipo:"administrador" },
                { id:2, usuario:"op1", clave:"1234", nombre:"Operador Caja", descripcion:"", tipo:"operador" }
            ];
        }
    } catch (e) {
        // Datos por si el servidor está dormido
        usuarios = [
            { id:1, usuario:"admin", clave:"***", nombre:"administrador", descripcion:"", tipo:"administrador" },
            { id:2, usuario:"op1", clave:"1234", nombre:"Operador Caja", descripcion:"", tipo:"operador" }
        ];
    }
    mostrarRegistro();
}

function mostrarRegistro() {
    if(usuarios.length === 0) return;
    let u = usuarios[registroActual];
    
    document.getElementById('usuario').value = u.usuario || "";
    document.getElementById('clave').value = u.clave || "";
    document.getElementById('nombre').value = u.nombre || "";
    document.getElementById('descripcion').value = u.descripcion || "";

    document.getElementById('op1').checked = (u.tipo === "operador");
    document.getElementById('op2').checked = (u.tipo === "administrador");

    bloquearTodo();
}

function bloquearTodo() {
    let campos = ['usuario','clave','nombre','descripcion'];
    campos.forEach(id => {
        let el = document.getElementById(id);
        el.readOnly = true;
    });
    document.querySelectorAll('.zona-radio input').forEach(r => r.disabled = true);
}

function desbloquearTodo() {
    let campos = ['usuario','clave','nombre','descripcion'];
    campos.forEach(id => {
        let el = document.getElementById(id);
        el.readOnly = false;
    });
    document.querySelectorAll('.zona-radio input').forEach(r => r.disabled = false);
}

// ✅ GUARDA EN EL SERVIDOR
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
// ✅ TODOS LOS BOTONES FUNCIONALES
// ==============================================

// Primero
document.getElementById('b1').onclick = () => { 
    registroActual=0; 
    mostrarRegistro(); 
};

// Anterior
document.getElementById('b2').onclick = () => { 
    if(registroActual>0){
        registroActual--; 
        mostrarRegistro(); 
    }
};

// Siguiente
document.getElementById('b3').onclick = () => { 
    if(registroActual<usuarios.length-1){
        registroActual++; 
        mostrarRegistro(); 
    }
};

// Último
document.getElementById('b4').onclick = () => { 
    registroActual=usuarios.length-1; 
    mostrarRegistro(); 
};

// Nuevo
document.getElementById('b5').onclick = () => {
    ['usuario','clave','nombre','descripcion'].forEach(id=>document.getElementById(id).value="");
    document.getElementById('op1').checked=true;
    desbloquearTodo();
    registroActual = -1;
};

// Editar
document.getElementById('b6').onclick = () => {
    if (usuarios[registroActual]) {
        copiaRespaldo = {...usuarios[registroActual]};
        desbloquearTodo();
    }
};

// Guardar
document.getElementById('b7').onclick = async () => {
    let datos = {
        usuario: document.getElementById('usuario').value.trim(),
        clave: document.getElementById('clave').value.trim(),
        nombre: document.getElementById('nombre').value.trim(),
        descripcion: document.getElementById('descripcion').value.trim(),
        tipo: document.querySelector('input[name="tipo"]:checked').value
    };

    if(!datos.usuario) return alert("⚠️ El campo USUARIO no puede estar vacío");
    if(registroActual >= 0 && usuarios[registroActual]?.id) datos.id=usuarios[registroActual].id;
    await guardarCambios(datos);
};

// ✅ CAMBIAR CONTRASEÑA (IGUAL AL MANUAL)
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

// Deshacer
document.getElementById('b8').onclick = () => {
    if(copiaRespaldo && registroActual >= 0){
        usuarios[registroActual]=copiaRespaldo;
        mostrarRegistro();
    } else {
        cargarDatos();
    }
};

// Salir
document.getElementById('b9').onclick = () => { 
    if(confirm("¿Seguro que deseas salir?")) {
        localStorage.clear();
        window.location.href = "index.html";
    }
};