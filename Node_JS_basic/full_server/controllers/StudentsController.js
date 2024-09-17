const readDatabase = require('../utils');

class StudentsController {
  static getAllStudents(req, res) {
    const databasePath = process.argv[2]; // Chemin de la base de données à partir des arguments de ligne de commande
    console.log(`Reading database from: ${databasePath}`); // Ajouter un log pour vérifier le chemin du fichier

    readDatabase(databasePath)
      .then((students) => {
        let responseText = 'This is the list of our students\n';

        Object.keys(students)
          .sort((a, b) => a.localeCompare(b))
          .forEach((field) => {
            responseText += `Number of students in ${field}: ${students[field].length}. List: ${students[field].join(', ')}\n`;
          });

        res.status(200).send(responseText.trim());
      })
      .catch((err) => {
        console.error(err.message); // Ajouter un log de l'erreur pour le debugging
        res.status(500).send(err.message);
      });
  }

  static getAllStudentsByMajor(req, res) {
    const databasePath = process.argv[2];
    const major = req.params.major;

    if (major !== 'CS' && major !== 'SWE') {
      res.status(500).send('Major parameter must be CS or SWE');
      return;
    }

    readDatabase(databasePath)
      .then((students) => {
        if (students[major]) {
          const studentList = students[major].join(', ');
          res.status(200).send(`List: ${studentList}`);
        } else {
          res.status(200).send('List:');
        }
      })
      .catch((err) => {
        console.error(err.message); // Ajouter un log de l'erreur pour le debugging
        res.status(500).send('Cannot load the database');
      });
  }
}

module.exports = StudentsController;
