const https = require('https');

// Configuración de MongoDB Data API
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiaGZhbGNvbjE4MkBnbWFpbC5jb20iLCJ1c2VySWQiOiI2NzBhZTQzMDJiZjMwMDAwMDAwMDAwMDEifSwiaWF0IjoxNzI4NjI2NjA4fQ.XdaYfXF1Qr7cKHPjI0Yk5qZ9vQ2rL8mN3pO6sT9uV0w";
const APP_ID = "aventura-alola-zzxqj";
const CLUSTER_NAME = "Cluster0";
const DB_NAME = "aventura_alola";
const COLLECTION_NAME = "usuarios";

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

function makeRequest(method, path, data) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'data.mongodb-api.com',
            port: 443,
            path: path,
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'api-key': API_KEY
            }
        };

        const req = https.request(options, (res) => {
            let responseData = '';
            res.on('data', (chunk) => {
                responseData += chunk;
            });
            res.on('end', () => {
                try {
                    resolve({
                        status: res.statusCode,
                        data: JSON.parse(responseData)
                    });
                } catch (e) {
                    resolve({
                        status: res.statusCode,
                        data: responseData
                    });
                }
            });
        });

        req.on('error', reject);
        
        if (data) {
            req.write(JSON.stringify(data));
        }
        req.end();
    });
}

async function insertUsers() {
    try {
        console.log("Iniciando inserción de usuarios...");
        
        // Primero, eliminar usuarios existentes
        console.log("Eliminando usuarios existentes...");
        const deleteResponse = await makeRequest('POST', `/app/${APP_ID}/endpoint/data/v1/action/deleteMany`, {
            dataSource: CLUSTER_NAME,
            database: DB_NAME,
            collection: COLLECTION_NAME,
            filter: {}
        });
        
        if (deleteResponse.status === 200) {
            console.log(`✓ ${deleteResponse.data.deletedCount || 0} usuarios eliminados`);
        } else {
            console.log(`Respuesta de eliminación: ${deleteResponse.status}`);
        }
        
        // Insertar nuevos usuarios
        console.log("Insertando nuevos usuarios...");
        const insertResponse = await makeRequest('POST', `/app/${APP_ID}/endpoint/data/v1/action/insertMany`, {
            dataSource: CLUSTER_NAME,
            database: DB_NAME,
            collection: COLLECTION_NAME,
            documents: users
        });
        
        if (insertResponse.status === 201) {
            console.log(`✓ ${insertResponse.data.insertedIds.length} usuarios insertados`);
        } else {
            console.log(`Error en inserción: ${insertResponse.status}`);
            console.log(insertResponse.data);
        }
        
        // Verificar
        console.log("Verificando usuarios...");
        const findResponse = await makeRequest('POST', `/app/${APP_ID}/endpoint/data/v1/action/find`, {
            dataSource: CLUSTER_NAME,
            database: DB_NAME,
            collection: COLLECTION_NAME
        });
        
        if (findResponse.status === 200) {
            console.log(`✓ Total de usuarios en la base de datos: ${findResponse.data.documents.length}`);
            findResponse.data.documents.forEach(doc => {
                console.log(`  - ${doc.usuario} (${doc.nombre})`);
            });
        }
        
    } catch (error) {
        console.error("✗ Error:", error.message);
    }
}

insertUsers();
