var express = require("express");

var bodyparser = require("body-parser");
const { json } = require("body-parser");
const Authentication = require("../models/Authentication");

var jsonparser = bodyparser.json();
const router = express.Router();

router.post("/save", async(req, res) => {
    let body = req.body;
    let authentication = new Authentication();
    if (body.data.id != "") {
        authentication = await Authentication.findById(body.data.id);
    }
    authentication.email = body.data.email;
    authentication.mobileno = body.data.mobileno;
    authentication.username = body.data.username;
    authentication.password = body.data.password;
    authentication.usertype = body.data.usertype;
    authentication.joiningdate = body.data.joiningdate;
    if (body.data.photocode != "") {
        let imagename = (Math.random() + 1).toString(36).substring(2);
        let imagecode = body.data.photocode.replace(/^data:image\/[a-z]+;base64,/, "");
        imagename = "images/" + imagename + ".png";
        fs.writeFile("public/" + imagename, imagecode, 'base64', function(res) {
                console.log("Success");
            },
            function(err) {
                console.log("Error image saving-" + err);
            });
        employees.imagepath = imagename;
    }
    authentication.save().then(result => {
        res.end(JSON.stringify(result));
    }, err => {
        res.end(JSON.stringify(err));
    });
});

router.post("/login/", async(req, res) => {
    let body = req.body;
    let user = await Authentication.find().and([{ username: body.data.username }, { password: body.data.password }]);
    let data = {
        "data": {
            "status": "failed"
        }
    }
    if (user.length != 0) {
        let authkey = (Math.random() + 1).toString(36).substring(2);

        user = await Authentication.findById(user[0]._id);
        user.authkey = authkey;
        user.save();
        data = {
            "data": {
                "status": "success",
                "email": user.email,
                "mobileno": user.mobileno,
                "joiningdate": user.joiningdate,
            }
        }
    }
    res.end(JSON.stringify(data));
});



module.exports = router;