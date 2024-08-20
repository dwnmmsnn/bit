const SQL = require('/Users/dwynmsnn/bit/mitbit/mitbit/mitbit/src/routes/db');

   const getCustomer = (ID: any) => {
    return new Promise((resolve, reject) => {
      SQL.query('SELECT * FROM Customer WHERE ID = ?', [ID], (err: any, result: any) => {
          if(err){
            return reject(err);
          }
            console.log(result);
            return resolve(result);
   })
  })
 };

 const getCustomers = (ID: any) => {
  return new Promise((resolve, reject) => {
      SQL.query('SELECT * FROM Customer WHERE userID = ?', [ID], (err: any, result: any) => {
          if(err){
              return reject(err);
          }
              return resolve(result);
   })
  })
 };

   const getCustomerID = (ID: any) => {
     return new Promise((resolve, reject) => {
       SQL.query('SELECT * FROM Customer WHERE ID = ?', [ID], (err: any, result: any) => {
           if(err){
             return reject(err);
       }
             return resolve(result);
   })
  })
 };

module.exports = { getCustomer, getCustomers, getCustomerID };