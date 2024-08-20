module.exports = (function() {
    'use strict';
    const db = require('/Users/dwynmsnn/bit/mitbit/mitbit/mitbit/src/routes/db');
    const txController = require('/Users/dwynmsnn/bit/mitbit/mitbit/mitbit/src/controller/txController');
    const bill = require('/Users/dwynmsnn/bit/mitbit/mitbit/mitbit/src/sql/bill/bill');
    const route = require('express').Router();

    // Get bill
    route.get('/bill', txController);
    
    // GET CSS bill
    route.get('/bill.css', (req: any, res: { sendFile: (arg0: string) => void; }) => {
      res.sendFile('/Users/dwynmsnn/bit/mitbit/mitbit/mitbit/src/stylesheet/bill.css');
    });
    
    // GET CSS billing
    route.get('/billing.css', (req: any, res: { sendFile: (arg0: string) => void; }) => {
      res.sendFile('/Users/dwynmsnn/bit/mitbit/mitbit/mitbit/src/stylesheet/billing.css');
    });
  
    // GET bill
  route.get('/bill/:id/:billID', async (req: { params: { billID: any; id: any; }; session: { billID: number; }; }, res: { render: (arg0: string, arg1: { billID: number; userID: any; }) => void; }) => {
      const userID = req.params.id;
      let ID = await bill.getID(userID);
      let billID = ID++;

      req.session.billID = ID;
      res.render('bill.ejs', { billID: ID, userID: userID });
    });

    // GET billlist
    route.get('/billlist', txController);

    // GET billlist
    route.get('/billlist/:id', async (req: { params: { id: any; }; }, res: { render: (arg0: string, arg1: { result: any; }) => void; }) => {
       const ID = req.params.id;
       const result = await bill.getBills(ID);
  
        res.render('billlist.ejs', { result: result });
        console.log(result);
  });

    // POST bill
    route.post('/bill', (req: { session: { billID: any; userID: any; }; body: { refund: any; sum: any; address: any; }; }, res: { redirect: (arg0: string) => void; }) => {
       const ID = req.session.billID;
       const userID = req.session.userID;
       const refund = req.body.refund;
       const sum = req.body.sum;
       const btc = req.body.address;

       let d = ("0" + Date.prototype.getDate()).slice(-2);
       let m = ("0" + (Date.prototype.getMonth() + 1)).slice(-2);
       let y = Date.prototype.getFullYear();
       let h = Date.prototype.getHours();
       let min = Date.prototype.getMinutes();
       let s = Date.prototype.getSeconds();
       const created = (y + '-' + m + '-' + y + ' ' + h + ':' + min + ':' + s);

       const query = `UPDATE Bill SET btc = '${btc}', refund = '${refund}', sum = '${sum}', create = '${created}' WHERE ID = '${ID}' AND userID = '${userID}'`;
    
       db.query(query, (err: any, result: any) => {
         if (err) throw err;

      res.redirect('home');
    })
  });

    // GET bill0
    route.get('/bill0', async (req: { session: { billID: any; userID: any; customer: any; }; }, res: { render: (arg0: string, arg1: { customer: any; userID: any; billID: any; }) => void; }) => {
       const ID = req.session.billID;
       const userID = req.session.userID;
       const customer = req.session.customer;
    
          res.render('bill0.ejs', { customer: customer, userID: userID, billID: ID });
          console.log(customer);
    });
    
    // GET bill1
    route.get('/bill1', async (req: { session: { billID: any; userID: any; customer: any; }; }, res: { render: (arg0: string, arg1: { billID: any; userID: any; result: any; customer: any; }) => void; }) => {
       const ID = req.session.billID;
       const userID = req.session.userID;
       const customer = req.session.customer;
       const result = await bill.getBill(ID);

        res.render('bill1.ejs', { billID: ID, userID: userID, result: result, customer: customer });
        console.log(customer);
    });

    // POST bill
    route.get('/dlbll', (req: { session: { billID: any; userID: any; }; }, res: { redirect: (arg0: string) => void; }) => {
      const ID = req.session.billID;
      const userID = req.session.userID;
      const query = `DELETE FROM Bill WHERE ID = '${ID}' AND userID = '${userID}'`;
    db.query(query, (err: any, result: any) => {
       if (err) throw err;
 
       res.redirect('home');
     })
   });

return route;
})();
