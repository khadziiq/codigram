const pictureRoute = require("express").Router();
const PictureController = require("../controllers/PictureController");
const { authentication, authorization } = require("../middlewares/auth");
const { store } = require('../middlewares/multer')

pictureRoute.get("/", PictureController.allPicture);
pictureRoute.get("/all", authentication, PictureController.selfPicture);
pictureRoute.get("/:id", PictureController.getPictureById);
pictureRoute.post("/add", store , authentication, PictureController.add);
pictureRoute.put("/edit/:id", authentication, authorization, PictureController.update);
pictureRoute.delete("/delete/:id", authentication, authorization, PictureController.remove);

module.exports = pictureRoute;
