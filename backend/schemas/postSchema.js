var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var postSchema = new Schema(
    {
        title: { type: String },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Post", postSchema);
