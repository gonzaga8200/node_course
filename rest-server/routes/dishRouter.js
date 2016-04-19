var express = require('express');
var dishRouter = express.Router();

var mongoose = require('mongoose');
var Dishes = require ('../models/dishes');

/* GET home page. */
dishRouter.route('/')
    .get(function(req,res,next){

        // {} returning all the items to a collecion
        // Second parameter callback: 1st parameter error, second array of objects
        Dishes.find({},function(err,dish){
            if (err) throw err;
            res.json(dish); // Convert to json string
        });
    })

    .post(function(req, res, next){

        // req.body . The information about the dish which we want to insert
        Dishes.create(req.body, function(err, dish){
            if (err) throw err;

            console.log('Dish created!');
            var id = dish._id;
                res.writeHead(200,{'Content-Type':'text/plain'
            });
            res.end('Added the dish with id: ' + id);
        })
    })

    .delete(function(req, res, next){

        // Remove all dishes
        // resp. How many dishes have been deletes
        Dishes.remove({}, function(err, resp){
            if (err) throw err;
            res.json(resp);
        });
    });

dishRouter.route('/:dishId')
    .get(function(req,res,next){
        Dishes.findById(req.params.dishId, function(err, dish){
            if (err) throw err;

            res.json(dish);
        });
    })

    .put(function(req, res, next){
        Dishes.findByIdAndUpdate(req.params.dishId, {
            $set: req.body // contains update to the dish
        }, {
            new: true // the callback
        }, function(err, dish) {
            if (err) throw err;

            res.json(dish);
        })
    })

    .delete(function(req, res, next){
        Dishes.remove(req.paramsç.dishId, function(err, resp){
            if (err) throw err;

            res.json(resp);
        })
    });

dishRouter.route('/:dishId/comments')
    .get(function(req, res, next) {
        Dishes.findById(req.params.dishId, function (err, dish) {
            if (err) throw err;
            res.json(dish.comments);
        });
    })
    .post(function(req, res, next){
       Dishes.findById(req.params.dishId, function(err,dish){
           if (err) throw dish;

           dish.comments.push(req.body);
           dish.save(function(err, dish){
               if (err) throw err;
               console.log('updated Comments!')
           })
       })
    })
    .delete(function(req, res, next){
        Dishes.findById(req.params.dishId, function (err, dish) {
            if (err) throw err;
            for (var i = (dish.comments.length - 1); i >= 0; i--) {
                dish.comments.id(dish.comments[i]._id).remove();
            }
            dish.save(function (err, result) {
                if (err) throw err;
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                });
                res.end('Deleted all comments!');
            });
        });
    })
dishRouter.route('/:dishId/comments/:commentId')
    .get(function (req, res, next) {
        Dishes.findById(req.params.dishId, function (err, dish) {
            if (err) throw err;
            res.json(dish.comments.id(req.params.commentId));
        });
    })

    .put(function (req, res, next) {
        // We delete the existing commment and insert the updated
        // comment as a new comment
        Dishes.findById(req.params.dishId, function (err, dish) {
            if (err) throw err;
            dish.comments.id(req.params.commentId).remove();
            dish.comments.push(req.body);
            dish.save(function (err, dish) {
                if (err) throw err;
                console.log('Updated Comments!');
                res.json(dish);
            });
        });
    })

    .delete(function (req, res, next) {
        Dishes.findById(req.params.dishId, function (err, dish) {
            dish.comments.id(req.params.commentId).remove();
            dish.save(function (err, resp) {
                if (err) throw err;
                res.json(resp);
            });
        });
    });


module.exports = dishRouter;
