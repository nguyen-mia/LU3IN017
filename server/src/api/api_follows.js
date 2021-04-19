const express = require("express");
const Follows = require("../entities/follows.js");
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
        // console.log('Req %s', req.method, req);
        next();
    });
    const follows = new Follows.default(db);
    const users = new Users.default(db);

    router    
        .route("/:followee")
        //create follow link (follow someone)
        .post(async (req, res) => {
            try {
                if(await users.exists(req.params.followee)) { //check followee exists
                    const result = await follows.create(req.session.username,req.params.followee)
                    if(result == 'ok'){
                        res.status(200).json({
                            status: 200,
                            message: "User followed succesfully"
                        });
                    }else{
                        res.status(500).json({
                            status : 500,
                            message : "Error, did not follow"
                        })
                    }
                }else{
                    res.status(404).json({
                        status : 404,
                        message : "User does not exist, cannot follow"
                    })
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
    return router;
}

exports.default = init;