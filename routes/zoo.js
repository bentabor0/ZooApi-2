const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

///////////////////////////////// Create mongoose schema and Zoo const /////////////////////////////////

const ZooSchema = new Schema({
    zooName: {
        type: String,
        required: 'Enter a zoo name'
    },
    guestCount: {
        type: Number
    },
    animalCount: {
        type: Number
    },
    animals: {
        type: Array
    },
    guests: {
        type: Array
    },
    createdDate: {
        type: Date,
        default: Date.now()
    }
});

const Zoo = mongoose.model('Zoo', ZooSchema);

///////////////////////////////// Create controls /////////////////////////////////

// Add new zoo
const addNewZoo = (req, res) => {
    let newZoo = new Zoo(req.body);

    newZoo.save((err, zoo) => {
        if (err) {
            res.send(err);
        }
        res.json(zoo);
    });
}

// Get all zoos
const getZoos = (req, res) => {
    Zoo.find({}, (err, zoo) => {
        if (err) {
            res.send(err);
        }
        res.json(zoo);
    });
}

// Get zoo with specific id
const getZooWithID = (req, res) => {
    Zoo.findById(req.params.zooID, (err, zoo) => {
        if (err) {
            res.send(err);
        }
        res.json(zoo);
    });
}

// Update zoo
const updateZoo = (req, res) => {
    Zoo.findOneAndUpdate({
        _id: req.params.zooID
    }, req.body, {
        new: true,
        useFindAndModify: false
    }, (err, zoo) => {
        if (err) {
            res.send(err);
        }
        res.json(zoo);
    });
}

// Delete zoo
const deleteZoo = (req, res) => {
    Zoo.remove({
        _id: req.params.zooID
    }, (err, zoo) => {
        if (err) {
            res.send(err);
        }
        res.json({
            message: 'successfully deleted zoo'
        });
    });
}

///////////////////////////////// Create routes /////////////////////////////////

// Middleware ran in each route
let middleware = (req) => {
    console.log(`Request from: ${req.originalUrl}`)
    console.log(`Request type: ${req.method}`)
};

// Zoo help page
router.get('/', (req, res, next) => {
    res.send(`<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Zoo express api</title>
        </head>
        <body>
          <h1>Zoo Api</h1>
          <h2>List of avaliable requests, the type of request followed by the route</h2>
          <p>GET --- /zoos: gets all zoos</p>
          <p>GET --- /zooID/"zooID": replece "zooID" with zoo id value, returns a zoo</p>
          <p>POST --- /zoos: with zoo json body will add a zoo to the database</p>
          <p>PUT --- /zooID/"zooID": replece "zooID" with zoo id value, updates a zoo</p>
          <p>DELETE --- /zooID/"zooID": replece "zooID" with zoo id value, deletes a zoo</p>
        </body>
        </html>`)
});

// Get all zoos, /zoos
router.get('/zoos', (req, res, next) => {
    middleware(req);
    next();
}, getZoos);

// Post a new zoo, /zoos
router.post('/zoos', (req, res, next) => {
    middleware(req);
    next();
}, addNewZoo);

// Get a specific zoo, /zooID/:zooID
router.get('/zooID/:zooID', (req, res, next) => {
    middleware(req);
    next();
}, getZooWithID);

// Update a zoo, /zooID/:zooID
router.put('/zooID/:zooID', (req, res, next) => {
    middleware(req);
    next();
}, updateZoo);

// Delete a zoo, /zooID/:zooID
router.delete('/zooID/:zooID', (req, res, next) => {
    middleware(req)
    next();
}, deleteZoo);


module.exports = router;