package com.talentotech.crud.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.talentotech.crud.models.entities.Categoria;
import com.talentotech.crud.repositories.CategoriaRepository;
import com.talentotech.crud.services.interfaces.CategoriaService;

@Service
public class CategoriaServiceImpl implements CategoriaService {

    private final CategoriaRepository cr;

    @Autowired
    public CategoriaServiceImpl(CategoriaRepository cr) {
        this.cr = cr;
    }

    @Override
    public List<Categoria> listarCategorias() {
        return cr.findAll();}

    @Override
    public Optional<Categoria> obtenerCategoriaPorId(Long id) {
        return cr.findById(id);
    }

    @Override
    public Categoria guardarCategoria(Categoria categoria) {
        return cr.save(categoria); 
    }

    @Override
    public Categoria actualizarCategoria(Long id, Categoria categoria) {
        categoria.setIdCategoria(id);
        return cr.save(categoria);
    }

    @Override
    public void eliminarCategoria(Long id) {
        cr.deleteById(id);
    }

}
