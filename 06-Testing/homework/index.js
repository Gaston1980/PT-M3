const express = require('express');
const { TestWatcher } = require('jest');
const { sumArray, pluck } = require('./functions.js')
const app = express();

app.use(express.json()); // for parsing application/json

app.get('/', (req, res) => {
  res.send({
    message: 'hola',
  });
});

app.get("/test", (req,res) => {
  res.send({
    message: 'test',
  })
})

app.post("/sum", (req,res) => {
  const {a,b} = req.body
  res.send({
    result: a + b,
  })
})

app.post('/product', (req, res) => {
  res.send({
    result: req.body.a * req.body.b,
  });
});

app.post("/sumArray", (req,res) => {
const {array,num} = req.body;
res.send({
  result: sumArray(array,num)
})

})

module.exports = app; // Exportamos app para que supertest session la pueda ejecutar
