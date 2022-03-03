const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const schema = new Schema({
    userid: { type: String },
    questionsid: { type: String },
    answer: { type: String },
    answerdate: { type: String },
    flag: { type: String },

});
const Answers = mongoose.model("answers", schema);
module.exports = Answers;