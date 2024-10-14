import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box, Divider, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function AddToCart() {
    // Product details
    const productName = "Product Name";
    const productPrice = 499.99;
    const productQuantity = 2;
    const productImageUrl = "https://via.placeholder.com/150"; // Replace with actual image URL
    const totalPrice = productPrice * productQuantity;

    return (
        <Card sx={{ maxWidth: 400, mx: 'auto', mt: 4, boxShadow: 3, p: 2 }}>
            <Typography variant="h5" component="div" sx={{ mb: 2 }}>
                Your Cart
            </Typography>
            
            {/* Product Image & Details */}
            <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                <CardMedia
                    component="img"
                    sx={{ width: 80, height: 80, mr: 2 }}
                    image={productImageUrl}
                    alt={productName}
                />
                <Box sx={{ flex: 1 }}>
                    <Typography variant="body1">{productName}</Typography>
                    <Typography variant="body2" color="text.secondary">
                        Price: ${productPrice.toFixed(2)} x {productQuantity}
                    </Typography>
                </Box>
                {/* Delete Button */}
                <IconButton aria-label="delete" color="error">
                    <DeleteIcon />
                </IconButton>
            </CardContent>

            <Divider />

            {/* Total Price */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Typography variant="h6">Total:</Typography>
                <Typography variant="h6">${totalPrice.toFixed(2)}</Typography>
            </Box>

            {/* Checkout Button */}
            <Button 
                variant="contained" 
                color="primary" 
                fullWidth 
                sx={{ mt: 3, backgroundColor: '#4A90E2', '&:hover': { backgroundColor: '#357ABD' } }}
            >
                Proceed to Checkout
            </Button>
        </Card>
    );
}

export default AddToCart;
