const fs = require('fs');
const path = require('path');

// Archivo donde se guardan los usuarios
const USERS_FILE = path.join('/tmp', 'aventura-alola-users.json');

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== 'GET') {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: 'Method not allowed' })
      };
    }

    // Leer usuarios
    let users = {};
    if (fs.existsSync(USERS_FILE)) {
      users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
    }

    // Retornar solo los nombres de usuarios (sin contraseñas)
    const usernames = Object.keys(users);

    return {
      statusCode: 200,
      body: JSON.stringify({ users: usernames })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
