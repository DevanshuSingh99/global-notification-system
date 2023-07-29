var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema(
    {
        username: { type: String, unique: [true, "Username already exists."] },
        role: { type: String, enum: ["Admin", "User"], default: "User" },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);
