from flask import Blueprint, request, jsonify
import db.db_games as db

game_bp = Blueprint('game_bp', __name__)

@game_bp.route("/games", methods=["GET"])
def get_games():
    games = db.get_all_games()
    return jsonify({
        "data": games,
    })

@game_bp.route("/games", methods=["POST"])
def create_game():
    data = request.json

    if not data.get("correct_answer") or not data.get("model") or not data.get("user"):
        return jsonify({
            "error": "Missing data",
        }), 400

    try :
        db.add_game(data)

        return jsonify({
            "message": "Game saved successfully",
        }), 201

    except Exception as e:
        print(e)
        return jsonify({
            "error": "Error while saving the game",
        }), 500
