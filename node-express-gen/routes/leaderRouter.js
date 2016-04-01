var express = require('express');
var leaderRouter = express.Router();

/* GET home page. */
leaderRouter.route('/')
    .all(function(req,res,next) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      next();
    })

    .get(function(req,res,next){
      res.end('Will send all the Leadership to you!');
    })

    .post(function(req, res, next){
      res.end('Will add the leader: ' + req.body.name + ' with details: ' + req.body.description);
    })

    .delete(function(req, res, next){
      res.end('Deleting all Leaderships');
    });

leaderRouter.route('/:leaderId')
    .all(function(req,res,next) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      next();
    })
    .get(function(req,res,next){
      res.end('Will send details of the Leaderships: ' + req.params.dishId +' to you!');
    })

    .put(function(req, res, next){
      res.write('Updating the leadership: ' + req.params.dishId + '\n');
      res.end('Will update the leadership: ' + req.body.name +
          ' with details: ' + req.body.description);
    })

    .delete(function(req, res, next){
      res.end('Deleting leadership: ' + req.params.dishId);
    });

module.exports = leaderRouter;
