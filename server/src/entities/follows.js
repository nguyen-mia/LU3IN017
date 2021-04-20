class Follows {
    constructor(db) {
        this.db = db
        const req1 = `
            CREATE TABLE IF NOT EXISTS follows(
                follower_id VARCHAR(256) NOT NULL,
                followee_id VARCHAR(256) NOT NULL,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY(follower_id, followee_id)
            );
        `;
        this.db.exec(req1, (err) => {
            if(err) {
                throw err;
            }
        });
    }

    create(follower_id, followee_id) { 
        return new Promise((resolve, reject) => {
          const req = this.db.prepare(`
          INSERT INTO follows(follower_id, followee_id) 
          VALUES(?,?)
          `);
          req.run([follower_id, followee_id], (err) =>{
            if (err){
              console.log(err)
              reject(err);
            } else {
              resolve('ok');
            }
          });
        });
    }

    delete(follower_id, followee_id) {
      return new Promise( (resolve, reject) =>{
        const req = this.db.prepare(`
          DELETE from follows 
          WHERE follower_id=? and followee_id=?
        `);
        req.run([follower_id, followee_id], (err, row) =>{
          if (err){
            console.log('Erreur SQL: ', err)
            reject(err)
          }else{
            console.log(row)
            resolve('ok')
          }
        });
      });
    }

    getFollowing(follower_id){
      return new Promise ((resolve, reject) => {
        const req = this.db.prepare(`
          SELECT * from follows 
          WHERE follower_id=?
        `);
        req.all([follower_id], (err, row) =>{
          if (err){
            console.log(err)
            reject()
          }else{
            resolve(row)
          }
        })
      })
    }

    getFollowers(followee_id){
      return new Promise ((resolve, reject) => {
        const req = this.db.prepare(`
          SELECT * from follows 
          WHERE followee_id=?
        `);
        req.all([followee_id], (err, row) =>{
          if (err){
            console.log(err)
            reject()
          }else{
            resolve(row)
          }
        })
      })
    }

}

exports.default = Follows;