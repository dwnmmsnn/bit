const sql = require('/Users/dwynmsnn/bit/mitbit/mitbit/mitbit/src/routes/db');

const insert = (userID: any, email: any, password: any, created: any) => {
  return new Promise((resolve, reject) => {
      sql.query('INSERT INTO User (userID, email, password, created) VALUES (?,?,?,?,)', [userID, email, password, created], (err: any, result: { insertId: unknown; }) => {
          if(err){
              return reject(err);
          }
            return resolve(result.insertId);
    })
  })
};

const putUser = (userID: any, email: any, password: any) => {
  return new Promise((resolve, reject) => {
      sql.query('UPDATE User SET userID = ?, email= ?, password = ? WHERE userID = ?', [userID, email, password], (err: any, result: { putUser: unknown; }) => {
          if(err) {
              return reject(err);
          }
            return resolve(result);
    })
  })
};

const deleteUser = (ID: any) => {
  return new Promise((resolve, reject) => {
      sql.query('DELETE FROM User WHERE ID = ?', [ID], (err: any, result: any) => {
          if(err) {
            return reject(err);
          }
            return resolve(console.log('User deleted'));
    })
  })
};

const getUserByID = (userID: number) => {
  return new Promise((resolve, reject) => {
     sql.query('SELECT * FROM User WHERE userID = ?', [userID], (err: any, result: any) => {
         if(err) {
          return reject(err);
         }
          return resolve(result[0]);
   })
 })
};

module.exports = { insert, putUser, deleteUser, getUserByID };