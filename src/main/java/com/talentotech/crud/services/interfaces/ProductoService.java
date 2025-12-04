package com.talentotech.crud.services.interfaces;

import java.util.List;
import java.util.Optional;

import com.talentotech.crud.models.entities.Producto;

public interface ProductoService {

    List<Producto> listarProductos();
    Optional<Producto> obtenerProductoPorId(Long id);
    Producto guardarProducto(Producto producto);
    Producto actualizarProducto(Long id, Producto producto);
    void eliminarProducto(Long id);
}
