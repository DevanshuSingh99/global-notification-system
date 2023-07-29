const userRouter = require('express').Router()
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

userRouter.route("/login").post(userController.login);
userRouter.route("/register").post(userController.register);

userRouter.use(authMiddleware)
userRouter.route("/notification").get(userController.getNotifications);
userRouter.route("/notification/markseen").get(userController.notificationMarkSeen);

module.exports = userRouter;