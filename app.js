const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const path  = require("path");

const database = require("./Database/db_connection");
const user_routes = require("./Routes/user_routes");
const news_routes = require("./Routes/news_routes");
const fixture_routes = require("./Routes/fixture_routes");
const team_routes = require("./Routes/team_routes");
const stats_routes = require("./Routes/stats_routes");
const app = express();
const router = express.Router();
const port = process.env.PORT || 9999;

app.use(cors());
// Set static folder
app.use(express.static(path.join(__dirname, "pictures")));
// Set static folder
app.use(express.static(path.join(__dirname, "")));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(user_routes);
app.use(team_routes);
app.use(fixture_routes);
app.use(news_routes);
app.use(stats_routes);

app.listen(port, () => {
    console.log("Server running at port " + port);
});