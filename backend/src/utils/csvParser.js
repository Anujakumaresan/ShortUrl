const fs = require('fs');
const csv = require('csv-parser');

const parseCsv = (filePath) => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
        // Assuming CSV has a column 'url' or takes the first column
        const url = data.url || Object.values(data)[0];
        if (url) results.push(url);
      })
      .on('end', () => {
        resolve(results);
      })
      .on('error', (err) => {
        reject(err);
      });
  });
};

module.exports = parseCsv;
