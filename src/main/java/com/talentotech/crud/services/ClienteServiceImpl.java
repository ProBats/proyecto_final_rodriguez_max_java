package com.talentotech.crud.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.talentotech.crud.models.entities.Cliente;
import com.talentotech.crud.repositories.ClienteRepository;
import com.talentotech.crud.services.interfaces.ClienteService;

@Service
public class ClienteServiceImpl implements ClienteService{

    private final ClienteRepository cr;

    public ClienteServiceImpl(ClienteRepository cr) {
        this.cr = cr;
    }

    @Override
    public List<Cliente> listarClientes() {
        return cr.findAll();
    }

    @Override
    public Optional<Cliente> obtenerClientePorId(Long id) {
        return cr.findById(id);
    }

    @Override
    public Cliente guardarCliente(Cliente cliente) {
        return cr.save(cliente);
    }

    @Override
    public Cliente actualizarCliente(Long id, Cliente cliente) {
        cliente.setIdCliente(id);
        return cr.save(cliente);    
    }

    @Override
    public void eliminarCliente(Long id) {
        cr.deleteById(id);
    }


}
