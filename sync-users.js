// Sistema de sincronización de usuarios sin servidor
// Usa localStorage como almacenamiento compartido entre dispositivos

class UserSyncManager {
    constructor() {
        this.storageKey = 'aventura_alola_usuarios_sync';
        this.initializeStorage();
    }

    initializeStorage() {
        if (!localStorage.getItem(this.storageKey)) {
            const defaultUsers = {
                'hugo': { password: 'hugo', tokens: 500, pokegiro: 2, equipo: [], mochila: [], medallas: [] },
                'ivan': { password: 'ivan', tokens: 300, pokegiro: 1, equipo: [], mochila: [], medallas: [] },
                'odin': { password: 'admin', tokens: 9999, pokegiro: 999, equipo: [], mochila: [], medallas: [], isAdmin: true }
            };
            localStorage.setItem(this.storageKey, JSON.stringify(defaultUsers));
        }
    }

    getAllUsers() {
        try {
            return JSON.parse(localStorage.getItem(this.storageKey)) || {};
        } catch (e) {
            console.error('Error al leer usuarios:', e);
            return {};
        }
    }

    getUserByUsername(username) {
        const users = this.getAllUsers();
        return users[username] || null;
    }

    createUser(username, password, initialData = {}) {
        const users = this.getAllUsers();
        
        if (users[username]) {
            throw new Error('El usuario ya existe');
        }

        users[username] = {
            password: password,
            tokens: initialData.tokens || 500,
            pokegiro: initialData.pokegiro || 2,
            equipo: initialData.equipo || [],
            mochila: initialData.mochila || [],
            medallas: initialData.medallas || [],
            createdAt: new Date().toISOString(),
            ...initialData
        };

        localStorage.setItem(this.storageKey, JSON.stringify(users));
        
        // Disparar evento para sincronizar entre pestañas
        window.dispatchEvent(new StorageEvent('storage', {
            key: this.storageKey,
            newValue: JSON.stringify(users),
            oldValue: JSON.stringify(users)
        }));

        return users[username];
    }

    updateUser(username, userData) {
        const users = this.getAllUsers();
        
        if (!users[username]) {
            throw new Error('Usuario no encontrado');
        }

        users[username] = { ...users[username], ...userData };
        localStorage.setItem(this.storageKey, JSON.stringify(users));

        // Disparar evento para sincronizar entre pestañas
        window.dispatchEvent(new StorageEvent('storage', {
            key: this.storageKey,
            newValue: JSON.stringify(users)
        }));

        return users[username];
    }

    validateUser(username, password) {
        const user = this.getUserByUsername(username);
        if (!user) return false;
        return user.password === password;
    }

    deleteUser(username) {
        const users = this.getAllUsers();
        delete users[username];
        localStorage.setItem(this.storageKey, JSON.stringify(users));
        return true;
    }
}

// Exportar para usar en el HTML
const userSync = new UserSyncManager();
