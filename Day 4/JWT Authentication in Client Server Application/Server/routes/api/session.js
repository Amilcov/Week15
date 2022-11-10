const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const asyncHandler = require('express-async-handler');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

const validateLogin = [
    check('credential')
      .exists({checkFalsy: true})
      .notEmpty()
      .withMessage('Please provide a valid email or username'),
    check('password')
      .exists({checkFalse: true})
      .withMessage('Please provide a password'),
    handleValidationErrors  
]

router.post('/',  
validateLogin,
asyncHandler( async (req, res, next) => {
    const { credential, password } = req.body;
    const user = await User.login({ credential, password });

    if (!user) {
        const err = new Error('Login failed');
        err.title = 'Login faild';
        err.errors = ['The provided credentials are invalid'];
        err.status = 401;
        return next(err);
    };

    await setTokenCookie(res, user);
    return res.json({user});
}));

router.delete('/', (_req, res) => {
    res.clearCookie('token');
    return res.json({message: "Successfuly remove cookie named token"});
});

router.get('/', restoreUser, async(req, res) => {
    if (req.user) {
       const { user } = req;
       return res.json({ user: user.toSafeObject()}) ;
    } else {
       return res.json({});
    }
})

module.exports = router;