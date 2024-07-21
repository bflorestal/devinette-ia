from db.db import Db_connector
from classes.user import User

def get_user(username: str) -> User:
    """Récupère un utilisateur avec son nom d'utilisateur.
    
    Args:
        username (str): Nom d'utilisateur de l'utilisateur.
    """
    with Db_connector() as dbc:
        result = dbc.selectOne("users", {"username": username})
    if result is not None:
        return User(result)
    return None

def get_user_by_id(user_id: str) -> User:
    """Récupère un utilisateur avec son id.

    Args:
        user_id (str): Id de l'utilisateur.
    """
    with Db_connector() as dbc:
        result = dbc.selectOne("users", {"_id": user_id})
    if result is not None:
        return User(result)
    return None

def get_all_users() -> list[User]:
    """Récupère tous les utilisateurs de la base de données."""
    with Db_connector() as dbc:
        result = dbc.selectAll("users")
    return [User(user).to_dict() for user in result]

def add_user(username: str):
    """Ajoute un utilisateur à la base de données.
    
    Args:
        username (str): Nom d'utilisateur de l'utilisateur.
    """
    with Db_connector() as dbc:
        dbc.insert("users", {"username": username})

def update_user(user: User):
    """Met à jour un utilisateur dans la base de données.

    Args:
        user (User): Utilisateur à mettre à jour.
    """
    with Db_connector() as dbc:
        dbc.update("users", {"_id": user.id}, {"$set": {"username": user.username}})

def delete_user(user_id: str):
    """Supprime un utilisateur de la base de données.

    Args:
        user_id (str): Id de l'utilisateur à supprimer.
    """
    with Db_connector() as dbc:
        dbc.delete("users", {"_id": user_id})