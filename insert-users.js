const { MongoClient } = require('mongodb');

const MONGODB_URI = "mongodb+srv://hfalcon182_db_user:Hugo4232068es@cluster0.seyzx5n.mongodb.net/?appName=Cluster0";
const DB_NAME = "aventura_alola";
const COLLECTION_NAME = "usuarios";

async function insertUsers() {
    const client = new MongoClient(MONGODB_URI);
    
    try {
        await client.connect();
        console.log("✓ Conectado a MongoDB Atlas");
        
        const db = client.db(DB_NAME);
        const collection = db.collection(COLLECTION_NAME);
        
        // Usuarios de prueba
        const users = [
            {
                usuario: "odin",
                contraseña: "admin",
                nombre: "Odin",
                esAdmin: true,
                pokeTokens: 1000,
                pokeGiro: 500,
                equipo: [],
                mochila: [],
                medallas: [],
                liderGym: false
            },
            {
                usuario: "tellez",
                contraseña: "123",
                nombre: "Tellez",
                esAdmin: false,
                pokeTokens: 100,
                pokeGiro: 50,
                equipo: [],
                mochila: [],
                medallas: [],
                liderGym: false
            },
            {
                usuario: "hugo",
                contraseña: "123",
                nombre: "Hugo",
                esAdmin: false,
                pokeTokens: 100,
                pokeGiro: 50,
                equipo: [],
                mochila: [],
                medallas: [],
                liderGym: false
            },
            {
                usuario: "ivan",
                contraseña: "123",
                nombre: "Ivan",
                esAdmin: false,
                pokeTokens: 100,
                pokeGiro: 50,
                equipo: [],
                mochila: [],
                medallas: [],
                liderGym: false
            }
        ];
        
        // Eliminar usuarios existentes
        await collection.deleteMany({});
        console.log("✓ Colección limpiada");
        
        // Insertar nuevos usuarios
        const result = await collection.insertMany(users);
        console.log(`✓ ${result.insertedCount} usuarios insertados`);
        
        // Verificar
        const count = await collection.countDocuments();
        console.log(`✓ Total de usuarios en la base de datos: ${count}`);
        
    } catch (error) {
        console.error("✗ Error:", error.message);
    } finally {
        await client.close();
        console.log("✓ Conexión cerrada");
    }
}

insertUsers();
