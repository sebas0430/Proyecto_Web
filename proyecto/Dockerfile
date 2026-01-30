# Usar una imagen ligera de Nginx
FROM nginx:alpine

# Copiar el contenido de la carpeta Wiki al directorio predeterminado de Nginx
# Esto asume que el build context es la carpeta raíz del proyecto (donde está este Dockerfile)
COPY Wiki /usr/share/nginx/html

# Exponer el puerto 80 para el tráfico web
EXPOSE 80

# El comando por defecto de nginx inicia el servidor, así que no es necesario CMD
