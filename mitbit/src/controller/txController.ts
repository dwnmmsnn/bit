module.exports = (function() {
    'use strict';
     const txController = require('express').Router();

     txController.get('/home', (req: any, res: { redirect: (arg0: string) => void; }) => {
        const ID = req.session.userID;
 
             res.redirect(`/home/${ID}`);
      });

     txController.post('/tx', (req: any, res: { redirect: (arg0: string) => void; }) => {
        const ID = req.session.userID;
        const billID = req.body.billID;
  
              res.redirect(`/tx/${ID}/${billID}`);
       });

       txController.post('/tx0', (req: any, res: { redirect: (arg0: string) => void; }) => {
         const ID = req.session.userID;
         const billID = req.body.billID;
        
              res.redirect(`/tx0/${ID}/${billID}`);
       });

       txController.get('/bill', (req: any, res: { redirect: (arg0: string) => void; }) => {
              const ID = req.session.userID;
              const billID = req.session.billID;
        
              res.redirect(`/bill/${ID}/${billID}`);
       });

       txController.get('/billlist', (req: any, res: { redirect: (arg0: string) => void; }) => {
              const ID = req.session.userID;
        
              res.redirect(`/billlist/${ID}`);
       });

return txController;
})();