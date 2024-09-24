import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Button, Rating, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';

function Product() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/Product");
        const result = await res.json();
        setProducts(result.data); // assuming result.data contains the array of products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    
    fetchProducts();
  }, []);

  return (
    <Box sx={{ flexGrow: 1, padding: '2rem' }}>
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.ptitle}>
            <Card sx={{ maxWidth: 345, boxShadow: '0 4px 20px rgba(0,0,0,0.3)', borderRadius: '15px' }}>
              {/* CardMedia can be used for the future image */}
              <CardMedia
                component="img"
                alt={product.ptitle}
                height="140"
                image="https://via.placeholder.com/150" // placeholder for now
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
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
              <Button variant="contained" color="primary" fullWidth>
                Add to Cart
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Product;

