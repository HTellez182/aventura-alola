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

    const { username } = event.queryStringParameters || {};

    if (!username) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing username' })
      };
    }

    // Leer usuarios
    let users = {};
    if (fs.existsSync(USERS_FILE)) {
      users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
    }

    const user = users[username];

    if (!user) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Usuario no encontrado' })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(user)
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
