package com.talentotech.crud.services.interfaces;

import java.util.List;
import java.util.Optional;

import com.talentotech.crud.models.entities.DetallePedido;
import com.talentotech.crud.models.entities.Pedido;

public interface PedidoService {
    
    List<Pedido> listarPedidos();
    Optional<Pedido> obtenerPedidoPorId(Long id);
    Pedido guardarPedido(Long idCliente,List<DetallePedido> items);
    void eliminarPedido(Long id);
}
