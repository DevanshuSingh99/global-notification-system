var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var notificationSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
        },
        notification: {
            title: { type: String },
            body: { type: String },
        },
        seenFlag: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Notification", notificationSchema);
