const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5500;
const ALLOWED_ORIGINS = [
    'http://127.0.0.1:5500',
    'http://localhost:5500',
    'http://localhost:3000',
    process.env.ALLOWED_ORIGIN
].filter(Boolean);

console.log('🔒 ROMORE Athletic - Servidor Seguro');
console.log('📍 Orígenes permitidos:', ALLOWED_ORIGINS);

// ═══════════════════════════════════════════════════════════════
// 🛡️ SEGURIDAD - MIDDLEWARE
// ═══════════════════════════════════════════════════════════════

// 1. HELMET - Headers de seguridad estándar
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com", "https://cdn.tailwindcss.com", "https://www.gstatic.com", "https://www.google.com", "https://recaptcha.net"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdn.tailwindcss.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com", "https://fonts.googleapis.com"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'", "https://*.firebaseapp.com", "https://*.firebase.googleapis.com", "https://*.firebaseio.com", "https://securetoken.googleapis.com", "https://identitytoolkit.googleapis.com", "https://www.googleapis.com", "https://www.google.com", "https://www.gstatic.com", "https://recaptcha.net", "https://*.recaptcha.net"],
            frameSrc: ["'self'", "https://www.google.com", "https://recaptcha.net"],
            objectSrc: ["'none'"],
            mediaSrc: ["'self'"],
            upgradeInsecureRequests: []
        }
    },
    crossOriginEmbedderPolicy: false,
    crossOriginOpenerPolicy: true,
    crossOriginResourcePolicy: { policy: "cross-origin" },
    dnsPrefetchControl: { allow: false },
    frameguard: { action: 'deny' },
    hidePoweredBy: true,
    hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true
    },
    ieNoOpen: true,
    noSniff: true,
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
    xssFilter: true
}));

// 2. CORS - Control de origen cruzado
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || ALLOWED_ORIGINS.includes(origin)) {
            callback(null, true);
        } else {
            console.warn(`❌ CORS bloqueado para origen: ${origin}`);
            callback(new Error('CORS no permitido'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    maxAge: 86400,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// 3. RATE LIMITING - Protección contra ataques
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: '❌ Demasiadas solicitudes, intenta más tarde',
    standardHeaders: true,
    legacyHeaders: false,
    skip: (req) => {
        return req.path.match(/\.(js|css|json|png|jpg|jpeg|gif|svg|ico|woff|woff2)$/);
    }
});

app.use(limiter);

// 4. RATE LIMITING ESTRICTO - Para endpoints de API
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 30,
    message: '❌ Demasiadas solicitudes API, intenta más tarde'
});

// ═══════════════════════════════════════════════════════════════
// 📋 MIDDLEWARE ADICIONAL
// ═══════════════════════════════════════════════════════════════

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`📨 [${timestamp}] ${req.method} ${req.path}`);
    next();
});

// ═══════════════════════════════════════════════════════════════
// 🔐 ENDPOINTS DE API
// ═══════════════════════════════════════════════════════════════

app.get('/api/health', (req, res) => {
    res.json({
        status: '✅ Servidor activo',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// ═══════════════════════════════════════════════════════════════
// 📁 ARCHIVOS ESTÁTICOS
// ═══════════════════════════════════════════════════════════════

app.use(express.static(path.join(__dirname), {
    maxAge: '1h',
    etag: false,
    setHeaders: (res, filePath) => {
        if (filePath.endsWith('.html')) {
            res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
        }
        if (filePath.endsWith('.json')) {
            res.set('Cache-Control', 'public, max-age=300');
        }
    }
}));

// ═══════════════════════════════════════════════════════════════
// 🔄 RUTAS SPA
// ═══════════════════════════════════════════════════════════════

app.get('/admin*', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

app.get('/tienda*', (req, res) => {
    res.sendFile(path.join(__dirname, 'tienda-cliente.html'));
});

// ═══════════════════════════════════════════════════════════════
// ⚠️ MANEJO DE ERRORES
// ═══════════════════════════════════════════════════════════════

app.use((req, res) => {
    res.status(404).json({
        error: '❌ Recurso no encontrado',
        path: req.path,
        method: req.method
    });
});

app.use((err, req, res, next) => {
    console.error('❌ Error:', err.message);

    if (err.message === 'CORS no permitido') {
        return res.status(403).json({
            error: '❌ Origen no permitido',
            origin: req.get('origin')
        });
    }

    if (err.status === 429) {
        return res.status(429).json({
            error: '❌ Demasiadas solicitudes'
        });
    }

    res.status(err.status || 500).json({
        error: '❌ Error del servidor',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Error interno'
    });
});

// ═══════════════════════════════════════════════════════════════
// 🚀 INICIAR SERVIDOR
// ═══════════════════════════════════════════════════════════════

app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════════════════════════╗
║           🏃 ROMORE ATHLETIC - SERVIDOR SEGURO 🛡️              ║
╠════════════════════════════════════════════════════════════════╣
║ 🌐 URL: http://127.0.0.1:${PORT}                             ║
║ 📁 Admin: http://127.0.0.1:${PORT}/admin.html                ║
║ 🛒 Tienda: http://127.0.0.1:${PORT}/tienda-cliente.html      ║
║                                                                ║
║ 🔒 SEGURIDAD ACTIVADA:                                         ║
║   ✅ Helmet (Security Headers)                                 ║
║   ✅ CORS (Origen permitido)                                   ║
║   ✅ Rate Limiting (Protección DDoS)                           ║
║   ✅ CSP (Content Security Policy)                             �