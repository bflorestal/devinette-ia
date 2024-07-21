from flask import Flask, jsonify, request
from flask_cors import CORS
import db.db_login as db

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello_world():
    return {"message": "Hello, World!"}

@app.route("/users", methods=["GET"])
def get_users():
    users = db.get_all_users()
    return jsonify({
        "data": users,
    })

@app.route("/users", methods=["POST"])
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

if __name__ == "__main__":
    app.run(host="0.0.0.0")