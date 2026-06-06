#!/usr/bin/env python3
"""
Script para configurar Firestore Database automáticamente
usando la API REST de Firebase
"""

import requests
import json
import sys
from datetime import datetime

# Configuración de Firebase
PROJECT_ID = "alola-entrenadores"
API_KEY = "AIzaSyDEZJC1Z2iGN9Wovzm9MGxY5FxY05jlb1U"

# URLs de la API
FIRESTORE_API = f"https://firestore.googleapis.com/v1/projects/{PROJECT_ID}/databases/default/documents"

def create_document(collection, document_id, data):
    """Crear un documento en Firestore"""
    url = f"{FIRESTORE_API}/{collection}/{document_id}?key={API_KEY}"
    
    # Convertir datos a formato Firestore
    firestore_data = {}
    for key, value in data.items():
        firestore_data[key] = convert_to_firestore_format(value)
    
    payload = {
        "fields": firestore_data
    }
    
    try:
        print(f"  📝 Creando {collection}/{document_id}...", end=" ", flush=True)
        response = requests.post(url, json=payload)
        
        if response.status_code in [200, 201]:
            print("✅")
            return True
        else:
            print(f"❌ Error {response.status_code}")
            print(f"     Respuesta: {response.text}")
            return False
    except Exception as e:
        print(f"❌ Excepción: {str(e)}")
        return False

def convert_to_firestore_format(value):
    """Convertir un valor Python a formato Firestore"""
    if isinstance(value, str):
        return {"stringValue": value}
    elif isinstance(value, bool):
        return {"booleanValue": value}
    elif isinstance(value, int):
        return {"integerValue": str(value)}
    elif isinstance(value, float):
        return {"doubleValue": value}
    elif isinstance(value, list):
        return {"arrayValue": {"values": [convert_to_firestore_format(v) for v in value]}}
    elif isinstance(value, dict):
        return {"mapValue": {"fields": {k: convert_to_firestore_format(v) for k, v in value.items()}}}
    elif value is None:
        return {"nullValue": None}
    else:
        return {"stringValue": str(value)}

def setup_firestore():
    """Configurar Firestore Database"""
    print("\n🚀 Configurando Firestore Database para Aventura Alola\n")
    
    # Usuarios base
    usuarios = {
        "odin": {
            "usuario": "odin",
            "nombre": "Odin",
            "password": "Odin2024!Alola#Secure",
            "saldo": 9999,
            "monedasRuleta": 10,
            "inventario": [],
            "historialCompras": [],
            "historialUsos": [],
            "historialAdmin": [],
            "muertos": 0,
            "esAdmin": True,
            "medallas": [],
            "equipoPokemon": [],
            "fotoPerfil": None,
            "createdAt": datetime.now().isoformat()
        },
        "hugo": {
            "usuario": "hugo",
            "nombre": "Hugo",
            "password": "Hugo2024!Trainer#Secure",
            "saldo": 500,
            "monedasRuleta": 2,
            "inventario": [],
            "historialCompras": [],
            "historialUsos": [],
            "historialAdmin": [],
            "muertos": 0,
            "esAdmin": False,
            "medallas": [],
            "equipoPokemon": [],
            "fotoPerfil": None,
            "createdAt": datetime.now().isoformat()
        },
        "ivan": {
            "usuario": "ivan",
            "nombre": "Ivan",
            "password": "Ivan2024!Adventure#Secure",
            "saldo": 200,
            "monedasRuleta": 1,
            "inventario": [],
            "historialCompras": [],
            "historialUsos": [],
            "historialAdmin": [],
            "muertos": 0,
            "esAdmin": False,
            "medallas": [],
            "equipoPokemon": [],
            "fotoPerfil": None,
            "createdAt": datetime.now().isoformat()
        }
    }
    
    # Datos globales
    meta_data = {
        "productos": [
            {
                "id": "item1",
                "nombre": "Poción",
                "descripcion": "Restaura 20 PS.",
                "precio": 50,
                "imagen": "https://placehold.co/150x200/FF5733/FFFFFF?text=Poción",
                "categoria": "Revivir y protecciones"
            },
            {
                "id": "item2",
                "nombre": "Superpoción",
                "descripcion": "Restaura 50 PS.",
                "precio": 40,
                "imagen": "https://placehold.co/150x200/3498DB/ffffff?text=Superpoción",
                "categoria": "Revivir y protecciones"
            },
            {
                "id": "item3",
                "nombre": "Poké Ball",
                "descripcion": "Para capturar Pokémon.",
                "precio": 80,
                "imagen": "https://placehold.co/150x200/E74C3C/FFFFFF?text=Poké+Ball",
                "categoria": "Captura"
            },
            {
                "id": "item4",
                "nombre": "Caramelo Raro",
                "descripcion": "Sube un nivel a tu Pokémon.",
                "precio": 30,
                "imagen": "https://placehold.co/150x200/F1C40F/000000?text=Caramelo+Raro",
                "categoria": "Estadisticas mejoradas"
            }
        ],
        "lideresGym": [],
        "premiosRuleta": ["item1", "item2", "item3", "item4"],
        "usuariosActivos": ["odin", "hugo", "ivan"],
        "updatedAt": datetime.now().isoformat()
    }
    
    success_count = 0
    total_count = 0
    
    # Crear colección ruleta_usuarios
    print("📚 Creando colección 'ruleta_usuarios':")
    for user_id, user_data in usuarios.items():
        total_count += 1
        if create_document("ruleta_usuarios", user_id, user_data):
            success_count += 1
    
    # Crear colección ruleta_meta
    print("\n📚 Creando colección 'ruleta_meta':")
    total_count += 1
    if create_document("ruleta_meta", "global", meta_data):
        success_count += 1
    
    # Resumen
    print(f"\n{'='*50}")
    print(f"✅ Configuración completada: {success_count}/{total_count} documentos creados")
    print(f"{'='*50}\n")
    
    if success_count == total_count:
        print("🎉 ¡Firestore Database está listo!")
        print("\nTus datos están guardados en la nube:")
        print("  • 3 usuarios (odin, hugo, ivan)")
        print("  • 4 productos de tienda")
        print("  • Configuración global")
        print("\nAhora puedes publicar tu sitio en Netlify o GitHub Pages.")
        return True
    else:
        print("⚠️  Algunos documentos no se crearon correctamente.")
        print("Verifica que Firestore Database esté activado en tu proyecto.")
        return False

if __name__ == "__main__":
    try:
        success = setup_firestore()
        sys.exit(0 if success else 1)
    except Exception as e:
        print(f"\n❌ Error: {str(e)}")
        sys.exit(1)
