/**
 * Created by gonzalomorenominguito on 3/4/16.
 */
var mongoose = require('mongoose'),
    assert = require('assert');

var Promotions = require('./models/promotions-1-assigment');

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
    var newPromotion = Promotions({
        name: 'Uthapizza',
        image: '/asdad/asdasd/asdasd.jpg',
        label: 'la loles',
        price: '24.34',
        description: 'Test Promotion'
    });

    // save the user
    // Takes a callback function
    newPromotion.save(function (err) {
        if (err) throw err;
        console.log('Promotion created!');

        // get all the users
        Promotions.find({}, function (err, promotions) {
            if (err) throw err;

            // object of all the users
            console.log(promotions);
            db.collection('promotions').drop(function () {
                db.close();
            });
        });
    });
});
