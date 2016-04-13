/**
 * Created by gonzalomorenominguito on 3/4/16.
 */
var mongoose = require('mongoose'),
    assert = require('assert');

var Leaders = require('./models/leaders-1-assigment');

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
    var newLeader = Leaders({
        name: 'Peter Pan',
        image: '/asdad/asdasd/asdasd.jpg',
        designation: 'jefe',
        abbre: 'CEO',
        description: 'El mejor jefe'
    });

    // save the user
    // Takes a callback function
    newLeader.save(function (err) {
        if (err) throw err;
        console.log('Leader created!');

        // get all the users
        Leaders.find({}, function (err, leaders) {
            if (err) throw err;

            // object of all the users
            console.log(leaders);
            db.collection('leaders').drop(function () {
                db.close();
            });
        });
    });
});
