// Firebase Initialization and Firestore Sync - VERSIÓN CORREGIDA
console.log("🔥 Iniciando Firebase...");

// Esperar a que Firebase SDK esté disponible
let firebaseReady = false;
let db = null;
let unsubscribeListeners = [];

function initializeFirebase() {
    try {
        // Verificar que firebase esté disponible
        if (typeof firebase === 'undefined') {
            console.warn("⚠️ Firebase SDK no está cargado");
            return false;
        }

        // Configuración de Firebase
        const firebaseConfig = {
            apiKey: "AIzaSyDEZJC1Z2iGN9Wovzm9MGxY5FxY05jlb1U",
            authDomain: "alola-entrenadores.firebaseapp.com",
            projectId: "alola-entrenadores",
            storageBucket: "alola-entrenadores.firebasestorage.app",
            messagingSenderId: "372194479404",
            appId: "1:372194479404:web:07b4add825ee9d8e937089",
            measurementId: "G-EJQ473QBH0"
        };

        // Inicializar Firebase
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
            console.log("✅ Firebase App inicializado");
        }

        // Obtener referencia a Firestore
        db = firebase.firestore();
        firebaseReady = true;
        console.log("✅ Firestore conectado correctamente");
        return true;

    } catch (error) {
        console.error("❌ Error al inicializar Firebase:", error);
        firebaseReady = false;
        db = null;
        return false;
    }
}

// Función para guardar datos en Firestore
async function guardarEnFirestore(usuario, datos) {
    if (!firebaseReady || !db) {
        console.warn("⚠️ Firebase no disponible, datos NO se guardarán en la nube");
        return false;
    }

    try {
        // Crear objeto limpio sin funciones
        const datosLimpios = JSON.parse(JSON.stringify(datos));
        
        await db.collection('usuarios').doc(usuario).set(datosLimpios, { merge: true });
        console.log(`✅ Datos de ${usuario} guardados en Firestore`);
        return true;
    } catch (error) {
        console.error(`❌ Error al guardar en Firestore:`, error);
        return false;
    }
}

// Función para cargar datos desde Firestore
async function cargarDeFirestore(usuario) {
    if (!firebaseReady || !db) {
        console.warn("⚠️ Firebase no disponible, no se pueden cargar datos de la nube");
        return null;
    }

    try {
        const doc = await db.collection('usuarios').doc(usuario).get();
        if (doc.exists) {
            console.log(`✅ Datos de ${usuario} cargados desde Firestore`);
            return doc.data();
        }
        return null;
    } catch (error) {
        console.error(`❌ Error al cargar desde Firestore:`, error);
        return null;
    }
}

// Función para escuchar cambios en tiempo real
function escucharCambios(usuario, callback) {
    if (!firebaseReady || !db) {
        console.warn("⚠️ Firebase no disponible, no se pueden escuchar cambios");
        return () => {};
    }

    try {
        const unsubscribe = db.collection('usuarios').doc(usuario).onSnapshot((doc) => {
            if (doc.exists) {
                console.log(`🔄 Cambios detectados en ${usuario}`);
                callback(doc.data());
            }
        }, (error) => {
            console.error("Error escuchando cambios:", error);
        });
        
        unsubscribeListeners.push(unsubscribe);
        return unsubscribe;
    } catch (error) {
        console.error(`❌ Error al escuchar cambios:`, error);
        return () => {};
    }
}

// Función para sincronizar datos de equipo Pokémon
async function sincronizarEquipoPokemon(usuario, equipo) {
    if (!firebaseReady || !db) {
        console.warn("⚠️ Firebase no disponible, equipo Pokémon no se sincronizará");
        return false;
    }

    try {
        await db.collection('usuarios').doc(usuario).update({
            equipoPokemonSync: equipo,
            ultimaSincronizacion: new Date().toISOString()
        });
        console.log(`✅ Equipo Pokémon de ${usuario} sincronizado en Firestore`);
        return true;
    } catch (error) {
        console.error(`❌ Error al sincronizar equipo:`, error);
        return false;
    }
}

// Inicializar Firebase cuando el documento esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            initializeFirebase();
        }, 500);
    });
} else {
    setTimeout(() => {
        initializeFirebase();
    }, 500);
}

console.log("🔥 Firebase Init Script Cargado");
