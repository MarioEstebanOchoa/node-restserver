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
    urlDB = 'mongodb+srv://adminDB:TV2dTLE7mbNkTh98@cluster0-2lxx1.mongodb.net/cafe';
}

process.env.ULRDB = urlDB;