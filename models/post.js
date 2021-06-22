'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    
    static associate({User}) {
      // define association here
      this.belongsTo(User, {foreignKey: `userId`})
    }
  };
  Post.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
    title: {type: DataTypes.STRING, allowNull: false },
    body: {type: DataTypes.STRING, allowNull: false },
    userId: DataTypes.UUIDV4
  }, {
    sequelize,
    tableName: `posts`,
    modelName: 'Post',
  });
  return Post;
};