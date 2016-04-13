/**
 * Created by gonzalomorenominguito on 5/4/16.
 */
var mongoose = require('mongoose'),
    assert = require('assert');

var Dishes = require('./models/dishes-1-assigment');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");

    // create a new dish
    Dishes.create({
        name: 'Uthapizza',
        image:'asdasd/asdasd/asdasd.js',
        category:'alta cocina',
        label:'el dionni',
        price: '23.34',
        description: 'Test',
        comments: [
            {
                rating: 3,
                comment: 'This is insane',
                author: 'Matt Daemon'
            }
        ]
    }, function (err, dish) {
        if (err) throw err;
        console.log('Dish created!');
        console.log(dish);

        var id = dish._id;

        // get all the dishes
        setTimeout(function () {
            Dishes.findByIdAndUpdate(id, {
                    $set: {
                        description: 'Updated Test'
                    }
                }, {
                    new: true
                })
                .exec(function (err, dish) {
                    if (err) throw err;
                    console.log('Updated Dish!');
                    console.log(dish);

                    dish.comments.push({
                        rating: 5,
                        comment: 'I\'m getting a sinking feeling!',
                        author: 'Leonardo di Carpaccio'
                    });

                    dish.save(function (err, dish) {
                        console.log('Updated Comments!');
                        console.log(dish);

                        db.collection('dishes').drop(function () {
                            db.close();
                        });
                    });
                });
        }, 3000);
    });
});