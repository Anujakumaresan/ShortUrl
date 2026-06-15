const uploadService = require('../services/uploadService');
const fs = require('fs');

const uploadCsv = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const filePath = req.file.path;
    const results = await uploadService.processCsvUpload(req.user.id, filePath);

    // Clean up file
    fs.unlink(filePath, (err) => {
      if (err) console.error('Failed to delete uploaded file', err);
    });

    res.status(200).json({
      message: `Successfully processed ${results.successful} URLs. ${results.failed} failed.`,
      details: results
    });
  } catch (err) {
    if (req.file) {
      fs.unlink(req.file.path, () => {});
    }
    next(err);
  }
};

module.exports = {
  uploadCsv
};
