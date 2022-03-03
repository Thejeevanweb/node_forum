var express = require("express");
var bodyparser = require("body-parser");

const { json } = require("body-parser");
const Answers = require("../models/Answers");
var jsonparser = bodyparser.json();
const router = express.Router();

router.post("/save", async(req, res) => {

    let body = req.body;
    let answers = new Answers();

    if (body.data.id != "") {
        answers = await Answers.findById(body.data.id);
    }

    console.log(body);
    answers.userid = body.data.userid;
    answers.questionid = body.data.questionid;
    answers.answer = body.data.answer;
    answers.answerdate = body.data.answerdate;
    answers.flag = body.data.flag;

    answers.save().then(result => {
        res.end(JSON.stringify(result));

    }, err => {
        res.end(JSON.stringify(err));
    });

})

router.post("/list", async(req, res) => {
    let answers = await Answers.find();
    res.json({ data: answers });
})

router.post("/get", async(req, res) => {
    let body = req.body;
    let answers = await Answers.findById(body.data.id);
    res.json({ data: answers });
})

router.post("/delete", async(req, res) => {
    let body = req.body;
    await Answers.findByIdAndDelete(body.data.id);
    let data = {
        "data": {
            "status": "success"
        }

    }
    res.end(JSON.stringify(data));
})
router.post("/updateflag", async(req, res) => {

    let body = req.body;
    let answers = new Answers();


    answers = await Answers.findById(body.data.id);


    console.log(body);

    answers.flag = body.data.flag;

    answers.save().then(result => {
        res.end(JSON.stringify(result));

    }, err => {
        res.end(JSON.stringify(err));
    });

})
module.exports = router;