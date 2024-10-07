import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Snackbar, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function UseManag() {
    const [users, setUsers] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
   const navigate = useNavigate()

    useEffect(() => {
        fetch("/api/userDataManag")
            .then((res) => res.json())
            .then((result) => {
                setUsers(result.userdata);
            });
    }, []);

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleDelete = (id) => {
        setUsers(users.filter(user => user._id !== id));
        setSnackbarMessage('User deleted successfully!');
        setSnackbarOpen(true);
    };

    const handleStatusChange = (id) => {
        const userToUpdate = users.find(user => user._id === id);
        const newStatus = userToUpdate.status === 'Active' ? 'Suspended' : 'Active';

        fetch(`/api/userstatusmanag/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: newStatus }),
        })
        .then((res) => res.json())
        .then((result) => {
            if (result.success) {
                setUsers(users.map(user => user._id === id ? { ...user, status: newStatus } : user));
                setSnackbarMessage(`User ${newStatus.toLowerCase()} successfully!`);
                setSnackbarOpen(true);
                navigate  ("/userManag")
            } else {
                setSnackbarMessage('Failed to update user status.');
                setSnackbarOpen(true);
            }
        });
    };

    return (
        <Box sx={{ padding: '2rem', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
            <Typography variant="h4" gutterBottom color="#3f51b5">
                User Management
            </Typography>
            <TableContainer component={Paper} elevation={2} sx={{ borderRadius: '8px' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>First Name</strong></TableCell>
                            <TableCell><strong>Last Name</strong></TableCell>
                            <TableCell><strong>Status</strong></TableCell>
                            <TableCell><strong>Actions</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map(user => (
                            <TableRow key={user._id}>
                                <TableCell>{user.firstName}</TableCell>
                                <TableCell>{user.lastName}</TableCell>
                                <TableCell>{user.userStatus}</TableCell>
                                <TableCell>
                                    <Button 
                                        variant="contained" 
                                        color={user.userStatus === 'Active' ? 'success' : 'error'}
                                        onClick={() => handleStatusChange(user._id)}
                                    >
                                        {user.userStatus === 'Active' ? 'Suspend' : 'Activate'}
                                    </Button>
                                    <Button 
                                        variant="outlined" 
                                        color="error" 
                                        onClick={() => handleDelete(user._id)} 
                                        sx={{ marginLeft: '1rem' }}>
                                        Delete
                                    </Button>
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
        </Box>
    );
}

export default UseManag;
