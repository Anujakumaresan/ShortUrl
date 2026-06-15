const db = require('../config/db');
const parseCsv = require('../utils/csvParser');
const { createUrl } = require('./urlService');

const processCsvUpload = async (userId, filePath) => {
  const urls = await parseCsv(filePath);
  if (urls.length === 0) {
    throw new Error('No URLs found in the CSV file');
  }

  const results = {
    successful: 0,
    failed: 0,
    errors: []
  };

  for (const url of urls) {
    try {
      await createUrl(userId, url);
      results.successful++;
    } catch (err) {
      results.failed++;
      results.errors.push({ url, error: err.message });
    }
  }

  return results;
};

module.exports = {
  processCsvUpload
};
