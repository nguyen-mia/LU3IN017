var Datastore = require('nedb');
class Messages {
    constructor(db) {
        this.db = db;
        (this.db).loadDatabase(function (err) {    
            if(err) 
                console.log(err)
        });
    }

    create(username, message){
        return new Promise((resolve, reject) =>{
            var mes = { 
                author_username: username,
                message : message,
                date : new Date(),
                likes : []
            };
            this.db.insert(mes, (err, data) => {
                if(err){
                    reject(err);
                }else{
                    resolve(data);
                }
            })
        });
    }

}

exports.default = Messages