const express = require('express');
const router = express.Router();
const MapModel = require('../models/MapModel');
const mapController = require('../controllers/map-controller');
const constants = require('../constants/constants');


router.post('/create-map',async (req,res)=>{
    try {
        req.map = mapController.createMap(req.body.mapSize, req.body.mapSize);
        req.map = mapController.fillMap(req.map, constants.messages.BOMB , req.body.bombCount );
        req.map = mapController.adjacentCellsValues(req.map, constants.messages.BOMB);
        req.selectedCells = 1;
        res.json(req.map);
    } catch (error) {
        res.json({message : error})
    }
});

router.post('/selected-cell',async (req,res)=>{
    let { row, column, incCellsClicked, value } = req.props;
    let { clicked, flag } = req.map.state;
    if (!flag) mapController.setState({ clicked: true });
    if (!clicked) incCellsClicked();
    if (!endMineSweeperGame) {
      // Empty cell click --> recursion
      if (value === "" && target.id === `${row}_${column}`)
        mapController.recursionClick(target, row, column);
      //click bomb scenario --> end game
      if (value === "☀" && !flag) mapController.endGame(target);
    }
});

// track of how many cells are clicked
router.post('/selected-cells-count',async (req,res)=>{
    try {
        let { mapSize, bombCount, cellsClicked } = req.map.state;
        let safeCells = mapSize * mapSize - bombCount;
        mapController.setState({
            cellsClicked: cellsClicked + 1
        });
        if (cellsClicked >= safeCells) 
        res.json({message : constants.messages.WIN_MESSAGE });
    } catch (error) {
        res.json({message : error})
    }
});

module.exports = router;