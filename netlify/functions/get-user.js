const axios = require('axios');

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = 'HTellez182';
const GITHUB_REPO = 'aventura-alola';
const USERS_FILE = 'usuarios-data.json';

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

    // Obtener el archivo de GitHub
    try {
      const response = await axios.get(
        `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${USERS_FILE}`,
        {
          headers: {
            'Authorization': `token ${GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github.v3.raw'
          }
        }
      );

      const users = JSON.parse(response.data);
      const user = users[username];

      if (!user) {
        return {
          statusCode: 404,
          body: JSON.stringify({ error: 'Usuario no encontrado' })
        };
      }

      // Asegurar que esAdmin esté presente
      const userData = {
        ...user,
        esAdmin: user.esAdmin || (username === 'odin')
      };

      return {
        statusCode: 200,
        body: JSON.stringify(userData)
      };
    } catch (error) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Usuario no encontrado' })
      };
    }
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
