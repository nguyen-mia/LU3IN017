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

    get(){
        return new Promise ((resolve, reject ) => {
            this.db.find({})
            .sort({date : -1})
            .exec( (err, data) => {
                if(err){
                    reject(err);
                }else{
                    resolve(data);
                }
            })
        })
    }

    getUserMsg(username){
        return new Promise ((resolve, reject ) => {
            this.db.find ({author_username : username})
            .sort({date : -1})
            .exec( (err, data) => {
                if(err){
                    reject(err);
                }else{
                    resolve(data);
                }
            })
        })
    }

    delete(messageid){
        return new Promise ((resolve, reject ) => {
            this.db.remove ({_id : messageid}, (err, data) => {
                if(err){
                    reject(err);
                }else{
                    resolve('ok');
                }
            })
        })
    }

    search(keyword){
        let key = new RegExp(keyword, 'i')
        return new Promise ((resolve, reject) => {
            this.db.find( { message: key} )
            .sort({date : -1})
            .exec( (err, data) => {
                if(err){
                    reject(err);
                }else{
                    resolve(data);
                } 
            })
        })
    }

}

exports.default = Messages