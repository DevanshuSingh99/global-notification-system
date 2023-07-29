const userConroller = {};
const userSchema = require("../schemas/userSchema");
const globalModel = require("../models/globalModel");
const jwt = require("jsonwebtoken");
const notificationSchema = require("../schemas/notificationSchema");

userConroller.login = async (req, res) => {
    try {
        const { username } = req.body;
        if (!username.trim()) {
            throw "Body parameter missing";
        }
        const user = await userSchema.findOne({ username });
        if (!user) {
            throw "User not found";
        }
        var token = jwt.sign({ _id: user["_id"], role: user["role"] }, "Secret");

        res.send(globalModel.successResponse({ token, role: user["role"] }));
    } catch (error) {
        res.send(globalModel.failureResponse(error));
    }
};

userConroller.register = async (req, res) => {
    try {
        const { username } = req.body;
        if (!username.trim()) {
            throw "Body parameter missing";
        }
        try {
            const user = await userSchema.create({ username });
        } catch (error) {
            if (error.code === 11000) {
                throw "Already Exists";
            }
        }
        res.send(globalModel.successResponse("User Created"));
    } catch (error) {
        res.send(globalModel.failureResponse(error));
    }
};

userConroller.getNotifications = async (req, res) => {
    try {
        var notifications = await notificationSchema.find({ userId: req.userDetails["_id"] }).sort({createdAt:-1});
        res.send(globalModel.successResponse(notifications));
    } catch (error) {
        res.send(globalModel.failureResponse(error));
    }
};
userConroller.notificationMarkSeen = async (req, res) => {
    try {
        var notifications = await notificationSchema.updateMany({ userId: req.userDetails["_id"] }, { seenFlag: true });
        res.status(200).send();
    } catch (error) {
        res.send(globalModel.failureResponse(error));
    }
};

module.exports = userConroller;
