const Sql = require('/Users/dwynmsnn/bit/mitbit/mitbit/mitbit/src/routes/db');

const getProduct = (ID: any) => {
     return new Promise((resolve, reject) => {
         Sql.query('SELECT * FROM Product WHERE userID = ?', [ID], (err: any, result: any) => {
             if(err){
                 return reject(err);
             }
                 return resolve(result);
    })
   })
  };

  const getProductID = (ID: any) => {
    return new Promise((resolve, reject) => {
      Sql.query('SELECT * FROM Product WHERE ID = ?', [ID], (err: any, result: any) => {
          if(err){
              return reject(err);
          }
              return resolve(result);
      })
     })
    };

module.exports = { getProduct, getProductID };