module.exports = (function() {
    'use strict';
     const db = require('/Users/dwynmsnn/bit/mitbit/mitbit/mitbit/src/routes/db');
     const signJWT = require('/Users/dwynmsnn/bit/mitbit/mitbit/mitbit/src/scripts/JWT');
     const product = require('/Users/dwynmsnn/bit/mitbit/mitbit/mitbit/src/sql/product/product');
     const cus = require('/Users/dwynmsnn/bit/mitbit/mitbit/mitbit/src/sql/customer/customer');
     const bill = require('/Users/dwynmsnn/bit/mitbit/mitbit/mitbit/src/sql/bill/bill');
     const route = require('express').Router();

     const productController = require('/Users/dwynmsnn/bit/mitbit/mitbit/mitbit/src/controller/productController');
     route.get('/product0', productController);

    // GET product
    route.get('/product', async (req: { session: { userID: any; billID: any; jwt: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { msg: string; }): any; new(): any; }; }; render: (arg0: string, arg1: { result: any; billID: any; }) => void; }) => {
      const ID = req.session.userID;
      const billID = req.session.billID;
      const token = await req.session.jwt;
      const decode = await signJWT.JWTverify(token);
      const result = await product.getProduct(ID);

     if(decode === undefined) {
       return res.status(401).json({ msg: 'No token provided' });
     } else {
              res.render('product.ejs', { result: result, billID: billID });
     }
   });

    // GET product0
    route.get('/product0', (req: any,res: { sendFile: (arg0: string) => void; }) => {
              res.sendFile('/Users/dwynmsnn/bit/mitbit/mitbit/mitbit/views/product/product.html');
   });

    // GET product0
    route.get('/product/:id/:productID', async (req: { params: { productID: any; }; session: { jwt: any; }; query: { customerID: any; id: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { msg: string; }): any; new(): any; }; }; render: (arg0: string, arg1: { ID: any; userID: any; product: any; description: any; price: any; }) => void; }) => {
      const ID = req.params.productID;
      const token = await req.session.jwt;
      const decode = await signJWT.JWTverify(token);
      const result = await product.getProductID(ID);

     if(decode === undefined){
       return res.status(401).json({ msg: 'No token provided' });
     } else {
          const ID = req.query.customerID;
          const userID = req.query.id;
  
          const product = result[0]['product'];
          const description = result[0]['description'];
          const price = result[0]['price'];
          
          res.render('product0.ejs', {ID: ID, userID: userID, product: product, description: description, price: price});
        }
      }); 

    // POST product
    route.post('/product', (req: { body: { ID: any; userID: any; product: any; description: any; price: any; }; }, res: { redirect: (arg0: string) => void; end: () => void; }) => {
        const ID = req.body.ID;
        const userID = req.body.userID;
        const product = req.body.product;
        const description = req.body.description;
        const price = req.body.price;
        const sql = `INSERT INTO INSERT INTO Product VALUES ( '${ID}', '${userID}', '${product}', '${description}', '${price}', '1' ) ON DUPLICATE KEY UPDATE qty = '1'`;
        
      db.query(sql, (err: any, result: any) => {
        if (err) {
           console.log(err);
          } else {
           res.redirect('/bill');
           res.end();
          }
        })
      });

   // POST product li
   route.post('/productli', async (req: { session: { billID: any; userID: any; customer: any; shipping: any; discount: any; }; body: { item: any; price: any; qty: any; }; }, res: { render: (arg0: string, arg1: { billID: any; userID: any; result: any; customer: any; }) => void; }) => {
      const ID = req.session.billID;
      const userID = req.session.userID;
      const product = req.body.item;
      const productID = ID + userID + product;
      const customer = req.session.customer;
      const grossprice = req.body.price;
      const qty = req.body.qty;
      const price = grossprice * qty;
      const sql = `INSERT INTO Bill VALUES ( '${ID}', '${userID}', '${customer}', '${product}', '${productID}', '0.00', '0.00', '${grossprice}', '${price}', '0.00', '${qty}', '', '', '' ) ON DUPLICATE KEY UPDATE qty = qty + '${qty}', price = price + '${price}'`
       
      db.query(sql, async (err: any, product: any) => {
         if (err) {
            throw err
      } else {
            const result = await bill.getBill(ID);
            res.render('bill1.ejs', { billID: ID, userID: userID, result: result, customer: customer });
       }
     })
  });

return route;
})();