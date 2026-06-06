# 🎮 Guía Completa de Publicación: Aventura de Bolsillo — Alola

¡Tu proyecto está listo para publicar! Aquí te muestro cómo hacerlo en 3 pasos simples.

---

## 📋 Archivos incluidos:

1. **`index.html`** — Tu juego completo y optimizado
2. **`firebase-config.js`** — Configuración de Firebase (ya conectada a tu proyecto)
3. **`CONFIGURAR_FIRESTORE.md`** — Instrucciones para activar la base de datos en la nube
4. **`LEEME_PUBLICACION.md`** — Este archivo

---

## ✅ Paso 1: Configurar Firestore (5 minutos)

**Esto es IMPORTANTE para que los datos de los jugadores se guarden en la nube.**

Sigue las instrucciones en `CONFIGURAR_FIRESTORE.md`. Básicamente:
1. Ve a https://console.firebase.google.com/
2. Selecciona tu proyecto "alola-entrenadores"
3. Activa Firestore Database
4. Crea dos colecciones: `ruleta_usuarios` y `ruleta_meta`
5. Configura las reglas de seguridad

---

## 🚀 Paso 2: Publicar tu sitio (1 minuto)

### Opción A: Netlify (La más fácil - RECOMENDADA)

1. Ve a https://www.netlify.com/
2. Haz clic en **"Drop your site here"**
3. Arrastra la carpeta que contiene estos archivos
4. ¡Listo! Te darán una URL pública al instante

**Ventajas:**
- Cero configuración
- URL pública inmediata
- SSL gratis
- Actualizaciones automáticas si subes cambios

### Opción B: GitHub Pages

1. Crea una cuenta en https://github.com/
2. Crea un repositorio nuevo llamado `alola-entrenadores`
3. Sube los archivos (`index.html` y `firebase-config.js`)
4. Ve a **Settings** > **Pages**
5. Selecciona "Deploy from a branch" y elige `main`
6. ¡Listo! Tu sitio estará en `https://tuusuario.github.io/alola-entrenadores`

**Ventajas:**
- Gratis para siempre
- Fácil de mantener con Git
- Bueno para proyectos de código abierto

### Opción C: Vercel

1. Ve a https://vercel.com/
2. Haz clic en **"Import Project"**
3. Selecciona tu repositorio de GitHub
4. Haz clic en **"Deploy"**
5. ¡Listo! Tu sitio estará en línea en segundos

---

## 🔐 Credenciales de Acceso

Comparte estas credenciales con tus jugadores:

| Usuario | Contraseña | Rol |
|---------|-----------|-----|
| `odin` | `Odin2024!Alola#Secure` | Administrador |
| `hugo` | `Hugo2024!Trainer#Secure` | Jugador |
| `ivan` | `Ivan2024!Adventure#Secure` | Jugador |

**Importante:** Puedes cambiar estas contraseñas en cualquier momento editando el archivo `index.html` (línea ~5148).

---

## 🎯 Paso 3: Verificar que todo funciona

1. Abre tu sitio en el navegador
2. Intenta iniciar sesión con `odin` y su contraseña
3. Verifica que puedas:
   - Ver tu saldo de PokeTokens
   - Acceder a la tienda
   - Girar la ruleta
   - Ver el panel de admin

Si todo funciona, ¡felicidades! 🎉

---

## 🔧 Solución de problemas

### "No puedo iniciar sesión"
- Verifica que escribiste bien el usuario y contraseña
- Recuerda que es sensible a mayúsculas/minúsculas

### "Los datos no se guardan"
- Asegúrate de haber activado Firestore Database
- Verifica que las colecciones `ruleta_usuarios` y `ruleta_meta` existan
- Revisa la consola del navegador (F12) para ver si hay errores

### "Veo errores de Firebase en la consola"
- Verifica que `firebase-config.js` esté en la misma carpeta que `index.html`
- Comprueba que Firestore Database esté activo en tu proyecto

---

## 📊 Monitorear tu proyecto

Una vez publicado, puedes ver:

- **Usuarios activos** en https://console.firebase.google.com/ > Firestore > `ruleta_usuarios`
- **Datos globales** (productos, premios) en `ruleta_meta`
- **Uso de la base de datos** en Firebase Console > "Uso"

---

## 🚀 Próximos pasos (Opcionales)

- **Agregar más usuarios**: Edita `index.html` línea ~5148 para agregar nuevos jugadores
- **Cambiar productos de la tienda**: Edita `index.html` línea ~5154 para personalizar los items
- **Agregar medallas de gimnasio**: Usa el panel de admin (usuario: `odin`)
- **Configurar sincronización de partidas**: Carga partidas Pokémon desde Citra/DS/GBA

---

## ❓ ¿Necesitas ayuda?

Si tienes problemas:
1. Revisa la consola del navegador (F12 > Console)
2. Verifica que Firestore Database esté activo
3. Comprueba que los archivos estén en la misma carpeta

¡Mucha suerte con tu liga de Alola! 🏆
