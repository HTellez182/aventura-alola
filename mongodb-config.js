// MongoDB Configuration
const MONGODB_URI = "mongodb+srv://hfalcon182_db_user:Hugo4232068es@cluster0.seyzx5n.mongodb.net/?appName=Cluster0";
const DB_NAME = "aventura_alola";
const COLLECTION_NAME = "usuarios";

// Función para conectar a MongoDB desde el navegador (usando API REST)
async function conectarMongoDB() {
    console.log("Conectando a MongoDB...");
    // MongoDB Atlas Data API
    const API_KEY = "mongodb-api-key"; // Se configurará en Netlify Functions
    return {
        uri: MONGODB_URI,
        dbName: DB_NAME,
        collectionName: COLLECTION_NAME
    };
}

// Exportar para Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MONGODB_URI, DB_NAME, COLLECTION_NAME, conectarMongoDB };
}
