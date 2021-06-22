'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: DataTypes.INTEGER });
     */
    return await queryInterface.createTable(`posts`, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      title:{
        type: DataTypes.STRING,
        allowNull: false
      },
      body:{
        type: DataTypes.STRING,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, DataTypes) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return await queryInterface.dropTable(`users`);
  }
};
