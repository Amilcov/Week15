

const express = require('express');
const apiRouter  = require('./api');

const router = express.Router();
router.use('/api', apiRouter);



if (process.env.NODE_ENV === 'production') {
   const path = require('path');

   router.get('/', (req, res) => {
     res.cookie('XSRF-TOKEN', req.csrfToken());
     return res.sendFile(
        path.resolve(__dirname, '../../frontend', 'build', 'index.html')
     );
   });

   router.use(express.static(path.resolve("../frontend/build")));

   router.get(/^(?!\/?api).*/, (req, res) => {
     res.cookie('XSRF-TOKEN', req.csrfToken());
     return res.sendFile(
        path.resolve(__dirname, '../../frontend', 'build', 'index.html'));
   });

}


//add XSRF-TOKEN in development
if (process.env.NODE_ENV !== 'production') {
   router.get('/api/csrf/restore', (req, res) => {
     res.cookie('XSRF-TOKEN', req.csrfToken());
     return res.json({});
   });
};


router.get('/hello/world', function(req, res) {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.send('Hello World!');
});

module.exports = router;