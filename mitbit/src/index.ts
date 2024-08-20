import express from 'express';
import path from 'path';
import session from 'express-session';

const app = express();
const port = process.env.PORT || 3000;

const cors=require('cors');
app.use(cors());
const mysqlStore = require('express-mysql-session')(session);

const options = {
  connectionLimit: 10,
  host: '127.0.0.1',
  user: 'root',
  password: 'Dwnn00??))',
  database: 'Bill',
  createDatabaseTable: true,
} 

const sessionStore = new mysqlStore(options);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));

app.use(session({
  secret: 'Super secret secret',
  cookie: {maxAge: 1000 * 60 * 60 * 2},
  resave: false,
  saveUninitialized: true,
  store: sessionStore
}));

const route = require('./routes/index');
app.use(route);
app.use('/home', route); // GET home
app.use('/home/:id', route); // GET home
app.use('/signin.css', route); // GET CSS Signin
app.use('/bitbox.css', route); // GET CSS bitbox
app.use('/bitbox', route); // GET bitbox
app.use('/user', route); // GET User
app.use('/user/:userID', route); // GET User
app.use('/bitbox', route); // GET bitbox
app.use('/ledger', route); // GET ledger
app.use('/trezor', route); // GET trezor

const routeSignin = require('./routes/signin/routeSignin');
app.use(routeSignin);
app.use('/', routeSignin); // GET index
app.use('/signin', routeSignin); // GET signin
app.use('/signin', routeSignin); // GET signup
app.use('/signin.css', routeSignin); // GET CSS signin

const routeCustomer = require('./routes/customer/routeCustomer');
app.use(routeCustomer);
app.use('/customer', routeCustomer); // GET customer
app.use('/customerl', routeCustomer); // GET customerl
app.use('/customer0', routeCustomer); // GET customer0

const routeBill = require('./routes/bill/routeBill');
app.use(routeBill);
app.use('/bill', routeBill); // GET billform
app.use('/billlist', routeBill); // GET billlist
app.use('/dlbll', routeBill); // GET dlbll
app.use('/bill.css', routeBill); // GET CSS bill
app.use('/billing.css', routeBill); // GET CSS billing
app.use('/bill/:id/:billID/customer', routeBill);
app.use('/bill/:id/:billID/product', routeBill);

const routeProduct = require('./routes/product/routeProduct');
app.use(routeProduct);
app.use('/product', routeProduct); // product
app.use('/product0', routeProduct); // product0

const routetx = require('./routes/tx/routetx');
app.use(routetx);
app.use('/pubkey', routetx); // GET pubkey
app.use('/tx', routetx); // GET tx

const routePDF = require('./routes/routePDF');
app.use(routePDF);
app.use('/pdf', routePDF);

const routeQR = require('./routes/routeQR');
app.use(routeQR);
app.use('/billing', routeQR);

app.set('view engine', 'ejs');

app.use(express.static('/Users/dwynmsnn/bit/mitbit/mitbit/mitbit/src'));

app.use(express.static(path.join('/Users/dwynmsnn/bit/mitbit/mitbit/mitbit')));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});