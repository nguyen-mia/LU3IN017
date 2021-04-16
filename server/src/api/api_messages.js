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
        .route("/")
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
    return router;

}
exports.default = init;