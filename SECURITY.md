# 🔒 GUÍA DE SEGURIDAD - ROMORE ATHLETIC

## ⚠️ IMPORTANTE: Protección de Credenciales

### Nunca hagas esto:
❌ Guardar contraseñas en archivos de código  
❌ Commitear archivos `.env` al repositorio  
❌ Publicar API keys o Secret Keys en GitHub/públicamente  
❌ Usar credenciales reales en scripts de prueba  
❌ Hardcodear secrets en HTML/JavaScript

### Hazlo así:
✅ Usa variables de entorno (`.env`)  
✅ Mantén `.env` en `.gitignore`  
✅ Comparte solo `.env.example` (sin valores)  
✅ Usa cuentas de prueba separadas para testing  
✅ Rota credenciales si fueron expuestas  

---

## 📋 Configuración de Variables de Entorno

### 1. Crea tu archivo `.env` local
```bash
cp .env.example .env
```

### 2. Rellena con TUS valores
```
FIREBASE_API_KEY=tu_api_key_real
FIREBASE_AUTH_DOMAIN=tu_auth_domain_real
RECAPTCHA_SITE_KEY=tu_site_key_publico
RECAPTCHA_SECRET_KEY=tu_secret_key_privado
```

### 3. NUNCA commitees `.env`
Está incluido en `.gitignore` automáticamente.

---

## 🔐 Firebase Security

### API Key vs Secret Key
- **API Key (Pública)**: Segura en HTML/JavaScript. Identifica la app.
- **Secret Key (Privada)**: SOLO en servidor. NUNCA en cliente.

### Recomendaciones
1. Configura Firebase Security Rules (base de datos)
2. Usa App Check para validar requests legítimos
3. Implementa reCAPTCHA v3 para prevenir abuso
4. Revisa logs regularmente en Firebase Console

---

## 🛡️ reCAPTCHA v3

### Site Key (Pública)
✅ Segura compartir  
✅ Va en HTML/JavaScript  
✅ Identifica tu sitio  

### Secret Key (Privada)
❌ NUNCA compartir  
❌ SOLO en servidor  
❌ Valida en backend  

---

## 🚨 Si una credencial fue expuesta

1. **Inmediatamente**: Cambia la contraseña en Firebase Console
2. **Rota la API Key**: 
   - Firebase Console → Project Settings → Service Accounts
   - Genera una nueva key
   - Actualiza `.env`
3. **Revisa logs**: Verifica si hubo acceso no autorizado
4. **Documenta**: Registra qué fue expuesto y cuándo

---

## ✅ Checklist de Seguridad

- [ ] `.env` nunca está en git
- [ ] `.gitignore` contiene `*.env`
- [ ] API keys no están en HTML
- [ ] Secret keys están en variables de entorno
- [ ] Firebase Security Rules están configuradas
- [ ] App Check está habilitado
- [ ] reCAPTCHA v3 está integrado
- [ ] Logs se revisan regularmente
- [ ] Cuentas de prueba están separadas

---

## 📚 Referencias

- [Firebase Security Best Practices](https://firebase.google.com/docs/database/security)
- [reCAPTCHA Documentation](https://developers.google.com/recaptcha/docs/v3)
- [Firebase App Check](https://firebase.google.com/docs/app-check)
- [Environment Variables Best Practices](https://12factor.net/config)

---

**Última actualización**: 26 May 2026  
**Status**: ✅ Seguridad implementada con variables de entorno
