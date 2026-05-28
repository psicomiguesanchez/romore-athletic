# 🛡️ Guía de reCAPTCHA v3 - ROMORE Athletic

## ✅ Implementación Completada

reCAPTCHA v3 está **integrado en el admin.html** con la clave de sitio pública:
```
6LeQc_4sAAAAAJ-4HbwcfBcUAA5faSRGrYzo9hoP
```

---

## 📋 Cómo Funciona

### Cliente (HTML/JavaScript)
1. **Script cargado automáticamente** en el `<head>`
2. **En el formulario de login**:
   - Cuando el usuario hace submit
   - Se ejecuta `grecaptcha.execute()` automáticamente
   - Obtiene un token de reCAPTCHA
   - Almacena el token en un campo oculto

### Servidor (Backend - IMPORTANTE)
Aunque la clave de sitio es pública, debes **validar el token en tu servidor** usando la **Secret Key**:

```python
# Ejemplo Python (Flask)
import requests

SECRET_KEY = "tu_secret_key_aqui"  # De .env

def validate_recaptcha(token):
    url = "https://www.google.com/recaptcha/api/siteverify"
    payload = {
        "secret": SECRET_KEY,
        "response": token
    }
    response = requests.post(url, data=payload)
    data = response.json()
    
    # Validar score (0.0 = probablemente bot, 1.0 = probablemente humano)
    if data.get("success") and data.get("score", 0) > 0.5:
        return True
    return False
```

---

## 🔒 Seguridad

### ✅ LO QUE ESTÁ SEGURO
- ✅ Clave de sitio (pública) en el HTML
- ✅ Token obtenido en el cliente
- ✅ Token enviado al servidor para validación

### ❌ LO QUE DEBES PROTEGER
- ❌ Secret Key NUNCA en el cliente
- ❌ Secret Key SIEMPRE en variables de entorno (`.env`)
- ❌ Validación SIEMPRE en el servidor

---

## 🎯 Flujo de Login Seguro

```
Usuario ingresa email/contraseña
        ↓
Cliente: ejecuta reCAPTCHA v3
        ↓
Cliente: obtiene token
        ↓
Cliente: envía email, password, token al servidor (HTTPS)
        ↓
Servidor: valida token con Secret Key
        ↓
Si token es válido (score > 0.5):
  → Procede con autenticación Firebase
Sino:
  → Rechaza el login
```

---

## 📊 reCAPTCHA v3 Scores

reCAPTCHA retorna un **score de 0.0 a 1.0**:

- **1.0**: Muy probablemente un usuario legítimo
- **0.5**: Podría ser un bot
- **0.0**: Muy probablemente un bot

**Recomendación**: Acepta scores > 0.5

---

## 🚀 Próximos Pasos

1. **Crea un backend** que valide el token:
   - Node.js, Python (Flask), PHP, etc.
   - Endpoint: `/api/login` o similar

2. **Almacena la Secret Key en `.env`**:
   ```env
   RECAPTCHA_SECRET_KEY=tu_secret_key_aqui
   ```

3. **Valida el token antes de autenticar**:
   ```javascript
   // Cliente: envía el token
   const response = await fetch('/api/login', {
       method: 'POST',
       headers: {'Content-Type': 'application/json'},
       body: JSON.stringify({
           email: email,
           password: password,
           recaptchaToken: document.getElementById('recaptchaToken').value
       })
   });
   ```

4. **Backend valida y responde**:
   ```python
   @app.route('/api/login', methods=['POST'])
   def login():
       data = request.json
       token = data.get('recaptchaToken')
       
       # Validar reCAPTCHA
       if not validate_recaptcha(token):
           return {'error': 'reCAPTCHA failed'}, 403
       
       # Validar credenciales en Firebase
       # ...
   ```

---

## 🔍 Verificar Implementación

1. **Abre el admin.html en el navegador**
2. **Abre DevTools (F12)**
3. **Ve a la pestaña Console**
4. **Intenta hacer login**
5. **Deberías ver**: "reCAPTCHA token obtenido" ✅

---

## 📚 Referencias

- [reCAPTCHA v3 Official Docs](https://developers.google.com/recaptcha/docs/v3)
- [Server-side Verification](https://developers.google.com/recaptcha/docs/verify)
- [Best Practices](https://developers.google.com/recaptcha/docs/v3#best_practices)

---

## ⚠️ Recuerda

- La **Clave de Sitio** está OK en GitHub (es pública)
- La **Secret Key** NUNCA va en GitHub (usa `.env`)
- Valida SIEMPRE en el servidor
- No confíes solo en la validación del cliente

---

**Status**: ✅ Frontend implementado  
**Siguiente**: Implementar backend para validar tokens  
**Última actualización**: 26 May 2026
