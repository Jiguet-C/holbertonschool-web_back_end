const http = require('http');

// Créer le serveur HTTP
const app = http.createServer((req, res) => {
  // Définir les en-têtes HTTP pour indiquer que la réponse est du texte brut
  res.setHeader('Content-Type', 'text/plain');
  // Répondre avec le texte "Hello Holberton School!"
  res.statusCode = 200;
  res.end('Hello Holberton School!');
});

// Le serveur écoute sur le port 1245
app.listen(1245, () => {
  console.log('Server listening on port 1245');
});

// Exporter le serveur pour l'utiliser ailleurs si besoin
module.exports = app;
