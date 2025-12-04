package com.talentotech.crud.services.interfaces;

import java.util.List;
import java.util.Optional;

import com.talentotech.crud.models.entities.Cliente;

public interface ClienteService {

    List<Cliente> listarClientes();
    Optional<Cliente> obtenerClientePorId(Long id);
    Cliente guardarCliente(Cliente cliente);
    Cliente actualizarCliente(Long id, Cliente cliente);
    void eliminarCliente(Long id);
}
