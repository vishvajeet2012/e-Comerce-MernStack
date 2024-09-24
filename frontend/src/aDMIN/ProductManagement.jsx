import React, { useEffect, useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton, Snackbar, CircularProgress } from "@mui/material";
import Left from "./Left";
import { Link } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function ProductManagement() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("/api/alladminproduct");
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const result = await response.json();
                setProducts(result.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/api/adminProductdelete/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setProducts(products.filter(product => product._id !== id));
                setSnackbarMessage('Product deleted successfully!');
                setSnackbarOpen(true);
            } else {
                throw new Error('Failed to delete product');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    if (loading) return <Typography variant="h4" display={"flex"} justifyContent={"center"} > <CircularProgress/></Typography>;
    if (error) return <Typography color="error" align="center">Error: {error}</Typography>;

    return (
        <div className="w-11/12 flex-col justify-center mx-auto mt-4">
            <Left />
            <div className="w-full mt-4">
                <Typography variant="h4" className="text-center mb-5 font-bold text-gradient">Product Management</Typography>
                <Link to="/Productlist">
                    <Button variant="contained" color="primary" style={{ marginBottom: '20px', boxShadow: '0 4px 8px rgba(0,0,0,0.3)', transition: '0.3s' }}>Add Product Here</Button>
                </Link>
                <TableContainer component={Paper} style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.3)', borderRadius: '15px' }}>
                    <Table>
                        <TableHead>
                            <TableRow style={{ background: 'linear-gradient(to right, #4a90e2, #9013fe)', color: '#fff' }}>
                                <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}><strong>Title</strong></TableCell>
                                <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}><strong>Description</strong></TableCell>
                                <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}><strong>Price</strong></TableCell>
                                <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}><strong>Rating</strong></TableCell>
                                <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}><strong>Actions</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map((product) => (
                                <TableRow key={product._id} hover style={{ transition: 'background 0.3s', '&:hover': { background: '#f0f0f0' } }}>
                                    <TableCell>{product.ptitle}</TableCell>
                                    <TableCell>{product.pdesc}</TableCell>
                                    <TableCell>{`₹${product.pprice}`}</TableCell>
                                    <TableCell>{product.prating}</TableCell>
                                    <TableCell>
                                        <IconButton color="primary" component={Link} to={`/updateproduct/${product._id}`}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton color="error" onClick={() => handleDelete(product._id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Snackbar
                    open={snackbarOpen}
                    onClose={handleSnackbarClose}
                    message={snackbarMessage}
                    autoHideDuration={3000}
                />
            </div>
        </div>
    );
}

export default ProductManagement;
