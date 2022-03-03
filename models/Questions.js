const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const schema = new Schema({
    userid: { type: String },
    question: { type: String },
    asked: { type: String },
    status: { type: String },
    tags: { type: String },
    answeredcount: { type: String },
    viewscount: { type: String },

});
const Questions = mongoose.model("questions", schema);
module.exports = Questions;