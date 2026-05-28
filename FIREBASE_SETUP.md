# 🔐 Configuración de Firebase para ROMORE Admin

## Paso 1: Crear un proyecto en Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Haz clic en **"Crear un proyecto"**
3. Nombre del proyecto: `ROMORE-Admin` (o el que prefieras)
4. Selecciona **"No" para Google Analytics** (opcional)
5. Haz clic en **"Crear proyecto"**

## Paso 2: Registrar tu aplicación web

1. En la consola, haz clic en **"Agregar app"**
2. Selecciona **"Web"** (icono `</>`)**
3. Dale un nombre: `ROMORE Tienda Admin`
4. Marca la opción **"Also set up Firebase Hosting for this app"** (opcional)
5. Haz clic en **"Registrar app"**
6. **COPIA la configuración Firebase** que aparece en un objeto `firebaseConfig`

## Paso 3: Actualizar la configuración en admin.html

Reemplaza la configuración de Firebase en el archivo `admin.html` (línea ~972) con tu configuración real:

```javascript
const firebaseConfig = {
    apiKey: "TU_API_KEY_AQUI",
    authDomain: "tu-proyecto.firebaseapp.com",
    projectId: "tu-proyecto",
    storageBucket: "tu-proyecto.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdefghijklmnop"
};
```

## Paso 4: Habilitar autenticación por correo/contraseña

1. En la consola Firebase, ve a **"Authentication"** (en el menú izquierdo)
2. Haz clic en la pestaña **"Sign-in method"**
3. Haz clic en **"Email/Password"**
4. Habilita la opción **"Email/Password"**
5. Haz clic en **"Guardar"**

## Paso 5: Crear usuarios administrador

1. En la consola Firebase, ve a **"Authentication"** → **"Users"**
2. Haz clic en **"Add user"**
3. Ingresa:
   - **Email**: tu-email@example.com
   - **Password**: una contraseña segura (mínimo 6 caracteres)
4. Haz clic en **"Add user"**

**Repite este proceso para cada administrador que necesites**

## Paso 6: Configurar reglas de seguridad (Realtime Database)

Si vas a usar Realtime Database (opcional para guardar productos en la nube):

1. Ve a **"Realtime Database"**
2. Haz clic en **"Create Database"**
3. Selecciona región: `southamerica-east1` (Buenos Aires)
4. Selecciona **"Start in test mode"**
5. Haz clic en **"Enable"**

### Reglas de seguridad para admin:
```json
{
  "rules": {
    "productos": {
      ".read": true,
      ".write": "root.child('admins').child(auth.uid).exists()"
    },
    "admins": {
      ".read": "auth != null",
      ".write": false
    }
  }
}
```

## Paso 7: Probar el login

1. Abre `admin.html` en tu navegador
2. Intenta iniciar sesión con el email y contraseña que creaste
3. Si todo está bien, deberías ver el panel de admin

---

## ⚠️ Notas importantes de seguridad

- **NUNCA** compartas tu `apiKey` en un repositorio público
- La `apiKey` puede exponerse en el navegador, pero está protegida por las reglas de seguridad de Firebase
- Siempre usa contraseñas fuertes para las cuentas admin
- Habilita la **autenticación de dos factores (2FA)** en tu cuenta de Firebase

## 🆘 Troubleshooting

### "Error: auth/configuration-not-found"
- Verifica que la configuración de Firebase esté correctamente copiada

### "Error: auth/user-not-found"
- El usuario no existe. Créalo en la consola Firebase

### "Error: auth/wrong-password"
- La contraseña es incorrecta

### La página no carga
- Abre la consola del navegador (F12) y revisa los errores
- Asegúrate que el archivo `logopng.png` existe en la carpeta raíz

---

**¿Necesitas agregar autenticación con Google o redes sociales?** 
Avísame y te ayudo a configurarla 🚀
