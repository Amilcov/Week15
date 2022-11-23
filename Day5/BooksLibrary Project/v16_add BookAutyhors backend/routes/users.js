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
      .withMessage('Please provide a value for last name')
      
]

const usernameAndEmailAndPasswordValidators = [

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
      }),

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


router.get('/', asyncHandler(async (req, res) => {
  const users = await db.User.findAll({
    order: [["firstName", "ASC"], ["lastName", "ASC"],]
  }) ;
  res.json({users});
}));


router.post('/', userValidators, usernameAndEmailAndPasswordValidators, handlerValidationErrors,asyncHandler( async(req, res, next) => {
  const {  firstName, lastName, email, username, password, contact, type} = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);


  const user = await db.User.create({
    firstName, 
    lastName, 
    email, 
    username, 
    hashedPassword,
    contact,
    type,
    createdAt: new Date(),
    updatedAt: new Date()
  });

  if (user) {
   
    res.status(201).json({ 
        user: {id: user.id},
    });
  };

}));


router.post('/login', asyncHandler( async(req, res, next) => {

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
    res.json({ user: { id: user.id, firstName: user.firstName, type: user.type}, token});
  };

}));


router.post('/signup', userValidators, usernameAndEmailAndPasswordValidators, handlerValidationErrors,asyncHandler( async(req, res, next) => {
  const {  firstName, lastName, email, username, password} = req.body;
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

router.post('/edit/:userId(\\d+)', 
userValidators, handlerValidationErrors, asyncHandler(async (req, res) => {
 
   const userId = parseInt(req.params.userId, 10);

    if (req.errors) {
      return res.status(404).json({"errors": req.errors});
    } else {
      const {firstName, lastName, username, email, password, contact, type} = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = {firstName, lastName, username, email, hashedPassword,contact, type} ;
     
      const userToUpdate= await db.User.findByPk(userId);
      await userToUpdate.update(user);
      
      return res.status(200).json({user});
  }

}));



router.get('/:userId(\\d+)', asyncHandler(async (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const user = await db.User.findByPk(userId);

  return res.status(200).json({user});
}));



router.delete('/delete/:userId(\\d+)', 
asyncHandler(async (req, res, next) => {

const userId = parseInt(req.params.userId, 10);
const user = await db.User.findByPk(userId);


  if (user) {
      await user.destroy();
      return res.status(204).end();
  } else {
       const err = new Error (`There isn\'t user with id ${id} in the database`);
       err.title = 'User not found';
       err.status = 404;
       return next(err);
  }

}));

module.exports = router;