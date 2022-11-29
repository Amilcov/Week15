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



router.post('/edit/:borrowBookId(\\d+)', 
borrowBookValidators, handlerValidationErrors, asyncHandler(async (req, res) => {
   
   const borrowBookId = parseInt(req.params.borrowBookId, 10);

    if (req.errors) {
      return res.status(404).json({"errors": req.errors});
    } else {
      const {userId, bookId, readerId, startDate, returnDate, endDate} = req.body;
      const borrowbook = {userId, bookId, readerId, startDate, returnDate, endDate} ;
     
      const borrowBookToUpdate= await db.Book.findByPk(borrowBookId);
      await borrowBookToUpdate.update(borrowbook);
      
      return res.status(200).json({book});
  }

}));


router.get('/:borrowBookId(\\d+)', asyncHandler(async (req, res) => {
  const borrowBookId = parseInt(req.params.borrowBookId, 10);

  const query = `select books.title, books.subtitle, 
                 authors."firstName" as author_firstName, authors."lastName" as author_lastName, 
                 userReader."firstName" as reader_firstName, userReader."lastName" as reader_lastName,
                 borrowbooks.*
                 from "BorrowBooks" as borrowbooks 
                 join "Books" as books on books.id = borrowbooks."bookId" 
                 left outer join "BookAuthors" as bookauthors on bookauthors."bookId" = borrowbooks."bookId" 
                 left outer join "Authors" as authors on authors.id = bookauthors."authorId" 
                 join "Users" as userWorker on userWorker.id = borrowbooks."userId" 
                 join "Users" as userReader on userReader.id = borrowbooks."readerId" 
                 where borrowbooks.id = ${borrowBookId}`;
  const [borrowBooks, metadata] = await sequelize.query(query);  

  return res.status(200).json({borrowBooks});
}));


router.delete('/delete/:borrowbookId(\\d+)', 
asyncHandler(async (req, res, next) => {

const borrowbookId = parseInt(req.params.borrowbookId, 10);
const borrowbook = await db.BorrowBook.findByPk(borrowbookId);


  if (borrowbook) {
      await borrowbook.destroy();
      return res.status(204).end();
  } else {
       const err = new Error (`There isn\'t a borrowbook with id ${id} in the database`);
       err.title = 'Book not found';
       err.status = 404;
       return next(err);
  }

}));


module.exports = router;