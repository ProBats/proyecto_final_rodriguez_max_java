package com.talentotech.crud.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.talentotech.crud.models.entities.Producto;
import com.talentotech.crud.repositories.ProductoRepository;
import com.talentotech.crud.services.interfaces.ProductoService;

@Service
public class ProductoServiceImpl implements ProductoService {

    private final ProductoRepository pr;

    @Autowired
    public ProductoServiceImpl(ProductoRepository pr) {
        this.pr = pr;
    }

    @Override
    public List<Producto> listarProductos() {
        return pr.findAll();
    }

    @Override
    public Optional<Producto> obtenerProductoPorId(Long id) {
        return pr.findById(id);
    }

    @Override
    public Producto guardarProducto(Producto producto) {
        return pr.save(producto);
    }

    @Override
    public Producto actualizarProducto(Long id, Producto producto) {
        producto.setIdProducto(id);
        return pr.save(producto);    
    }

    @Override
    public void eliminarProducto(Long id) {
        pr.deleteById(id);
    }

}
