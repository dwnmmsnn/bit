module.exports = (function() {
    'use strict';
     const customerController = require('express').Router();
    
    customerController.get('/customer0', (req: any, res: { redirect: (arg0: string) => void; }) => {
        const ID = req.session.userID;
        const customerID = 1;
  
            res.redirect(`/customer/${ID}/${customerID}`);
    });

    return customerController;
   })();