const express = require('express');
const app = express();
const port = 3000;
const {fruits} = require('./models/fruits.js'); //NOTE: it must start with ./ if it's just a file, not an NPM package
const {vegs} = require('./models/fruits.js')
// const fruits = [
//     {
//         name:'apple',
//         color: 'red',
//         readyToEat: true
//     },
//     {
//         name:'pear',
//         color: 'green',
//         readyToEat: false
//     },
//     {
//         name:'banana',
//         color: 'yellow',
//         readyToEat: true
//     }
// ];

/**
 * @path /fruits
 * @Method GET
 * @description returns a list of fruits
 */

app.get('/fruits/', (req, res) => {
    res.send(fruits);
});
app.get('/vegs/', (req, res) => {
    res.send(vegs);
});

/**
 * @path /fruits/:indexOfFruitArray
 * @Method GET
 * @description returns a single fruit
 */


//add show route
app.get('/fruits/:indexOfFruitsArray', (req, res) => {
    const {indexOfFruitsArray} = req.params
    res.send(fruits[indexOfFruitsArray]);
});

app.listen(port, () => {
    console.log('listening');
});