const { MongoClient } = require('mongodb');

const MONGODB_URI = "mongodb+srv://hfalcon182_db_user:Hugo4232068es@cluster0.seyzx5n.mongodb.net/?appName=Cluster0";
const DB_NAME = "aventura_alola";
const COLLECTION_NAME = "usuarios";

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        const { usuario, contraseña } = JSON.parse(event.body);

        const client = new MongoClient(MONGODB_URI);
        await client.connect();

        const db = client.db(DB_NAME);
        const collection = db.collection(COLLECTION_NAME);

        // Buscar usuario
        const user = await collection.findOne({ usuario: usuario.toLowerCase() });

        await client.close();

        if (!user || user.contraseña !== contraseña) {
            return {
                statusCode: 401,
                body: JSON.stringify({ error: 'Usuario o contraseña incorrectos' })
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({
                usuario: user.usuario,
                nombre: user.nombre,
                esAdmin: user.esAdmin || false,
                pokeTokens: user.pokeTokens || 0,
                pokeGiro: user.pokeGiro || 0,
                equipo: user.equipo || [],
                mochila: user.mochila || [],
                medallas: user.medallas || [],
                liderGym: user.liderGym || false
            })
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error en el servidor' })
        };
    }
};
