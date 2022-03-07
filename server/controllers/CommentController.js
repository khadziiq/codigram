const { comment } = require("../models");

class CommentController {
  static async allComment(req, res) {
    try {
      let comments = await comment.findAll();
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async getCommentById(req, res) {
    try {
      const pictureid = +req.params.id;
      let comments = await comment.findAll({
        where:{
          pictureid
        }
      });
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async add(req, res) {
    try {
      const { text } = req.body;
      const pictureid = +req.params.id;
      const { id } = req.userData;

      let result = await comment.create({
        text,
        userId: id,
        pictureid
      });
      res.status(201).json(result);
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

module.exports = CommentController;
