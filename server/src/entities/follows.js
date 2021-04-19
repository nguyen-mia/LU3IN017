class Follows {
    constructor(db) {
        this.db = db
        const req1 = `
            CREATE TABLE IF NOT EXISTS follows(
                follower VARCHAR(256) NOT NULL,
                followee VARCHAR(256) NOT NULL,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY(follower, followee)
            );
        `;
        this.db.exec(req1, (err) => {
            if(err) {
                throw err;
            }
        });
    }

    create(follower, followee) { 
        return new Promise((resolve, reject) => {
          const req = this.db.prepare(`
          INSERT INTO follows(follower, followee) 
          VALUES(?,?)
          `);
          req.run([follower, followee], (err) =>{
            if (err){
              console.log(err)
              reject(err);
            } else {
              resolve('ok');
            }
          });
        });
    }
}

exports.default = Follows;