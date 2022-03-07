const { user } = require("../models");
const { decryptPwd } = require("../helpers/bcrypt");
const { tokenGenerator } = require("../helpers/jwt");

class UserController {
  static async allUser(req, res) {
    try {
      let users = await user.findAll({
        order: [["id", "ASC"]],
      });
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async getUserById(req, res) {
    try {
      const id = +req.params.id;
      let result = await user.findByPk(id);
      result
        ? res.status(200).json(result)
        : res.status(404).json({
            message: `User not found!`,
          });
    } catch (e) {
      res.status(500).json({
        message: "Server Error",
      });
    }
  }
  static async getSelfUser(req, res) {
    try {
      const {id} = req.userData
      let userid = await user.findOne({
        where:{
          id
        }
      });
      res.status(200).json(userid);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async register(req, res) {
    try {
      const { username, email, password, role } = req.body;
      //memasukkan nama file/alamatfile ke avatar dari multer
      const avatar = req.file.filename;
      // jika email sudah ada
      let findEmail = await user.findOne({
        where: { email },
      });

      if (findEmail) {
        res.status(403).json({
          message: "Email sudah terdaftar",
        });
      } else {
        let result = await user.create({
          username,
          email,
          password,
          avatar,
          role,
        });
        res.status(201).json(result);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      let result = await user.findOne({
        where: {
          email,
        },
      });
      if (result) {
        if (decryptPwd(password, result.password)) {
          let token = tokenGenerator(result);
          res.status(200).json({
            access_token: token,
          });
        } else {
          res.status(400).json({
            message: "Password salah",
          });
        }
      } else {
        res.status(400).json({
          message: "User tidak ditemukan",
        });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async update(req, res) {
    try {
    } catch (error) {}
  }
  static async remove(req, res) {
    try {
    } catch (error) {}
  }
}

module.exports = UserController;
