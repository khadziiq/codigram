const userRoute = require("express").Router();
const UserController = require("../controllers/UserController");
const { store } = require('../middlewares/multer')
const { authentication, authorization } = require("../middlewares/auth");

userRoute.get("/", UserController.allUser);
userRoute.get("/:id", UserController.getUserById);
userRoute.get("/self/:id", authentication, UserController.getSelfUser);
userRoute.post("/login", UserController.login);
userRoute.post("/register",store, UserController.register);
userRoute.put("/edit/:id", authentication, authorization, UserController.update);
userRoute.delete("/delete/:id", authentication, authorization, UserController.remove);

module.exports = userRoute;
