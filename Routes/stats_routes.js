const express = require('express')
const router = express.Router()
const stats_controller = require('../Controllers/stats_controller')


router.get('/standings/:leagueId/:season',stats_controller.standings)
router.get('/goalStats/:leagueId/:season',stats_controller.goalStats)


module.exports = router