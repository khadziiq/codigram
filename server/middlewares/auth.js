const { picture } = require("../models");
const { tokenVerifier } = require("../helpers/jwt");

const authentication = (req, res, next) => {
  console.log("Authentication");
  const { access_token } = req.headers;

  if (access_token) {
    //   console.log(access_token);
    try {
      const verify = tokenVerifier(access_token);
      req.userData = verify;
      next();
    } catch (error) {
      res.status(401).json({
        message: "User Not Authenticated",
      });
    }
  } else {
    res.status(404).json({
      message: "Token not found",
    });
  }
};

const authorization = (req, res, next) => {
  console.log("Authorization Middleware");
  const id = +req.params.id;
  const userId = +req.userData.id;

  picture
    .findByPk(id)
    .then((picture) => {
      if (!picture) {
        res.status(404).json({
          message: "Item not found",
        });
      } else if (picture.userId !== userId) {
        res.status(401).json({
          message: "User Is not authorized",
        });
      } else {
        next();
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

module.exports = {
  authentication,
  authorization,
};
