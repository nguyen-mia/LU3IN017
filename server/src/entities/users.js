class Users {
  constructor(db) {
    this.db = db
    const req1 = `
      CREATE TABLE IF NOT EXISTS users(
        username VARCHAR(256) NOT NULL PRIMARY KEY,
        password VARCHAR(256) NOT NULL,
        lastname VARCHAR(256) NOT NULL,
        firstname VARCHAR(256) NOT NULL
      );
    `;
    this.db.exec(req1, (err) => {
      if(err) {
        throw err;
      }
    });
  }

  create(username, password, lastname, firstname) {
    return new Promise((resolve, reject) => {
      const req = this.db.prepare(`
        INSERT INTO users(username, password, lastname, firstname)
        VALUES(?,?,?,?);
      `);
      req.run([username, password, lastname, firstname], (err) =>{
        if (err){
          console.log(err)
          reject();
        } else {
          resolve(req.lastID);
        }
      });
    });
  }

  get(username) {
    return new Promise((resolve, reject) => {
      const req = this.db.prepare(`
        SELECT * FROM users WHERE username=?;
      `);
      req.get([username], (err,row) => {
        if(err) {
          console.log(err);
          reject();
        } else {
          resolve(row);
        }      
      });
    });
  }

  async exists(username) {
    return new Promise((resolve, reject) => {
      const req = this.db.prepare(`
        SELECT username FROM users WHERE username=?;
      `);
      req.get([username], (err, row) => {
        if(err) {
          console.log('Erreur SQL: ', err);
          reject();
        } else {
          resolve(row != undefined);
        }
      });
    });
  }

  checkpassword(username, password) {
    
    return new Promise((resolve, reject) => {
      const req = this.db.prepare(`
        SELECT rowid FROM users WHERE username=? AND password=?;
      `);
      req.get([username, password], (err, row) => {
        if(err) {
          console.log('Erreur SQL: ', err);
          reject();
        }
        if(row == undefined) {
          console.log('Erreur SQL: Mauvais mot de passe');
          resolve(row);
        } else {
          resolve(row.rowid);
        }
      });
    });
  }
  
  delete(username) {
    return new Promise((resolve, reject) => {
      const req = this.db.prepare(`
          DELETE from users WHERE username=? 
      `);
      req.run([username], (err, row) =>{
        if (err){
          console.log('Erreur SQL: ', err)
          reject();
        } else {
          resolve('ok');
        }
      });
    });
  }

  update(username, password_new){
    return new Promise((resolve, reject) => {
      const req = this.db.prepare(`
        UPDATE users
        SET password = ? WHERE username = ?
      `);
      req.run([password_new, username], (err, row) =>{
        if (err){
          console.log('Erreur SQL: ', err)
          reject();
        } else {
          console.log(row)
          resolve('ok');
        }
      })
    })
  }
}


exports.default = Users;
