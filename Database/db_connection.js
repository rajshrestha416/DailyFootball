const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/daily_football", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});
