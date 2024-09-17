const fs = require('fs');

function readDatabase(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading the file:', err.message); // Ajouter un log de l'erreur pour le debugging
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = data.split('\n').filter((line) => line.trim() !== '');
      const students = {};

      lines.slice(1).forEach((line) => {
        const [firstname, , , field] = line.split(',');

        if (field) {
          if (!students[field]) {
            students[field] = [];
          }
          students[field].push(firstname);
        }
      });

      resolve(students);
    });
  });
}

module.exports = readDatabase;
