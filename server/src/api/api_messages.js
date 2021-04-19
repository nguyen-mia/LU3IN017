const Messages = require("../entities/messages.js");
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
    const msg = new Messages.default(db);

    router
        .route("/search/:keyword")
        .get( async (req, res) => {
            try {
                const result = await msg.search(req.params.keyword)
                if(result){
                    res.send(result);
                }else{
                    res.sendStatus.json({
                        status : 500,
                        message : "Erreur de recherche, pas de résultat"
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
        });

    router
        .route("/")
        //create message
        .post( async (req, res) => {
            try{
                const { username, message } = req.body;
                const result = await msg.create(username, message)
                if(result){
                    res.send(result)
                }else{
                    res.sendStatus.json({
                        status : 500,
                        message : "Erreur de création de message"
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
        //get listMessages (all)
        .get( async (req, res) => {
            try{
                const result = await msg.get()
                if(result){
                    res.send(result)
                }else{
                    res.sendStatus.json({
                        status : 500,
                        message : "Erreur, pas de message"
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

    router
        // get messages from messageId
        .route("/:messageid")
        .delete( async (req, res) => {
            try {
                const result = await msg.delete(req.params.messageid)
                if(result == 'ok'){
                    res.status(200).json({
                        status : 200,
                        message : "Message supprimé"
                    })
                }else{
                    res.sendStatus.json({
                        status : 500,
                        message : "Erreur: le message n'a pas été supprimé"
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