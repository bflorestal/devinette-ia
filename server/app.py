from flask import Flask, jsonify, request
from flask_cors import CORS

import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import os
import io

from routes.user_routes import user_bp

# IA
model = load_model("ai_models/animal_classifier_model_224x.h5")
class_names = ["butterfly", "cat", "chicken", "cow", "dog", "elephant", "horse", "sheep", "spider", "squirrel"]
IMG_SIZE = 224

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello_world():
    return {"message": "Hello, World!"}

@app.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "Veuillez envoyer un fichier"}), 400

    file = request.files["file"]

    if file.filename == "":
        return jsonify({"error": "Fichier non valide"}), 400
    
    print(f"Fichier reçu : {file.filename}")

    try:
        # Lire le fichier image depuis FileStorage
        img_bytes = file.read()
        img = image.load_img(io.BytesIO(img_bytes), target_size=(IMG_SIZE, IMG_SIZE))

        # Convertir l'image en tableau numpy
        img_array = image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0) / 255.0

        # Prédiction
        predictions = model.predict(img_array)

        print(predictions)

        predicted_class = class_names[np.argmax(predictions[0])]

        return jsonify({
            "prediction": predicted_class,
            "data": predictions.tolist()
        })
    except Exception as e:
        print(e)
        return jsonify({"error": "Erreur lors de la prédiction"}), 500

# Autres routes
app.register_blueprint(user_bp)

if __name__ == "__main__":
    app.run(host="0.0.0.0")