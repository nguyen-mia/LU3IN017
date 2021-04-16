class Users {
  constructor(db) {
    this.db = db
    const req1 = `
      CREATE TABLE IF NOT EXISTS users(
        login VARCHAR(256) NOT NULL PRIMARY KEY,
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

  create(login, password, lastname, firstname) {
    return new Promise((resolve, reject) => {
      const req = this.db.prepare(`
        INSERT INTO users(login, password, lastname, firstname)
        VALUES(?,?,?,?);
      `);
      req.run([login, password, lastname, firstname], (err) =>{
        if (err){
          console.log(err)
          reject();
        } else {
          resolve(req.lastID);
        }
      });
    });
  }

  get(login) {
    return new Promise((resolve, reject) => {
      const req = this.db.prepare(`
        SELECT * FROM users WHERE login=?;
      `);
      req.get([login], (err,row) => {
        if(err) {
          console.log(err);
          reject();
        } else {
          resolve(row);
        }      
      });
    });
  }

  async exists(login) {
    return new Promise((resolve, reject) => {
      const req = this.db.prepare(`
        SELECT login FROM users WHERE login=?;
      `);
      req.get([login], (err, row) => {
        if(err) {
          console.log('Erreur SQL: ', err);
          reject();
        } else {
          resolve(row != undefined);
        }
      });
    });
  }

  checkpassword(login, password) {
    
    return new Promise((resolve, reject) => {
      const req = this.db.prepare(`
        SELECT rowid FROM users WHERE login=? AND password=?;
      `);
      req.get([login, password], (err, row) => {
        if(err) {
          console.log('Erreur SQL: ', err);
          reject();
        }
        if(row == undefined) {
          console.log('Erreur SQL: Mauvaise mot de passe');
          resolve(row);
        } else {
          resolve(row.rowid);
        }
      });
    });
  }
  
  delete(login) {
    return new Promise((resolve, reject) => {
      const req = this.db.prepare(`
          DELETE from users WHERE login=? 
      `);
      req.run([login], (err, row) =>{
        if (err){
          console.log('Erreur SQL: ', err)
          reject();
        } else {
          resolve('ok');
        }
      });
    });
  }

  update(login, password_new){
    return new Promise((resolve, reject) => {
      const req = this.db.prepare(`
        UPDATE users
        SET password = ? WHERE login = ?
      `);
      req.run([password_new, login], (err, row) =>{
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
