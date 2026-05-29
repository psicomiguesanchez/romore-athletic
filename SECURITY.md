# 🛡️ ROMORE Athletic - Guía de Seguridad

## 🚀 Instalación y Ejecución

### 1. Instalar dependencias
```bash
npm install
```

### 2. Ejecutar el servidor
```bash
# Modo desarrollo (con nodemon para auto-reload)
npm run dev

# Modo producción
npm start
```

### 3. Acceder a la aplicación
- **Admin**: http://127.0.0.1:5500/admin.html
- **Tienda**: http://127.0.0.1:5500/tienda-cliente.html
- **Health Check**: http://127.0.0.1:5500/api/health

---

## 🔒 Medidas de Seguridad Implementadas

### 1. **HELMET.js** - Security Headers
Headers HTTP de seguridad estándar:
- ✅ **Content-Security-Policy (CSP)** - Previene inyección de scripts
- ✅ **X-Frame-Options** - Previene clickjacking
- ✅ **X-Content-Type-Options** - Previene MIME type sniffing
- ✅ **Strict-Transport-Security (HSTS)** - Fuerza HTTPS
- ✅ **Referrer-Policy** - Controla información del referrer
- ✅ **X-XSS-Protection** - Protección contra XSS

### 2. **CORS** - Control de Origen Cruzado
```javascript
Orígenes permitidos:
- http://127.0.0.1:5500
- http://localhost:5500
- http://localhost:3000
```

**Métodos permitidos**: GET, POST, PUT, DELETE, OPTIONS
**Headers permitidos**: Content-Type, Authorization

### 3. **Rate Limiting** - Protección contra ataques
- **General**: 100 requests / 15 minutos
- **API**: 30 requests / 15 minutos
- Excluye archivos estáticos (JS, CSS, imágenes, etc.)

### 4. **Content Security Policy (CSP)**
Define exactamente qué recursos pueden cargarse:
- Scripts: Solo desde 'self' y CDN de confianza
- Estilos: Solo desde 'self' y Google Fonts
- Imágenes: HTTPS y data URLs
- Frames: Bloqueados completamente
- Objetos: Bloqueados (Flash, applets)

---

## 🚀 Guía Rápida

### Instalar y ejecutar
```bash
# 1. En el terminal, navega a la carpeta del proyecto
cd D:\Claude\Projects\ROMOREATHLETIC

# 2. Instala las dependencias
npm install

# 3. Inicia el servidor seguro
npm start

# El servidor estará disponible en: http://127.0.0.1:5500
```

### Características de Seguridad
✅ CORS - Solo aceptará requests del aplicativo
✅ Security Headers - Todos los headers de seguridad implementados
✅ Rate Limiting - Protección contra ataques DDoS
✅ CSP - Control de fuentes de contenido
✅ HSTS - Fuerza conexiones seguras

