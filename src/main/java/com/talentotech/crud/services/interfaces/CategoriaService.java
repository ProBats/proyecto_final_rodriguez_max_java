package com.talentotech.crud.services.interfaces;

import java.util.List;
import java.util.Optional;

import com.talentotech.crud.models.entities.Categoria;

public interface CategoriaService {

    List<Categoria> listarCategorias();
    Optional<Categoria> obtenerCategoriaPorId(Long id);
    Categoria guardarCategoria(Categoria categoria);
    Categoria actualizarCategoria(Long id, Categoria categoria);
    void eliminarCategoria(Long id);
}
