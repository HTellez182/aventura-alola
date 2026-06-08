const axios = require('axios');

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = 'HTellez182';
const GITHUB_REPO = 'aventura-alola';
const USERS_FILE = 'usuarios-data.json';

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

    // Obtener el archivo actual de GitHub
    let fileData = {};
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
      fileData = JSON.parse(response.data);
    } catch (error) {
      // Si el archivo no existe, crear uno nuevo
      fileData = {};
    }

    // Actualizar con el nuevo usuario
    fileData[username] = {
      ...userData,
      esAdmin: userData.esAdmin || (username === 'odin'),
      lastUpdated: new Date().toISOString()
    };

    // Obtener el SHA del archivo para actualizar
    let sha = null;
    try {
      const headResponse = await axios.head(
        `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${USERS_FILE}`,
        {
          headers: {
            'Authorization': `token ${GITHUB_TOKEN}`
          }
        }
      );
      // Obtener SHA del archivo
      const getResponse = await axios.get(
        `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${USERS_FILE}`,
        {
          headers: {
            'Authorization': `token ${GITHUB_TOKEN}`
          }
        }
      );
      sha = getResponse.data.sha;
    } catch (error) {
      // Archivo no existe
    }

    // Guardar en GitHub
    const commitMessage = `Actualizar usuario: ${username}`;
    const content = Buffer.from(JSON.stringify(fileData, null, 2)).toString('base64');

    const updatePayload = {
      message: commitMessage,
      content: content,
      branch: 'main'
    };

    if (sha) {
      updatePayload.sha = sha;
    }

    await axios.put(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${USERS_FILE}`,
      updatePayload,
      {
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Usuario guardado en GitHub' })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
