const mongoose = require('mongoose');

const vegsSchema = new mongoose.Schema({
    name:  { type: String, required: true },
    color:  { type: String, required: true },
    readyToEat: Boolean
});

const Veg= mongoose.model('Veg', vegsSchema);

module.exports = Veg;

