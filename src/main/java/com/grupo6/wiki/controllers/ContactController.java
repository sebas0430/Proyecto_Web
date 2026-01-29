package com.grupo6.wiki.controllers;

import com.grupo6.wiki.model.Contacto;
import com.grupo6.wiki.model.PaginaWiki; // Para el menu lateral, idealmente usar un @ControllerAdvice o Service
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;
import java.util.ArrayList;

@Controller
public class ContactController {

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
        model.addAttribute("contacto", new Contacto());
        model.addAttribute("temas", getTemas());
        return "contacto";
    }

    @PostMapping("/contacto")
    public String procesarFormulario(@ModelAttribute Contacto contacto, Model model) {
        // En un caso real, aquí se guardaría en BD o se enviaría correo
        model.addAttribute("mensajeExito", "¡Gracias " + contacto.getNombre() + "! Tu mensaje ha sido recibido.");
        model.addAttribute("temas", getTemas());
        return "contacto";
    }
}
