'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('api_logs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      timestamp: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      method: {
        allowNull: false,
        type: Sequelize.ENUM('GET', 'POST', 'PUT', 'DELETE', 'PATCH'),
      },
      url: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      status_code: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      response_time: {
        allowNull: false,
        type: Sequelize.INTEGER, // in milliseconds
      },
      user_agent: {
        type: Sequelize.TEXT,
      },
      ip_address: {
        type: Sequelize.TEXT, // Changed from STRING(45) to TEXT to accommodate IPv6 with CIDR notation
      },
      request_headers: {
        type: Sequelize.JSON,
      },
      request_body: {
        type: Sequelize.JSON,
      },
      response_body: {
        type: Sequelize.JSON,
      },
      user_id: {
        type: Sequelize.INTEGER,
      },
      session_id: {
        type: Sequelize.STRING(255),
      },
      error_message: {
        type: Sequelize.TEXT,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    // Add indexes for better query performance
    await queryInterface.addIndex('api_logs', ['timestamp']);
    await queryInterface.addIndex('api_logs', ['method']);
    await queryInterface.addIndex('api_logs', ['status_code']);
    await queryInterface.addIndex('api_logs', ['user_id']);
    await queryInterface.addIndex('api_logs', ['ip_address']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('api_logs');
  },
};
