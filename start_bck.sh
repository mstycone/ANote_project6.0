#Démarrer le service bdd 
brew services start postgresql

#Lancer serveur backend 
flask --app backend/app.py run --debug
