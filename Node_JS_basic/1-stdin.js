// Affiche le message de bienvenue
console.log("Welcome to Holberton School, what is your name?");

// Écoute l'entrée de l'utilisateur
process.stdin.on('data', (data) => {
  const input = data.toString().trim(); // Nettoie l'entrée pour supprimer les espaces inutiles
  console.log(`Your name is: ${input}`); // Affiche le nom de l'utilisateur
});

// Détecte la fin de l'entrée standard
process.stdin.on('end', () => {
  console.log("This important software is now closing"); // Affiche le message de fermeture
});

// S'assure que l'entrée standard reste ouverte pour l'entrée de l'utilisateur
process.stdin.resume();
 