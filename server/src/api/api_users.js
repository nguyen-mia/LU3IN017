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

    router
        .route("/:username")
        .get(async (req, res) => {
            try {
                const user = await users.get(req.params.username);
                if (!user)
                    res.sendStatus(404);
                else
                    res.send(user);
            }
            catch (e) {
                res.status(500).send(e);
            }
        })
        .delete(async (req, res, next) => {
            try{
                //let userid = await users.checkpassword(username, password);
                let result = await users.delete(req.params.username);
                if (result == 'ok'){//user n'existe plus
                    res.status(200).json({
                        status: 200,
                        message: "Utilisateur supprimé"
                    })
                } else
                    res.send(404);
            }
            catch(e){
                res.status(500).send(e);
            }
        })
        .put(async (req, res) => {
            try{

            }catch(e){

            }
        })
    router    
        .route("/")
        .post(async (req, res) => {
            try {
                const { login, password, lastname, firstname } = req.body;
                // Erreur sur la requête HTTP
                if (!login || !password || !lastname || !firstname) {
                    res.status(400).json({
                        status: 400,
                        "message": "Requête invalide : login, password, lastname et firstname nécessaires"
                    });
                    return;
                }
                if(await users.exists(login)) {
                    res.status(401).json({
                        status: 409,
                        message: "Login existe déjà"
                    });
                    return;
                }
                let userid = await users.create(login, password, lastname, firstname);
                if (userid) {
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
                            req.session.userid = userid;
                            res.status(200).json({
                                status: 200,
                                message: "Utilisateur créé"
                            });
                        }
                    });
                    return;
                }
                // Faux login : destruction de la session et erreur
                req.session.destroy((err) => { });
                res.status(403).json({
                    status: 403,
                    message: "login et/ou le mot de passe invalide(s)"
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
        })

        .put( (req, res) => {
            const { login, password, lastname, firstname } = req.body;
            if (!login || !password || !lastname || !firstname) {
                res.status(400).send("Missing fields");
            } else {
                users.create(login, password, lastname, firstname)
                    .then((user_id) => res.status(201).send({ id: user_id }))
                    .catch((err) => res.status(500).send(err));
            }
        });



    return router;
}


exports.default = init;