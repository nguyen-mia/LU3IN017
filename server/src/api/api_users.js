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
        //get user
        .get(async (req, res) => {
            try {
                const user = await users.get(req.params.username);
                if (!user)
                    res.sendStatus(404);
                else{
                    res.send(user)                
                } 
            }
            catch (e) {
                res.status(500).send(e);
            }
        })
        //delete user
        .delete(async (req, res, next) => {
            try{
                if(await users.exists(req.params.username)) {
                    let result = await users.delete(req.params.username);
                    if (result == 'ok'){//user n'existe plus
                        res.status(200).json({
                            status: 200,
                            message: "Utilisateur supprimé"
                        })
                    } else
                        res.send(404);
                }else{
                    res.status(403).json({
                        status: 403,
                        message: "login et/ou le mot de passe invalide(s)"
                    });
                    return;
                }
            }
            catch(e){
                res.status(500).send(e);
            }
        })
        //update user
        .put(async (req, res) => {
            try{
                const { login, password_old, password_new } = req.body;
                let userid = await users.checkpassword(login, password_old);
                if (userid && userid != undefined) { //mdp ok
                    let result = await users.update(login, password_new);
                    if (result == 'ok'){
                        res.status(200).json({
                            status: 200,
                            message: "Mot de passe mis à jour"
                        })
                    } else{
                        res.send(404);
                    }   
                }else{
                    res.status(403).json({
                        status: 403,
                        message: "login et/ou le mot de passe invalide(s)"
                    });
                    return;
                }

            }catch(e){
                // Toute autre erreur
                res.status(500).json({
                status: 500,
                message: "erreur interne",
                details: (e || "Erreur inconnue").toString()
            });
            }
        })
    router    
        .route("/")
        //create user
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

    return router;
}


exports.default = init;