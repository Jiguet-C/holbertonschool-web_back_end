const express = require('express');
const fs = require('fs');

const app = express();
const port = 1245;

// Fonction pour lire et traiter le fichier CSV
function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
      } else {
        const lines = data.split('\n').filter((line) => line.trim() !== '');
        const students = {};
        let totalStudents = 0;

        lines.forEach((line, index) => {
          if (index === 0) return; // Ignorer la première ligne d'en-tête
          const [firstname, lastname, age, field] = line.split(',');

          if (!students[field]) {
            students[field] = [];
          }
          students[field].push(firstname);
          totalStudents += 1;
        });

        resolve({ totalStudents, students });
      }
    });
  });
}

// Route pour la page d'accueil
app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

// Route pour afficher la liste des étudiants
app.get('/students', (req, res) => {
  const databasePath = process.argv[2]; // Récupérer le chemin de la base de données à partir des arguments

  countStudents(databasePath)
    .then(({ totalStudents, students }) => {
      let responseText = `This is the list of our students\nNumber of students: ${totalStudents}\n`;

      for (const field in students) {
        if (students.hasOwnProperty(field)) {
          responseText += `Number of students in ${field}: ${students[field].length}. List: ${students[field].join(', ')}\n`;
        }
      }

      res.send(responseText.trim());
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
