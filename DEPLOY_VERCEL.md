# 🚀 DEPLOY A VERCEL - Guía Rápida

## PASO 1: Inicializar Git (Si no lo has hecho)

```bash
cd D:\Claude\Projects\ROMOREATHLETIC

# Inicializar repo
git init

# Agregar todos los archivos
git add .

# Hacer commit inicial
git commit -m "ROMORE Athletic - Lanzamiento a producción"

# Cambiar rama a main (Vercel lo requiere)
git branch -M main
```

## PASO 2: Crear Repositorio en GitHub

```
1. Ir a https://github.com/new
2. Nombre: romore-athletic
3. Descripción: "ROMORE Athletic - Fitness & Nutrition eCommerce"
4. Seleccionar: Public o Private (tu elección)
5. Clic: "Create repository"
```

## PASO 3: Conectar Repositorio Local con GitHub

```bash
# REEMPLAZA tu-usuario con tu username de GitHub
git remote add origin https://github.com/tu-usuario/romore-athletic.git
git push -u origin main
```

**Ejemplo si tu usuario es "miguesanchez":**
```bash
git remote add origin https://github.com/miguesanchez/romore-athletic.git
git push -u origin main
```

## PASO 4: Deploy en Vercel

```
1. Ir a https://vercel.com/dashboard
2. Clic: "Add New..." → "Project"
3. Seleccionar: "Import Git Repository"
4. Buscar y seleccionar: "romore-athletic"
5. Clic: "Import"
6. En "Environment Variables":
   - NODE_ENV = production
   - PORT = 3000
7. Clic: "Deploy"
```

**¡LISTO! En 2-3 minutos:**
- URL: `https://romore-athletic.vercel.app`
- HTTPS: Automático ✅
- Dominio gratuito: Incluido ✅

## PASO 5: Verificar que Funcione

```
Abre en navegador:
- Admin: https://romore-athletic.vercel.app/admin.html
- Tienda: https://romore-athletic.vercel.app/tienda-cliente.html
- Health: https://romore-athletic.vercel.app/api/health
```

## 🔄 Después (Cuando Compren Dominio)

```
1. Comprar dominio en Namecheap/Hostinger
2. En Vercel: Project Settings → Domains
3. Agregar: romore-athletic.com
4. Copiar registros DNS
5. En Namecheap: Pegar en Advanced DNS
6. Esperar 10-30 min
7. ✅ romore-athletic.com apunta a tu tienda
```

## ❓ Problemas Comunes

**"Error de conexión a Firebase"**
- Verifica que Firebase esté accesible desde internet
- Revisa las reglas de seguridad en Firestore

**"Error 404 en /admin.html"**
- Verifica que server.js esté sirviendo archivos estáticos correctamente
- Abre la consola del navegador para ver errores

**"Node modules muy grande"**
- Verifica .gitignore tiene "node_modules/"
- Nunca hagas git add node_modules

## ✅ Checklist Final

- [ ] Git inicializado (`git init`)
- [ ] Archivos agregados (`git add .`)
- [ ] Commit hecho (`git commit`)
- [ ] Rama es "main" (`git branch -M main`)
- [ ] Repo creado en GitHub
- [ ] Código pusheado (`git push`)
- [ ] Proyecto importado en Vercel
- [ ] Variables de entorno configuradas
- [ ] Deploy completado
- [ ] URLs funcionando

