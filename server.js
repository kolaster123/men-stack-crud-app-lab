const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();



const PORT = process.env.PORT || 3000;


mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`)
  });
const Car = require('./models/car.js');
app.get('/test', (req, res) => {
  res.send('Server is running!');
});


app.get('/cars/new', (req, res) => {
  res.render('new.ejs');
});

app.post('/cars', async (req, res) => {
    console.log(req.body);
    console.log(Car);
  const car = await Car.create(req.body);
  res.redirect('/cars');
});


app.get('/cars', async (req, res) => {
  const cars = await Car.find();
  console.log(cars)
  res.render('index.ejs', { cars });
});


app.get('/cars/:id', async (req, res) => {
  const car = await Car.findById(req.params.id);
  res.render('show.ejs', { car });
});


app.get('/cars/:id/edit', async (req, res) => {
  const car = await Car.findById(req.params.id);
  res.render('edit.ejs', { car });
});
/*
app.post('/cars/:id/edit', async (req, res) => {
  await Car.findByIdAndUpdate(req.params.id, req.body);
  res.redirect(`/cars/${req.params.id}`);
});


app.post('/cars/:id/delete', async (req, res) => {
  await Car.findByIdAndDelete(req.params.id);
  res.redirect('/cars');
});
*/
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
