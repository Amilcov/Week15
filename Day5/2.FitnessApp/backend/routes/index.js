const express = require('express');
const fs = require('fs');
const db = require('../db/models');
const { sequelize } = require('../db/models');

const router = express.Router();

router.get('/hello/world', function(req, res) {
    res.send('Hello from backend');
});


router.get('/photos/:photoId', async(req, res) => {
    console.log('here');
 const photoId = parseInt(req.params.photoId, 10);
  try {
    const results = await sequelize.query(`SELECT * FROM "Photos" where id=${photoId}`);
    
    console.log('results=', results);
    console.log('results[0]=', results[0]);
    console.log('results[0].image=', results[0][0].image);
    const image = results[0][0].image;
    const b64 = image.toString('base64');
    const src = "data:image/png;base64,"+b64;
    res.setHeader('Content-type', 'image/png');

    return res.send(src);
  } catch (e) {
    console.log(e.message)
  }


});


router.post('/photos', async(req, res) => {
     console.log('here upload');
     const pic = fs.readFileSync('//Users/adrianaclaudia/AAO/Projects/SportSite/Resurse/pic_test.png');
      await db.Photo.create({
        image: pic,
        name: 'With fs.readFileSync(pathPic)'
      });


});


router.get('/photos/v2/:photoId', async (req, res) => {
     const photoId = parseInt(req.params.photoId, 10);
  try {
     const record = await db.Photo.findByPk(photoId);

     const image = record.data;
     //const image = record.image.toString('base64');
     return res.status(200).json({image});
   


  } catch(err) {
    return res.status(500).send(err.message);
  }
});

router.post('/photos/v2/', async(req, res) => {
    console.log('____req.body is:', req.body);
    //const {name, pic} = req.body;
     try {
         const newImage = await db.Photo.create({
          name: 'A5',
          //iageType: req.file.mimetype,
          image: req
         });

         console.log('___POST photos/v2/ ___newImage.image', newImage.image)
         return res.status(201).json(newImage.image);
    
     } catch(err) {
        return res.status(500).json({error: err.message})
     }
     


});



router.post('/photos/blob/', async(req, res) => {
    console.log('____req.body is:', req.body);
    const {name, pic} = req.body;
     try {
         const newImage = await db.Photo.create({
          name: 'A5',
          image: pic
         });

         return res.status(201).json(newImage.image);
    
     } catch(err) {
        return res.status(500).json({error: err.message})
     }
     


});

router.get('/photos/v3', async(req, res) => {
     console.log('here upload');
     const pic = fs.readFileSync('//Users/adrianaclaudia/AAO/Projects/SportSite/Resurse/pic_test.png');
      await db.Photo.create({
        image: pic
      });

      
});


router.get('/photos/v5/:photoId', async (req, res) => {
     const photoId = parseInt(req.params.photoId, 10);
  try {
     const record = await db.Photo.findByPk(photoId);
     console.log(record.image);
     return res.status(200).send(record.image);

  } catch(err) {
    return res.status(500).send(err.message);
  }
});
/*
fetch('/api/session', {
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
  },
  body: JSON.stringify({ credential: 'Demo-lition', password: 'password' })
}).then(res => res.json()).then(data => console.log(data));
*/

module.exports = router;