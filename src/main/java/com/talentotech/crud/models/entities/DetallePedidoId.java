package com.talentotech.crud.models.entities;

import java.io.Serializable;

import jakarta.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class DetallePedidoId implements Serializable {

    private Long idPedido;
    private Long idProducto;

}
