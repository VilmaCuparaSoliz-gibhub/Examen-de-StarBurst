// oficina.js
// oficina.js
const url = "http://127.0.0.1:3000/oficina";
function nuevo(){
    document.getElementById("txtOficina").value = "";
    document.getElementById("txtObservacion").value = "";
    alert("nuevo registro");
}
function guardar(){
    let oficina = document.getElementById("txtOficina").value;
    let observacion = document.getElementById("txtObservacion").value;
    if(oficina == ""){
        alert("ingrese oficina");
        return;
    }
    fetch(url,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            oficina:oficina,
            observacion:observacion
        })
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        alert("guardado");
    });
}
function modificar(){

    let oficina = document.getElementById("txtOficina").value;

    fetch(url+"/1",{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            oficina:oficina
        })
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        alert("modificado");
    });
}
function activar(){
    alert("activado");
}
function inactivar(){

    fetch(url+"/1",{
        method:"DELETE"
    })
    .then(()=>{
        alert("inactivado");
    });

}
function deshacer(){
    document.getElementById("txtOficina").value = "";
    document.getElementById("txtObservacion").value = "";
    alert("deshecho");
}
function salir(){
    alert("saliendo");
}