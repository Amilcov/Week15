const express = require('express');

const asyncHandler = require('express-async-handler');
const { setTokenCookie } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { User } = require('../../db/models');

const router = express.Router();

const validateSignUp = [
   check('email')
     .exists({checkFalsy: true})
     .isEmail()
     .withMessage('Please provide a valid email'),
   check('username')
     .exists({checkFalsy: true})
     .isLength({min: 4})
     .withMessage('Please provide a username with a least 4 characters'),
   check('username')
     .not()
     .isEmail()
     .withMessage('Username cannot be email'),
   check('password')
     .exists({checkFalsy: true})
     .isLength({min: 6})
     .withMessage('Password must be at least 6 characters'),
   handleValidationErrors  
]


router.post('/', 
validateSignUp,
asyncHandler( async (req, res, next) => {
   const { username, email, password } = req.body;
   const user = await User.signup({username, email, password });

   await setTokenCookie(res, user);
   return res.json({user})

}));

module.exports = router;