const jwt = require('jsonwebtoken');

// Secret key used for signing and verifying JWTs
const secretKey = 'nlnlnlnlnlnlnnlnlnlnl'; // Replace this with a strong secret key in production

const JWTverify = (token: any) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (err: any, result: unknown) => {
          if(err){
              return reject(err);
          }
              return resolve(result);
  })
 })
};

module.exports = { JWTverify };