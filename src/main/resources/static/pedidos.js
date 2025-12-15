const API_CLIENTES  = "http://localhost:8080/api/clientes";
const API_PRODUCTOS = "http://localhost:8080/api/productos";
const API_PEDIDOS   = "http://localhost:8080/api/pedidos";

let carrito = [];

/* ===============================
    CARGA INICIAL
================================ */
document.addEventListener("DOMContentLoaded", () => {
    cargarClientes();
    cargarProductos();
});

/* ===============================
    CLIENTES
================================ */
function cargarClientes() {
    fetch(API_CLIENTES)
        .then(res => res.json())
        .then(clientes => {
            const select = document.getElementById("clienteSelect");
            select.innerHTML = `<option value="">Seleccione cliente</option>`;

            clientes.forEach(c => {
                select.innerHTML += `
                    <option value="${c.idCliente}">
                        ${c.nombre} ${c.apellido}
                    </option>`;
            });
        });
}

/* ===============================
    PRODUCTOS
================================ */
function cargarProductos() {
    fetch(API_PRODUCTOS)
        .then(res => res.json())
        .then(productos => {
            const select = document.getElementById("productoSelect");
            select.innerHTML = `<option value="">Seleccione producto</option>`;

            productos.forEach(p => {
                select.innerHTML += `
                    <option value="${p.idProducto}" data-precio="${p.precio}">
                        ${p.nombre}
                    </option>`;
            });
        });
}

/* ===============================
    CARRITO
================================ */
function agregarAlCarrito() {
    const productoSelect = document.getElementById("productoSelect");
    const cantidadInput  = document.getElementById("cantidad");

    const idProducto = productoSelect.value;
    const cantidad   = parseInt(cantidadInput.value);

    if (!idProducto || cantidad <= 0) {
        alert("Seleccione un producto y cantidad válida");
        return;
    }

    const nombre = productoSelect.options[productoSelect.selectedIndex].text;
    const precio = parseFloat(
        productoSelect.options[productoSelect.selectedIndex].dataset.precio
    );

    const existente = carrito.find(i => i.idProducto == idProducto);

    if (existente) {
        existente.cantidad += cantidad;
        existente.subtotal = existente.cantidad * existente.precio;
    } else {
        carrito.push({
            idProducto,
            nombre,
            precio,
            cantidad,
            subtotal: precio * cantidad
        });
    }

    actualizarTabla();
    cantidadInput.value = 1;
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarTabla();
}

function actualizarTabla() {
    const tbody = document.getElementById("tablaCarrito");
    tbody.innerHTML = "";

    let total = 0;

    carrito.forEach((item, index) => {
        total += item.subtotal;

        tbody.innerHTML += `
            <tr>
                <td>${item.nombre}</td>
                <td>${item.cantidad}</td>
                <td>$${item.precio}</td>
                <td>$${item.subtotal}</td>
                <td>
                    <button class="btn btn-danger btn-sm"
                        onclick="eliminarDelCarrito(${index})">X</button>
                </td>
            </tr>
        `;
    });

    document.getElementById("total").textContent = total.toFixed(2);
}

/* ===============================
    CONFIRMAR PEDIDO
================================ */
function confirmarPedido() {
    if (carrito.length === 0) {
        alert("El carrito está vacío");
        return;
    }

    const idCliente = document.getElementById("clienteSelect").value;

    const pedido = {
        idCliente: idCliente,
        items: carrito.map(item => ({
            idProducto: item.idProducto,
            cantidad: item.cantidad
        }))
    };

    fetch(API_PEDIDOS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pedido)
    })
    .then(r => {
        if (!r.ok) throw new Error();
        return r.json();
    })
    .then(() => {
        alert("Pedido creado correctamente");
        carrito = [];
        actualizarTabla();
    })
    .catch(() => alert("Error al crear el pedido"));
}