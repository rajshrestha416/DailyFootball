const mongooes = require('mongoose');
const { models } = require('mongoose');
const Schema = mongooes.Schema;

const newsSchema = new Schema({
    title: {
		type:String,
		required:true
	},
	files: {
		type:String,
		required:true
	},
	publishedAt:{
		type:String,
		default:Date.now()
	},
	description:{
		type:String,
		required:true
	},
	likes:{
		type: Number,
		default:0
	},
});

const News = mongooes.model("News", newsSchema);

module.exports = News;