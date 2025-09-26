# Etapa 1: Build (Node + PNPM/NPM). Usamos Node 20 para compatibilidad con .nvmrc
FROM node:20-alpine AS builder

# Crear y posicionar el directorio de trabajo
WORKDIR /app

# Instalar dependencias solo a partir de manifests para cacheo eficiente
COPY package*.json ./

# Instalar dependencias en modo limpio y reproducible
RUN npm ci

# Copiar el resto del código
COPY . .

# Construir (tsc + vite build se ejecuta desde el script "build")
RUN npm run build

# Etapa 2: Runtime con Nginx para servir archivos estáticos
FROM nginx:1.27-alpine AS runner

# Eliminar configuración por defecto y añadir la nuestra para SPA
RUN rm -f /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar artefactos de build
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

# Comando por defecto
CMD ["nginx", "-g", "daemon off;"]
