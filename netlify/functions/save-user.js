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

    // Guardar en Firebase Realtime Database
    await db.ref(`usuarios/${username}`).set({
      ...userData,
      esAdmin: userData.esAdmin || (username === 'odin')
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Usuario guardado en Firebase' })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
