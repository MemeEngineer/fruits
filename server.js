const express = require('express');
const app = express();
const port = 3000;
const jsxEngine = require('jsx-view-engine')
const {fruits} = require('./models/fruits.js'); //NOTE: it must start with ./ if it's just a file, not an NPM package
const {vegs} = require('./models/vegetables.js')

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

app.get('/fruits/', (req, res) => {
    // res.send(fruits);
    res.render('fruits/Index', {
        fruits: fruits
    })
});
app.get('/vegs/', (req, res) => {
    // res.send(vegs);
    res.render('vegetables/Index', {
        vegs: vegs
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
@path /fruits/new
@method POST
@action create
@description create a new fruit and redirect the user
*/
app.post('/fruits', (req, res)=> {
    if(req.body.readyToEat === 'on'){ //if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true; //do some data correction
    } else { //if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false; //do some data correction
    }
    fruits.push(req.body);
    console.log(fruits);
    res.redirect('/fruits');
})

app.post('/vegs', (req, res)=> {
    if(req.body.readyToEat === 'on'){ //if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true; //do some data correction
    } else { //if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false; //do some data correction
    }
    vegs.push(req.body);
    console.log(vegs);
    res.redirect('/vegs');
})

/**
 * @path /fruits/:indexOfFruitArray
 * @Method GET
 * @description returns a single fruit
 */


//add show route
app.get('/fruits/:indexOfFruitsArray', (req, res) => {
    const {indexOfFruitsArray} = req.params
    // res.send(fruits[indexOfFruitsArray]);
    res.render('fruits/Show',{
        fruit: fruits[indexOfFruitsArray]
    })
});

app.get('/vegs/:indexOfVegsArray', (req, res) => {
    const {indexOfVegsArray} = req.params
    
    res.render('vegetables/Show',{
        veg: vegs[indexOfVegsArray]
    })
});

app.listen(port, () => {
    console.log('listening');
});