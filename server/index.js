require('dotenv/config');
const express = require('express');
const app = express();
const petfinderService = require('./petfinder-service');
const pfService = new petfinderService();

app.get('/api/health-check', (req, res, next) => {
  return res.json({ message: 'select \'successfully connected\' as "message"' });
});

app.get('/api/dogs/:dogId', async (req, res, next) => {
  try {
    const animalResult = await pfService.getAnimal(req.params.dogId);
    return res.json(animalResult);
  } catch (error) {
    next(error);
  }
});

app.get('/api/dogBreeds', async (req, res, next) => {
  try {
    const dogBreeds = await pfService.getBreed();
    return res.json(dogBreeds);
  } catch (error) {
    next(error);
  }
});

app.get('/api/search', async (req, res, next) => {
  try {
    const breed = req.query.breed;
    const age = req.query.age;
    const size = req.query.size;
    const page = req.query.page || 1;
    const limit = 24;
    const animalSearchResult = await pfService.getAnimals(breed, age, size, page, limit);
    return res.json(animalSearchResult);
  } catch (error) {
    next(error);
  }
});

app.get('/errorTest', (req, res, next) => {
  try {
    throw new Error('I broke');
  } catch (error) {
    next(error);
  }
});

app.use((err, req, res, next) => {
  res.status(500).json({
    error: err.message,
    stack: err.stack
  });
});

app.listen(process.env.PORT, () => {
  console.log('Listening at http://localhost:', process.env.PORT);
});
