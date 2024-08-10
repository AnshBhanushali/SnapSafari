from flask import Flask, request, jsonify, send_from_directory
import os
import cv2
from werkzeug.utils import secure_filename


app = Flask(__name__)
