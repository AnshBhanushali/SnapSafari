import torch
from torchvision import models, transforms
from PIL import Image

# Load a pre-trained model
model = models.resnet50(pretrained=True)
model.eval()

# Define image transformations
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

    return f'Predicted Class Index: {index.item()}'
