const User = require('../Models/user_model');
const League = require('../Models/league_model');
const News = require('../Models/news_model');
const Comment = require('../Models/comments_model');
const Team = require('../Models/team_model');
const mongoose = require('mongoose');

const url = "mongodb://localhost:27017/Daily_Football_Test";

beforeAll(async () => {
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true,
    });
    // clear database
    await mongoose.connection.db.dropDatabase();
});

afterAll(async () => {
    await mongoose.connection.close();
});

// init id for testing relation
var user_id;
var news_id;
var comment_id;
var league_id;
var team_id;

describe('User Schema Test', () => {
    it('user Registration', () => {
        const user = {
                        "firstname": "Raj",
                        "lastname": "Shrestha",
                        "gender": "male",
                        "country": "Nepal",
                        "email": "rajshrestha@gmail.com",
                        "username": "rajshrestha",
                        "password": "1234567890",
                        "club": "140",
                        "role": "User",
                        "profilePicture":"..........."
                    }
        return User.create(user)
            .then((data) => {
                user_id = data._id;
                expect(data.firstname).toEqual('Raj');
            });
    })

    it('Get User', async () => {
        var user = await User.findOne({ "_id": user_id }).exec();
        return expect(user.username).toEqual('rajshrestha');
    })

    it('Update User', async () => {
        var user = await User.findOneAndUpdate({ "_id": user_id }, {
            $set: { "firstname": "Raj Edited" }
        },
        {
            "new": true
        }).exec();
        return expect(user.firstname).toEqual('Raj Edited');
    })

    it('Delete User', async () => {
        var status = await User.deleteOne({ "_id": user_id }).exec();
        return expect(status.ok).toBe(1);
    })
})

describe('News Schema Test', () => {
    it('New Registration', () => {
        const news = {
                        "title": "Testing News",
                        "files": "fileName",
                        "description": "Testing the News",
                        }
        return News.create(news)
            .then((news) => {
                news_id = news._id;
                expect(news.title).toEqual('Testing News');
            });
    })

    it('Get News', async () => {
        var news = await News.findOne({ "_id": news_id }).exec();
        return expect(news.title).toEqual('Testing News');
    })

    it('Update News', async () => {
        var news = await News.findOneAndUpdate({ "_id": news_id }, {
            $set: { "title": "Edited Testing Title" }
        },
        {
            "new": true
        }).exec();
        return expect(news.title).toEqual("Edited Testing Title");
    })

    it('Delete News', async () => {
        var status = await News.deleteOne({ "_id": news_id }).exec();
        return expect(status.ok).toBe(1);
    })
})


describe('Comment Schema Test', () => {
    it('Comment Registration', () => {
        const comment = {
                        "news_id": news_id,
                        "comment": "fileName",
                        "commentBy": user_id,
                        }
        return Comment.create(comment)
            .then((comment) => {
                comment_id = comment._id;
                expect(comment.comment).toEqual('fileName');
            });
    })

    // it('Get News', async () => {
    //     var news = await News.findOne({ "_id": news_id }).exec();
    //     return expect(news.title).toEqual('Testing News');
    // })

    it('Update News', async () => {
        var comment = await Comment.findOneAndUpdate({ "_id": comment_id }, {
            $set: { "comment": "Edited Testing Title" }
        },
        {
            "new": true
        }).exec();
        return expect(comment.comment).toEqual("Edited Testing Title");
    })

    it('Delete News', async () => {
        var status = await Comment.deleteOne({ "_id": comment_id }).exec();
        return expect(status.ok).toBe(1);
    })
})


describe('League Schema Test', () => {
    it('League Registration', () => {
        const league = {
                        "league": "LeagueName",
                        "nationality": "Nepal",
                        "apiID": "320",
                        }
        return League.create(league)
            .then((league) => {
                league_id = league._id;
                expect(league.league).toEqual('LeagueName');
            });
    })


    it('Update League', async () => {
        var league = await League.findOneAndUpdate({ "_id": league_id }, {
            $set: { "league": "Edited Testing Title" }
        },
        {
            "new": true
        }).exec();
        return expect(league.league).toEqual("Edited Testing Title");
    })

    it('Delete News', async () => {
        var status = await League.deleteOne({ "_id": league_id }).exec();
        return expect(status.ok).toBe(1);
    })
})



describe('Team Schema Test', () => {
    it('Team Registration', () => {
        const team = {
                        "teamName": "teamName",
                        "league": league_id,
                        "apiID": "320",
                        }
        return Team.create(team)
            .then((team) => {
                team_id = team._id;
                expect(team.teamName).toEqual('teamName');
            });
    })


    it('Update Team', async () => {
        var team = await Team.findOneAndUpdate({ "_id": team_id }, {
            $set: { "teamName": "Edited Testing Title" }
        },
        {
            "new": true
        }).exec();
        return expect(team.teamName).toEqual("Edited Testing Title");
    })

    it('Delete News', async () => {
        var status = await Team.deleteOne({ "_id": team_id }).exec();
        return expect(status.ok).toBe(1);
    })
})
