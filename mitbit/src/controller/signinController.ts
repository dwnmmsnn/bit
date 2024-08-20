     const user = require('/Users/dwynmsnn/bit/mitbit/mitbit/mitbit/src/sql/user');
     const bill = require('/Users/dwynmsnn/bit/mitbit/mitbit/mitbit/src/sql/bill/bill');
     const route = require('express').Router();
     const bcrypt = require('bcrypt');
     const session = require('express-session');
     const jsontoken = require('jsonwebtoken');
    

     exports.signup = async (req: { body: { password: any; }; }, res: { redirect: (arg0: string) => void; }) => {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
      const created = Date.now();
      await user.insert(req.body, created);
      res.redirect('/signin');
    }

     exports.signin = async (req: { body: { userID: any; password: any; }; session: { loggedin: boolean; userID: any; billID: any; customer: any; shipping: any; discount: any; price: any; jwt: any; }; }, res: { json: (arg0: { err: string; }) => any; redirect: (arg0: string) => void; }) => {
      const ID = await req.body.userID;
      const User = await user.getUserByID(ID);
      const secret = 'nlnlnlnlnlnlnnlnlnlnl';

      if(User === undefined) {
        return res.json({
            err: 'Login not successful'
          })
      } else {
          const success = bcrypt.compare(req.body.password, User.password)
          if(!success) {
            return res.json({
                err: 'Login not successful'
              })
          } else {
              const token = await jsontoken.sign({ user: ID }, secret, { expiresIn: '1h' });
              req.session.loggedin = true;
              req.session.userID = ID;
              req.session.billID = await bill.getID(ID);
              req.session.customer = '';
              req.session.shipping = '';
              req.session.discount = '';
              req.session.price = '';
              req.session.jwt = token;
              res.redirect(`/home/${ID}`);
        }
      }
    }

    exports.logout = async function(req: any, res: { clearCookie: (arg0: string) => void; redirect: (arg0: string) => void; }) {
      res.clearCookie('jwt');
      res.redirect('/signin');
    }