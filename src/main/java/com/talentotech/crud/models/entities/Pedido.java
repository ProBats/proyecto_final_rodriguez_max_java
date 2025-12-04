package com.talentotech.crud.models.entities;

import java.time.LocalDate;
import java.util.List;

import com.talentotech.crud.models.entities.enums.EstadoPedido;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name="pedidos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Pedido {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long idPedido;
    private LocalDate fechaCreacion = LocalDate.now();

    @Enumerated(EnumType.STRING)
    private EstadoPedido estado;
    private double total;

    @ManyToOne
    @JoinColumn(name="idCliente")
    private Cliente cliente;

    @OneToMany(mappedBy="pedido", cascade=CascadeType.ALL)
    private List<DetallePedido> detalles;
}
