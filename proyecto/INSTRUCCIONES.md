# Instrucciones de Ejecución - Wiki del Proyecto

Este proyecto está dockerizado para facilitar su despliegue y asegurar que funcione correctamente en cualquier entorno.

## Prerrequisitos
-   Tener [Docker](https://www.docker.com/) instalado y ejecutándose en su máquina.

## Pasos para Ejecutar

### 1. Abrir la terminal
Navegue hasta la carpeta raíz del proyecto (donde se encuentra este archivo `INSTRUCCIONES.md` y el `Dockerfile`).

```bash
cd /ruta/a/tu/proyecto
```

### 2. Construir la imagen Docker
Ejecute el siguiente comando para crear la imagen del contenedor. Puede cambiar `wiki-proyecto` por el nombre que desee.

```bash
docker build -t wiki-proyecto .
```
*(No olvide el punto `.` al final del comando)*

### 3. Ejecutar el contenedor
Una vez construida la imagen, inicie el contenedor mapeando el puerto 80 del contenedor al puerto 8080 de su máquina local.

```bash
docker run -d -p 8080:80 --name mi-wiki wiki-proyecto
```

## Verificar el Despliegue

1.  Abra su navegador web favorito (Chrome, Firefox, etc.).
2.  Ingrese la siguiente dirección:
    
    [http://localhost:8080/Inicio.html](http://localhost:8080/Inicio.html)

3.  Debería ver la página de inicio de la Wiki. Pruebe la navegación a "Sobre Nosotros" y "Contáctenos".

## Detener la ejecución

Para detener y eliminar el contenedor, ejecute:

```bash
docker stop mi-wiki
docker rm mi-wiki
```
