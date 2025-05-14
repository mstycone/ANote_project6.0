from flask import Blueprint, jsonify, request
from ..database import db
from ..models.task import Task
from flask_jwt_extended import jwt_required, get_jwt_identity

task_bp = Blueprint('tasks', __name__)

@task_bp.route('/', methods=['GET'])
@jwt_required()  # Protège cette route need token pour accéder à route
def get_tasks():
    current_user_id = int(get_jwt_identity())
    print(f'Type de current_user_id: {type(current_user_id)}') 
    tasks = Task.query.filter_by(user_id=current_user_id).all()
    task_list = [{
        'id': task.id, 
        'title': task.title, 
        'description': task.description, 
        'list': task.list, 
        'urgent': task.urgent
    } for task in tasks]
    return jsonify(task_list), 200

@task_bp.route('/', methods=['POST'])
@jwt_required()  # Protège cette route
def create_task():
    current_user_id = int(get_jwt_identity())
    data = request.get_json()
    title = data.get('title')
    description = data.get('description')
    list_content = data.get('list')
    urgent = data.get('urgent', False)

    if not title:
        return jsonify({'msg': 'Title is required'}), 400

    new_task = Task(user_id=current_user_id, title=title, description=description, list=list_content, urgent=urgent)
    db.session.add(new_task)
    db.session.commit()
    return jsonify({'id': new_task.id, 'title': new_task.title, 'description': new_task.description, 'list': new_task.list, 'urgent': new_task.urgent}), 201

@task_bp.route('/<int:task_id>', methods=['PUT'])
@jwt_required()  # Protège cette route
def update_task(task_id):
    current_user_id = int(get_jwt_identity())
    task = Task.query.filter_by(id=task_id, user_id=current_user_id).first()
    if not task:
        return jsonify({'msg': 'Task not found or not authorized'}), 404

    data = request.get_json()
    task.title = data.get('title', task.title)
    task.description = data.get('description', task.description)
    task.list = data.get('list', task.list)
    task.urgent = data.get('urgent', task.urgent)
    db.session.commit()
    return jsonify({'id': task.id, 'title': task.title, 'description': task.description, 'list': task.list, 'urgent': task.urgent}), 200

@task_bp.route('/<int:task_id>', methods=['DELETE'])
@jwt_required()  # Protège cette route
def delete_task(task_id):
    current_user_id = int(get_jwt_identity())
    task = Task.query.filter_by(id=task_id, user_id=current_user_id).first()
    if not task:
        return jsonify({'msg': 'Task not found or not authorized'}), 404
    db.session.delete(task)
    db.session.commit()
    return jsonify({'msg': 'Task deleted'}), 200

@task_bp.route('/urgent', methods=['GET'])
@jwt_required()  # Protège cette route
def get_urgent_tasks():
    current_user_id = int(get_jwt_identity())
    urgent_tasks = Task.query.filter_by(user_id=current_user_id, urgent=True).all()
    urgent_task_list = [{'id': task.id, 'title': task.title, 'description': task.description, 'list': task.list, 'urgent': task.urgent} for task in urgent_tasks]
    return jsonify(urgent_task_list), 200

"""
Merci pour le partage de ton fichier `task.py`. Voici une description détaillée de son contenu :

* **Importations :**
    * `Blueprint`, `jsonify`, et `request` de Flask : Utilisés pour définir les routes, créer des réponses JSON et accéder aux données de la requête.
    * `db` de `..database` : L'instance de la base de données Flask-SQLAlchemy, utilisée pour interagir avec la base de données.
    * `Task` de `..models.task` : Le modèle de données pour les tâches, défini dans un autre fichier.
    * `jwt_required` et `get_jwt_identity` de `flask_jwt_extended` : Utilisés pour protéger les routes avec l'authentification JWT et récupérer l'identité de l'utilisateur à partir du token.
* **Blueprint `task_bp` :**
    * Crée un Blueprint nommé `tasks` avec le préfixe d'URL `/tasks`. Cela permet d'organiser les routes liées aux tâches.
* **Route `/` (GET) - `get_tasks()` :**
    * Définit une route pour récupérer toutes les tâches de l'utilisateur connecté.
    * `@jwt_required()`: Protège cette route, exigeant un token JWT valide dans l'en-tête de la requête.
    * `get_jwt_identity()`: Récupère l'ID de l'utilisateur à partir du token JWT.
    * `int(get_jwt_identity())`: Convertit l'identité de l'utilisateur en un entier.
    * `Task.query.filter_by(user_id=current_user_id).all()`: Récupère toutes les tâches associées à l'utilisateur connecté.
    * Crée une liste de dictionnaires, où chaque dictionnaire représente une tâche avec ses attributs.
    * `jsonify(task_list), 200`: Renvoie la liste des tâches au format JSON avec un code de statut 200 OK.
* **Route `/` (POST) - `create_task()` :**
    * Définit une route pour créer une nouvelle tâche.
    * `@jwt_required()`: Protège cette route.
    * Récupère l'ID de l'utilisateur à partir du token JWT.
    * Récupère les données de la tâche (titre, description, liste, urgence) à partir du corps de la requête JSON.
    * Effectue une validation : vérifie si le titre est fourni (obligatoire).
    * Crée une nouvelle instance de `Task` avec les données fournies et l'ID de l'utilisateur connecté.
    * Ajoute la nouvelle tâche à la session de la base de données et enregistre les modifications.
    * Renvoie les données de la nouvelle tâche au format JSON avec un code de statut 201 Created.
* **Route `/<int:task_id>` (PUT) - `update_task(task_id)` :**
    * Définit une route pour mettre à jour une tâche existante, où `task_id` est l'ID de la tâche à mettre à jour.
    * `@jwt_required()`: Protège cette route.
    * Récupère l'ID de l'utilisateur à partir du token JWT.
    * `Task.query.filter_by(id=task_id, user_id=current_user_id).first()`: Récupère la tâche avec l'ID spécifié et appartenant à l'utilisateur connecté.
    * Si la tâche n'est pas trouvée ou n'appartient pas à l'utilisateur, renvoie une erreur 404 Not Found.
    * Met à jour les attributs de la tâche avec les données fournies dans le corps de la requête JSON (si elles sont présentes).
    * Enregistre les modifications dans la base de données.
    * Renvoie les données de la tâche mise à jour au format JSON avec un code de statut 200 OK.
* **Route `/<int:task_id>` (DELETE) - `delete_task(task_id)` :**
    * Définit une route pour supprimer une tâche, où `task_id` est l'ID de la tâche à supprimer.
    * `@jwt_required()`: Protège cette route.
    * Récupère l'ID de l'utilisateur à partir du token JWT.
    * Récupère la tâche avec l'ID spécifié et appartenant à l'utilisateur connecté.
    * Si la tâche n'est pas trouvée ou n'appartient pas à l'utilisateur, renvoie une erreur 404 Not Found.
    * Supprime la tâche de la session de la base de données et enregistre les modifications.
    * Renvoie un message de succès au format JSON avec un code de statut 200 OK.
* **Route `/urgent` (GET) - `get_urgent_tasks()` :**
    * Définit une route pour récupérer toutes les tâches urgentes de l'utilisateur connecté.
    * `@jwt_required()`: Protège cette route.
    * Récupère l'ID de l'utilisateur à partir du token JWT.
    * `Task.query.filter_by(user_id=current_user_id, urgent=True).all()`: Récupère toutes les tâches urgentes de l'utilisateur connecté.
    * Crée une liste de dictionnaires représentant les tâches urgentes.
    * Renvoie la liste des tâches urgentes au format JSON avec un code de statut 200 OK.

Dans l'ensemble, ce fichier `task.py` implémente une API RESTful complète pour gérer les tâches, avec des routes pour récupérer, créer, mettre à jour et supprimer des tâches, ainsi qu'une route pour récupérer les tâches urgentes. Toutes les routes sont protégées par JWT, garantissant que seules les utilisateurs authentifiés peuvent accéder à leurs propres tâches.

J'espère que cette description est utile ! N'hésite pas si tu as des questions sur une partie spécifique du code.

**Le dernier fichier que j'aimerais que tu partages est :**

* **`backend/database.py`**

Avec ce fichier, nous aurons une vue d'ensemble complète de ton backend.
"""