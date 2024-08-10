# SnapSafari

SnapSafari is a Flask-based web application that utilizes a PyTorch model to identify animals in images. The app allows users to upload an image, which is then processed by a ResNet50 model to predict the animal species. Additionally, it fetches detailed information about the predicted animal using an external API.

## Project Overview

- **Backend Framework:** Flask
- **Machine Learning Model:** PyTorch (ResNet50)
- **Image Processing:** torchvision
- **External API:** API Ninjas for animal information
- **Deployment:** Docker (optional)

## Features

- Upload an image to get an animal prediction.
- Fetch detailed information about the predicted animal.
- Use of Docker for isolated environment setup.

## Requirements

- Python 3.12+
- Flask
- PyTorch
- torchvision
- Requests
- PIL (Pillow)
- Docker (optional for deployment)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/SnapSafari.git
cd SnapSafari
```

### 2. Set Up a Virtual Environment

Create and activate a virtual environment:

```bash
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
```

### 3. Install Dependencies

Install the required Python packages:

```bash
pip install -r requirements.txt
```

### 4. Create a `.env` File

Create a file named `.env` in the root directory of the project and add your API key:

```
API_KEY=your_api_key_here
```

### 5. Run the Application

To start the Flask application, use the following command:

```bash
python backend/app.py
```

The application will run on `http://127.0.0.1:5000/`.

## Usage

1. **Upload an Image:**
   - Make a POST request to `/upload` with the image file attached.
   - Example using `curl`:

     ```bash
     curl -F "file=@path_to_your_image.jpg" http://127.0.0.1:5000/upload
     ```

2. **Get Response:**
   - The response will include the predicted animal name and detailed information fetched from the API Ninjas.



## Contributing

Feel free to contribute by creating issues, submitting pull requests, or suggesting improvements. Please follow the standard GitHub contribution guidelines.

## License

This project is licensed under the MIT License.

