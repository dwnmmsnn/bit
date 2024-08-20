const db = require('/Users/dwynmsnn/bit/mitbit/mitbit/mitbit/src/routes/db');

const getID = (ID: any) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM Bill WHERE userID = ? ORDER BY id DESC LIMIT 1', [ID], (err: any, result: any) => {
            if(err){
                return reject(err);
            }
                return resolve(result[0]['ID']);
   })
  })
 };

const getBillID = (ID: any) => {
     return new Promise((resolve, reject) => {
         db.query('SELECT * FROM Bill WHERE ID = ? AND userID = 1', [ID], (err: any, result: any) => {
             if(err){
                 return reject(err);
             }
                 return resolve(result[0]);
    })
   })
  };

const getBill = (ID: any) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM Bill WHERE ID = ? AND userID = 1 AND product != '0'`, [ID], (err: any, result: any) => {
          if(err){
              return reject(err);
          }
              return resolve(result);
      })
     })
    };

   const getBills = (ID: any) => {
     return new Promise((resolve, reject) => {
       db.query('SELECT DISTINCT bill.ID, bill.userID, bill.customer, bill.sum, bill.btc FROM Bill WHERE userID = ? AND ID != 0', [ID], (err: any, result: any) => {
       if(err){
           return reject(err);
       }
           return resolve(result);
   })
  })
 };

module.exports = { getID, getBillID, getBill, getBills };