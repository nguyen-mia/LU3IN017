const express = require("express");
const Users = require("../entities/users.js");

function init(db) {
    const router = express.Router();
    // On utilise JSON
    router.use(express.json());
    // simple logger for this router's requests
    // all requests to this router will first hit this middleware
    router.use((req, res, next) => {
        console.log('API: method %s, path %s', req.method, req.path);
        console.log('Body', req.body);
        next();
    });
    const users = new Users.default(db);

    //login
    router.post("/login", async (req, res) => {
        try {
            const { username, password } = req.body;
            // Erreur sur la requête HTTP
            if (!username || !password) {
                res.status(400).json({
                    status: 400,
                    "message": "Requête invalide : username et password nécessaires"
                });
                return;
            }
            if(! await users.exists(username)) {
                res.status(401).json({
                    status: 401,
                    message: "Utilisateur inconnu"
                });
                return;
            }
            let userid = await users.checkpassword(username, password);
            if (userid && userid != undefined) {
                // Avec middleware express-session
                req.session.regenerate(function (err) {
                    if (err) {
                        res.status(500).json({
                            status: 500,
                            message: "Erreur interne"
                        });
                    }
                    else {
                        // C'est bon, nouvelle session créée
                        req.session.username = username;
                        req.session.userid = userid;
                        console.log(req.session.username)
                        res.status(200).json({
                            status: 200,
                            message: "Username et mot de passe accepté",
                            session_key: req.session
                        });
                    }
                });
                return;
            }
            // Faux login : destruction de la session et erreur
            req.session.destroy((err) => { });
            res.status(403).json({
                status: 403,
                message: "username et/ou le mot de passe invalide(s)"
            });
            return;
        }
        catch (e) {
            // Toute autre erreur
            res.status(500).json({
                status: 500,
                message: "erreur interne",
                details: (e || "Erreur inconnue").toString()
            });
        }
    });

    //logout
    router.delete("/logout", async (req, res) => {
        try {
            //Destruction de la session et erreur
            req.session.destroy((err) => { });
            res.status(200).json({
                status: 200,
                message: "Logging out..."
            });
            return;
        }
        catch (e) {
            // Toute autre erreur
            res.status(500).json({
                status: 500,
                message: "erreur interne",
                details: (e || "Erreur inconnue").toString()
            });
        }
    });

    return router;
}
exports.default = init;