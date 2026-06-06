const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

const USUARIOS_FILE = path.join(__dirname, 'usuarios-server.json');

// Inicializar archivo de usuarios
if (!fs.existsSync(USUARIOS_FILE)) {
    const usuariosIniciales = {
        usuarios: [
            {usuario: "hugo", password: "hugo", nombre: "Hugo", saldo: 450, monedasRuleta: 0, inventario: [], historialCompras: [], historialUsos: [], historialAdmin: [], muertos: 0, esAdmin: false},
            {usuario: "ivan", password: "ivan", nombre: "Ivan", saldo: 500, monedasRuleta: 2, inventario: [], historialCompras: [], historialUsos: [], historialAdmin: [], muertos: 0, esAdmin: false},
            {usuario: "odin", password: "admin", nombre: "Odin", saldo: 1000, monedasRuleta: 10, inventario: [], historialCompras: [], historialUsos: [], historialAdmin: [], muertos: 0, esAdmin: true}
        ]
    };
    fs.writeFileSync(USUARIOS_FILE, JSON.stringify(usuariosIniciales, null, 2));
}

// GET: Obtener todos los usuarios
app.get('/api/usuarios', (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync(USUARIOS_FILE, 'utf8'));
        res.json(data.usuarios);
    } catch (err) {
        console.error('Error leyendo usuarios:', err);
        res.status(500).json({ error: 'Error leyendo usuarios' });
    }
});

// POST: Guardar/actualizar usuarios
app.post('/api/usuarios', (req, res) => {
    try {
        const { usuarios } = req.body;
        if (!Array.isArray(usuarios)) {
            return res.status(400).json({ error: 'Formato inválido' });
        }
        fs.writeFileSync(USUARIOS_FILE, JSON.stringify({ usuarios }, null, 2));
        res.json({ success: true, message: 'Usuarios guardados' });
    } catch (err) {
        console.error('Error guardando usuarios:', err);
        res.status(500).json({ error: 'Error guardando usuarios' });
    }
});

// POST: Crear nuevo usuario
app.post('/api/usuarios/crear', (req, res) => {
    try {
        const { usuario, password, nombre } = req.body;
        if (!usuario || !password) {
            return res.status(400).json({ error: 'Usuario y contraseña requeridos' });
        }
        
        const data = JSON.parse(fs.readFileSync(USUARIOS_FILE, 'utf8'));
        
        // Verificar que no exista
        if (data.usuarios.find(u => u.usuario === usuario)) {
            return res.status(400).json({ error: 'Usuario ya existe' });
        }
        
        const newUser = {
            usuario,
            password,
            nombre: nombre || usuario,
            saldo: 0,
            monedasRuleta: 0,
            inventario: [],
            historialCompras: [],
            historialUsos: [],
            historialAdmin: [],
            muertos: 0,
            esAdmin: false
        };
        
        data.usuarios.push(newUser);
        fs.writeFileSync(USUARIOS_FILE, JSON.stringify(data, null, 2));
        res.json({ success: true, usuario: newUser });
    } catch (err) {
        console.error('Error creando usuario:', err);
        res.status(500).json({ error: 'Error creando usuario' });
    }
});

// GET: Buscar usuario para login
app.get('/api/usuarios/login/:usuario/:password', (req, res) => {
    try {
        const { usuario, password } = req.params;
        const data = JSON.parse(fs.readFileSync(USUARIOS_FILE, 'utf8'));
        
        const user = data.usuarios.find(u => 
            u.usuario.toLowerCase() === usuario.toLowerCase() && 
            u.password === password
        );
        
        if (user) {
            res.json({ success: true, usuario: user });
        } else {
            res.status(401).json({ success: false, error: 'Usuario o contraseña incorrectos' });
        }
    } catch (err) {
        console.error('Error en login:', err);
        res.status(500).json({ error: 'Error en login' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en puerto ${PORT}`);
});
