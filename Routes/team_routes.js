const express = require('express');
const router = express.Router();
const auth = require("../Middlewares/auth");
const team_controller = require('../Controllers/team_controller');
const league_controller = require('../Controllers/league_controller');
const { check, validationResult } = require('express-validator');


//..........League................//
router.post('/league/insert',
[
    check('league', "League is required").not().isEmpty(),
    check('nationality', "Nationality is required!!").not().isEmpty(),
    check('apiID', "API_Id is required!!").not().isEmpty()
    ],
    auth.verifyUser, auth.verifyAdmin, league_controller.addLeague);
router.get('/league/showall', league_controller.showLeague);
router.get('/league/showOne/:id', league_controller.showOne);
router.put('/league/update/:id', auth.verifyUser,auth.verifyAdmin,league_controller.updateLeague)
router.delete('/league/delete/:id',auth.verifyUser,auth.verifyAdmin, league_controller.deleteLeague)



//..........Team................//
router.post('/team/insert',
[
    check('teamName', "teamname is required").not().isEmpty(),
    check('league', "league is required!!").not().isEmpty(),
    check('apiID', "API_Id is required!!").not().isEmpty()    
], team_controller.addTeam);
router.get('/team/showall/:id', team_controller.showTeam);
router.get('/team/showOneTeam/:id', team_controller.showOneTeam);
router.get('/team/showall/', team_controller.showAll);
router.put('/team/update/:id', auth.verifyUser,auth.verifyAdmin,team_controller.updateTeam)
router.delete('/team/delete/:id',auth.verifyUser,auth.verifyAdmin, team_controller.deleteTeam)



module.exports = router;
