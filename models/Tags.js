const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const schema = new Schema({
    tags: {
        type: String
    }

});
const Tags = mongoose.model("tags", schema);
module.exports = Tags;