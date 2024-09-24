import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Button, Rating, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';

function Product() {
    const { id } = useParams(); // Product ID from URL
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`/api/products/${id}`);
                if (!response.ok)   {
                    throw new Error('Failed to fetch product');
                }
                const result = await response.json();
                setProduct(result.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        const fetchRelatedProducts = async () => {
            try {
                const response = await fetch(`/api/relatedProducts/${id}`);
                const result = await response.json();
                setRelatedProducts(result.data);
            } catch (err) {
                console.error("Failed to fetch related products:", err);
            }
        };

        fetchProduct();
        fetchRelatedProducts();
    }, [id]);

    const handleAddToCart = () => {
        // Add to cart functionality here
        console.log('Product added to cart:', product.ptitle);
    };

    if (loading) return <Typography>Loading product...</Typography>;
    if (error) return <Typography color="error">Error: {error}</Typography>;

    return (
        <Box className="flex flex-col items-center">
            {/* Product Details Section */}
            <Card className="w-full max-w-4xl mx-auto my-6 shadow-lg rounded-lg overflow-hidden">
                <CardMedia
                    component="img"
                    height="400"
                    image={product.imageUrl}
                    alt={product.ptitle}
                    className="object-cover"
                />
                <CardContent>
                    <Typography variant="h4" className="text-center mb-2 font-semibold">{product.ptitle}</Typography>
                    <Typography variant="h6" className="text-gray-500 text-center mb-4">{product.pdesc}</Typography>
                    <Typography variant="h5" className="text-center font-bold mb-2">₹{product.pprice}</Typography>
                    <Box className="flex justify-center items-center mb-4">
                        <Rating value={product.prating} readOnly />
                        <Typography variant="body2" className="ml-2">({product.prating})</Typography>
                    </Box>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={handleAddToCart} 
                        className="w-full py-2 text-lg"
                    >
                        Add to Cart
                    </Button>
                </CardContent>
            </Card>

            {/* Related Products Section */}
            <Box className="w-full max-w-6xl mx-auto mt-8">
                <Typography variant="h5" className="font-semibold mb-4">Related Products</Typography>
                <Grid container spacing={4}>
                    {relatedProducts.map((relatedProduct) => (
                        <Grid item xs={12} sm={6} md={4} key={relatedProduct._id}>
                            <Card className="shadow-md rounded-lg">
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={relatedProduct.imageUrl}
                                    alt={relatedProduct.ptitle}
                                    className="object-cover"
                                />
                                <CardContent>
                                    <Typography variant="h6" className="font-medium">{relatedProduct.ptitle}</Typography>
                                    <Typography variant="body1">₹{relatedProduct.pprice}</Typography>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        className="mt-2"
                                        href={`/product/${relatedProduct._id}`}
                                    >
                                        View Product
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}

export default Product;
