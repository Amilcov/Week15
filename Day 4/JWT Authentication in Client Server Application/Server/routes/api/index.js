const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { User } = require('../../db/models');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');

router.post('/test', function(req, res) {
  res.json({requestBody: req.body});
});

router.get('/test', function(req, res) {
  res.json({hi: 'llll'});
});

router.get('/test-setTokenCookie', asyncHandler( async(req, res) => {
  const user = await User.findOne({
    where: {
      username: 'adriana'
    }
  });
  setTokenCookie(res, user);
  return res.json({user});
}));

router.get('/test-restoreUser', restoreUser, (req, res) => {
  return res.json(req.user);
});

router.get('/test-requireAuth', requireAuth, (req, res) => {
   return res.json(req.user);
});



module.exports = router;