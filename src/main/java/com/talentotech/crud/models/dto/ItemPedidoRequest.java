package com.talentotech.crud.models.dto;

import lombok.Data;

@Data
public class ItemPedidoRequest {
    private Long idProducto;
    private int cantidad;
}
