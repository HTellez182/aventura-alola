const admin = require('firebase-admin');

// Inicializar Firebase (usa variables de entorno)
if (!admin.apps.length) {
  admin.initializeApp({
    databaseURL: process.env.FIREBASE_DATABASE_URL
  });
}

const db = admin.database();

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

    // Leer usuario desde Firebase
    const snapshot = await db.ref(`usuarios/${username}`).once('value');
    const user = snapshot.val();

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
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
