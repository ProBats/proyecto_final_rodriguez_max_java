package com.talentotech.crud.models.dto;

import java.util.List;

import lombok.Data;

@Data
public class PedidoRequest {
    private Long idCliente;
    private List<ItemPedidoRequest> items;
}
