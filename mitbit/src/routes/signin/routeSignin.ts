module.exports = (function() {
    'use strict';
     const user = require('/Users/dwynmsnn/bit/mitbit/mitbit/mitbit/src/controller/signinController')
     const route = require('express').Router();

  // index
  route.get('/', (req: any, res: { sendFile: (arg0: string) => void; }) => {
    res.sendFile('/Users/dwynmsnn/bit/mitbit/mitbit/mitbit/views/signin/index.html');
  });

  // GET Signin
  route.get('/signin', (req: any,res: { sendFile: (arg0: string) => void; }) => {
    res.sendFile('/Users/dwynmsnn/bit/mitbit/mitbit/mitbit/views/signin/signin.html');
  });

  // GET Signup
  route.get('/signup', (req: any,res: { sendFile: (arg0: string) => void; }) => {
    res.sendFile('/Users/dwynmsnn/bit/mitbit/mitbit/mitbit/views/signin/signup.html');
  });

  // GET Signin
  route.get('/signin.css', (req: any,res: { sendFile: (arg0: string) => void; }) => {
    res.sendFile('/Users/dwynmsnn/bit/mitbit/mitbit/mitbit/src/stylesheet/signin.css');
  });

  // POST signin
  route.post('/signin', user.signin);

  // POST signup
  route.post('/signup', user.signup);

  // GET logout
  route.get('/logout', user.logout)

return route;
})();