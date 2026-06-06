/**
 * SYNC MANAGER - Sistema de sincronización híbrido
 * Guarda datos en localStorage (local) y Firebase (nube) simultáneamente
 * Garantiza que los datos persistan en cualquier navegador
 */

class SyncManager {
    constructor() {
        this.firebaseReady = false;
        this.db = null;
        this.syncInterval = null;
        this.pendingSync = [];
        this.init();
    }

    init() {
        console.log("🔄 Inicializando SyncManager...");
        
        // Esperar a que Firebase esté disponible
        this.waitForFirebase();
        
        // Iniciar sincronización periódica
        this.startPeriodicSync();
    }

    waitForFirebase() {
        const maxAttempts = 20;
        let attempts = 0;

        const checkFirebase = () => {
            attempts++;
            
            if (typeof firebase !== 'undefined' && firebase.apps && firebase.apps.length > 0) {
                try {
                    this.db = firebase.firestore();
                    this.firebaseReady = true;
                    console.log("✅ Firebase Firestore conectado");
                    this.syncPendingData();
                } catch (error) {
                    console.warn("⚠️ Error conectando Firestore:", error);
                    this.firebaseReady = false;
                }
            } else if (attempts < maxAttempts) {
                setTimeout(checkFirebase, 500);
            } else {
                console.warn("⚠️ Firebase no disponible después de 10 segundos. Usando solo localStorage.");
                this.firebaseReady = false;
            }
        };

        checkFirebase();
    }

    // Guardar datos en localStorage
    saveLocal(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            console.log(`💾 Datos guardados en localStorage: ${key}`);
            return true;
        } catch (error) {
            console.error(`❌ Error guardando en localStorage:`, error);
            return false;
        }
    }

    // Cargar datos de localStorage
    loadLocal(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error(`❌ Error cargando de localStorage:`, error);
            return null;
        }
    }

    // Guardar datos en Firebase
    async saveFirebase(collection, docId, data) {
        if (!this.firebaseReady || !this.db) {
            console.warn("⚠️ Firebase no disponible, datos se guardarán cuando esté disponible");
            this.pendingSync.push({ collection, docId, data, timestamp: Date.now() });
            return false;
        }

        try {
            const datosLimpios = JSON.parse(JSON.stringify(data));
            await this.db.collection(collection).doc(docId).set(datosLimpios, { merge: true });
            console.log(`☁️ Datos guardados en Firebase: ${collection}/${docId}`);
            return true;
        } catch (error) {
            console.error(`❌ Error guardando en Firebase:`, error);
            this.pendingSync.push({ collection, docId, data, timestamp: Date.now() });
            return false;
        }
    }

    // Cargar datos de Firebase
    async loadFirebase(collection, docId) {
        if (!this.firebaseReady || !this.db) {
            console.warn("⚠️ Firebase no disponible");
            return null;
        }

        try {
            const doc = await this.db.collection(collection).doc(docId).get();
            if (doc.exists) {
                console.log(`☁️ Datos cargados de Firebase: ${collection}/${docId}`);
                return doc.data();
            }
            return null;
        } catch (error) {
            console.error(`❌ Error cargando de Firebase:`, error);
            return null;
        }
    }

    // Sincronizar datos (guardar en ambos lados)
    async sync(collection, docId, data) {
        // Guardar en localStorage (siempre)
        this.saveLocal(`${collection}_${docId}`, data);
        
        // Guardar en Firebase (si está disponible)
        if (this.firebaseReady && this.db) {
            await this.saveFirebase(collection, docId, data);
        } else {
            this.pendingSync.push({ collection, docId, data, timestamp: Date.now() });
        }
    }

    // Sincronizar datos pendientes
    async syncPendingData() {
        if (this.pendingSync.length === 0) return;

        console.log(`🔄 Sincronizando ${this.pendingSync.length} elementos pendientes...`);
        
        const toSync = [...this.pendingSync];
        this.pendingSync = [];

        for (const item of toSync) {
            try {
                await this.saveFirebase(item.collection, item.docId, item.data);
            } catch (error) {
                console.error(`❌ Error sincronizando:`, error);
                this.pendingSync.push(item);
            }
        }
    }

    // Sincronización periódica
    startPeriodicSync() {
        this.syncInterval = setInterval(() => {
            if (this.firebaseReady && this.pendingSync.length > 0) {
                this.syncPendingData();
            }
        }, 5000); // Cada 5 segundos
    }

    // Detener sincronización
    stopPeriodicSync() {
        if (this.syncInterval) {
            clearInterval(this.syncInterval);
        }
    }

    // Cargar datos (intenta Firebase primero, luego localStorage)
    async load(collection, docId) {
        // Intentar cargar de Firebase
        if (this.firebaseReady && this.db) {
            const firebaseData = await this.loadFirebase(collection, docId);
            if (firebaseData) {
                // Guardar en localStorage como backup
                this.saveLocal(`${collection}_${docId}`, firebaseData);
                return firebaseData;
            }
        }

        // Fallback a localStorage
        const localData = this.loadLocal(`${collection}_${docId}`);
        if (localData) {
            console.log(`💾 Datos cargados de localStorage: ${collection}/${docId}`);
            return localData;
        }

        return null;
    }
}

// Crear instancia global
const syncManager = new SyncManager();
console.log("🔄 SyncManager listo");
