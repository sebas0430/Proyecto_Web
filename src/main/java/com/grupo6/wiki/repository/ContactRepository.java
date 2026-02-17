package com.grupo6.wiki.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.grupo6.wiki.model.entity.Contact;

/**
 * Repositorio JPA para la entidad Contact.
 *
 * Al extender JpaRepository se obtienen automáticamente los métodos CRUD:
 *   - save(), findById(), findAll(), deleteById(), etc.
 *
 * Nota: Las consultas de lectura (findAll, findById) solo retornarán
 * registros con status = 0 gracias a @Where en la entidad.
 * El deleteById() ejecutará un UPDATE (soft delete) gracias a @SQLDelete.
 */
@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {
    // Spring Data JPA provee todos los métodos CRUD básicos automáticamente.
    // Se pueden agregar queries personalizados si se necesitan, por ejemplo:
    // List<Contact> findByCorreoElectronico(String correoElectronico);
}
