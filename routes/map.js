const express = require('express');
const router = express.Router();
const MapModel = require('../models/MapModel');
const mapController = require('../controllers/map-controller');
const constants = require('../constants/constants');


router.post('/create-map',async (req,res)=>{
    try {
        req.map = mapController.createMap(req.body.mapSize, req.body.mapSize);
        req.map = mapController.fillMap(req.map, constants.BOMB , req.body.bombCount );
        req.map = mapController.adjacentCellsValues(req.map, constants.BOMB);
        res.json(req.map);
    } catch (error) {
        res.json({message : error})
    }
});

module.exports = router;