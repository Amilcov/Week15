const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');

const asyncHandler = require('express-async-handler');
const { User } = require('../../db/models');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth.js');


router.use('/session', sessionRouter);
router.use('/users', usersRouter);


router.post('/test', function(req, res) {
  res.json({requestBody: req.body});
});

router.get('/test', function(req, res) {
  res.json({hi: 'llll'});
});

router.get('/test-set-token-cookie', asyncHandler( async(req, res) => {
  const user = await User.findOne({
    where: {
      username: 'adriana'
    }
  });
  setTokenCookie(res, user);
  return res.json({user});
}));

router.get('/test-restore-user', restoreUser, (req, res) => {
  return res.json(req.user);
});

router.get('/test-require-auth', requireAuth, (req, res) => {
   return res.json(req.user);
});



module.exports = router;