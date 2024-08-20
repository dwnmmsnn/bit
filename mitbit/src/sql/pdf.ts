const l = require('/Users/dwynmsnn/bit/mitbit/mitbit/mitbit/src/routes/db');

const getPDF = (ID: any) => {
     return new Promise((resolve, reject) => {
         l.query('SELECT customer.fname, customer.lname, customer.email, customer.phonenumber, customer.address, customer.postcode, customer.city, customer.country, product.product, product.description, product.price FROM Customer INNER JOIN Product ON Customer.userID = Product.userID', [ID], (err: any, result: any) => {
             if(err){
                 return reject(err);
             }
                 return resolve(result);
    })
   })
  };

const insertQR = (ID: any, userID: any, shipping: any) => {
    return new Promise((resolve, reject) => {

      l.query('UPDATE Bill SET shipping = 1 WHERE ID = 1 AND userID = 1', [ID, userID, shipping], (err: any, result: any) => {
            if(err){
                return reject(err);
            }
              return resolve(result.insertId);
      })
    })
  };

module.exports = { getPDF, insertQR }