/**
 * Created by gonzalomorenominguito on 1/4/16.
 */

var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';
// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
    assert.equal(err,null); // Error connection Database
    console.log("Connected correctly to server");
    var collection = db.collection("dishes"); // Select the connection
    collection.insertOne({name: "Uthapizza", description: "test"}, function(err,result){  // Insert document
        assert.equal(err,null);
        console.log("After Insert:");
        console.log(result.ops); // All Documents inserted
        collection.find({}).toArray(function(err,docs){ // Retrieve all documents in the colection
            assert.equal(err,null);
            console.log("Found:");
            console.log(docs);
            db.dropCollection("dishes", function(err, result){ // Restore database. Drop collection
                assert.equal(err,null);
                db.close();
            });
        });
    });
});
