const postRouter = require("express").Router();
const postController = require("../controllers/postController");
const { adminRoles } = require("../middlewares/adminMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

postRouter.use(authMiddleware);
postRouter.route("/createpost").post(adminRoles(["Admin"]), postController.createPost);

module.exports = postRouter;
