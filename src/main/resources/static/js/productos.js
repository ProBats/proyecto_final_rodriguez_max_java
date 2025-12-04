// URL base de la API
const API_URL_PRODUCTO = "http://localhost:8080/api/productos";
const API_URL_CATEGORIA = "http://localhost:8080/api/categorias";

// Cuando se carga la página, mostramos el listado
document.addEventListener("DOMContentLoaded", () => {listarProductos(); cargarCategorias();});

// Manejador del formulario
document.getElementById("form-producto").addEventListener("submit", guardarProducto);

// Botón para cancelar edición
document.getElementById("cancelar").addEventListener("click", () => {
    // Limpiar todos los campos del formulario
    document.getElementById("form-producto").reset();
    // Borrar el ID oculto del formulario
    document.getElementById("idProducto").value = "";
});

// === Cargar categorias ===

function cargarCategorias() {
    fetch(API_URL_CATEGORIA)
    .then(resp => resp.json())
    .then(categorias => {
        const select = document.getElementById("categoria");
        select.innerHTML = '<option value="">Seleccione una categoría</option>';
        categorias.forEach(categoria => {
            const opcion = document.createElement("option");
            opcion.value = categoria.idCategoria;
            opcion.textContent = categoria.nombre;
            select.appendChild(opcion);
        })
    })
}

// === Listar todos los artículos ===
function listarProductos() {
    // Llamada GET a la API para obtener todos los artículos
    fetch(API_URL_PRODUCTO)
        .then(response => response.json()) // Convertimos la respuesta a JSON
        .then(data => {
            const tbody = document.getElementById("tabla-productos"); // Obtenemos el cuerpo de la tabla
            tbody.innerHTML = ""; // Limpiar tabla antes de insertar nuevos datos
            data.forEach(producto => {
                const fila = document.createElement("tr"); // Creamos una fila de tabla
                // Insertamos columnas con los datos del artículo y botones de acción
                fila.innerHTML = `
                    <td>${producto.idProducto}</td>
                    <td>${producto.nombre}</td>
                    <td>${producto.descripcion}</td>
                    <td>${producto.precio.toFixed(2)}</td>
                    <td>${producto.stock}</td>
                    <td>${producto.categoria ? producto.categoria.nombre : "Sin categoría"}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editarProducto(${producto.idProducto})">Editar</button>
                        <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${producto.idProducto})">Eliminar</button>
                    </td>
                `;
                tbody.appendChild(fila); // Agregamos la fila al cuerpo de la tabla
            });
        })
        .catch(error => console.error("Error al listar productos:", error)); // Manejo de errores
}

// === Guardar o actualizar un artículo ===
function guardarProducto(event) {
    event.preventDefault(); // Evitamos el comportamiento por defecto del formulario

    // Obtenemos los valores de los campos del formulario
    const idProducto = document.getElementById("idProducto").value;
    const nombre = document.getElementById("nombre").value.trim();
    const descripcion = document.getElementById("descripcion").value.trim();
    const precio = parseFloat(document.getElementById("precio").value);
    const stock = parseInt(document.getElementById("stock").value);
    const categoriaId = document.getElementById("categoria").value;

    // Validación de campos
    if (!nombre || !descripcion || precio < 0 || stock < 0) {
        alert("Por favor complete correctamente los campos.");
        return;
    }

    // Creamos un objeto artículo con los datos del formulario
    const producto = { nombre, descripcion, precio, stock, categoria : categoriaId ? { idCategoria: Number(categoriaId) } : null };

    // Determinamos si es una edición (PUT) o creación (POST)
    const url = idProducto ? `${API_URL_PRODUCTO}/${idProducto}` : API_URL_PRODUCTO;
    const metodo = idProducto ? "PUT" : "POST";

    // Enviamos el artículo al backend usando fetch
    fetch(url, {
        method: metodo,
        headers: { "Content-Type": "application/json" }, // Indicamos que el cuerpo es JSON
        body: JSON.stringify(producto) // Convertimos el objeto a JSON
    })
    .then(response => {
        if (!response.ok) throw new Error("Error al guardar"); // Verificamos respuesta exitosa
        return response.json();
    })
    .then(() => {
        // Limpiamos el formulario y recargamos la tabla
        document.getElementById("form-producto").reset();
        document.getElementById("idProducto").value = "";
        listarProductos();
    })
    .catch(error => console.error("Error al guardar producto:", error)); // Manejo de errores
}

// === Cargar artículo en el formulario para edición ===
function editarProducto(id) {
    // Llamada GET para obtener los datos del artículo por su ID
    fetch(`${API_URL_PRODUCTO}/${id}`)
        .then(response => response.json()) // Convertimos la respuesta a JSON
        .then(producto => {
            // Cargamos los datos del artículo en el formulario
            document.getElementById("idProducto").value = producto.idProducto;
            document.getElementById("nombre").value = producto.nombre;
            document.getElementById("descripcion").value = producto.descripcion;
            document.getElementById("precio").value = producto.precio;
            document.getElementById("stock").value = producto.stock;

            if (producto.categoria) {
                document.getElementById("categoria").value = producto.categoria.idCategoria;
            }
        })
        .catch(error => console.error("Error al obtener producto:", error)); // Manejo de errores
}

// === Eliminar un artículo ===
function eliminarProducto(id) {
    // Confirmación antes de eliminar
    if (confirm("¿Deseás eliminar esta categoria?")) {
        // Llamada DELETE al backend
        fetch(`${API_URL_PRODUCTO}/${id}`, {
            method: "DELETE"
        })
        .then(response => {
            if (!response.ok) throw new Error("Error al eliminar"); // Verificamos que la respuesta sea exitosa
            listarProductos(); // Actualizamos la lista de artículos
        })
        .catch(error => console.error("Error al eliminar producto:", error)); // Manejo de errores
    }
}
