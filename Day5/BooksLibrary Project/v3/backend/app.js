const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const users = require('./routes/users');

//19 nov 20022
const usersRoutes = require('./routes/users');
//const stockRoutes = require('./routes/stock');
//const transactions = require('./routes/transactions');
//const analytics = require('./routes/analytics');
const { environment } = require('./config'); 

const app = express();

app.use(morgan('dev'));


app.use(cors({
    origin: '*'
}));

//Cors Configuration - End

app.use(express.json());
//19 nov 20022
app.use('/users', usersRoutes);
// app.use('/stock', stockRoutes);
// app.use('/analytics', analytics);
// app.use('/', transactions);



const isProduction = environment === 'production';

//catch unhandled requests and forward to error handler
app.use((req, res, next) => {
  const err = new Error('The requested page couldn\'t be found');
  err.status = 404;
   next(err);
 });

//Error handler to log errors
app.use((err, req, res, next) => {
  if (!isProduction) {
    console.error(err);
  };
  next(err);
})


 //Error handler for 404
 app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.status(404);
    res.json({"message": "page-not-found"});
  } else {
    next(err);
  }
 });

 
 //Generic error handler;
 app.use((err, req, res, next) => {
     
      res.status(err.status || 500);

      res.json(err)

      if (res.statusCode !== 404) {
        const err = new Error('Internal Server Error');
        err.statusCode = 500;
        res.json({"":""})
      }

 });

 


module.exports = app;