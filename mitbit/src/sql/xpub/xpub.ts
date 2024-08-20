const mySQL = require('/Users/dwynmsnn/bit/mitbit/mitbit/mitbit/src/routes/db');

const pubkey = (ID: any) => {
    return new Promise((resolve, reject) => {
        mySQL.query('SELECT * FROM xpub WHERE ID = ? ORDER BY id DESC LIMIT 1', [ID], (err: any, result: any) => {
            if(err){
                return reject(err);
            }
                return resolve(result[0]['xpub']);
   })
  })
 };

 module.exports = { pubkey };