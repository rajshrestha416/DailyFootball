const Team = require('../Models/team_model');
const { check, validationResult } = require('express-validator');


//....................Adding Team........................//
exports.addTeam = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    };
    
    const team = new Team({
        teamName: req.body.teamName,
        league: req.body.league,
        apiID:req.body.apiID
    });
    await team.save()
        .then((data) => {
            res.status(200).json({
                success: true,
                data: data,
            });
        })
        .catch(err => {
            res.status(400).json({
                success: false,
                error: err
            });
        });
};

exports.showTeam = async (req, res) => {
    const leagueId = req.params.id
    await Team.find({league:leagueId}).populate("league")
        .then(data=>{
            res.status(200).json({
                success: true,
                data: data,
            });
        })
        .catch(err => {
            res.status(400).json({
                success: false,
                error: err
            });
        });
};

exports.showOneTeam = async (req, res) => {
    const id = req.params.id
    await Team.find({_id:id})
        .then(data=>{
            res.status(200).json({
                success: true,
                data: data,
            });
        })
        .catch(err => {
            res.status(400).json({
                success: false,
                error: err
            });
        });
};

exports.showAll = async (req, res) => {
    await Team.find().populate("league")
        .then(data=>{
            res.status(200).json({
                success: true,
                data: data,
            });
        })
        .catch(err => {
            res.status(400).json({
                success: false,
                error: err
            });
        });
};

//....................Updating Team........................//
exports.updateTeam = async(req, res) => {
    const id =  req.params.id;
    const team = {
        teamName: req.body.teamName,
        apiID:req.body.apiID
    };
    await Team.findByIdAndUpdate({ _id: id}, team )
        .then(() => {
            res.status(201).json({
                success: true,
                message: "Update success",
            });
        })
        .catch(err => {
            res.status(400).json({
                success: false,
                error: err
            });
        });
};


// //....................Deleting Team........................//
exports.deleteTeam = async (req, res) => {
    const teamId = req.params.id;
    await Team.findOneAndDelete({ _id: teamId })
    .then(() => {
        res.status(201).json({
            success: true
        });
    })
    .catch(err => {
        res.status(400).json({
            success: false
        });
    });
};


