from flask import Flask, jsonify, request
from flask_cors import CORS
from routes.user_routes import user_bp

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello_world():
    return {"message": "Hello, World!"}

app.register_blueprint(user_bp)

if __name__ == "__main__":
    app.run(host="0.0.0.0")