const { error } = require("console")
var express = require("express");
const mongoose = require("mongoose");
var body = require("body-parser");
var cookie = require("cookie-parser");
var multer = require("multer");


var app = express();

app.use(body.json({ limit: '50mb' }));
app.use(body.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static('public'));

mongoose.connect("mongodb://localhost:27017/iGAP_Forum");
const db = mongoose.connection;
db.on("error", error => console.log(error));
db.on("open", () => console.log("connection successfull"));

app.use(express.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    if (req.method == "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "POST,GET,PUT,PATCH,DELETE");
        return res.status(200).json({});
    }
    next();
});




app.get("/", function(req, res) {
    res.send("Hello Welcome to iGap");

});
app.use("/authentication", require("./routes/authentication")),
    app.use("/questions", require("./routes/questions")),
    app.use("/answers", require("./routes/answers")),

    app.listen(8081, function() {
        console.log("start");
    });