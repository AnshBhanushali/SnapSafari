import React, { useState } from 'react';
import axios from 'axios';
import './UploadForm.css';

function UploadForm() {
    const [animalInfo, setAnimalInfo] = useState(null);
    const [error, setError] = useState('');
    const [isDragging, setIsDragging] = useState(false);

    const handleFileChange = (event) => {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            const formData = new FormData();
            formData.append('file', file);
            setError('');
            handleFileUpload(formData);
        } else {
            setError('Please select a valid file.');
        }
    };

    const handleFileUpload = async (formData) => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setAnimalInfo(response.data);
        } catch (error) {
            setError('Failed to upload file or retrieve animal information.');
            console.error('Error uploading file:', error);
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setIsDragging(false);
        if (event.dataTransfer.files.length > 0) {
            const file = event.dataTransfer.files[0];
            const formData = new FormData();
            formData.append('file', file);
            setError('');
            handleFileUpload(formData);
        } else {
            setError('Please drop a valid file.');
        }
    };

    const renderAnimalInfo = (info) => {
        return Object.keys(info).map((key) => {
            const value = info[key];
            if (typeof value === 'object' && value !== null) {
                return (
                    <div key={key} className="animal-info-section">
                        <h4>{key.charAt(0).toUpperCase() + key.slice(1)}</h4>
                        {renderAnimalInfo(value)}
                    </div>
                );
            }
            return (
                <p key={key}><strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}</p>
            );
        });
    };

    return (
        <div className="upload-form-container">
            <h1 className="title">Animal Identifier</h1>

            <div
                className={`dropzone ${isDragging ? 'dragging' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <p>Drag & Drop your image here, or</p>
                <input
                    type="file"
                    className="file-input"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    id="file-upload"
                />
                <label htmlFor="file-upload" className="upload-button">
                    Browse
                </label>
            </div>

            {error && <p className="error">{error}</p>}

            {animalInfo && (
                <div className="animal-info-card">
                    <h2 className="animal-name">{animalInfo.animal}</h2>
                    {renderAnimalInfo(animalInfo.info[0] || {})}
                </div>
            )}
        </div>
    );
}

export default UploadForm;
