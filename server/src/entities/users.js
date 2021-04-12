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

  get(userid) {
    return new Promise((resolve, reject) => {
      const req = this.db.prepare(`
        SELECT * FROM users WHERE rowID=?;
      `);
      req.get([userid], (err,row) => {
        if(err) {
          console.log(err);
          reject();
        } else {
          console.log(row)
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
      req.run([login], (err, row) => {
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
      req = this.db.prepare(`
        SELECT rowid FROM users WHERE login=? AND password=?;
      `);
      req.get([login, password], (err, row) => {
        if(err) {
          console.log('Erreur SQL: ', err);
          reject();
        } else {
          resolve(row.rowid);
        }
      });
    });
  }
  
  delete(user_id) {
    return new Promise((resolve, reject) => {
      const req = this.db.prepare(`
          DELETE from users WHERE login=? 
      `);
      req.run([user_id], (err) =>{
        if (err){
          console.log(err)
          reject();
        } else {
          resolve('Ok, user deleted');
        }
      });
    });
  }
}


exports.default = Users;
