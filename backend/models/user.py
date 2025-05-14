from ..database import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    tasks = db.relationship('Task', backref='user', lazy=True)

    def __repr__(self):
        return f"<User {self.username}>"
    
"""
Merci pour le partage de ton modèle `User`. Voici mes observations :

* **Importation :** Tu importes correctement l'instance `db` depuis `../database.py`.
* **Définition de la classe `User` :** Elle hérite bien de `db.Model`.
* **Colonnes :**
    * `id`: Clé primaire auto-incrémentée (entier).
    * `username`: Nom d'utilisateur (chaîne de caractères, maximum 80, unique, obligatoire). L'unicité est importante pour l'identification des utilisateurs.
    * `password`: Mot de passe hashé de l'utilisateur (chaîne de caractères, maximum 255, obligatoire). Il est crucial de stocker les mots de passe sous forme de hachage sécurisé (comme avec `bcrypt`) et non en clair.
    * `tasks`: Relation avec le modèle `Task`. `db.relationship('Task', backref='user', lazy=True)` établit un lien entre un utilisateur et ses tâches.
        * `'Task'`: Indique le modèle avec lequel établir la relation.
        * `backref='user'`: Permet d'accéder à l'utilisateur depuis un objet `Task` via l'attribut `task.user`.
        * `lazy=True`: Signifie que les tâches d'un utilisateur seront chargées uniquement lorsqu'on y accédera explicitement (ce qui est une bonne pratique pour la performance).
* **`__repr__` méthode :** Bien définie pour une représentation lisible de l'objet `User`.

La structure de ton modèle `User` est solide pour gérer les utilisateurs et leurs relations avec les tâches. L'inclusion d'un nom d'utilisateur unique et le stockage du mot de passe (j'espère sous forme de hachage) sont des éléments essentiels pour l'authentification. La relation avec le modèle `Task` est également bien configurée.

**Le prochain fichier que j'aimerais que tu partages est :**

* **`backend/routes/auth.py`**

Cela nous permettra de voir comment tu gères l'enregistrement des utilisateurs et la création des tokens JWT lors de la connexion. C'est un élément clé pour comprendre le flux d'authentification de ton application.
"""