const Router = require("express").Router;
const userRouter = Router();
const { userController } = require("../controllers");
const { authMiddleware } = require("../middlewares");

//end points routes:

//GET
userRouter.get("/get-user/:id", authMiddleware, userController.getById);

module.exports = userRouter;
