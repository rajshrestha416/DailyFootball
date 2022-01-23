const mongooes = require('mongoose');
const Schema = mongooes.Schema

const commentSchema = new Schema({
	news_id:{
        type: Schema.Types.ObjectId,
        required: true,
        ref:'News'
    },
    comment_id:{
        type: Schema.Types.ObjectId,
        ref:'Comments'
    },
    comment:{
        type: String,
        required:true
    },
    likes:{
        type:Number,
        default: 0
    },
    commentBy:{
        type:Schema.Types.ObjectId,
        ref: 'User',
        required:true
    }
}, {
    timestamps: true,
});

const Comments = mongooes.model("Comments",commentSchema)

module.exports = Comments