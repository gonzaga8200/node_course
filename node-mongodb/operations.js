/**
 * Created by gonzalomorenominguito on 3/4/16.
 */
    // Operations with collections
var assert = require('assert');

exports.insertDocument = function(db, document, collection, callback) {
    // Get the documents collection
    var coll = db.collection(collection);
    // Insert some documents
    // It's applied in any database
    coll.insert(document, function(err, result) {
        // If there is an error , the app interrupts its execution
        assert.equal(err, null);
        console.log("Inserted " + result.result.n + " documents into the document collection "
            + collection);
        callback(result);
    });
};

exports.findDocuments = function(db, collection, callback) {
    // Get the documents collection
    var coll = db.collection(collection);

    // Find some documents
    // Changes the return the values to an array. Otherwise would be js object
    coll.find({}).toArray(function(err, docs) {
        assert.equal(err, null);
        callback(docs);
    });
};

exports.removeDocument = function(db, document, collection, callback) {

    // Get the documents collection
    var coll = db.collection(collection);

    // Delete the document
    coll.deleteOne(document, function(err, result) {
        assert.equal(err, null);
        console.log("Removed the document " + document);
        callback(result);
    });
};

exports.updateDocument = function(db, document, update, collection, callback) {

    // Get the documents collection
    var coll = db.collection(collection);

    // Update document
    // $set: which particular field we want to update
    coll.updateOne(document
        , { $set: update }, null, function(err, result) {

            assert.equal(err, null);
            console.log("Updated the document with " + update);
            callback(result);
        });
};
