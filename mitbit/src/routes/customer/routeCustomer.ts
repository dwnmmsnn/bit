module.exports = (function() {
    'use strict';
     const db = require('/Users/dwynmsnn/bit/mitbit/mitbit/mitbit/src/routes/db');
     const customer = require('/Users/dwynmsnn/bit/mitbit/mitbit/mitbit/src/sql/customer/customer');
     const bill = require('/Users/dwynmsnn/bit/mitbit/mitbit/mitbit/src/sql/bill/bill');
     const signJWT = require('/Users/dwynmsnn/bit/mitbit/mitbit/mitbit/src/scripts/JWT');
     const express = require('express');
     const route = require('express').Router();

     route.use(express.json());

     const bodyParser  = require('body-parser');
     route.use(bodyParser.urlencoded({extended: true}));

     const cors = require('cors');
     route.use(cors())

     const customerController = require('/Users/dwynmsnn/bit/mitbit/mitbit/mitbit/src/controller/customerController');
     route.get('/customer0', customerController);
     
    // GET customer
    route.get('/customer', async function (req: any, res: any) {
      const ID = req.session.userID;
      const billID = req.session.billID;
      const token = await req.session.jwt;
      const decode = await signJWT.JWTverify(token);
      const result = await customer.getCustomers(ID);

     if(decode === undefined) {
       return res.status(401).json({ msg: 'No token provided' });
     } else {
      res.render('customer.ejs', { result: result, billID: billID });
      console.log(result);
    }
 });

    // GET customerl
    route.get('/customerl', async function (req: any, res: any) {
    const ID = req.session.userID;
    const billID = req.session.billID;
    const token = await req.session.jwt;
    const decode = await signJWT.JWTverify(token);
    const result = await customer.getCustomers(ID);

     if(decode === undefined) {
       return res.status(401).json({ msg: 'No token provided' });
     } else {
      res.render('customerl.ejs', { result: result, billID: billID });
      console.log(result);
    }
 });

    // GET customer0
    route.get('/customer/:id/:customerID', async (req: { params: { customerID: any; id: any; }; session: { jwt: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { msg: string; }): any; new(): any; }; }; render: (arg0: string, arg1: { ID: any; userID: any; fname: any; lname: any; email: any; phonenumber: any; address: any; postcode: any; city: any; country: any; }) => void; }) => {
      const ID = req.params.customerID;
      const token = await req.session.jwt;
      const decode = await signJWT.JWTverify(token);
      const result = await customer.getCustomerID(ID);

     if(decode === undefined) {
       return res.status(401).json({ msg: 'No token provided' });
     } else {
      const userID = req.params.id;

      const fname = result[0]['fname'];
      const lname = result[0]['lname'];
      const email = result[0]['email'];
      const phonenumber = result[0]['phonenumber'];
      const address = result[0]['address'];
      const postcode = result[0]['postcode'];
      const city = result[0]['city'];
      const country = result[0]['country'];
      
      res.render('customer0.ejs', {ID: ID, userID: userID, fname: fname, lname: lname, email: email, phonenumber: phonenumber, address: address, postcode: postcode, city: city, country: country});
    }
  });   

    // POST customer l
    route.post('/customerl', async (req: { session: { billID: any; userID: any; customer: any; }; body: { customer: any; }; }, res: { render: (arg0: string, arg1: { customer: any; userID: any; billID: any; }) => void; }) => {
      const ID = req.session.billID;
      const userID = req.session.userID;
      const customer = req.body.customer;
      const product = 0;
      const productID = ID + userID + product;
      const sql = `INSERT INTO Bill VALUES ( '${ID}', '${userID}', '${customer}', '${product}', '${productID}', '0.00', '0.00', '0', '0', '0.00', '0', '', '', '' )`

      req.session.customer = customer;

      db.query(sql, async (err: any, result: any) => {
       if (err) throw err

       res.render('bill0.ejs', { customer: customer, userID: userID, billID: ID });
    })
  });

    // POST customer li
    route.post('/customerli', async (req: { session: { billID: any; userID: any; shipping: any; discount: any; customer: any; }; body: { item: any; price: any; customer: any; }; }, res: { render: (arg0: string, arg1: { billID: any; userID: any; result: any; customer: any; }) => void; }) => {
      const ID = req.session.billID;
      const customer = req.body.customer;
      const userID = req.session.userID;
      const sql = `UPDATE Bill SET customer = '${customer}' WHERE ID = '${ID}' AND userID = '${userID}'`

      req.session.customer = customer;

      db.query(sql, async (err: any, product: any) => {
        if (err) {
          throw err
     } else {
          const result = await bill.getBill(ID);
          res.render('bill1.ejs', { billID: ID, userID: userID, result: result, customer: customer });
     }
   })
});

    // POST customer
    route.post('/customer', (req: { body: { ID: any; userID: any; fname: any; lname: any; email: any; phonenumber: any; address: any; postcode: any; city: any; country: any; }; }, res: { redirect: (arg0: string) => void; end: () => void; }) => {
    const ID = req.body.ID;
    const userID = req.body.userID;
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    const phonenumber = req.body.phonenumber;
    const address = req.body.address;
    const postcode = req.body.postcode;
    const city = req.body.city;
    const country = req.body.country;
    const sql = `INSERT INTO Customer VALUES ('${ID}', '${userID}', '${fname}', '${lname}', '${email}', '${phonenumber}', '${address}', '${postcode}', '${city}', '${country}')`

      db.query(sql, (err: any, result: any) => {
      if (err) throw err
      console.log('1 record inserted');
      })
  
      res.redirect('/bill');
      res.end();
  });

  // PUT Customer
  route.post('/customer0', (req: { body: { ID: any; userID: any; fname: any; lname: any; email: any; phonenumber: any; address: any; postcode: any; city: any; country: any; }; }, res: { redirect: (arg0: string) => void; end: () => void; }) => {
    const ID = req.body.ID;
    const userID = req.body.userID;
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    const phonenumber = req.body.phonenumber;
    const address = req.body.address;
    const postcode = req.body.postcode;
    const city = req.body.city;
    const country = req.body.country;
    const sql = `UPDATE Customer SET fname = '${fname}', lname = '${lname}', email = '${email}', phonenumber = '${phonenumber}', address = '${address}', postcode = '${postcode}', city = '${city}', country = '${country}') WHERE ID = ${ID} and userID = ${userID}`;
  
      db.query(sql, (err: any, result: any) => {
      if (err) throw err
      console.log('1 record inserted');
      });
  
      res.redirect('/bill');
      res.end();
  });

return route;
})();