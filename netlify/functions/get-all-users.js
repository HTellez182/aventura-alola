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

    // Leer todos los usuarios desde Firebase
    const snapshot = await db.ref('usuarios').once('value');
    const users = snapshot.val() || {};

    // Retornar todos los usuarios
    return {
      statusCode: 200,
      body: JSON.stringify(users)
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
