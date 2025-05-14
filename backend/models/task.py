from ..database import db

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    list = db.Column(db.String(50))
    urgent = db.Column(db.Boolean, default=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def __repr__(self):
        return f"<Task {self.title}>"
    
"""
Merci pour le partage de ton modèle `Task`. Voici mes observations :

* **Importation :** Tu importes correctement l'instance `db` depuis ton fichier `../database.py`.
* **Définition de la classe `Task` :** Elle hérite bien de `db.Model`, ce qui l'associe à Flask-SQLAlchemy.
* **Colonnes :**
    * `id`: Clé primaire auto-incrémentée (entier).
    * `title`: Titre de la tâche (chaîne de caractères, maximum 100, obligatoire).
    * `description`: Description détaillée de la tâche (texte long).
    * `list`: Catégorie ou liste à laquelle appartient la tâche (chaîne de caractères, maximum 50).
    * `urgent`: Indique si la tâche est urgente (booléen, par défaut `False`).
    * `user_id`: Clé étrangère référençant l'ID de l'utilisateur dans la table `user` (entier, obligatoire), établissant ainsi la relation entre une tâche et son propriétaire.
* **`__repr__` méthode :** Cette méthode est bien définie et renvoie une représentation lisible de l'objet `Task`, ce qui est utile pour le débogage.

La structure de ton modèle `Task` semble logique et correspond bien aux besoins d'une application de gestion de tâches. La relation avec le modèle `User` via la clé étrangère `user_id` est essentielle pour s'assurer que les tâches sont associées au bon utilisateur.

**Le prochain fichier que j'aimerais que tu partages est :**

* **`backend/models/user.py`**

Cela nous permettra de comprendre comment les utilisateurs sont définis dans ta base de données et comment l'authentification est gérée au niveau du modèle.
"""