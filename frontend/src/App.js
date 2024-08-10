import React from 'react';
import Header from './components/Header';
import UploadForm from './components/UploadForm';
import { Container } from '@mui/material';

function App() {
    return (
        <div className="App">
            <Header />
            <Container>
                <UploadForm />
            </Container>
        </div>
    );
}

export default App;
