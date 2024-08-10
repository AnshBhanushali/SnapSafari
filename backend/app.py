from flask import Flask, request, jsonify
import os
import requests
import json  
from werkzeug.utils import secure_filename
from flask_cors import CORS
from torchvision import models, transforms
from PIL import Image
import torch

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = os.path.expanduser('~/uploads')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

API_KEY = os.getenv('API_KEY')

LABELS_URL = "https://raw.githubusercontent.com/anishathalye/imagenet-simple-labels/master/imagenet-simple-labels.json"
imagenet_labels = requests.get(LABELS_URL).json()

model = models.resnet50(pretrained=True)
model.eval()

preprocess = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
])

def predict_animal(image_path):

    image = Image.open(image_path)
    input_tensor = preprocess(image)
    input_batch = input_tensor.unsqueeze(0)

    with torch.no_grad():
        output = model(input_batch)
    _, index = torch.max(output, 1)

    predicted_animal_name = imagenet_labels[index.item()]

    return predicted_animal_name

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

    predicted_animal_name = predict_animal(filepath)

    api_url = f'https://api.api-ninjas.com/v1/animals?name={predicted_animal_name}'
    response = requests.get(api_url, headers={'X-Api-Key': API_KEY})

    if response.status_code == requests.codes.ok:
        animal_info = response.json()
        print("API Response:", animal_info)  
    else:
        animal_info = {
            "error": f"Failed to retrieve animal info: {response.status_code} {response.text}"
        }

    return jsonify({'animal': predicted_animal_name, 'info': animal_info})

if __name__ == '__main__':
    app.run(debug=True)
