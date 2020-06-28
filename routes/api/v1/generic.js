const express = require('express');
const router = express.Router();
const getMongoCollection = require('../../../db/mongo');

router.get('/generic', (req, res) => {
    if (!req.query.collection) {
        res.send({code: 400, message: 'Collection name not given'})
    } else if (!req.query.query) {
        res.send({code: 400, message: 'Query not given'})
    } else {
        getMongoCollection(req.query.collection, (collection) => {
            collection.find(JSON.parse(req.query.query)).toArray((err, result) => {
                if (err) {
                    res.send({code: 500, message: err});
                } else {
                    res.send(result);
                }
            });
        });
    }
});

router.post('/generic', (req, res) => {
    if (!req.query.collection) {
        res.send({code: 400, message: 'Collection name not given'})
    } else {
        getMongoCollection(req.query.collection, (collection) => {
            collection.insertOne(req.body, (err, result) => {
                if (err) {
                    res.send({code: 500, message: err});
                } else {
                    res.send(result.ops);
                }
            });
        });
    }
});

router.post('/generic/many', (req, res) => {
    if (!req.query.collection) {
        res.send({code: 400, message: 'Collection name not given'})
    } else {
        getMongoCollection(req.query.collection, (collection) => {
            collection.insertMany(req.body, (err, result) => {
                if (err) {
                    res.send({code: 500, message: err});
                } else {
                    res.send(result.ops);
                }
            });
        });
    }
});

module.exports = router;