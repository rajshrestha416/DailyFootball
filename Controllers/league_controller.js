const League = require('../Models/league_model');
const { check, validationResult } = require('express-validator');

//....................Adding League........................//
exports.addLeague = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    };


    const league = new League({
        league: req.body.league,
        nationality: req.body.nationality,
        apiID: req.body.apiID
    });
    await league.save()
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


exports.showLeague = async (req, res) => {
    await League.find({})
        .then((data) => {
            res.status(200).json({
                success: true,
                data: data
            });
        })
        .catch((err) => {
            res.status(400).json({
                success: false,
                error: err
            });
        });
};;


exports.showOne = async (req, res) => {
    const id = req.params.id
    await League.find({_id:id})
        .then((data) => {
            res.status(200).json({
                success: true,
                data: data
            });
        })
        .catch((err) => {
            res.status(400).json({
                success: false,
                error: err
            });
        });
};;


//....................Updating League........................//
exports.updateLeague = async(req, res) => {
    const id =  req.params.id;
    console.log(id)
    const league = {
        league: req.body.league,
        nationality: req.body.nationality,
        apiID: req.body.apiID
    };
    await League.findByIdAndUpdate({ _id: id}, league )
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


// //....................Deleting League........................//
exports.deleteLeague = async (req, res) => {
    const leagueId = req.params.id;
    await League.findOneAndDelete({ _id: leagueId })
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

