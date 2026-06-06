# Configurar Firestore Database para Aventura Alola

Tu proyecto Firebase ya está conectado. Ahora necesitas activar Firestore Database para que los datos de los jugadores se guarden en la nube.

## Paso 1: Ir a Firestore Console

1. Ve a https://console.firebase.google.com/
2. Selecciona tu proyecto **"alola-entrenadores"**
3. En el menú izquierdo, haz clic en **"Firestore Database"**

## Paso 2: Crear la Base de Datos

1. Haz clic en **"Crear base de datos"**
2. Selecciona **"Modo de prueba"** (por ahora, para desarrollo)
3. Selecciona la ubicación más cercana a ti (ej: `us-central1`)
4. Haz clic en **"Crear"**

## Paso 3: Crear las Colecciones

Una vez que Firestore esté activo, crea dos colecciones:

### Colección 1: `ruleta_usuarios`
- Haz clic en **"Iniciar colección"**
- Nombre: `ruleta_usuarios`
- Primer documento: `odin` (o cualquier ID)
- Campos de ejemplo:
  ```
  usuario: "odin"
  nombre: "Odin"
  saldo: 9999
  monedasRuleta: 10
  ```
- Haz clic en **"Guardar"**

### Colección 2: `ruleta_meta`
- Haz clic en **"Iniciar colección"**
- Nombre: `ruleta_meta`
- Primer documento: `global`
- Campos de ejemplo:
  ```
  productos: []
  lideresGym: []
  premiosRuleta: []
  usuariosActivos: ["odin", "hugo", "ivan"]
  ```
- Haz clic en **"Guardar"**

## Paso 4: Configurar Reglas de Seguridad (Importante)

1. En Firestore, ve a la pestaña **"Reglas"**
2. Reemplaza el contenido con esto:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir lectura y escritura sin autenticación (para desarrollo)
    // IMPORTANTE: Cambiar esto en producción para mayor seguridad
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

3. Haz clic en **"Publicar"**

## ¡Listo!

Tu aplicación ya está conectada a Firebase y los datos de los jugadores se guardarán en la nube automáticamente.

### Próximos pasos:
- Publica tu sitio en Netlify o GitHub Pages
- Los jugadores podrán acceder desde cualquier dispositivo y sus datos se sincronizarán
- En producción, considera cambiar las reglas de seguridad para requerir autenticación

---

**Nota**: En modo prueba, Firestore permite lectura/escritura sin restricciones durante 30 días. Después, necesitarás actualizar las reglas o cambiar a un plan de pago.
