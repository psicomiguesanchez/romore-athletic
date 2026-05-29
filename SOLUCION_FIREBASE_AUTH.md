# Solución: Error auth/network-request-failed en Firebase

## Problema Identificado

El error `auth/network-request-failed` ocurre porque:

1. **Mismatch de dominio:** 
   - `authDomain` configurado: `romore-admin.firebaseapp.com`
   - Dominio actual: `romore-athletic.vercel.app`
   
2. **Causa raíz:** Firebase necesita que el dominio desde el cual se hace la solicitud esté autorizado en la consola de Firebase.

---

## Solución: Autorizar el Dominio en Firebase Console

### Opción 1: Agregar romore-athletic.vercel.app a las autorizaciones (RECOMENDADO)

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona el proyecto: **romore-admin**
3. Expande **Configuración del proyecto** (ícono de engranaje)
4. Ve a **Autorizado para JavaScript** (o **Authorized domains**)
5. Haz clic en **Agregar dominio** (Add domain)
6. Ingresa: `romore-athletic.vercel.app`
7. Guarda

### Opción 2: Si usarás un dominio personalizado
1. Sigue los mismos pasos pero ingresa tu dominio personalizado
2. Ej: `romore-athletic.com`

---

## Pasos Alternativos si las opciones anteriores no funcionan

### Verificar la configuración de CORS en Firebase
Firebase debería enviar los headers CORS apropiados, pero algunas configuraciones pueden requerir ajustes.

### Reiniciar la aplicación después de autorizar el dominio
Una vez agregado el dominio en Firebase:
1. Espera 5-10 minutos para que se propague
2. Haz un hard refresh en el navegador (Ctrl+Shift+R)
3. Intenta login nuevamente

---

## Credenciales de Prueba

Una vez que autorices el dominio, deberías poder usar:
- **Email:** admin@romore.test
- **Contraseña:** Admin123456!

O crea uno nuevo en la consola de Firebase:
1. En **Authentication** → **Users**
2. Haz clic en **Add user**
3. Ingresa email y contraseña
4. Guarda

---

## Verificación Paso a Paso

### 1. Verificar que Firebase esté inicializado
```javascript
// En la consola del navegador, ejecuta:
firebase.auth().currentUser  // Debe mostrar null si no estás logueado
```

### 2. Verificar que grecaptcha esté disponible
```javascript
typeof grecaptcha  // Debe mostrar "object"
```

### 3. Probar la autenticación manualmente
```javascript
firebase.auth().signInWithEmailAndPassword('admin@romore.test', 'Admin123456!')
  .then(user => console.log('Login exitoso:', user.user.email))
  .catch(error => console.error('Error:', error.code, error.message))
```

---

## Configuración Actual en el Código

**Archivo:** `admin.html` (líneas 813-821)

```javascript
const firebaseConfig = {
    apiKey: "AIzaSyCT6StnuHvECePZnsrB-ueqJsx_uLPcrAU",
    authDomain: "romore-admin.firebaseapp.com",
    projectId: "romore-admin",
    storageBucket: "romore-admin.appspot.com",
    messagingSenderId: "1004587660155",
    appId: "1:1004587660155:web:37a2792b784e1988df03de"
};
```

---

## Siguiente Paso

1. **Accede a Firebase Console** → [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. **Selecciona proyecto:** romore-admin
3. **Agrega dominio autorizado:** romore-athletic.vercel.app
4. **Espera 5-10 minutos**
5. **Prueba el login nuevamente**

Una vez que esto funcione, podremos continuar con la configuración del dominio personalizado.

---

**Status:** 🔴 REQUIERE ACCIÓN MANUAL EN FIREBASE CONSOLE
**Prioridad:** ALTA - Bloquea acceso a toda la aplicación
