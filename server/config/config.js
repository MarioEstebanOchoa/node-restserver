// ===========
// Puerto
// ===========

process.env.PORT = process.env.PORT || 3000;

// ===========
// Entorno
// ===========

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ===========
// Base datos
// ===========

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URL;
}

process.env.ULRDB = urlDB;

// ===========
// Vencimiento del token
// ===========
//60 segundos
//60 min
//24 horas
//30 dias

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

// ===========
// Seed token
// ===========

process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

// ===========
// Google client ID
// ===========

process.env.CLIENT_ID = process.env.CLIENT_ID || '589441887268-s9v35bdmkf8vgovgh6bcjh0oaapj22gn.apps.googleusercontent.com';