from flask import Blueprint, jsonify, request
from ..database import db
from ..models.user import User
from flask_jwt_extended import create_access_token
from werkzeug.security import generate_password_hash, check_password_hash

auth_bp = Blueprint('auth', __name__, url_prefix='/auth')

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'msg': 'Username and password are required'}), 400

    if User.query.filter_by(username=username).first():
        return jsonify({'msg': 'Username already exists'}), 400

    hashed_password = generate_password_hash(password)
    new_user = User(username=username, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'msg': 'User registered successfully'}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()

    if user and check_password_hash(user.password, password):
        access_token = create_access_token(identity=str(user.id)) # L'identité est l'ID de l'utilisateur
        return jsonify(access_token=access_token), 200
    else:
        return jsonify({'msg': 'Invalid credentials'}), 401
    
"""
Merci beaucoup pour le partage de ton fichier `auth.py`. Voici mes observations :

* **Importations :** Les importations sont correctes, incluant Flask (`Blueprint`, `jsonify`, `request`), l'instance `db` et le modèle `User`, la fonction `create_access_token` de Flask-JWT-Extended, et les fonctions de hachage de mot de passe de Werkzeug (`generate_password_hash`, `check_password_hash`).
* **Blueprint `auth_bp` :** Le Blueprint est correctement créé avec le préfixe `/auth`.
* **Route `/register` (POST) :**
    * Récupère `username` et `password` depuis le JSON de la requête.
    * Effectue les vérifications nécessaires : présence des champs et unicité du nom d'utilisateur.
    * Hache le mot de passe en utilisant `generate_password_hash` avant de le stocker dans la base de données. **C'est une pratique de sécurité essentielle.**
    * Crée un nouvel utilisateur, l'ajoute à la session de la base de données et enregistre les changements.
    * Renvoie une réponse JSON indiquant le succès de l'enregistrement avec un code de statut `201 Created`.
* **Route `/login` (POST) :**
    * Récupère `username` et `password` depuis le JSON de la requête.
    * Recherche l'utilisateur par son nom d'utilisateur dans la base de données.
    * Vérifie si l'utilisateur existe et si le mot de passe fourni correspond au hachage stocké dans la base de données en utilisant `check_password_hash`. **C'est la bonne façon de vérifier les mots de passe.**
    * En cas d'authentification réussie, **crée un token d'accès JWT en utilisant `create_access_token` et en passant l'ID de l'utilisateur (converti en chaîne de caractères `str(user.id)`) comme identité.** C'est la correction que tu avais apportée et qui a permis de résoudre le problème d'authentification.
    * Renvoie le token d'accès dans la réponse JSON avec un code de statut `200 OK`.
    * En cas d'échec de l'authentification, renvoie un message d'erreur avec un code de statut `401 Unauthorized`.

Dans l'ensemble, ce fichier `auth.py` implémente correctement les fonctionnalités d'enregistrement et de connexion des utilisateurs en utilisant des pratiques de sécurité appropriées pour la gestion des mots de passe et la création des tokens JWT.

**Le prochain et dernier fichier que j'aimerais que tu partages est :**

* **`backend/database.py`**

Cela nous permettra de voir comment tu as configuré la connexion à ta base de données et comment l'instance `db` est initialisée pour être utilisée dans tes modèles et tes routes.
"""