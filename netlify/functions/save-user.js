const fs = require('fs');
const path = require('path');

// Archivo donde se guardan los usuarios
const USERS_FILE = path.join('/tmp', 'aventura-alola-users.json');

// Inicializar archivo si no existe
if (!fs.existsSync(USERS_FILE)) {
  fs.writeFileSync(USERS_FILE, JSON.stringify({
    odin: { password: 'admin', tokens: 1000, pokegiro: 5, equipo: [], mochila: [], medallas: [], isAdmin: true },
    hugo: { password: 'hugo', tokens: 500, pokegiro: 2, equipo: [], mochila: [], medallas: [] },
    ivan: { password: 'ivan', tokens: 500, pokegiro: 2, equipo: [], mochila: [], medallas: [] }
  }));
}

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: 'Method not allowed' })
      };
    }

    const { username, userData } = JSON.parse(event.body);

    if (!username || !userData) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing username or userData' })
      };
    }

    // Leer usuarios actuales
    let users = {};
    if (fs.existsSync(USERS_FILE)) {
      users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
    }

    // Guardar/actualizar usuario
    users[username] = userData;

    // Escribir usuarios actualizados
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Usuario guardado' })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
