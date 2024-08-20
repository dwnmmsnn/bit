import path from "path";

module.exports = (function() {
    'use strict';
     const route = require('express').Router();
     const bill = require('/Users/dwynmsnn/bit/mitbit/mitbit/mitbit/src/sql/bill/bill');
     const SQL = require('/Users/dwynmsnn/bit/mitbit/mitbit/mitbit/src/sql/customer/customer');
     const PDFDocument = require('pdfkit');
     const fs = require('fs');

    // GET PDF
    route.get('/pdf', async function (req: { session: { userID: any; billID: any; }; }, res: { setHeader: (arg0: string, arg1: string) => void; }) {

            const doc = new PDFDocument();

            const ID = req.session.userID;
            const billID = req.session.billID;
            const products = await bill.getBill(billID);
            const result = await SQL.getCustomer(ID);

            const address = result[0]['address'];
            const postcode = result[0]['postcode'];
            const city = result[0]['city'];
            const country = result[0]['country'];

            const customer = products[0]['customer'];
            const shipping = products[0]['shipping'];
            const discount = products[0]['discount'];
            const sum = products['sum'];
            
            doc.fontSize(22)
               .fillColor('#9C9C9C')
               .text('Bill', 40) , {
                indent: 40
            };
            
            doc.moveDown();
            doc.fontSize(12)
               .text('Order number    ', {
                continued: true,
                align: 'left',
            })
               .text(billID, {
            });

            doc.moveDown();

            doc.moveDown();
            
            doc.moveDown();
            doc.fontSize(12)
               .text('Bill to', 40) , {
                indent: 40
            };
            
            doc.moveDown();
            doc.fontSize(11)
               .text(customer, {
                continued: true,
                align: 'left'
            })
               .text('business', {
                align: 'right'
            });
            
            doc.fontSize(11)
               .text(address, {
                continued: true,
                align: 'left'
            })
               .text('address', {
                align: 'right'
            });

            doc.fontSize(11)
               .text(postcode, {
                continued: true,
                align: 'left'
            })
               .text('postcode', {
                align: 'right'
            });
            
            doc.fontSize(11)
               .text(city, {
                continued: true,
                align: 'left'
            })
               .text('city', {
                align: 'right'
            });
            
            doc.moveDown();
            
            doc.moveDown();

            doc.moveDown();

            doc.moveDown();

            doc.fontSize(11)
               .text('Items ordered') , {
                indent: 40
            };
            
            doc.moveDown();

            doc.moveDown();
            
            doc.fontSize(11)
               .text('Item                    ID                    Tax rate                     Gross price                     Quantity                     Total')

               const width = doc.widthOfString('Item                    ID                    Tax rate                    Gross price                    Quantity                    Total');
               const height = doc.currentLineHeight();

            doc.underline(doc.x, doc.y, width, height, {color: '#CCCCCC'});

            doc.moveDown();

            for (var product of products) {

            doc.moveDown();

            doc.fontSize(11)
               .text(product.product + '                  ', {
                continued: true,
                align: 'left',
            })

               .text(product.productID + '                  ', {
                continued: true,
                align: 'justify'
            })

               .text('19%                  ', {
                continued: true,
                align: 'justify'
            })

               .text(product.grossprice + '                  ', {
                continued: true,
                align: 'justify'  
            })

               .text(product.qty + '                  ', {
                continued: true,
                align: 'justify' 
            })

               .text(product.price, {
                align: 'right'
            })

            doc.underline(doc.x,doc.y, width, height, {color: '#CCCCCC'});

            doc.moveDown();

           };
            
            doc.moveDown();

            doc.fontSize(11)
                .text('Shipping', {
                continued: true,
                align: 'left'
            })
               
                .text(shipping, {
                align: 'right'
            })

            doc.underline(doc.x, doc.y, width, height, {color: '#CCCCCC'});

            doc.moveDown();
            
            doc.moveDown();

            doc.fontSize(11)
               .text('Discount', {
                continued: true,
                align: 'left'
            })
               
               .text(discount, {
                align: 'right'
            })

            doc.underline(doc.x, doc.y, width, height, {color: '#CCCCCC'});
    
            doc.moveDown();

            doc.moveDown();

            doc.fontSize(11)
               .text('Subtotal', {
                continued: true,
                align: 'left'
            })

               .text(sum, {
                align: 'right',
            })

            doc.moveDown();

            doc.underline(doc.x, doc.y, width, height, {color: '#CCCCCC'});

            doc.moveDown();

            doc.moveDown();

            doc.fontSize(11)
               .text('Total tax (included)', {
           })

            doc.underline(doc.x, doc.y, width, height, {color: '#CCCCCC'});

            doc.moveDown();

            const file = path.join('/pdf')

            res.setHeader("Content-Type", "application/pdf");
            res.setHeader("Content-Disposition", `inline; filename=bill.pdf`);

             doc.pipe(fs.createWriteStream(file));
             doc.pipe(res);
            
            // Finalize PDF file
            doc.end();
            })

return route;
})();