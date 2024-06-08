import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import Grid from '@mui/material/Grid';
import pageNotFound from '../assets/404-page-not-found.png';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', }} >
            <Container maxWidth="md">
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography variant="h1">404</Typography>
                        <Typography variant="h6">Page Not Found</Typography>
                        <Button x={{ backgroundColor: 'blue', color: 'white' }} startIcon={<HomeIcon />} variant="contained" onClick={() => navigate('/')}>
                            Back Home
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <img src={pageNotFound} alt="" width={500} height={250} />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default ErrorPage;
