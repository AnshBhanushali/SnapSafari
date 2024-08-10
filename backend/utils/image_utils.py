from PIL import Image

def resize_image(image_path, output_size=(224, 224)):

    image = Image.open(image_path)
    resized_image = image.resize(output_size)
    return resized_image

def convert_to_grayscale(image_path):
    
    image = Image.open(image_path)
    grayscale_image = image.convert("L")
    return grayscale_image
