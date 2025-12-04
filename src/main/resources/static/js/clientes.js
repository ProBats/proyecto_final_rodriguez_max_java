// URL base de la API
const API_URL_CLIENTE = "http://localhost:8080/api/clientes";

// Cuando se carga la página, mostramos el listado
document.addEventListener("DOMContentLoaded", listarClientes);

// Manejador del formulario
document.getElementById("form-cliente").addEventListener("submit", guardarCliente);

// Botón para cancelar edición
document.getElementById("cancelar").addEventListener("click", () => {
    // Limpiar todos los campos del formulario
    document.getElementById("form-cliente").reset();
    // Borrar el ID oculto del formulario
    document.getElementById("idCliente").value = "";
});

// === Listar todos los artículos ===
function listarClientes() {
    // Llamada GET a la API para obtener todos los artículos
    fetch(API_URL_CLIENTE)
        .then(response => response.json()) // Convertimos la respuesta a JSON
        .then(data => {
            const tbody = document.getElementById("tabla-clientes"); // Obtenemos el cuerpo de la tabla
            tbody.innerHTML = ""; // Limpiar tabla antes de insertar nuevos datos
            data.forEach(cliente => {
                const fila = document.createElement("tr"); // Creamos una fila de tabla
                // Insertamos columnas con los datos del artículo y botones de acción
                fila.innerHTML = `
                    <td>${cliente.idCliente}</td>
                    <td>${cliente.nombre}</td>
                    <td>${cliente.apellido}</td>
                    <td>${cliente.email}</td>
                    <td>${cliente.telefono}</td>
                    <td>${cliente.direccion}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editarCliente(${cliente.idCliente})">Editar</button>
                        <button class="btn btn-danger btn-sm" onclick="eliminarCliente(${cliente.idCliente})">Eliminar</button>
                    </td>
                `;
                tbody.appendChild(fila); // Agregamos la fila al cuerpo de la tabla
            });
        })
        .catch(error => console.error("Error al listar clientes:", error)); // Manejo de errores
}

// === Guardar o actualizar un artículo ===
function guardarCliente(event) {
    event.preventDefault(); // Evitamos el comportamiento por defecto del formulario

    // Obtenemos los valores de los campos del formulario
    const idCliente = document.getElementById("idCliente").value;
    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const direccion = document.getElementById("direccion").value.trim();

    // Validación de campos
    if (!nombre || !apellido || !email || !telefono || !direccion) {
        alert("Por favor complete correctamente los campos.");
        return;
    }

    // Creamos un objeto artículo con los datos del formulario
    const cliente = { nombre, apellido, email, telefono, direccion };
    // Determinamos si es una edición (PUT) o creación (POST)
    const url = idCliente ? `${API_URL_CLIENTE}/${idCliente}` : API_URL_CLIENTE;
    const metodo = idCliente ? "PUT" : "POST";

    // Enviamos el artículo al backend usando fetch
    fetch(url, {
        method: metodo,
        headers: { "Content-Type": "application/json" }, // Indicamos que el cuerpo es JSON
        body: JSON.stringify(cliente) // Convertimos el objeto a JSON
    })
    .then(response => {
        if (!response.ok) throw new Error("Error al guardar"); // Verificamos respuesta exitosa
        return response.json();
    })
    .then(() => {
        // Limpiamos el formulario y recargamos la tabla
        document.getElementById("form-cliente").reset();
        document.getElementById("idCliente").value = "";
        listarClientes();
    })
    .catch(error => console.error("Error al guardar el cliente:", error)); // Manejo de errores
}

// === Cargar artículo en el formulario para edición ===
function editarCliente(id) {
    // Llamada GET para obtener los datos del artículo por su ID
    fetch(`${API_URL_CLIENTE}/${id}`)
        .then(response => response.json()) // Convertimos la respuesta a JSON
        .then(cliente => {
            // Cargamos los datos del artículo en el formulario
            document.getElementById("idCliente").value = cliente.idCliente;
            document.getElementById("nombre").value = cliente.nombre;
            document.getElementById("apellido").value = cliente.apellido;
            document.getElementById("email").value = cliente.email;
            document.getElementById("telefono").value = cliente.telefono;
            document.getElementById("direccion").value = cliente.direccion;
        })
        .catch(error => console.error("Error al obtener el cliente:", error)); // Manejo de errores
}

// === Eliminar un artículo ===
function eliminarCliente(id) {
    // Confirmación antes de eliminar
    if (confirm("¿Deseás eliminar este cliente?")) {
        // Llamada DELETE al backend
        fetch(`${API_URL_CLIENTE}/${id}`, {
            method: "DELETE"
        })
        .then(response => {
            if (!response.ok) throw new Error("Error al eliminar"); // Verificamos que la respuesta sea exitosa
            listarClientes(); // Actualizamos la lista de artículos
        })
        .catch(error => console.error("Error al eliminar el cliente:", error)); // Manejo de errores
    }
}
