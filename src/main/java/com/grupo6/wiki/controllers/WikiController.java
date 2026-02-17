package com.grupo6.wiki.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.grupo6.wiki.model.PaginaWiki;

@Controller
public class WikiController {

    private final List<PaginaWiki> wikiPages = new ArrayList<>();

    public WikiController() {
        // Inicializar datos simulados
        wikiPages.add(new PaginaWiki("spring-boot", "Introducción a Spring Boot",
                "Spring Boot facilita la creación de aplicaciones basadas en Spring independientes y de grado de producción que puedes 'simplemente ejecutar'."));
        wikiPages.add(new PaginaWiki("mvc", "Arquitectura MVC",
                "El patrón Modelo-Vista-Controlador separa una aplicación en tres componentes lógicos principales: el modelo, la vista y el controlador."));
        wikiPages.add(new PaginaWiki("docker", "Ecosistema Docker",
                "Docker es una plataforma abierta para desarrollar, enviar y ejecutar aplicaciones. Docker permite separar tus aplicaciones de tu infraestructura."));
        wikiPages.add(new PaginaWiki("maven", "Maven",
                "Apache Maven es una herramienta de gestión y comprensión de proyectos de software. Basado en el concepto de un modelo de objetos de proyecto (POM)."));
    }

    @GetMapping("/")
    public String index(Model model) {
        model.addAttribute("temas", wikiPages); // Para el sidebar en la home también
        return "index";
    }

    @GetMapping("/about")
    public String about(Model model) {
        model.addAttribute("temas", wikiPages);
        return "about";
    }

    @GetMapping("/wiki/{id}")
    public String verWiki(@PathVariable String id, Model model) {
        Optional<PaginaWiki> pagina = wikiPages.stream().filter(p -> p.getId().equals(id)).findFirst();

        if (pagina.isPresent()) {
            model.addAttribute("pagina", pagina.get());
        } else {
            return "redirect:/";
        }

        model.addAttribute("temas", wikiPages); // Para mantener el menú lateral actualizado
        return "ver_wiki";
    }
}
