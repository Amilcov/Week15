const express = require('express');
const db = require('../db/models');
const { check } = require('express-validator');


const { asyncHandler, handlerValidationErrors } = require('./utils');
const { requireAuth } = require('../auth');


const router = express.Router();
router.use(requireAuth);

const bookauthorsValidators = [
  check('bookId')
    .exists({checkFalsy: true})
    .withMessage('Please provide a value for book Id'),

  check('authorId')
    .exists({checkFalsy: true})
    .withMessage('Please provide a value for author Id'),

]

/*
router.get('/', asyncHandler(async (req, res) => {
  const books = await db.Book.findAll({
    include: [ db.Author ],
    order: [["title", "ASC"], ["subtitle", "ASC"],]
  }) ;
  res.json({books});
}));
*/

router.post('/', bookauthorsValidators, handlerValidationErrors, asyncHandler(async (req, res) => {

  if (req.errors) {
     return res.status(404).json({"errors": req.errors});
  } else {
     const {bookId, authorId} = req.body;
     const bookauthor = await db.BookAuthor.create({bookId, authorId});

     return res.status(201).json({bookauthor});
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

*/


router.delete('/:bookId(\\d+)/delete/author/:authorId(\\d+)', 
asyncHandler(async (req, res, next) => {

const bookId = parseInt(req.params.bookId, 10);
const authorId = parseInt(req.params.authorId, 10);


const bookAuthor = await db.BookAuthor.findOne({
  where: {
    authorId: authorId, 
    bookId: bookId
  }
});

  if (bookAuthor) {
      await bookAuthor.destroy();
      return res.status(204).end();
  } else {
       const err = new Error (`There isn\'t an author with id ${authorId} for the book with id ${bookId}in the database`);
       err.title = 'Book not found';
       err.status = 404;
       return next(err);
  }

}));


router.get('/author/:authorId(\\d+)', 
asyncHandler(async (req, res, next) => {

const authorId = parseInt(req.params.authorId, 10);

const bookAuthor = await db.BookAuthor.findOne({
  where: {
    authorId: authorId
  }
});

  if (bookAuthor) {
   return res.status(200).json({authorWithBooks: true});
  } else {
      return res.status(200).json({authorWithBooks: false});
  }

}));


module.exports = router;