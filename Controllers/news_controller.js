const News = require('../Models/news_model');
const Comments = require('../Models/comments_model');
const { check, validationResult } = require('express-validator');
const moment = require('moment');
const { collection } = require('../Models/news_model');


//...........................function for adding news..............................//
exports.addNews = async (req, res) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(422).json({ errors: errors.array() });
    // };

    const news = new News({
        title: req.body.title,
        files: req.file.path,
        description: req.body.description
    });

    console.log(news);
    await news.save()
        .then((data) => {
            res.status(201).json({
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


//...........................function for updating news..............................//
exports.update = async (req, res) => {
    console.log(req.body);
    var news = {
        title: req.body.title,
        description: req.body.description
    };

    if(req.file){
        news.files = req.file.path
    }
    var news_id = req.params.id;
    
    console.log({ news_id, news });
    await News.findByIdAndUpdate({ _id: news_id }, news)
        .then((data) => {
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


//...........................function for deleting news..............................//
exports.deleteNews = async (req, res) => {
    const newsId = req.params.id;
    await News.findOneAndDelete({ _id: newsId })
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





////Comments 
///Function for adding comments
exports.addComment = async (req, res) => {
    const comment = new Comments({
        news_id: req.body.news_id,
        comment: req.body.comment,
        // likes: 0,
        commentBy: req.body.commentBy,
        comment_id: req.body.comment_id
    });
    console.log(comment);
    await comment.save()
        .then((data) => {
            console.log(data);
            res.status(201).json({
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

//...........................Function for Updating Comments..............................//
exports.updateComment = async (req, res) => {
    const id= req.params.comment_id;
    const comment = {
        comment: req.body.comment,
        // likes: 0,
    };
    await News.findByIdAndUpdate({ _id: id, comment })
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

///Function for Deleting comments
exports.deleteComment = async (req, res) => {
    const commentId = req.params.id;
    await Comments.findOneAndDelete({ _id: commentId })
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


//...........................Showing news and comments length..............................//
exports.showNews = async (req, res) => {
    try {
        var newsArray = [];
        var news = await News.find({}).sort({ publishedAt: -1 });
        var i = 0;
        for (n of news) {
            const comments = await Comments.find({ news_id: n._id }).populate("commentBy");
            let date = n.publishedAt;
            let newsDate = parseInt(date);
            n.publishedAt = moment(newsDate).fromNow();
            let news = JSON.parse(JSON.stringify(n));
            news.comment = comments.length;
            newsArray.push(
                news
            );
            i++;
        }
        return res.status(200).json({
            success: true,
            data: newsArray,
        });
    }
    catch (err) {
        res.status(404).json({
            success: false,
            error: err
        });
    };
};


//...........................Showing only news and comments..............................//
//with reply
exports.showOneNewsR = async (req, res) => {
    try {
        var commentArray = [];
        var id = req.params.news_id;

        const news = await News.find({ _id: id });
        const comments = await Comments.find({ news_id: id }).populate("commentBy ").sort({ commentAt: -1 });

        //time difference
        let date = news[0].publishedAt;
        let newsDate = parseInt(date);
        news[0].publishedAt = moment(newsDate).fromNow();
        //
        var i = 0;
        for (c of comments) {
            const cc = await Comments.find({ comment_id: c._id }).populate("commentBy ");
            let cDate = c.createdAt;
            let commentDate = parseInt(cDate);
            c.commentAt = moment(commentDate).fromNow();

            cc.map(cc => {
                let reply = cc.createdAt;
                let replyDate = parseInt(reply);
                cc.commentAt = moment(replyDate).fromNow();
            });

            let newsComments = JSON.parse(JSON.stringify(c));
            newsComments.reply = cc;
            commentArray.push(
                newsComments
            );

            if (c.comment_id != undefined) {
                delete commentArray[i];
                console.log(commentArray.pop(i));
            }
            i++;
        }

        return res.status(200).json({
            success: true,
            descData: { news: news[0], comment: commentArray }
        });
    }
    catch (err) {
        res.status(404).json({
            success: false,
            error: err
        });
    };
};

//without reply
exports.showOneNews = async (req, res) => {
    try {
        var commentArray = [];
        var id = req.params.news_id;

        const news = await News.find({ _id: id });
        const comments = await Comments.find({ news_id: id }).populate("commentBy ").sort({ commentAt: -1 });

        //time Difference
        let date = news[0].publishedAt;
        let newsDate = parseInt(date);
        news[0].publishedAt = moment(newsDate).fromNow();
        //
        var i = 0;
        for (c of comments) {
            let cDate = c.createdAt;
            let commentDate = cDate;
            c.commentAt = moment(commentDate).fromNow();

            commentArray.push(
                c
            );
        }

        return res.status(200).json({
            success: true,
            descData: { news: news[0], comment: commentArray }
        });
    }
    catch (err) {
        res.status(404).json({
            success: false,
            error: err
        });
    };
};


///Retrieving a news
exports.showOne = async (req, res) => {
    console.log("....");
    try {
        var id = req.params.news_id;

        const news = await News.find({ _id: id });

        return res.status(200).json({
            success: true,
            news: news
        });
    }
    catch (err) {
        res.status(404).json({
            success: false,
            error: err
        });
    };
};
