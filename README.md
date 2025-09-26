# delta-movies

&gt; Tienda de películas en React + TypeScript + Vite + Material-UI  
&gt; Evaluación técnica Delta Corp – Frontend Junior

## 🚀 Demo en vivo
[![Vercel](https://img.shields.io/badge/demo-vercel-black?style=flat&logo=vercel)](https://delta-movies-nsnfbkqqa-donisws-projects.vercel.app)

## 📦 Instalación y uso
```bash
# 1. Usar la versión de Node indicada
nvm use                 # .nvmrc -&gt; 20.11.0

# 2. Instalar dependencias
npm install

# 3. Levantar entorno de desarrollo
npm run dev             # http://localhost:5173

# 4. Build de producción
npm run build

## 🐳 Docker

### Desarrollo

Requisitos: Docker y Docker Compose.

```bash
# Levantar entorno de desarrollo
docker compose --profile dev up --build

# Acceder: Vite expone en
# http://localhost:5173

# Detener
docker compose --profile dev down
```

### Producción

```bash
# Construir e iniciar en modo producción (perfil prod)
docker compose --profile prod up --build -d

# Acceder: Nginx expone en
# http://localhost:8080

# Ver logs
docker compose --profile prod logs -f

# Detener y eliminar contenedores
docker compose --profile prod down
```