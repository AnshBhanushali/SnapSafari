from flask import Flask, request, jsonify, send_from_directory
import os
from werkzeug.utils import secure_filename
from flask_cors import CORS
from model.animal_model import predict_animal
from utils.api_utils import get_animal_info

app = Flask(__name__)

CORS(app) 

app.config.from_object('config.Config')

@app.route('/')
def index():
    return "Welcome to the Animal Prediction API!"

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    filename = secure_filename(file.filename)
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(filepath)

    animal_name = predict_animal(filepath)

    animal_info = get_animal_info(animal_name)

    return jsonify({'animal': animal_name, 'info': animal_info})

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

if __name__ == '__main__':
    app.run(debug=True)
