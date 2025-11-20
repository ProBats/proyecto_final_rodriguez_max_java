package com.talentotech.crud.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.talentotech.crud.models.entities.Cliente;

@Repository
public interface ClienteRepository extends  JpaRepository<Cliente, Long>{

}
