//question 3
var Datastore = require('nedb');

db = {};
db.messages = new Datastore();

db.messages.loadDatabase();

//question 4
mes = {
    id_auteur : 42, 
    message : 'Ceci est le message', 
    date : new Date(),
    likes : [
        {id_liker : 28, date : 'XXX'},
        {id_liker : 103, date : 'XXX'}
            ]
};
db.messages.insert(mes);

mes = {
    id_auteur : 103, 
    message : 'Ceci est le message no 2', 
    date : new Date(),
    likes : []
};

//question 5
db.messages.insert(mes);

//question 6
//question 11
unesecondeavant = new Date(Date.now() - 1000);
db.messages.find({date : {$gt : unesecondeavant } }, (err, docs) => {
    if(err){
        console.log(err);
    }else{
        console.log(docs);
    }
});
//question 7
db.messages.find({}, {message : 1, _id : 0}, (err, docs) => {
    if(err){
        console.log(err);
    }else{
        console.log(docs);
    }
});

//question 8
db.messages.find({id_auteur : 42}, {id_auteur : 1, message : 1, _id : 0}, (err, docs) => {
    if(err){
        console.log(err);
    }else{
        console.log(docs);
    }
});

//question 9
function getDocument(id_auteur, texte) {
    return new Promise ( (resolve, reject) => {
        db.messages.find( {id_auteur : id_auteur, message: texte}, {_id : 1} ,(err, docs) => {
            if(err){
                reject(err);
            } else {
                resolve(docs[0]._id);
            }
        });
    });
} 

//question 10
getDocument(42, 'Ceci est le message').then((res) => {
    // console.log(res);
    db.messages.find( { _id : res} , {message : 1, _id :0} , (err, docs) => {
        if(err) {
            console.log(err);
        }else{
            console.log(docs[0].message);
        }
    });
});

//question 12
db.messages.find({ id_auteur : {$in : [42, 103]} }, 
                 (err, docs) => {
    if(err){
        console.log(err);
    }else{
        console.log(docs);
    }
});

//question 13
// 1) recher dans SQLite les amis du 256
// 2) Faire la requête nedb avec la liste obtenue précédemment