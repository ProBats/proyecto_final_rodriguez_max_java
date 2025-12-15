package com.talentotech.crud.services;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.talentotech.crud.models.dto.ItemPedidoRequest;
import com.talentotech.crud.models.entities.Cliente;
import com.talentotech.crud.models.entities.DetallePedido;
import com.talentotech.crud.models.entities.Pedido;
import com.talentotech.crud.models.entities.Producto;
import com.talentotech.crud.models.entities.enums.EstadoPedido;
import com.talentotech.crud.repositories.ClienteRepository;
import com.talentotech.crud.repositories.PedidoRepository;
import com.talentotech.crud.repositories.ProductoRepository;
import com.talentotech.crud.services.interfaces.PedidoService;

import jakarta.transaction.Transactional;



@Service
public class PedidoServiceImpl implements PedidoService {

    private final PedidoRepository pr;
    private final ClienteRepository cr;
    private final ProductoRepository prodr;

    PedidoServiceImpl(PedidoRepository pr,ClienteRepository cr, ProductoRepository prodr) {
        this.pr = pr;
        this.cr = cr;
        this.prodr = prodr;
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
    @Transactional
    public Pedido guardarPedido(Long idCliente, List<DetallePedido> items) {
        List<DetallePedido> detalles = new ArrayList<>();

        for (ItemPedidoRequest item : items) {
            DetallePedido detalle = new DetallePedido();
            detalle.setCantidad(item.getCantidad());

            Producto producto = productoRepository
                    .findById(item.getIdProducto())
                    .orElseThrow();

            detalle.setProducto(producto);
            detalle.setPrecio(producto.getPrecio());

            detalles.add(detalle);
        }

        Pedido pedido = new Pedido();
        pedido.setIdCliente(idCliente);
        pedido.setDetalles(detalles);

        return pedidoRepository.save(pedido);
    }
    

    @Override
    public void eliminarPedido(Long id) {
        pr.deleteById(id);
    }

}
