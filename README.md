# Wiki Los Aventureros

Este proyecto es una aplicación web Wiki desarrollada con Spring Boot y Thymeleaf, siguiendo el patrón MVC.

## Requisitos Previos

- Docker instalado en su máquina.

## Instrucciones de Ejecución (Docker)

Para cumplir con los requisitos de despliegue, la aplicación debe ejecutarse utilizando Docker. Siga estos pasos:

1.  **Construir la imagen de Docker:**
    Abra una terminal en la raíz del proyecto y ejecute:
    ```bash
    docker build -t wiki-aventureros .
    ```

2.  **Ejecutar el contenedor:**
    Una vez construida la imagen, inicie el contenedor mapeando el puerto 8080:
    ```bash
    docker run -p 8080:8080 wiki-aventureros
    ```

3.  **Acceder a la aplicación:**
    Abra su navegador y vaya a: [http://localhost:8080](http://localhost:8080)

## Arquitectura

- **Backend**: Spring Boot (Controladores y Modelos).
- **Frontend**: Thymeleaf (Vistas dinámicas, Layouts).
- **Validación**: JavaScript (Formulario de contacto).

## Integrantes
Grupo 6 - Los Aventureros