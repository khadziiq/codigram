const router = require("express").Router();

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Home Page",
  });
});

//mengambil data dari routes user, picture dan comment
const UserRoute = require("./user");
const PictureRoute = require("./picture");
const CommentRoute = require("./comment");

router.use("/users", UserRoute);
router.use("/pictures", PictureRoute);
router.use("/comments", CommentRoute);

module.exports = router;
