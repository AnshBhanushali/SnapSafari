import React from 'react';
import { Box, Typography, Card, CardContent, CardMedia, Button } from '@mui/material';

const AnimalInfo = ({ info }) => {
    return (
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Card sx={{ maxWidth: 345 }}>
                {info.info.thumbnail && (
                    <CardMedia
                        component="img"
                        height="140"
                        image={info.info.thumbnail}
                        alt={info.animal}
                    />
                )}
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {info.animal}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {info.info.extract}
                    </Typography>
                </CardContent>
                <Button
                    size="small"
                    color="primary"
                    href={info.info.url}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn More
                </Button>
            </Card>
        </Box>
    );
};

export default AnimalInfo;
