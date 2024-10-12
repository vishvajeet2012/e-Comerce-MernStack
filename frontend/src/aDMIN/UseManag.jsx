import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Snackbar, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function UseManag() {
    const [users, setUsers] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetch("/api/userDataManag")
            .then((res) => res.json())
            .then((result) => {
                setUsers(result.userdata);
            });
    }, [users]);

    const handleSnackbarClose = () => {
        setSnackbarOpen(false)
    };

 function   handleDelete(id){
        fetch(`/api/userEntryid/${id}`,{
            method:"DELETE",
        }).then((res)=>{
            return res.json()
        }).then((data)=>{
     
            console.log(data.message)
           
                toast.success(data.message)
        
        })
    }

    /// handle active status
    const handleActiveStatus = (id) => {
        const userToUpdate = users.find(user => user._id === id);
        const newActiveStatus = userToUpdate.userStatus !== 'Active' ? 'Active' : 'Suspended';

        fetch(`/api/userActivestatus/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: newActiveStatus }),
        })
        .then((res) => res.json())
        .then((result) => {
            if (result.success) {
                setUsers(users.map(user => user._id === id ? { ...user, userStatus: newActiveStatus } : user));
                setSnackbarMessage(`User ${newActiveStatus.toLowerCase()} successfully!`);
                setSnackbarOpen(true);
            } else {
                setSnackbarMessage('Failed to update user status.');
                setSnackbarOpen(true);
            }
        });
    };

    /// handle suspended status
    const handleStatusChange = (id) => {
        const userToUpdate = users.find(user => user._id === id);
        const newStatus = userToUpdate.userStatus === 'Suspended' ? 'Active' : 'Suspended';

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
                setUsers(users.map(user => user._id === id ? { ...user, userStatus: newStatus } : user));
                setSnackbarMessage(`User ${newStatus.toLowerCase()} successfully!`);
                setSnackbarOpen(true);
                navigate("/userManag");
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
                                <TableCell >
                                    <Button 
                                        variant="contained" 
                                        color={'error'}
                                        onClick={() => handleStatusChange(user._id)}
                                    >
                                        Suspend
                                    </Button>
                                    <Button 
                                        variant="contained" 
                                        color={'success'}
                                        onClick={() => handleActiveStatus(user._id)}
                                    >
                                        Active
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
