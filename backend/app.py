from flask import Flask
from dotenv import load_dotenv
import os
from .routes.auth import auth_bp
from .routes.task import task_bp
from .database import init_app, db 
from flask_jwt_extended import JWTManager
from flask_cors import CORS


load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config['JWT_SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config["JWT_TOKEN_LOCATION"] = ["headers"]
#app.config["JWT_IDENTITY_CLAIM"] = "sub"  # Optionnel, mais bonne pratique
#app.config["JWT_SUBJECT_IDENTIFIER"] = "id"  # Indique que l'identité est l'ID de l'utilisateur
jwt = JWTManager(app) 

# Configuration de CORS
CORS(app)

# Configuration de la base de données
init_app(app)

#Configuration du chemin 
app.register_blueprint(task_bp, url_prefix='/tasks')
app.register_blueprint(auth_bp, url_prefix='/auth')

with app.app_context():
    db.create_all()  # Tentative de création des tables à chaque démarrage
    print("Tentative de création des tables...")

if __name__ == '__main__':
    app.run(debug=True)

"""
Merci beaucoup pour le partage de ton fichier `app.py`. Voici mes observations :

* **Importations :** Les importations semblent correctes, incluant Flask, dotenv, os, tes Blueprints (`auth_bp`, `task_bp`), l'initialisation de la base de données (`init_app`, `db`), `JWTManager`, et `CORS`.
* **Chargement des variables d'environnement :** `load_dotenv()` est appelé, ce qui est bien pour charger les variables depuis le fichier `.env`.
* **Configuration de Flask :** La clé secrète (`SECRET_KEY`) est lue depuis l'environnement et configurée pour l'application.
* **Configuration de JWT :** `JWT_SECRET_KEY` est également lue depuis l'environnement, et `JWT_TOKEN_LOCATION` est correctement définie pour les en-têtes. Les configurations optionnelles `JWT_IDENTITY_CLAIM` et `JWT_SUBJECT_IDENTIFIER` sont commentées, ce qui signifie que Flask-JWT-Extended utilisera ses valeurs par défaut (`sub` pour l'identité).
* **Configuration de CORS :** `CORS(app)` est initialisé, ce qui permettra les requêtes cross-origin.
* **Initialisation de la base de données :** `init_app(app)` est appelé pour configurer la base de données avec l'application Flask.
* **Enregistrement des Blueprints :** Les Blueprints `task_bp` et `auth_bp` sont enregistrés avec les préfixes `/tasks` et `/auth` respectivement.
* **Création des tables :** `db.create_all()` est appelé dans le contexte de l'application pour créer les tables dans la base de données si elles n'existent pas. C'est une approche courante en développement.
* **Démarrage de l'application :** L'application Flask est lancée en mode debug si le script est exécuté directement.

Dans l'ensemble, ce fichier `app.py` semble bien structuré et suit les pratiques courantes pour une application Flask utilisant ces extensions.

**Le prochain fichier que j'aimerais que tu partages est :**

* **`backend/models/task.py`**

Cela nous permettra de voir la définition de ton modèle de données pour les tâches et de comprendre comment les informations des tâches sont structurées dans ta base de données.
"""