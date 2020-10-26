const express = require('express');
const router = express.Router();
const mapController = require('../controllers/map-controller');
const userController = require('../controllers/user-controller');
const constants = require('../constants/constants');
const jwt_decode = require('jwt-decode'); 

router.get('/', async (req,res)=>{
    res.json('**** Welcome to Minesweeper-api ****');
}); 

router.post('/create-map',async (req,res)=>{
    try {
        let { mapSize, bombCount } = req.body;
        let cells = mapController.createMap(mapSize, mapSize);
        cells = mapController.fillMap(cells, constants.messages.BOMB , req.body.bombCount );
        cells = mapController.adjacentCellsValues(cells, constants.messages.BOMB);
        req.map =  mapController.saveMap(mapSize, bombCount, cells);

        var userProfile = jwt_decode(req.headers.authorization);
        userController.updateUser(userProfile.userId, {map_id: req.map._id});
        res.json(req.map);
    } catch (error) {
        res.json({message : error})
    }
});

router.post('/selected-cell',async (req,res)=>{
    let { row, column, selectedCells, value } = req.body.props;
    let { clicked, flag } = req.map.state;
    if (!flag) mapController.setState({ clicked: true });
    if (!clicked) selectedCells();
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

router.post('/selected-cells-count',async (req,res)=>{
    try {
        let { mapSize, bombCount, selectedCells } = req.map.state;
        let safeCells = mapSize * mapSize - bombCount;
        mapController.setState({
            selectedCells: selectedCells + 1
        });
        if (selectedCells >= safeCells) 
        res.json({message : constants.messages.WIN_MESSAGE });
    } catch (error) {
        res.json({message : error})
    }
});

router.post('/update-map',async (req,res)=>{
    try {
        let { mapSize, bombCount, selectedCells, cells, _id } = req.body;
        req.map = await mapController.saveMap(mapSize, bombCount, cells, selectedCells, _id);
        res.status(201).json(req.map);

    } catch (error) {
        res.json({message : error})
    }
});

router.get('/get-map/:id',async (req,res)=>{
    try {
        let { id } = req.params;
        req.map = await mapController.getMap(id);
        res.status(201).json(req.map);

    } catch (error) {
        res.json({message : error})
    }
});



module.exports = router;