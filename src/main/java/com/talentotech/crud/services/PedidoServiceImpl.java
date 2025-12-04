package com.talentotech.crud.services;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.talentotech.crud.models.entities.DetallePedido;
import com.talentotech.crud.models.entities.Pedido;
import com.talentotech.crud.repositories.PedidoRepository;
import com.talentotech.crud.services.interfaces.PedidoService;

@Service
public class PedidoServiceImpl implements PedidoService {

    private final PedidoRepository pr;

    PedidoServiceImpl(PedidoRepository pr) {
        this.pr = pr;
    }

    @Override
    public List<Pedido> listarPedidos() {
        return pr.findAll();
    }

    @Override
    public Optional<Pedido> obtenerPedidoPorId(Long id) {
        return pr.findById(id);
    }

    @Override
    public Pedido guardarPedido(Pedido pedido) {
        // calcular total
        double total = pedido.getDetalles().stream()
                .mapToDouble(DetallePedido::getSubtotal)
                .sum();

        pedido.setTotal(total);
        pedido.setFechaCreacion(LocalDate.now());

        // asignar la relacion pedido → detalles
        pedido.getDetalles().forEach(det -> det.setPedido(pedido));

        return pr.save(pedido);
    }

    @Override
    public void eliminarPedido(Long id) {
        pr.deleteById(id);
    }

}
