# ⚡ Inicio Rápido - Aventura Alola

Tu proyecto está **100% listo para publicar**. Aquí está el camino más rápido:

---

## 🎯 En 3 pasos:

### Paso 1: Descargar archivos
Descarga el ZIP adjunto y descomprime en tu PC.

### Paso 2: Publicar en Netlify (30 segundos)
1. Ve a https://www.netlify.com/
2. Arrastra la carpeta descomprimida al navegador
3. ¡Listo! Te darán una URL pública

### Paso 3: Compartir con jugadores
Comparte la URL con tus amigos. Ellos pueden:
- Crear cuenta o usar: `odin` / `Odin2024!Alola#Secure`
- Jugar, comprar items, girar la ruleta
- Sus datos se guardan automáticamente

---

## 📁 Archivos incluidos:

| Archivo | Descripción |
|---------|-------------|
| `index.html` | Tu juego completo |
| `firebase-config.js` | Configuración de Firebase |
| `netlify.toml` | Configuración de Netlify |
| `PUBLICAR_NETLIFY.md` | Guía detallada de publicación |
| `setup_firestore.py` | Script para sincronizar datos en la nube |

---

## 🎮 Credenciales de prueba:

| Usuario | Contraseña | Rol |
|---------|-----------|-----|
| `odin` | `Odin2024!Alola#Secure` | Admin |
| `hugo` | `Hugo2024!Trainer#Secure` | Jugador |
| `ivan` | `Ivan2024!Adventure#Secure` | Jugador |

---

## ✨ Lo que funciona:

✅ Login de usuarios
✅ Tienda con 4 productos
✅ PokeGiro (ruleta)
✅ Inventario
✅ Medallas de gimnasio
✅ Panel de administrador
✅ Sincronización de partidas Pokémon
✅ Guardado automático de datos

---

## 🔄 Próximos pasos (Opcionales):

### Activar sincronización en la nube (Firebase)
Si quieres que los datos se sincronicen entre dispositivos:

1. Asegúrate de que Firestore Database esté creado en tu proyecto
2. Ejecuta: `python3 setup_firestore.py`
3. Listo, los datos se guardarán en Google Cloud

### Personalizar el juego
- Cambiar productos de la tienda (línea ~5154 en `index.html`)
- Agregar más usuarios (línea ~5148 en `index.html`)
- Cambiar contraseñas (línea ~5148 en `index.html`)

---

## 🆘 Solución de problemas:

**"No puedo iniciar sesión"**
- Verifica usuario y contraseña (sensible a mayúsculas)

**"Los datos no se guardan"**
- Abre F12 > Console y busca errores
- Verifica que `firebase-config.js` esté en la misma carpeta

**"Veo errores de Firebase"**
- Es normal si Firestore no está activado
- Los datos se guardan en localStorage (funciona igual)

---

## 📞 Resumen técnico:

- **Hosting:** Netlify (gratis)
- **Base de datos:** Firebase Firestore (opcional, gratis en plan Spark)
- **Persistencia:** localStorage + Firebase (híbrida)
- **Usuarios:** 3 base + ilimitados adicionales
- **Productos:** 4 base + personalizables

---

**¡Tu proyecto está listo para conquistar la Liga de Alola! 🏆**
