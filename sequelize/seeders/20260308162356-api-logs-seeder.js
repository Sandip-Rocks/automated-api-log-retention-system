'use strict';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const apiLogsData = require('../../api_logs_data/api_logs.json');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();

    // Process the data to stringify JSON fields
    const processedData = apiLogsData.map((log) => ({
      ...log,
      request_headers: log.request_headers
        ? JSON.stringify(log.request_headers)
        : null,
      request_body: log.request_body ? JSON.stringify(log.request_body) : null,
      response_body: log.response_body
        ? JSON.stringify(log.response_body)
        : null,
    }));

    await queryInterface.bulkInsert('api_logs', processedData, { transaction });

    await transaction.commit();
  },

  async down(queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();

    await queryInterface.bulkDelete('api_logs', null, { transaction });

    await transaction.commit();
  },
};
