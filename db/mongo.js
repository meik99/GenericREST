const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb://localhost:27017/generic";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = (collectionName, next) => {
    client.connect(err => {
        if (err) {
            console.log(err);
        }
        const db = client.db("generic");

        db.createCollection(collectionName, {}, () => {
            const collection = db.collection(collectionName);
            // perform actions on the collection object
            next(collection);
        })

    });
};


