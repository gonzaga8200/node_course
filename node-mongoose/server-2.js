/**
 * Created by gonzalomorenominguito on 5/4/16.
 */
var mongoose = require('mongoose'),
    assert = require('assert');

var Dishes = require('./models/dishes-1');
// Connection URL
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");
    // create a new dish
    Dishes.create({
        name: 'Uthapizza',
        description: 'Test'
    }, function (err, dish) {
        if (err) throw err;
        console.log('Dish created!');
        console.log(dish);

        var id = dish._id;

        // get all the dishes
        // The create and update are different. This is the aim of this setTimeout
        setTimeout(function () {
            // The first part create the query
            Dishes.findByIdAndUpdate(id, {
                    $set: {
                        description: 'Updated Test'
                    }
                }, {
                    new: true // it returns the updated dish
                })
                .exec(function (err, dish) {
                    // Here we execute the query
                    if (err) throw err;
                    console.log('Updated Dish!');
                    console.log(dish);

                    db.collection('dishes').drop(function () {
                        db.close();
                    });
                });
        }, 3000);
    });
});

