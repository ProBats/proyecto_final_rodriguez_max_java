package com.talentotech.crud.models.entities;

import java.io.Serializable;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class DetallePedidoId implements Serializable {

    private Long idPedido;
    private Long idProducto;

}
