const express = require('express');
const db = require('../db/models');
const { check, validationResult } = require('express-validator')
const { asyncHandler, handlerValidationErrors } = require('./utils');
const { getUserToken } = require('../auth');
const bcrypt = require('bcryptjs');

const router = express.Router();

const userValidators = [
    check('firstName')
      .exists({checkFalsy: true})
      .withMessage('Please provide a value for first name'),
    check('lastName')
      .exists({checkFalsy: true})
      .withMessage('Please provide a value for last name'),
    check('username')
      .exists({checkFalsy: true})
      .withMessage('Please provide a value for username')
      .custom( value => {
        return db.User.findOne({
            where: {username: value}
        })
        .then( user => { 
            if (user) return Promise.reject('The provided username is already in use by other account');
        })
      })
]

const emailAndPasswordValidators = [
    check('email')
      .exists({checkFalsy: true})
      .isEmail()
      .withMessage('Please provide a valid value for email')
      .custom(value => {
        return db.User.findOne({
            where: {email: value}
        })
        .then( user => {
              if(user) return Promise.reject('The provided email is already in use by other account');
        })
      }),

    check('password')
      .exists({checkFalsy: true})
      .withMessage('Please provide a value for password')  


];


router.post('/', userValidators, emailAndPasswordValidators, handlerValidationErrors,asyncHandler( async(req, res, next) => {
  const {  firstName, lastName, email, username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);


  const user = await db.User.create({
    firstName, 
    lastName, 
    email, 
    username, 
    hashedPassword,
    createdAt: new Date(),
    updatedAt: new Date()
  });

  if (user) {
    const token = getUserToken(user);
    res.status(201).json({ 
        user: {id: user.id},token
    });
  };

}));


router.post('/token', asyncHandler( async(req, res, next) => {

  const { email, password } = req.body; 
  const user = await db.User.findOne({
    where: {"email": email}
  });
  
  if (!user || !user.validatePassword(password)) {
     const err = new Error('Login failed');
     err.status = 401;
     err.title = 'Login failed'
     err.errors = ['The provided credentials were invalid'];
     return next(err);

  } else {
    const token = getUserToken(user);
    res.json({ user: { id: user.id, firstName: user.firstName}, token});
  };

}));

module.exports = router;