package com.talentotech.crud.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.talentotech.crud.models.entities.Categoria;

@Repository
public interface CategoriaRepository extends  JpaRepository<Categoria, Long>{

}
