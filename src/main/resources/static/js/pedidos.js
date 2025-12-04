const API_CLIENTES = "http://localhost:8080/api/clientes";
const API_PRODUCTOS = "http://localhost:8080/api/productos";
const API_PEDIDOS   = "http://localhost:8080/api/pedidos";
const API_DETALLES  = "http://localhost:8080/api/detalles";

let carrito = [];

// Cargar clientes y productos
document.addEventListener("DOMContentLoaded", () => {
    fetch(API_CLIENTES)
        .then(r => r.json())
        .then(data => {
            let select = document.getElementById("clienteSelect");
            data.forEach(c => {
                select.innerHTML += `<option value="${c.idCliente}">${c.nombre} ${c.apellido}</option>`;
            });
        });

    fetch(API_PRODUCTOS)
        .then(r => r.json())
        .then(data => {
            let select = document.getElementById("productoSelect");
            data.forEach(p => {
                select.innerHTML += `<option value="${p.idProducto}" data-precio="${p.precio}">${p.nombre}</option>`;
            });
        });
});

// Agregar producto al carrito
function agregarAlCarrito() {
    let productoSelect = document.getElementById("productoSelect");
    let id = productoSelect.value;
    let nombre = productoSelect.options[productoSelect.selectedIndex].text;
    let precio = parseFloat(productoSelect.options[productoSelect.selectedIndex].dataset.precio);
    let cantidad = parseInt(document.getElementById("cantidad").value);

    if (!cantidad || cantidad <= 0) {
        alert("Cantidad inválida");
        return;
    }

    carrito.push({
        idProducto: id,
        nombre,
        cantidad,
        precio,
        subtotal: precio * cantidad
    });

    actualizarTabla();
}

function actualizarTabla() {
    let tbody = document.getElementById("tablaCarrito");
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
                    <button class="btn btn-danger btn-sm" onclick="eliminar(${index})">X</button>
                </td>
            </tr>
        `;
    });

    document.getElementById("total").textContent = total;
}

function eliminar(index) {
    carrito.splice(index, 1);
    actualizarTabla();
}

// Confirmar el pedido
function confirmarPedido() {
    let idCliente = document.getElementById("clienteSelect").value;
    let total = document.getElementById("total").textContent;

    if (carrito.length === 0) {
        alert("El carrito está vacío");
        return;
    }

    // 1) Crear el pedido
    fetch(API_PEDIDOS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idCliente, total })
    })
    .then(r => r.json())
    .then(pedido => {

        // 2) Crear los detalles
        carrito.forEach(item => {
            fetch(API_DETALLES, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: { idPedido: pedido.idPedido, idProducto: item.idProducto },
                    cantidad: item.cantidad,
                    precioUnitario: item.precio,
                    subtotal: item.subtotal
                })
            });
        });

        alert("Pedido creado correctamente");
        carrito = [];
        actualizarTabla();
    });
}