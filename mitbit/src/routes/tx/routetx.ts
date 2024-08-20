module.exports = (function() {
    'use strict';
     const bill = require('/Users/dwynmsnn/bit/mitbit/mitbit/mitbit/src/sql/bill/bill');
     const txController = require('/Users/dwynmsnn/bit/mitbit/mitbit/mitbit/src/controller/txController');
     const signJWT = require('/Users/dwynmsnn/bit/mitbit/mitbit/mitbit/src/scripts/JWT');
     const route = require('express').Router();

// GET tx
route.post('/tx', txController);

route.post('/tx0', txController);

// GET tx
route.get('/tx/:id/:billID', async (req: { params: { billID: any; userID: any; }; session: { jwt: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { msg: string; }): any; new(): any; }; }; render: (arg0: string, arg1: { result: any; product: any; }) => void; }) => {
  const ID = req.params.billID;
  const userID = req.params.userID;
  const token = await req.session.jwt;
  const product = await bill.getBill(ID, userID);
  const result = await bill.getBillID(ID, userID);
  const decode = await signJWT.JWTverify(token);

  console.log(ID);

 if(decode === undefined) {
   return res.status(401).json({ msg: 'No token provided' });
 } else {
   console.log(result);
   res.render('tx.ejs', { result: result, product: product });
 }
}); 

// GET tx
route.get('/tx0/:id/:billID', async (req: { params: { billID: any; userID: any; }; session: { jwt: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { msg: string; }): any; new(): any; }; }; render: (arg0: string, arg1: { result: any; product: any; }) => void; }) => {
  const ID = req.params.billID;
  const userID = req.params.userID;
  const token = await req.session.jwt;
  const product = await bill.getBill(ID, userID);
  const result = await bill.getBillID(ID);
  const decode = await signJWT.JWTverify(token);

 if(decode === undefined) {
   return res.status(401).json({ msg: 'No token provided' });
 } else {
   console.log(result);
   res.render('tx0.ejs', { result: result, product: product });
 }
}); 

return route;
})(); 