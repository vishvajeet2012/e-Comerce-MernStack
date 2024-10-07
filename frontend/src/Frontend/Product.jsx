import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Button, Rating, Grid, Snackbar, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Query from './Query';

function Product() {
    const [products, setProducts] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("/api/Product");
                const result = await res.json();
                setProducts(result.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    const handleAddToCart = (productTitle) => {
        setSnackbarMessage(`${productTitle} has been added to your cart!`);
        setSnackbarOpen(true);
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setSnackbarOpen(false);
    };

    return (
        <>
            <Box sx={{ flexGrow: 1, padding: '2rem' }}>
                <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
                    {products.length > 0 ? (
                        products.map((product) => (
                            <Grid item xs={12} sm={6} md={3} key={product.ptitle}>
                                <Card sx={{
                                    maxWidth: 250,
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                                    borderRadius: '15px',
                                    transition: 'transform 0.3s',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                    }
                                }}>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={`/upload/${product.Productimage}`}
                                        loading="lazy"
                                        alt={product.ptitle}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                                            {product.ptitle}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ marginBottom: '1rem' }}>
                                            {product.pdesc}
                                        </Typography>
                                        <Typography variant="h6" sx={{ marginBottom: '0.5rem' }}>
                                            Price: ₹{product.pprice}
                                        </Typography>
                                        <Rating name="read-only" value={product.prating} readOnly />
                                        <Typography variant="body2" color={product.ProductStatus === 'IN-STOCK' ? 'green' : 'red'}>
                                            {product.ProductStatus}
                                        </Typography>
                                    </CardContent>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        onClick={() => handleAddToCart(product.ptitle)}
                                        sx={{
                                            padding: '10px 0',
                                            borderRadius: '0 0 15px 15px',
                                            fontWeight: 'bold',
                                            '&:hover': {
                                                backgroundColor: '#004c8c'
                                            }
                                        }}
                                    >
                                        Add to Cart
                                    </Button>
                                </Card>
                            </Grid>
                        ))
                    ) : (
                        <Typography variant="h5" sx={{ textAlign: 'center', width: '100%', color: 'gray', marginTop: '2rem' }}>
                            No products available
                        </Typography>
                    )}
                </Grid>

                <Snackbar
                    open={snackbarOpen}
                    onClose={handleSnackbarClose}
                    message={snackbarMessage}
                    autoHideDuration={3000}
                    action={
                        <IconButton size="small" color="inherit" onClick={handleSnackbarClose}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    }
                />
            </Box>

            <Query />
        </>
    );
}

export default Product;
