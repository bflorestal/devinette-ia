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

if __name__ == "__main__":
    app.run(host="0.0.0.0")