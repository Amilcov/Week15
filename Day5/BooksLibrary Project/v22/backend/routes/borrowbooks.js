const express = require('express');
const db = require('../db/models');
const { check } = require('express-validator');


const { asyncHandler, handlerValidationErrors } = require('./utils');
const { requireAuth } = require('../auth');
const book = require('../db/models/book');
const { sequelize } = require('../db/models');


const router = express.Router();
router.use(requireAuth);

const borrowBookValidators = [

  check('userId')
    .exists({checkFalsy: true})
    .withMessage('Please provide a value for userId'),

  check('bookId')
    .exists({checkFalsy: true})
    .withMessage('Please provide a value for bookId'),

  check('readerId')
    .exists({checkFalsy: true})
    .withMessage('Please provide a value for readerId'),

  check('startDate')
    .exists({checkFalsy: true})
    .withMessage('Please provide a value for readerId')
    .isDate(),

  check('endDate')
    .exists({checkFalsy: true})
    .withMessage('Please provide a value for readerId')
    .isDate()
]

router.get('/', asyncHandler(async (req, res) => {
   
  const borrowBooks = await db.BorrowBook.findAll({
     include: [ 'book', 'user', 'reader'],
    order: [["startDate", "DESC"], ["endDate", "DESC"],]
  }) ;

  res.json({borrowBooks});
}));




router.post('/', borrowBookValidators, handlerValidationErrors, asyncHandler(async (req, res) => {

  if (req.errors) {
     return res.status(404).json({"errors": req.errors});
  } else {
     const {userId, bookId, readerId, startDate, endDate} = req.body;
     const borrowbook = await db.BorrowBook.create({userId, bookId, readerId, startDate, endDate});

     return res.status(201).json({borrowbook});
  }


}));

/*

router.post('/edit/:bookId(\\d+)', 
bookValidators, handlerValidationErrors, asyncHandler(async (req, res) => {
 
   const bookId = parseInt(req.params.bookId, 10);

    if (req.errors) {
      return res.status(404).json({"errors": req.errors});
    } else {
      const {title, subtitle, maxBorrowDays} = req.body;
      const book = {title, subtitle, maxBorrowDays} ;
     
      const bookToUpdate= await db.Book.findByPk(bookId);
      await bookToUpdate.update(book);
      
      return res.status(200).json({book});
  }

}));


router.get('/:bookId(\\d+)', asyncHandler(async (req, res) => {
  
  const bookId = parseInt(req.params.bookId, 10);
  const book = await db.Book.findByPk(bookId, {
     include: [ db.Author ]
  });
  return res.status(200).json({book});
}));



router.delete('/delete/:bookId(\\d+)', 
asyncHandler(async (req, res, next) => {

const bookId = parseInt(req.params.bookId, 10);
const book = await db.Book.findByPk(bookId);


  if (book) {
      await book.destroy();
      return res.status(204).end();
  } else {
       const err = new Error (`There isn\'t a book with id ${id} in the database`);
       err.title = 'Book not found';
       err.status = 404;
       return next(err);
  }

}));
*/

module.exports = router;