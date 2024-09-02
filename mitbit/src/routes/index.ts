module.exports = (function() {
 'use strict';
  const db = require('/Users/dwynmsnn/bit/mitbit/mitbit/mitbit/src/routes/db');
  const bill = require('/Users/dwynmsnn/bit/mitbit/mitbit/mitbit/src/sql/bill/bill');
  const txController = require('/Users/dwynmsnn/bit/mitbit/mitbit/mitbit/src/controller/txController');
  const signJWT = require('/Users/dwynmsnn/bit/mitbit/mitbit/mitbit/src/scripts/JWT');
  const route = require('express').Router();

  // GET home
  route.get('/home', txController);

  // GET home
  route.get('/home/:id', async (req: { params: { id: any; }; session: { jwt: any; billID: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { msg: string; }): any; new(): any; }; }; render: (arg0: string, arg1: { ID: any; result: any; }) => void; }) => {
       const ID = req.params.id;
       const token = await req.session.jwt;
       const decode = await signJWT.JWTverify(token);
       const result = await bill.getBills(ID);

      if(decode === undefined) {
        return res.status(401).json({ msg: 'No token provided' });
      } else {
          res.render('home.ejs', { ID: ID, result: result });
     }
  });

  // GET User
  route.get('/user', async (req: { session: { jwt: any; userID: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { msg: string; }): any; new(): any; }; }; render: (arg0: string, arg1: { userID: any; }) => void; }) => {
    const token = await req.session.jwt;
    const decode = await signJWT.JWTverify(token);
    const userID = req.session.userID;

   if(decode === undefined) {
     return res.status(401).json({ msg: 'No token provided' });
   } else {
    res.render('user.ejs', { userID: userID });
   }
  });

  // GET CSS signin
  route.get('/user0', (req: any, res: { sendFile: (arg0: string) => void; }) => {
    res.sendFile('/Users/dwynmsnn/bit/mitbit/mitbit/mitbit/views/user.html');
  });

  // GET CSS signin
  route.get('/signin.css', (req: any, res: { sendFile: (arg0: string) => void; }) => {
    res.sendFile('/Users/dwynmsnn/bit/mitbit/mitbit/mitbit/src/stylesheet/signin.css');
  });
 
  // GET CSS home
  route.get('/home.css', (req: any, res: { sendFile: (arg0: string) => void; }) => {
       res.sendFile('/Users/dwynmsnn/bit/mitbit/mitbit/mitbit/src/stylesheet/home.css');
  });

  // GET CSS home
  route.get('/bitbox', (req: any, res: { sendFile: (arg0: string) => void; }) => {
    res.sendFile('/Users/dwynmsnn/bit/mitbit/mitbit/mitbit/src/img/bitbox.png');
  });

  // GET ledger
  route.get('/ledger', (req: any, res: { sendFile: (arg0: string) => void; }) => {
    res.sendFile('/Users/dwynmsnn/bit/mitbit/mitbit/mitbit/src/img/ledger.png');
  });

  // GET trezor
  route.get('/trezor', (req: any, res: { sendFile: (arg0: string) => void; }) => {
    res.sendFile('/Users/dwynmsnn/bit/mitbit/mitbit/mitbit/src/img/trezor.png');
  });

  // GET CSS bitbox
  route.get('/bitbox.css', (req: any, res: { sendFile: (arg0: string) => void; }) => {
    res.sendFile('/Users/dwynmsnn/bit/mitbit/mitbit/mitbit/src/stylesheet/bitbox.css');
  });

  // GET bitbox
  route.get('/bitbox', (req: any, res: { sendFile: (arg0: string) => void; }) => {
      res.sendFile('/Users/dwynmsnn/bit/mitbit/mitbit/mitbit/views/bitbox/bitbox.html');
  });

  // GET xpub
  route.get('/pubkey', (req: any, res: { sendFile: (arg0: string) => void; }) => {
    res.sendFile('/Users/dwynmsnn/bit/mitbit/mitbit/mitbit/views/pubkey/pubkey.html');
  });

  // GET xpub
  route.get('/xpub', (req: { session: { userID: any; }; }, res: { render: (arg0: string, arg1: { userID: any; }) => void; }) => {
    const userID = req.session.userID;
    console.log(userID);

    res.render('xpub.ejs', { userID: userID });
  });

  // GET xpub
  route.post('/xpub', (req: { body: { userID: any; xpub: any; }; }, res: { redirect: (arg0: string) => void; }) => {
    const ID = req.body.userID;
    const xpub = req.body.xpub;
    const query = `INSERT INTO xpub VALUES ('${ID}', '${xpub}')`
    console.log(ID)
   
    db.query(query, (err: any, result: any) => {
    if (err) throw err;

   res.redirect('home');
  }) 
 });
  
  return route;
})();