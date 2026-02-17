package com.grupo6.wiki.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import com.grupo6.wiki.model.PaginaWiki;
import com.grupo6.wiki.model.entity.Contact;
import com.grupo6.wiki.repository.ContactRepository;

@Controller
public class ContactController {

    private final ContactRepository contactRepository;

    // Inyección de dependencias por constructor
    public ContactController(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    // Necesitamos los temas para el sidebar, duplicamos por simplicidad académica
    // En una app real usaríamos un Service compartido
    private List<PaginaWiki> getTemas() {
        List<PaginaWiki> wikiPages = new ArrayList<>();
        wikiPages.add(new PaginaWiki("spring-boot", "Introducción a Spring Boot", ""));
        wikiPages.add(new PaginaWiki("mvc", "Arquitectura MVC", ""));
        wikiPages.add(new PaginaWiki("docker", "Ecosistema Docker", ""));
        wikiPages.add(new PaginaWiki("maven", "Maven", ""));
        return wikiPages;
    }

    @GetMapping("/contacto")
    public String mostrarFormulario(Model model) {
        model.addAttribute("contact", new Contact());
        model.addAttribute("temas", getTemas());
        return "contacto";
    }

    @PostMapping("/contacto")
    public String procesarFormulario(@ModelAttribute Contact contact, Model model) {
        // Guardar el contacto en la base de datos usando JPA
        contactRepository.save(contact);

        model.addAttribute("mensajeExito",
                "¡Gracias " + contact.getNombreCompleto() + "! Tu mensaje ha sido recibido y guardado correctamente.");
        model.addAttribute("contact", new Contact()); // Reset form
        model.addAttribute("temas", getTemas());
        return "contacto";
    }
}
