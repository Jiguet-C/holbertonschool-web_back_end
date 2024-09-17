const http = require('http');
const fs = require('fs').promises;
const { parse } = require('path');

// Fonction pour lire les étudiants à partir du fichier CSV
async function countStudents(path) {
  try {
    // Lire le fichier de manière asynchrone
    const data = await fs.readFile(path, 'utf8');
    const lines = data.split('\n').filter(line => line.trim() !== '');

    if (lines.length <= 1) {
      throw new Error('Cannot load the database');
    }

    // Enlever la première ligne qui contient les en-têtes
    lines.shift();

    // Initialiser des objets pour compter les étudiants par domaine
    const studentsByField = {};
    for (const line of lines) {
      const [firstname, lastname, age, field] = line.split(',');

      if (firstname && lastname && age && field) {
        if (!studentsByField[field]) {
          studentsByField[field] = [];
        }
        studentsByField[field].push(firstname);
      }
    }

    // Compter le nombre total d'étudiants
    const totalStudents = Object.values(studentsByField).reduce((acc, curr) => acc + curr.length, 0);
    let response = `Number of students: ${totalStudents}\n`;

    // Afficher les informations pour chaque domaine
    for (const [field, students] of Object.entries(studentsByField)) {
      response += `Number of students in ${field}: ${students.length}. List: ${students.join(', ')}\n`;
    }
    return response.trim();
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

// Créer le serveur HTTP
const app = http.createServer(async (req, res) => {
  const { url } = req;

  if (url === '/') {
    // Route racine "/"
    res.setHeader('Content-Type', 'text/plain');
    res.statusCode = 200;
    res.end('Hello Holberton School!');
  } else if (url === '/students') {
    // Route "/students"
    const databaseFile = process.argv[2]; // Récupérer le nom du fichier depuis les arguments de la ligne de commande

    if (!databaseFile) {
      res.setHeader('Content-Type', 'text/plain');
      res.statusCode = 500;
      res.end('Database file not provided');
    } else {
      try {
        const studentsInfo = await countStudents(databaseFile);
        res.setHeader('Content-Type', 'text/plain');
        res.statusCode = 200;
        res.end(`This is the list of our students\n${studentsInfo}`);
      } catch (error) {
        res.setHeader('Content-Type', 'text/plain');
        res.statusCode = 500;
        res.end('Cannot load the database');
      }
    }
  } else {
    // Route non définie
    res.statusCode = 404;
    res.end('Not Found');
  }
});

// Le serveur écoute sur le port 1245
app.listen(1245, () => {
  console.log('Server listening on port 1245');
});

module.exports = app;
