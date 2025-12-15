package com.talentotech.crud.models.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;

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
    @MapsId("idPedido")
    @JoinColumn(name = "id_pedido")
    @JsonIgnore
    private Pedido pedido;

    @ManyToOne
    @MapsId("idProducto")
    @JoinColumn(name="idProducto")
    private Producto producto;

    private int cantidad;
    private double precioUnitario;
    private double subtotal;
}
