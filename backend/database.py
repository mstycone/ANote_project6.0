from flask_sqlalchemy import SQLAlchemy
from flask import Flask
import os

db = SQLAlchemy()

def init_app(app):
    app.config['SQLALCHEMY_DATABASE_URI'] = f"postgresql://{os.getenv('DB_USER')}:{os.getenv('DB_PWD')}@{os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/{os.getenv('DB_NAME')}"
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)

"""
Merci beaucoup pour le partage du fichier `database.py`. Voici une description de son contenu :

* **Importations :**
    * `SQLAlchemy` de `flask_sqlalchemy` : Fournit l'intégration de SQLAlchemy avec Flask, facilitant l'interaction avec la base de données.
    * `Flask` de `flask` : Bien qu'il ne soit pas directement utilisé dans ce fichier, il est importé, probablement par habitude ou en prévision d'un usage futur.
    * `os` : Utilisé pour accéder aux variables d'environnement.
* **Initialisation de `SQLAlchemy` :**
    * `db = SQLAlchemy()`: Crée une instance de la classe `SQLAlchemy`. Cette instance (`db`) est celle qui est importée et utilisée dans tes modèles (`Task`, `User`) pour définir les tables et interagir avec la base de données. L'initialisation de l'application avec cette instance se fait plus tard.
* **Fonction `init_app(app)` :**
    * Cette fonction prend l'instance de l'application Flask (`app`) en argument. Elle est appelée dans `app.py` pour configurer la base de données pour cette application spécifique.
    * **Configuration de l'URI de la base de données (`SQLALCHEMY_DATABASE_URI`) :**
        * Elle construit l'URI de connexion à la base de données PostgreSQL en utilisant les variables d'environnement suivantes :
            * `DB_USER`: Nom d'utilisateur pour la connexion à la base de données.
            * `DB_PWD`: Mot de passe pour la connexion à la base de données.
            * `DB_HOST`: Adresse de l'hôte de la base de données.
            * `DB_PORT`: Port sur lequel écoute la base de données PostgreSQL.
            * `DB_NAME`: Nom de la base de données à utiliser.
        * L'URI est formatée comme une chaîne de caractères f-string pour inclure ces variables d'environnement. **C'est une pratique courante pour externaliser les informations de connexion sensibles.**
    * **Désactivation du suivi des modifications (`SQLALCHEMY_TRACK_MODIFICATIONS`) :**
        * `app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False`: Désactive le suivi des modifications des objets SQLAlchemy par Flask-SQLAlchemy. La documentation recommande de désactiver cette option car elle peut consommer des ressources supplémentaires et est souvent inutile dans les applications Flask plus récentes.
    * **Initialisation de l'application avec l'instance `db` :**
        * `db.init_app(app)`: Lie l'instance `db` de SQLAlchemy à l'application Flask spécifique. Cela permet aux modèles définis avec `db.Model` d'interagir avec la base de données configurée pour cette application.

En résumé, ce fichier `database.py` est responsable de la configuration et de l'initialisation de la connexion à ta base de données PostgreSQL à l'aide de Flask-SQLAlchemy. Il utilise les variables d'environnement pour une configuration plus flexible et sécurisée. L'instance `db` créée ici est le point d'interaction principal avec ta base de données dans le reste de ton application (modèles et routes).

Avec ce dernier fichier, nous avons maintenant une vue d'ensemble complète du backend de ton application ANote. N'hésite pas si tu as des questions ou si tu souhaites aborder une tâche spécifique pour la suite du développement ou la documentation.
"""