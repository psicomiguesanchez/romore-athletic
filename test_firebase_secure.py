#!/usr/bin/env python3
"""
Script de prueba SEGURO para Firebase Login
Usa variables de entorno en lugar de credenciales hardcodeadas
"""

import os
import requests
import json
from dotenv import load_dotenv

# Cargar variables de entorno desde .env
load_dotenv()

def test_firebase_login():
    """Test Firebase login usando variables de entorno."""

    # Obtener credenciales de variables de entorno
    api_key = os.getenv('FIREBASE_API_KEY')
    email = os.getenv('ADMIN_EMAIL')
    password = os.getenv('ADMIN_PASSWORD')

    # Validar que las variables están configuradas
    if not all([api_key, email, password]):
        print("❌ ERROR: Variables de entorno no configuradas")
        print("   1. Copia .env.example a .env")
        print("   2. Rellena tus valores reales en .env")
        print("   3. NO commits .env")
        return False

    # Endpoint de Firebase
    url = f"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key={api_key}"

    payload = {
        "email": email,
        "password": password,
        "returnSecureToken": True
    }

    print("🔐 Testing Firebase Login...")
    print(f"   Email: {email}")
    print(f"   Password: {'*' * len(password)}")
    print(f"   API Key: {api_key[:10]}...*** (secreto oculto)")
    print()

    try:
        response = requests.post(url, json=payload, timeout=10)
        data = response.json()

        if response.status_code == 200:
            print("✅ LOGIN SUCCESSFUL!")
            print(f"   User ID: {data.get('localId')}")
            print(f"   Token: {data.get('idToken')[:50]}...")
            return True
        else:
            print(f"❌ LOGIN FAILED")
            error = data.get('error', {})
            print(f"   Error: {error.get('message')}")
            return False

    except Exception as e:
        print(f"❌ Exception: {e}")
        return False

if __name__ == "__main__":
    test_firebase_login()
