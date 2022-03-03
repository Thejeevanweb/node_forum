const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const schema = new Schema({
    email: { type: String },
    mobileno: { type: String },
    username: { type: String },
    password: { type: String },
    usertype: {
        type: Array
    },
    joiningdate: { type: String },
    imagepath: { type: String },

});
const Authentication = mongoose.model("users", schema);
module.exports = Authentication;