var express = require("express");
var bodyparser = require("body-parser");

const { json } = require("body-parser");
const Questions = require("../models/Questions");
var jsonparser = bodyparser.json();
const router = express.Router();

router.post("/save", async(req, res) => {

    let body = req.body;
    let questions = new Questions();

    if (body.data.id != "") {
        questions = await Questions.findById(body.data.id);
    }

    console.log(body);
    questions.userid = body.data.userid;
    questions.question = body.data.question;
    questions.asked = body.data.asked;
    questions.status = body.data.status;
    questions.tags = body.data.tags;
    questions.answeredcount = body.data.answeredcount;
    questions.viewscount = body.data.viewscount;

    questions.save().then(result => {
        res.end(JSON.stringify(result));

    }, err => {
        res.end(JSON.stringify(err));
    });

})

router.post("/list", async(req, res) => {
    let questions = await Questions.find();
    res.json({ data: questions });
})

router.post("/get", async(req, res) => {
    let body = req.body;
    let questions = await Questions.findById(body.data.id);
    res.json({ data: questions });
})

router.post("/delete", async(req, res) => {
    let body = req.body;
    await Questions.findByIdAndDelete(body.data.id);
    let data = {
        "data": {
            "status": "success"
        }

    }
    res.end(JSON.stringify(data));
})
module.exports = router;