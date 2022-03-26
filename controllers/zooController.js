const mongoose = require("mongoose");
// const ZooSchema = require('../models/zooModel');
const Schema = mongoose.Schema;

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

const addNewZoo = (req, res) => {
    let newZoo = new Zoo(req.body);

    newZoo.save((err, zoo) => {
        if (err) {
            res.send(err);
        }
        res.json(zoo);
    });
}

const getZoos = (req, res) => {
    Zoo.find({}, (err, zoo) => {
        if (err) {
            res.send(err);
        }
        res.json(zoo);
    });
}

const getZooWithID = (req, res) => {
    Zoo.findById(req.params.zooID, (err, zoo) => {
        if (err) {
            res.send(err);
        }
        res.json(zoo);
    });
}

const updateZoo = (req, res) => {
    Zoo.findOneAndUpdate({ _id: req.params.zooID }, req.body, { new: true, useFindAndModify: false }, (err, zoo) => {
        if (err) {
            res.send(err);
        }
        res.json(zoo);
    });
}

const deleteZoo = (req, res) => {
    Zoo.remove({ _id: req.params.zooID }, (err, zoo) => {
        if (err) {
            res.send(err);
        }
        res.json({message: 'successfully deleted zoo'});
    });
}
