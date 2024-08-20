module.exports = (function() {
    'use strict';
     const productController = require('express').Router();

    productController.get('/product0', (req: any, res: { redirect: (arg0: string) => void; }) => {
        const ID = 1;
        const productID = 1;
  
            res.redirect(`/product/${ID}/${productID}`);
    });

    return productController;
   })();