const fetch = require('node-fetch');
const Team = require('../Models/team_model');
const moment = require('moment');
const apiKey = "22d61037e5c2d00518dd1766f19f80ec";

//....................Show the Fixtures by leagueId ans Season.........................//
//By default season will be 2020 and leagueId will be of the team user selected.
exports.showFixture = async (req, res) => {
    const options = {
        "headers": {
            "Content-Type": "application/json",
            "x-rapidapi-host": "v3.football.api-sports.io",
            "x-rapidapi-key": apiKey
        }
    };
    const leagueId = req.params.leagueId;
    const season = req.params.season;
    await fetch(`https://v3.football.api-sports.io/fixtures?league=${leagueId}&season=${season}`, options)
        .then((response) => response.json())  /// changed response to JSON format
        .then((data) => {
            const response = data.response;
            const arra = [];
            response.sort((obj1, obj2) => {
                return obj1.fixture.timestamp - obj2.fixture.timestamp;
            });
            response.map((response) => {
                let time = parseInt(response.fixture.timestamp);
                // let day = moment.unix(time).format("dddd")
                let day = moment.unix(time).format("YYYY/MM/DD###dddd###hh:mm");
                arra.push({
                    timestamp: day,
                    status: response.fixture.status.short,
                    round: response.league.round,
                    homeTeam: response.teams.home.name,
                    homeLogo: response.teams.home.logo,
                    homeGoal: response.goals.home,
                    awayTeam: response.teams.away.name,
                    awayLogo: response.teams.away.logo,
                    awayGoal: response.goals.away
                });
            });

            res.json({ success: true, data: arra });
        });
};

//....................Show the Fixtures by TeamId and Season.........................//
//By default season will be 2020 and TeamId will be user input
exports.showTeamFixture = async (req, res) => {
    const options = {
        "headers": {
            "Content-Type": "application/json",
            "x-rapidapi-host": "v3.football.api-sports.io",
            "x-rapidapi-key": apiKey
        }
    };
    const teamId = req.params.teamId;
    const season = req.params.season;
    try {
        await fetch(`https://v3.football.api-sports.io/fixtures?team=${teamId}&season=${season}`, options)
            .then((response) => response.json())  /// changed response to JSON format
            .then((data) => {
                const response = data.response;
                const arra = [];
                response.sort((obj1, obj2) => {
                    return obj1.fixture.timestamp - obj2.fixture.timestamp;
                });
                response.map((response) => {
                    let time = parseInt(response.fixture.timestamp);
                    // let day = moment.unix(time).format("dddd")
                    let day = moment.unix(time).format("YYYY/MM/DD###dddd###hh:mm");
                    arra.push({
                        timestamp: day,
                        status: response.fixture.status.short,
                        round: response.league.round,
                        homeTeam: response.teams.home.name,
                        homeLogo: response.teams.home.logo,
                        homeGoal: response.goals.home,
                        awayTeam: response.teams.away.name,
                        awayLogo: response.teams.away.logo,
                        awayGoal: response.goals.away
                    });
                });

                res.json({ success: true, data: arra });
            });
    }
    catch (err) {
        res.json({ success: false, error: err });
    }

};


//....................Show the Live Fixtures.........................//
exports.showLiveFixture = async (req, res) => {
    const options = {
        "headers": {
            "Content-Type": "application/json",
            "x-rapidapi-host": "v3.football.api-sports.io",
            "x-rapidapi-key": apiKey
        }
    };
    const leagueId = req.params.leagueId;
    const season = req.params.season;
    try {
        await fetch("https://v3.football.api-sports.io/fixtures?live=all", options)
            .then((response) => response.json())  /// changed response to JSON format
            .then((data) => {
                const response = data.response;
                const arra = [];
                response.sort((obj1, obj2) => {
                    return obj1.fixture.timestamp - obj2.fixture.timestamp;
                });
                response.map((response) => {
                    arra.push({
                        league: response.league.name,
                        elapsed: response.fixture.status.elapsed,
                        status: response.fixture.status.short,
                        round: response.league.round,
                        homeTeam: response.teams.home.name,
                        homeLogo: response.teams.home.logo,
                        homeGoal: response.goals.home,
                        awayTeam: response.teams.away.name,
                        awayLogo: response.teams.away.logo,
                        awayGoal: response.goals.away
                    });
                });

                res.json({ success: true, data: arra });
            });
    }
    catch (err) {
        res.json({ success: false, error: err });
    }

};
