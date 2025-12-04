package com.talentotech.crud.models.entities;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name="detalles_pedido")
public class DetallePedido {
    @EmbeddedId
    private DetallePedidoId id;

    @ManyToOne
    @MapsId("idPedido") //indica que la FK forma parte de la clave primaria compuesta, y ahorra tener campos duplicados.
    @JoinColumn(name="idPedido")
    private Pedido pedido;

    @ManyToOne
    @MapsId("idProducto")
    @JoinColumn(name="idProducto")
    private Producto producto;

    private int cantidad;
    private double precioUnitario;
    private double subtotal;
}
