'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Post, Role}) {
      // define association here
      this.hasMany(Post, {foreignKey: `userId`});
      this.hasMany(Role, {Role, foreignKey: `userId`});
    }
    // prevent password to be sent as response
    toJSON(){
      var values = Object.assign({}, this.get());
      delete values.password;
      return values;
    }
  };
  User.init({
    id:{
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'users',
    modelName: 'User',
  });
  
  return User;
};