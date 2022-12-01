const express = require('express');
const db = require('../db/models');
const { check } = require('express-validator');


const { asyncHandler, handlerValidationErrors } = require('./utils');
const { requireAuth } = require('../auth');


const router = express.Router();
router.use(requireAuth);

const bookValidators = [
  check('title')
    .exists({checkFalsy: true})
    .withMessage('Please provide a value for title')
    .isLength({ min: 1})
    .withMessage('Title must have at least 1 character'),

  check('maxBorrowDays')
    .exists({checkFalsy: true})
    .withMessage('Please provide a value for max borrow days')
    .isInt()
    .withMessage('Please provide an number for max borrow days'),
]

router.get('/', asyncHandler(async (req, res) => {
  const books = await db.Book.findAll({
    include: [ db.Author ],
    order: [["title", "ASC"], ["subtitle", "ASC"],]
  }) ;
  res.json({books});
}));


router.post('/', bookValidators, handlerValidationErrors, asyncHandler(async (req, res) => {

  if (req.errors) {
     return res.status(404).json({"errors": req.errors});
  } else {
     const {title, subtitle, maxBorrowDays} = req.body;
     const book = await db.Book.create({title, subtitle, maxBorrowDays});

     return res.status(201).json({author});
  }


}));


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


module.exports = router;