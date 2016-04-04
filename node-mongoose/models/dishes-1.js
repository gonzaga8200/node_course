/**
 * Created by gonzalomorenominguito on 3/4/16.
 */

// grab the things we need
    // Require mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var dishSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true // particular document is created
});

// the schema is useless so far
// we need to create a model using it
// Mongoose by default create a new collection with the plural. In that particular case, dishes
var Dishes = mongoose.model('Dish', dishSchema);


// make this available to our Node applications
// In order to use in node applications
module.exports = Dishes;