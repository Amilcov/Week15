const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { ValidationError } = require('sequelize');

const users = require('./routes/users');

//19 nov 20022
const usersRoutes = require('./routes/users');
const authorsRoutes = require('./routes/authors');
const booksRoutes = require('./routes/books');
const bookauthorsRoutes = require('./routes/bookauthors');
const borrowBooksRoutes = require('./routes/borrowbooks');
const { environment } = require('./config'); 

const app = express();

app.use(morgan('dev'));


app.use(cors({
    origin: '*'
}));

//Cors Configuration - End

app.use(express.json());

app.use('/users', usersRoutes);
app.use('/authors', authorsRoutes);
app.use('/books', booksRoutes);
app.use('/bookauthors', bookauthorsRoutes);
app.use('/borrowbooks', borrowBooksRoutes);


const isProduction = environment === 'production';

// Catch unhandled requests and forward to error handler.
app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = ["The requested resource couldn't be found."];
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


// Process sequelize errors
app.use((err, _req, _res, next) => {
  // check if error is a Sequelize error:
  if (err instanceof ValidationError) {
    err.errors = err.errors.map((e) => e.message);
    err.title = 'Validation error';
  }
  next(err);
});


 
// Error formatter
app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    title: err.title || 'Server Error',
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack,
  });
});


 


module.exports = app;