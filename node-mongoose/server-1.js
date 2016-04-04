/**
 * Created by gonzalomorenominguito on 3/4/16.
 */
var mongoose = require('mongoose'),
    assert = require('assert');

var Dishes = require('./models/dishes-1');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;

// react to the events.
db.on('error', console.error.bind(console, 'connection error:'));

// trigger only once
db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");

    // create a new user
    // Create the document
    var newDish = Dishes({
        name: 'Uthapizza',
        description: 'Test'
    });

    // save the user
    // Takes a callback function
    newDish.save(function (err) {
        if (err) throw err;
        console.log('Dish created!');

        // get all the users
        Dishes.find({}, function (err, dishes) {
            if (err) throw err;

            // object of all the users
            console.log(dishes);
            db.collection('dishes').drop(function () {
                db.close();
            });
        });
    });
});
