const express = require('express')
const {fetchPumpStations} = require('../controllers/cykelDataController')
const router = express.Router();

router.get('/test', fetchPumpStations)

module.exports = router;