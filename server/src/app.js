const path = require('path');
var Datastore = require('nedb')
const mongopath = path.resolve(__dirname, 'db/messages.db');
const sqlpath = path.resolve(__dirname, 'db/development.db');
const apiAuth = require('./api/api_auth.js');
const apiUsers = require('./api/api_users.js');
const apiMsg = require('./api/api_messages.js');
const apiFollows = require('./api/api_follows.js');

// Détermine le répertoire de base
const basedir = path.normalize(path.dirname(__dirname));
console.debug(`Base directory: ${basedir}`);

// Connexion à la bd
const sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(sqlpath, sqlite3.OPEN_READWRITE, (err) => 
    {
        if (err) {
            console.error(err.message);
        }else{
            console.log('Connected to the database.');
        }
    }
);

mongodb = {}
mongodb.messages = new Datastore({ filename: mongopath })

express = require('express');
const app = express()
const session = require("express-session");

app.use(session({
    secret: "technoweb rocks"
}));

app.use('/api/users', apiUsers.default(db, mongodb.messages));
app.use('/api/messages', apiMsg.default(mongodb.messages));
app.use('/api/follows', apiFollows.default(db));
app.use('/api', apiAuth.default(db));

// Démarre le serveur
app.on('close', () => {
    db.close();
});
exports.default = app;