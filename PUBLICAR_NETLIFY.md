# 🚀 Publicar en Netlify - Guía Rápida

Tu proyecto **Aventura de Bolsillo: Alola** está 100% listo para publicar.

## Opción 1: Drag & Drop (La más fácil - 30 segundos)

1. **Abre Netlify:**
   https://www.netlify.com/

2. **Inicia sesión o crea una cuenta gratis** (puedes usar tu email de Google)

3. **Busca la sección "Drop your site here"**

4. **Arrastra la carpeta `aventura-alola` directamente al navegador**

5. **¡Listo!** Netlify te dará una URL pública en segundos

   Ejemplo: `https://tu-sitio-random.netlify.app`

---

## Opción 2: Conectar con GitHub (Más profesional)

1. **Crea un repositorio en GitHub:**
   https://github.com/new

2. **Sube todos los archivos:**
   ```bash
   git init
   git add .
   git commit -m "Aventura Alola - Inicial"
   git push origin main
   ```

3. **En Netlify, haz clic en "Import an existing project"**

4. **Selecciona tu repositorio de GitHub**

5. **Netlify desplegará automáticamente**

---

## Archivos que necesitas subir:

✅ `index.html` — Tu juego completo
✅ `firebase-config.js` — Configuración de Firebase
✅ `netlify.toml` — Configuración de Netlify (opcional)

---

## Después de publicar:

1. **Abre tu URL pública en el navegador**

2. **Inicia sesión con:**
   - Usuario: `odin`
   - Contraseña: `Odin2024!Alola#Secure`

3. **Verifica que todo funciona:**
   - ✅ Panel de admin
   - ✅ Tienda
   - ✅ Ruleta
   - ✅ Inventario

---

## 🔐 Datos guardados

Por ahora, los datos se guardan en **localStorage** (en el navegador del jugador). Esto significa:
- ✅ Los datos persisten entre sesiones
- ✅ Cada jugador tiene sus datos locales
- ⚠️ Los datos no se sincronizan entre dispositivos

**Para sincronizar datos entre dispositivos**, necesitamos activar Firestore. Una vez que esté funcionando, ejecuta:

```bash
python3 setup_firestore.py
```

---

## 📊 Monitorear tu sitio

Una vez publicado en Netlify, puedes:
- Ver estadísticas de tráfico
- Configurar dominio personalizado
- Activar HTTPS (automático)
- Ver logs de despliegue

---

## ¿Necesitas ayuda?

Si algo no funciona:
1. Abre la consola del navegador (F12)
2. Revisa si hay errores de Firebase
3. Verifica que `firebase-config.js` esté en la misma carpeta que `index.html`

---

**¡Listo para publicar! 🎉**
