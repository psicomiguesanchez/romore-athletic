const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

const app = express();
const ALLOWED_ORIGINS = [
    'http://127.0.0.1:5500',
    'http://localhost:5500',
    'http://localhost:3000',
    'https://romore-athletic.vercel.app',
    process.env.ALLOWED_ORIGIN
].filter(Boolean);

console.log('🔒 ROMORE Athletic - Servidor Seguro');
console.log('📍 Orígenes permitidos:', ALLOWED_ORIGINS);

// HELMET - Headers de seguridad
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
    hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
    ieNoOpen: true,
    noSniff: true,
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
    xssFilter: true
}));

// CORS
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

// RATE LIMITING
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

// MIDDLEWARE
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`📨 [${timestamp}] ${req.method} ${req.path}`);
    next();
});

// HEALTH CHECK
app.get('/api/health', (req, res) => {
    res.json({
        status: '✅ Servidor activo',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// STATIC FILES
app.use(express.static(path.join(__dirname, '..'), {
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

// SPA ROUTES
app.get('/admin*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'admin.html'));
});

app.get('/tienda*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'tienda-cliente.html'));
});

// 404
app.use((req, res) => {
    res.status(404).json({
        error: '❌ Recurso no encontrado',
        path: req.path,
        method: req.method
    });
});

// ERROR HANDLER
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

module.exports = app;
