const express = require('express');
const app = express();
const port = 3000;
const jsxEngine = require('jsx-view-engine')
require('dotenv').config();
const mongoose = require('mongoose');
const {fruits} = require('./models/fruits.js'); //NOTE: it must start with ./ if it's just a file, not an NPM package
const {vegs} = require('./models/vegetables.js')
const Fruit = require('./models/fruit');
const Veg = require('./models/vegetable')

// App Config
app.set('view engine', 'jsx');
app.engine('jsx',jsxEngine())

//Middleware
app.use((req, res, next) => {
console.log(req.method, req.url)
next();
})

//parse and add the incoming data to a req.body object
app.use(express.urlencoded({extended:false})); //middleware


// ============   Routes
app.get('/', (req, res) => {
    res.send('working')
});

/**
 * @path /fruits/
 * @Method GET
 * @description returns a list of fruits & veggies
 */

app.get('/fruits/', async (req, res) => {
    //query all fruits from db
    const fruitsFromDB = await Fruit.find({})
    console.log(fruitsFromDB)
    res.render('fruits/Index', {
        fruits: fruitsFromDB
    })
});
app.get('/vegs/', async (req, res) => {
    // res.send(vegs);
    const vegsFromDB = await Veg.find({})
    console.log(vegsFromDB)
    res.render('vegetables/Index', {
        vegs: vegsFromDB
    })
});

/**
@path /fruits/new
@method GET
@action create
@description show a form to create a  new fruit
*/

app.get('/fruits/new', (req, res) => {
    res.render('fruits/New')
})

app.get('/vegs/new', (req, res) => {
    res.render('vegetables/New')
})

/**
@path /fruits
@method POST
@action create
@description create a new fruit and redirect the user
*/
app.post('/fruits', async(req, res)=> {
    if(req.body.readyToEat === 'on'){ //if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true; //do some data correction
    } else { //if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false; //do some data correction
    }
    // fruits.push(req.body);
    // console.log(fruits);
    // res.redirect('/fruits');

    // create a new fruit in db
    try {
        const createdFruit = await Fruit.create(req.body);
        console.log(createdFruit);
        res.redirect('/fruits');

    } catch (error) {
        console.log(error);
        // res.json({error});
    }
})

app.post('/vegs', async (req, res)=> {
    if(req.body.readyToEat === 'on'){ //if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true; //do some data correction
    } else { //if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false; //do some data correction
    }
    // create a new veg in db
    try {
        const createdVeg = await Veg.create(req.body);
        console.log(createdVeg);
        res.redirect('/vegs');

    } catch (error) {
        console.log(error);
        // res.json({error});
    }
})

/**
 * @path /fruits/:indexOfFruitArray
 * @Method GET
 * @description returns a single fruit
 */


//add show route
app.get('/fruits/:id', async (req, res) => {
    const {id} = req.params
    // res.send(fruits[indexOfFruitsArray]);

    const fruit = await Fruit.findById(id);
    console.log('Found FRUIT ->', fruit);
    res.render('fruits/Show',{
        fruit: fruit
    })
});

app.get('/vegs/:id', async(req, res) => {
    const {id} = req.params
    
    const veg = await Veg.findById(id);
    console.log('Found veg ->', veg);
    res.render('vegetables/Show',{
        veg: veg
    })
});

//connecting to database
mongoose.connect(process.env.MONGO_URI)
mongoose.connection.once('open', ()=> {
    console.log('connected to mongo');
})

app.listen(port, () => {
    console.log('listening');
});