const Users = require("../entities/users.js");
const express = require("express");


class UsersController {
    constructor(body, res, db){
        this.body = body
        this.res = (this.res)
        this.db = db
        this.users = new Users.default(db);
        
    }


    login(){
        
        const { username, password } = this.body;
        console.log(username)
        console.log(password)
        // Erreur sur la requête HTTP
        if (!username || !password) {
            (this.res).status(400).json({
                status: 400,
                "message": "Requête invalide : username et password nécessai(this.res)"
            });
            return;
        }
        if(! await (this.users).exists(username)) {
            (this.res).status(401).json({
                status: 401,
                message: "Utilisateur inconnu"
            });
            return;
        }
        console.log("azeazeaz1")
        let userid = await (this.users).checkpassword(username, password);
        console.log("azeazeaz")
        if (userid) {
            // Avec middleware express-session
            (this.req).session.regenerate(function (err) {
                if (err) {
                    
                    (this.res).status(500).json({
                        status: 500,
                        message: "Erreur interne"
                    });
                }
                else {
                    // C'est bon, nouvelle session créée
                    (this.req).session.userid = userid;
                    (this.res).status(200).json({
                        status: 200,
                        message: "Username et mot de passe accepté"
                    });
                }
            });
            return;
        }
        // Faux login : destruction de la session et erreur
        (this.req).session.destroy((err) => { });
        (this.res).status(403).json({
            status: 403,
            message: "username et/ou le mot de passe invalide(s)"
        });
        return;
    }
}

exports.default = UsersController;