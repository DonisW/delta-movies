  # 🎬 Delta Movies – Prueba Técnica Frontend

Aplicación web construida con **React + TypeScript** que simula una tienda de compra de películas. Incluye catálogo, búsqueda, paginación, carrito de compras, favoritos y modo oscuro.

## 🚀 Demo en vivo
[![Vercel](https://img.shields.io/badge/demo-vercel-black?style=flat&logo=vercel)](https://delta-movies-nsnfbkqqa-donisws-projects.vercel.app)

## 📦 Instalación y uso
### Requisitos
- Node.js v20.11.0

### Pasos

```bash
# Clonar el repositorio
git clone https://github.com/DonisW/delta-movies.git

# Entrar al directorio
cd delta-movies

# Usar la versión de Node indicada
nvm use                 # .nvmrc -&gt; 20.11.0

# Instalar dependencias
npm install

# Levantar entorno de desarrollo
npm run dev             # http://localhost:5173

# Build de producción
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
## 🧱 Arquitectura y decisiones técnicas
| Área | Decisión | Motivo |
|---|---|---|
| **Lenguaje** | TypeScript | Tipado estático, autocompletado y menor cantidad de errores en tiempo de ejecución. |
| **Estado global** | React Context API | Suficiente para el alcance de la prueba; evita la complejidad de Redux. |
| **UI** | Material-UI (MUI) | Componentes accesibles y con temas incluidos (modo claro/oscuro). |
| **Build Tool** | Vite	Desarrollo ágil con Hot Module Replacement (HMR) y builds optimizados. | Arranque rápido y recarga |
| **Estilos** | MUI `sx` + `styled` | No se añadió Tailwind para mantener una sola fuente de verdad de estilos. |
| **Paginación** | Client-side | Catálogo mockeado pequeño; se evita sobrecosto de backend. |
| **Persistencia** | `localStorage` | Carrito y favoritos sobreviven a recargas sin backend. |
| **Docker** | contenedores | despliegue inmediato |
| **Despliegue** | Vercel | Integración nativa con GitHub, despliegue continuo y alta disponibilidad. |
| **Estructura de carpetas** | Por dominio (`/context`, `/components`, `/hooks`, `/pages`). | Fácil de escalar |
