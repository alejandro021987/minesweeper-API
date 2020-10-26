const mongoose = require('mongoose');

const stateSchema = mongoose.Schema({
  mapSize: Number,
  bombCount: Number,
  cells: [],
  selectedCells: Number
});

const MapSchema = mongoose.Schema({
    mapSize: Number,
    bombCount: Number,
    cells: [],
    selectedCells: Number,
    //state: { type: stateSchema },
    date_modified: { type: Date, default: Date.now },
})

module.exports = mongoose.model('map', MapSchema);
