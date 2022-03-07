'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      comment.belongsTo(models.user)
      comment.belongsTo(models.picture)
    }
  }
  comment.init({
    text: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    pictureid: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'comment',
  });
  return comment;
};