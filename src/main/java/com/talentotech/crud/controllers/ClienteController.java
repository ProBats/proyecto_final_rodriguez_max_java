package com.talentotech.crud.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.talentotech.crud.models.entities.Cliente;
import com.talentotech.crud.services.interfaces.ClienteService;

@CrossOrigin(origins ="*")
@RestController
@RequestMapping("/api/clientes")
public class ClienteController {

    private final ClienteService cs;

    public ClienteController(ClienteService cs){
        this.cs = cs;
    }

    @GetMapping
    public List<Cliente> listar(){
        return cs.listarClientes();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cliente> obtenerPorId(@PathVariable Long id){
        return cs.obtenerClientePorId(id).map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    @PostMapping
    public Cliente crearCliente(@RequestBody Cliente cliente){
        return cs.guardarCliente(cliente);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cliente> actualizarCliente(@PathVariable Long id, @RequestBody Cliente cliente){
        if (cs.obtenerClientePorId(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(cs.actualizarCliente(id, cliente));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarCliente(@PathVariable Long id){
        if (cs.obtenerClientePorId(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        cs.eliminarCliente(id);
        return ResponseEntity.noContent().build();
    }
}