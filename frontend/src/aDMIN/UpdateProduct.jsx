import React, { useEffect, useState } from 'react';
import { TextField, Button, Typography, Box, Snackbar } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateProduct() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [value, setValue] = useState({
        ptitle: '',
        pdesc: '',
        pprice: '',
        prating: '',
    });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`/api/updateadminProduct/${id}`);
                const result = await response.json();
                if (response.ok) {
                    setValue(result.data);
                } else {
                    console.error("Failed to fetch product:", result.message);
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        fetchProduct();
    }, [id]);

    const handleUpdate = (e) => {
        e.preventDefault();
        fetch(`/api/updatesingleproduct/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(value),
        })
        .then((res) => {
            if (res.ok) {
                setSnackbarMessage('Product updated successfully!');
                setSnackbarOpen(true);
                navigate("/PrdouctMang");
            } else {
                console.error("Failed to update product");
            }
        })
        .catch((error) => {
            console.error("Error updating product:", error);
        });
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Box
            component="form"
            onSubmit={handleUpdate}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 4,
                borderRadius: 2,
                boxShadow: 3,
                backgroundColor: '#fff',
                maxWidth: '400px',
                margin: 'auto',
            }}
        >
            <Typography variant="h5" sx={{ marginBottom: 2 }}>
                Update Product
            </Typography>
            <TextField
                label="Title"
                variant="outlined"
                fullWidth
                margin="normal"
                value={value.ptitle}
                onChange={(e) => setValue({ ...value, ptitle: e.target.value })}
            />
            <TextField
                label="Description"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                margin="normal"
                value={value.pdesc}
                onChange={(e) => setValue({ ...value, pdesc: e.target.value })}
            />
            <TextField
                label="Price"
                variant="outlined"
                type="number"
                fullWidth
                margin="normal"
                value={value.pprice}
                onChange={(e) => setValue({ ...value, pprice: e.target.value })}
            />
            <TextField
                label="Rating"
                variant="outlined"
                type="number"
                inputProps={{ min: 1, max: 5 }}
                fullWidth
                margin="normal"
                value={value.prating}
                onChange={(e) => setValue({ ...value, prating: e.target.value })}
            />
            <Button
                variant="contained"
                color="primary"
                sx={{ marginTop: 2 }}
                type="submit"
            >
                Update Product
            </Button>

            <Snackbar
                open={snackbarOpen}
                onClose={handleSnackbarClose}
                message={snackbarMessage}
                autoHideDuration={3000}
            />
        </Box>
    );
}

export default UpdateProduct;
