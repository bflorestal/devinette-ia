# API Devinette IA

Avant d'installer les dépendances, créez un environnement virtuel avec les commandes suivantes :

```bash
# Sous Windows
py -3 -m venv .venv
.venv\Scripts\activate

# Sous macOS/Linux
python3 -m venv .venv
. .venv/bin/activate
```

Ensuite, installez les dépendances avec la commande suivante :

```bash
pip install -r requirements.txt
```

Pour lancer le serveur, exécutez l'une des commandes suivantes :

```bash
python app.py
# ou
flask run --host=0.0.0.0
```

En local, le serveur sera accessible à l'adresse suivante : http://localhost:5000
