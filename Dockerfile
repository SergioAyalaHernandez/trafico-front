# Etapa de construcción
FROM node:18-alpine AS build

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar el código fuente
COPY . .

# Compilar la aplicación para producción
RUN npm run build -- --configuration production

# Etapa de producción
FROM nginx:alpine

# Copiar los archivos compilados desde la etapa de construcción
COPY --from=build /app/dist/*/. /usr/share/nginx/html/

# Exponer el puerto 80
EXPOSE 80

# Comando para iniciar nginx
CMD ["nginx", "-g", "daemon off;"]
