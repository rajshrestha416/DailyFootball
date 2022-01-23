const express = require('express')
const router = express.Router()
const fixture_controller = require('../Controllers/fixture_controller')


router.get('/fixture/show/:leagueId/:season',fixture_controller.showFixture)
router.get('/fixture/showLive',fixture_controller.showLiveFixture)
router.get('/fixture/showTeamFixture/:teamId/:season',fixture_controller.showTeamFixture)

module.exports = router