from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)

@app.route("/")
def hello_world():
    return {"message": "Hello, World!"}