const Router = require("express").Router;
const userRouter = Router();
const { userController } = require("../controllers");
// const { authMiddleware } = require("../middlewares");

//end points routes:

//POST
userRouter.post("/register", userController.register);

//GET
userRouter.get("/get-user/:id", userController.getById);
userRouter.get("/get-email/:email", userController.getByEmail);

module.exports = userRouter;
