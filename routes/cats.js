const express = require("express");
const Cat = require("../models/cat"); // For imports Class Cat Static methods.

const router = new express.Router();


/** get all cats: [{id, name, age}, ...] */
router.get("/", async function (req, res, next) {
  try {
    const cats = await Cat.getAll()
    return res.json(cats)
  } catch (e) {
    return next(e)
  }
});

// GET cat by specific id.
router.get('/:id', async (req, res, next) => {
  try {
    const cat = await Cat.getById(req.params.id);
    return res.json(cat);
  } catch (e) {
    return next(e)
  }
})

// POST new cat to database.
router.post('/', async (req, res, next) => {
  try {
    const { name, age } = req.body;
    const cat = await Cat.create(name, age)
    return res.json(cat);
  } catch (e) {
    return next(e)
  }
})

// DELETE cat by specific id.
router.delete('/:id', async (req, res, next) => {
  try {
    await Cat.delete(req.params.id)
    return res.json({ msg: "Deleted" })
  } catch (e) {
    return next(e)
  }
})

// PUT update existing cat newName and newAge.
router.put('/:id', async (req, res, next) => {
  try {
    const { name, age } = req.body;
    const cat = await Cat.update(req.params.id, name, age)
    return res.json(cat)
  } catch (e) {
    return next(e)
  }
})

// Updates just the age of the cat with the id.
router.patch('/:id', async (req, res, next) => {
  try {
    const cat = await Cat.makeOlder(req.params.id);
    return res.json(cat)
  } catch (e) {
    return next(e)
  }
})

module.exports = router;

