"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("status_history", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      machine_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "machines",
          key: "id"
        }
      },
      status_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "statuses",
          key: "id"
        }
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("status_history");
  }
};
