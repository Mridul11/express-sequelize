'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.removeColumn(`roles`, `admin`)
    await queryInterface.removeColumn(`roles`, `employee`)
    await queryInterface.removeColumn(`roles`, `manager`)
    await queryInterface.addColumn(`roles`, `status`, {
      type: Sequelize.STRING,
      allowNull: false ,
      defaultValue: 'EMPLOYEE',
    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
