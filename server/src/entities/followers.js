class Followers {
    constructor(db) {
        this.db = db
        const req1 = `
            CREATE TABLE IF NOT EXISTS followers(
                login VARCHAR(256),
                login_follower VARCHAR(256),
                timestamp TIMESTAMP,
                PRIMARY KEY('login', 'login_follower')
            );
        `;
        this.db.exec(req1, (err) => {
            if(err) {
                throw err;
            }
        });
    }

    create(login, login_follower) {
        let ceci = this; 
        return new Promise((resolve, reject) => {
          const req = ceci.db.prepare("INSERT INTO users VALUES(?,?,?,?)");
          req.run([login, password, lastname, firstname], (err) =>{
            if (err){
              console.log(err)
              reject();
            } else {
              resolve(this.lastID);
            }
          });
        });
    }

    get(userid) {
        return new Promise((resolve, reject) => {
          const user = {
             login: "pikachu",
             password: "1234",
             lastname: "chu",
             firstname: "pika"
          }; // À remplacer par une requête bd
    
          if(false) {
            //erreur
            reject();
          } else {
            if(userid == 1) {
              resolve(user);
            } else {
              resolve(null);
            }
          }
        });
      }

}