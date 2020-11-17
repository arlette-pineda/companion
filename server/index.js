require('dotenv/config');
const express = require('express');
const app = express();
const petfinderService = require('./petfinder-service');
const pfService = new petfinderService();


app.get('/api/health-check', (req, res, next) => {
  return res.json({message:`select 'successfully connected' as "message"`});
});


app.get('/dogs/:dogId', async (req, res, next) => {
  try {
    let animalResult = await pfService.getAnimal(req.params.dogId);
    return res.json(animalResult);
  } catch (error) {
    next(error);
  }
});

app.get('/dogBreeds', async (req, res, next) => {
  try {
    let dogBreeds = await pfService.getBreed();
    return res.json(dogBreeds);
  } catch (error) {
    next(error);
  }
});

app.get('/search', async (req, res, next) => {
  try {
    let breed = req.query.breed;
    let age = req.query.age;
    let size = req.query.size;
    let page = req.query.page;
    let limit = 20;
    let animalSearchResult = await pfService.getAnimals(breed, age, size, page, limit);
    return res.json(animalSearchResult);
  } catch (error) {
    next(error);
  }
});

app.get('/errorTest', (req, res) => {
  throw new Error('I broke');
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    error: 'an unexpected error occurred'
  });
})

app.listen(process.env.PORT, () => {
  console.log('Listening at http://localhost:', process.env.PORT);
})
