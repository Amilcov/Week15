const express = require('express');
const db = require('../db/models');
const { check } = require('express-validator');


const { asyncHandler, handlerValidationErrors } = require('./utils');
const { requireAuth } = require('../auth');


const router = express.Router();
router.use(requireAuth);

router.get('/', asyncHandler(async (req, res) => {
  const authors = await db.Author.findAll({
    order: [["firstName", "ASC"], ["lastName", "ASC"],]
  }) ;
  res.json({authors});
}));




const authorValidators = [
  check('CNP')
    .exists({checkFalsy: true})
    .withMessage('Please provide a value for CNP')
    .isLength({ min: 1})
    .withMessage('CNP must have at least 1 character'),

  check('firstName')
    .exists({checkFalsy: true})
    .withMessage('Please provide a value for first name')
    .isLength({ min: 1})
    .withMessage('First name must have at least 1 character'),


  check('lastName')
    .exists({checkFalsy: true})
    .withMessage('Please provide a value for last name')
    .isLength({ min: 1})
    .withMessage('Last name must have at least 1 character'),
]


router.post('/', authorValidators, handlerValidationErrors, asyncHandler(async (req, res) => {

  if (req.errors) {
     return res.status(404).json({"errors": req.errors});
  } else {
     const {firstName, lastName, CNP, about} = req.body;
     const author = await db.Author.create({firstName, lastName, CNP, about});

     return res.status(201).json({author});
  }


}));

/*
router.post('/edit/:stockId(\\d+)', 
stockValidators, handlerValidationErrors, asyncHandler(async (req, res) => {
 
   const stockId = parseInt(req.params.stockId, 10);

    if (req.errors) {
      return res.status(404).json({"errors": req.errors});
    } else {
      const {symbol, name, yearListed, marketShares, marketValue, info} = req.body;
      const stock = {symbol, name, yearListed, marketShares, marketValue, info};
     
      const stockToUpdate= await db.Stock.findByPk(stockId);
      await stockToUpdate.update(stock);
      
      return res.status(200).json({stock});
  }

}));

router.get('/:stockId(\\d+)', asyncHandler(async (req, res) => {
  const stockId = parseInt(req.params.stockId, 10);
  const stock = await db.Stock.findByPk(stockId);

  return res.status(200).json({stock});
}));


router.delete('/delete/:stockId(\\d+)', 
asyncHandler(async (req, res, next) => {

const stockId = parseInt(req.params.stockId, 10);
const stock = await db.Stock.findByPk(stockId);


  if (stock) {
      await stock.destroy();
      return res.status(204).end();
  } else {
       const err = new Error (`There isn\'t a stock with id ${id} in the database`);
       err.title = 'Stock not found';
       err.status = 404;
       return next(err);
  }

}));

*/
module.exports = router;