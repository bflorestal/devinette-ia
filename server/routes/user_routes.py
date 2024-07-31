from flask import Blueprint, request, jsonify
import db.db_login as db

user_bp = Blueprint('user_bp', __name__)

@user_bp.route("/users", methods=["GET"])
def get_users():
    users = db.get_all_users()
    return jsonify({
        "data": users,
    })

@user_bp.route("/users", methods=["POST"])
def create_user():
    data = request.json

    if not data.get("username"):
        return jsonify({
            "error": "Missing data",
        }), 400

    user_id = db.add_user({"username": data["username"]})
    return jsonify({
        "message": "User created successfully",
        "data": {
            "id": user_id,
            **data,
        }
    }), 201
