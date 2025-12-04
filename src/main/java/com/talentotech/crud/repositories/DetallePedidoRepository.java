package com.talentotech.crud.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.talentotech.crud.models.entities.DetallePedido;
import com.talentotech.crud.models.entities.DetallePedidoId;

@Repository
public interface DetallePedidoRepository extends JpaRepository<DetallePedido,DetallePedidoId> {

}
