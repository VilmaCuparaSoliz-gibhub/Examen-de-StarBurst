let entidadesData = [];
const API_URL = 'https://fuerza-g-grupo-1-2.onrender.com/v3/api-docs';
// 1. cargar entidades
async function cargarEntidades() {
  try {
    const res = await fetch(`${API_URL}/api/entidades`);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    
    const data = await res.json();
    console.log('Datos recibidos:', data);
    
    const select = document.getElementById('entidad');
    select.innerHTML = '<option value="">Seleccione...</option>';
    
    // El swagger dice que devuelve un array de Entidad
    data.forEach(ent => {
      const opt = document.createElement('option');
      opt.value = ent.entidad; // campo del schema Entidad
      opt.textContent = `${ent.entidad} - ${ent.descripcion} (${ent.sigla})`;
      select.appendChild(opt);
    });

  } catch (err) {
    console.error('Error:', err);
    document.getElementById('entidad').innerHTML = '<option>Error al cargar</option>';
  }
}

cargarEntidades();

// 2. Cargar sigla e institución cuando cambia la entidad
async function cargarDetallesEntidad() {
    const codigo = document.getElementById('entidad').value;
    if (!codigo) return;
    
    try {
        const res = await fetch(`${API_URL}/entidades/${codigo}`);
        const ent = await res.json();
        
        document.getElementById('sigla').innerHTML = `<option>${ent.sigla}</option>`;
        document.getElementById('institucion').innerHTML = `<option>${ent.nombre}</option>`;
        
    } catch (err) {
        console.error(err);
    }
}

// 3. Guardar selección
async function guardarEntidad() {
    const codigo = document.getElementById('entidad').value;
    
    try {
        const res = await fetch(`${API_URL}/entidad/activa`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ codigo_entidad: codigo })
        });
        
        const data = await res.json();
        alert('Entidad guardada: ' + data.mensaje);
        
    } catch (err) {
        alert('Error al guardar: ' + err.message);
    }
}
