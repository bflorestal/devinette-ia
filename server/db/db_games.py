from db.db import Db_connector
from classes.game import Game

def get_game_by_id(game_id: str) -> Game:
    """Récupère un partie avec son id.

    Args:
        game_id (str): Id de l'partie.
    """
    with Db_connector() as dbc:
        result = dbc.selectOne("games", {"_id": game_id})
    if result is not None:
        return Game(result)
    return None

def get_all_games() -> list[Game]:
    """Récupère tous les parties de la base de données."""
    with Db_connector() as dbc:
        result = dbc.selectAll("games")
    return [game(game).to_dict() for game in result]

def add_game(data: Game) -> str:
    """Ajoute un partie à la base de données.
    """
    with Db_connector() as dbc:
        result = dbc.insert("games", data)
    return result
