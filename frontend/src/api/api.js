import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5000',
    timeout: 10000, 
});

export const uploadImage = (formData) => {
    return instance.post('/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export default instance;
