const postController = {};
const postSchema = require("../schemas/postSchema");
const globalModel = require("../models/globalModel");
const socketIo = require("../models/socketIoModel");
const userSchema = require("../schemas/userSchema");
const async = require("async");
const notificationSchema = require("../schemas/notificationSchema");
postController.createPost = async (req, res) => {
    try {
        var { title } = req.body;
        if (!title.trim()) throw "Title can not be empty";
        var notificationRes = await postSchema.create({ title });
        res.send(globalModel.successResponse("Post created"));
        var allUserIds = await userSchema.find({ role: "User" }).distinct("_id");
        var notificationArray = [];
        async.eachSeries(allUserIds, (id, eachCallback) => {
            notificationArray.push({ userId: id, notification: { title: "New post available!!", body: notificationRes["title"] } });
            eachCallback();
        });
        var bulkWriteRes = await notificationSchema.insertMany(notificationArray);
        socketIo.broadcastMessageToUsers("notification", { notification: { title: "New post available!!", body: notificationRes.title }, _id: notificationRes["_id"] });
        // socket event last mai
    } catch (error) {
        console.log(error);
        res.send(globalModel.failureResponse(error));
    }
};

module.exports = postController;
