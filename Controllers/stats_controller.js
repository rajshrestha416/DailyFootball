const fetch = require('node-fetch');
const moment = require('moment')
const apiKey = "22d61037e5c2d00518dd1766f19f80ec";

//....................Showing the standing of each league.........................//
//By default season will be 2020 and leagueId is user input.
exports.standings = async (req, res) => {
    const options = {
        "headers": {
            "Content-Type": "application/json",
            "x-rapidapi-host": "v3.football.api-sports.io",
            "x-rapidapi-key": apiKey
        }
    };
    const leagueId = req.params.leagueId;
    const season = req.params.season;
    await fetch(`https://v3.football.api-sports.io/standings?league=${leagueId}&season=${season}`, options)
        .then((response) => response.json())  /// changed response to JSON format
        .then((data) => {
            const response = data.response[0].league.standings[0];
            const standings = [];
            response.map((response) => {
                standings.push({
                    rank: response.rank,
                    teamLogo: response.team.logo,
                    teamName: response.team.name,
                    matchPlayed: response.all.played,
                    matchWon: response.all.win,
                    matchDraw: response.all.draw,
                    matchLoss: response.all.lose,
                    goalDifference: response.goalsDiff,
                    points: response.points
                });
            });
            res.json({success:true,data:standings});
        });
};

//....................Showing goal stats of players of a league.........................//
//By default season will be 2020 and leagueId will be user input
exports.goalStats = async (req, res) => {
    const options = {
        "headers": {
            "Content-Type": "application/json",
            "x-rapidapi-host": "v3.football.api-sports.io",
            "x-rapidapi-key": apiKey
        }
    };
    const leagueId = req.params.leagueId;
    const season = req.params.season;
    await fetch(` https://v3.football.api-sports.io/players/topscorers?league=${leagueId}&season=${season}`, options)
        .then((response) => response.json())  /// changed response to JSON format
        .then((data) => {
            const response = data.response;
            const goalStats = [];
            response.map((response) => {
                goalStats.push({
                    playerName : response.player.name,
		            playerPhoto	: response.player.photo,
		            teamName : response.statistics[0].team.name,
		            gamePlayed : response.statistics[0].games.appearences,
		            goals : response.statistics[0].goals.total
                });
            });
            res.json({success:true,goalStat:goalStats});
        });
};

