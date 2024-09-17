const fs = require('fs');

function countStudents(path) {
  try {
    // Lire le fichier de manière synchrone
    const data = fs.readFileSync(path, 'utf8');

    // Séparer les lignes du fichier CSV
    const lines = data.split('\n').filter(line => line.trim() !== '');

    // Vérifier si le fichier contient des données
    if (lines.length === 0) {
      throw new Error('Cannot load the database');
    }

    // Enlever la première ligne qui contient les en-têtes (firstname, lastname, age, field)
    const headers = lines.shift();

    // Initialiser des objets pour compter les étudiants par domaine
    const studentsByField = {};

    // Traiter chaque ligne
    for (const line of lines) {
      const [firstname, lastname, age, field] = line.split(',');

      // Vérifier que toutes les informations sont bien présentes
      if (firstname && lastname && age && field) {
        // Si le domaine n'existe pas encore dans notre objet, l'initialiser
        if (!studentsByField[field]) {
          studentsByField[field] = [];
        }
        // Ajouter l'étudiant à la liste du domaine correspondant
        studentsByField[field].push(firstname);
      }
    }

    // Compter le nombre total d'étudiants
    const totalStudents = Object.values(studentsByField).reduce((acc, curr) => acc + curr.length, 0);
    console.log(`Number of students: ${totalStudents}`);

    // Afficher les informations pour chaque domaine
    for (const [field, students] of Object.entries(studentsByField)) {
      console.log(`Number of students in ${field}: ${students.length}. List: ${students.join(', ')}`);
    }
  } catch (error) {
    // En cas d'erreur (par exemple, fichier non trouvé), afficher le message d'erreur
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
