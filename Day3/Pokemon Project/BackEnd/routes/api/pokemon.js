const express = require('express');
const asyncHandler = require('express-async-handler');
const { check, validationResult } = require('express-validator');
const { types } = require('../../db/models/pokemonType');

const PokemonRepository = require('../../db/pokemon-repository');
const ItemsRepository = require('../../db/items-repository');

const pokemonValidations = require('../../validations/pokemon');
const itemValidations = require('../../validations/items');

const router = express.Router();

router.get('/', asyncHandler(async function(_req, res) {
    console.log('_______1 Pokemon URL');
  const pokemon = await PokemonRepository.list();
  return res.json(pokemon);
}));

router.post(
  '/',
  pokemonValidations.validateCreate,
  asyncHandler(async function (req, res) {
    //const id = await PokemonRepository.create(req.body);
    //return res.redirect(`${req.baseUrl}/${id}`);
    const pokemon = await PokemonRepository.create(req.body);
    console.log(' DB pokemon', pokemon);
    return res.json(pokemon);
  })
);

router.put(
  '/:id',
  pokemonValidations.validateUpdate,
  asyncHandler(async function (req, res) {
        console.log('_______3 Pokemon URL');
    const id = await PokemonRepository.update(req.body);
    const pokemon = await PokemonRepository.one(id);
    return res.json(pokemon);
  })
);

router.get('/types', asyncHandler(async function (_req, res) {
      console.log('_______4 Pokemon URL');
  return res.json(types);
}));

router.get('/random', asyncHandler(async function(_req, res){
      console.log('_______5 Pokemon URL');
  const pokemon = await PokemonRepository.random();
  return res.json(pokemon);
}));

router.get('/battle', asyncHandler(async function(req, res){
      console.log('_______6 Pokemon URL');
  const pokemon = await PokemonRepository.battle(
    req.query.allyId,
    req.query.opponentId
  );
  return res.json(pokemon);
}));

router.get('/:id', asyncHandler(async function(req, res) {
  const pokemon = await PokemonRepository.one(req.params.id);
  return res.json(pokemon);
}));

router.get('/:id/items', asyncHandler(async function(req, res) {
      console.log('_______8 Pokemon URL');
  const items = await ItemsRepository.itemsByPokemonId(req.params.id);
  return res.json(items);
}));

router.post(
  '/:id/items',
  itemValidations.validateCreate,
  asyncHandler(async function(req, res) {
        console.log('_______9 Pokemon URL');
    const item = await ItemsRepository.addItem(req.body, req.params.id);
    return res.json(item);
  })
);

module.exports = router;
