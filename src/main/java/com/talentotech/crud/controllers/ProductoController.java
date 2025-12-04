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

import com.talentotech.crud.models.entities.Producto;
import com.talentotech.crud.services.interfaces.ProductoService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/productos")
public class ProductoController {

    private final ProductoService ps;

    public ProductoController(ProductoService ps){
        this.ps = ps;
    }

    @GetMapping
    public List<Producto> listar(){
        return ps.listarProductos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Producto> obtenerPorId(@PathVariable Long id){
        return ps.obtenerProductoPorId(id).map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Producto crearProducto(@RequestBody Producto producto){
        return ps.guardarProducto(producto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Producto> actualizaProducto(@PathVariable Long id,@RequestBody Producto producto){
        if (ps.obtenerProductoPorId(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(ps.actualizarProducto(id, producto));
    }

    @DeleteMapping("/{id}")
        public ResponseEntity<Void> eliminarProducto(@PathVariable Long id){
        if (ps.obtenerProductoPorId(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        ps.eliminarProducto(id);
        return ResponseEntity.noContent().build(); 
        }

}
