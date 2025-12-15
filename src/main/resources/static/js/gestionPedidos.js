const API_PEDIDOS = "http://localhost:8080/api/pedidos";

document.addEventListener("DOMContentLoaded", listarPedidos);

function listarPedidos() {
    fetch(API_PEDIDOS)
        .then(r => r.json())
        .then(data => {
            const tbody = document.getElementById("tablaPedidos");
            tbody.innerHTML = "";

            data.forEach(p => {
                tbody.innerHTML += `
                    <tr>
                        <td>${p.idPedido}</td>
                        <td>${p.cliente.nombre} ${p.cliente.apellido}</td>
                        <td>${p.fechaCreacion}</td>
                        <td>${p.estado}</td>
                        <td>$${p.total}</td>
                        <td>
                            <button class="btn btn-info btn-sm"
                                onclick="verDetalle(${p.idPedido})">
                                Ver detalle
                            </button>
                            <button class="btn btn-danger btn-sm"
                                onclick="eliminarPedido(${p.idPedido})">
                                Eliminar
                            </button>
                        </td>
                    </tr>
                `;
            });
        });
}

function verDetalle(idPedido) {
    fetch(`${API_PEDIDOS}/${idPedido}`)
        .then(r => r.json())
        .then(pedido => {
            const tbody = document.getElementById("tablaDetalle");
            tbody.innerHTML = "";

            pedido.detalles.forEach(d => {
                tbody.innerHTML += `
                    <tr>
                        <td>${d.producto.nombre}</td>
                        <td>${d.cantidad}</td>
                        <td>$${d.precioUnitario}</td>
                        <td>$${d.subtotal}</td>
                    </tr>
                `;
            });

            new bootstrap.Modal(document.getElementById("modalDetalle")).show();
        });
}

function eliminarPedido(id) {
    if (!confirm("¿Eliminar este pedido?")) return;

    fetch(`${API_PEDIDOS}/${id}`, {
        method: "DELETE"
    })
    .then(() => listarPedidos());
}