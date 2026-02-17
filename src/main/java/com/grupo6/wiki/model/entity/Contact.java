package com.grupo6.wiki.model.entity;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Entidad JPA que representa un mensaje de contacto enviado
 * desde el formulario "Contáctenos" de la Wiki Los Aventureros.
 *
 * Implementa borrado lógico (Soft Delete):
 *   - status = 0 → Registro ACTIVO
 *   - status = 1 → Registro ELIMINADO (borrado lógico)
 */
@Entity
@Table(name = "contact")
@Data
@NoArgsConstructor
@AllArgsConstructor
@SQLDelete(sql = "UPDATE contact SET status = 1 WHERE id=?")
@Where(clause = "status = 0")
public class Contact {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombreCompleto;

    private String correoElectronico;

    private String telefono;

    private String asunto;

    @Column(columnDefinition = "TEXT")
    private String mensaje;

    /**
     * Campo de borrado lógico.
     * 0 = ACTIVO (por defecto), 1 = ELIMINADO.
     */
    private Integer status = 0;
}
