import React, { useState } from 'react';
import { uploadImage } from '../api/api';
import AnimalInfo from './AnimalInfo';
import { Box, Button, CircularProgress, Typography } from '@mui/material';

const UploadForm = () => {
    const [file, setFile] = useState(null);
    const [animalInfo, setAnimalInfo] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await uploadImage(formData);
            setAnimalInfo(response.data);
        } catch (error) {
            console.error('Error uploading image', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Upload an Animal Picture
            </Typography>
            <form onSubmit={handleSubmit}>
                <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="upload-button"
                />
                <label htmlFor="upload-button">
                    <Button variant="contained" component="span">
                        Choose File
                    </Button>
                </label>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ ml: 2 }}
                    disabled={!file || loading}
                >
                    {loading ? <CircularProgress size={24} /> : 'Upload Image'}
                </Button>
            </form>
            {animalInfo && <AnimalInfo info={animalInfo} />}
        </Box>
    );
};

export default UploadForm;

