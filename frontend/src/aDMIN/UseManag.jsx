import React, { useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Snackbar } from '@mui/material';

const initialUsers = [
    { id: 1, username: 'User1', status: 'Active' },
    { id: 2, username: 'User2', status: 'Suspended' },
    { id: 3, username: 'User3', status: 'Active' },
];

function UseManag() {
    const [users, setUsers] = useState(initialUsers);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

            fetch("/api/userDataManag").then((res)=>{
                return res.json()
            }).then((result)=>{
             setUsers(result.userdata)
            })

    return (
        <>
            <Box sx={{ padding: '2rem' }}>
                <Typography variant="h4" gutterBottom>
                    User Management
                </Typography>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell >Username</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map(user => (
                                <TableRow key={user._id}>
                                    <TableCell>{user.firstName}</TableCell>
                                    <TableCell>{user.lastName}</TableCell>
                                    <TableCell>{user.userEmail}</TableCell>
                                    <TableCell>
                                        <Button 
                                          
                                        >
                                          rating 
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Snackbar
                    // open={snackbarOpen}
                    // onClose={handleSnackbarClose}
                    // message={snackbarMessage}
                    // autoHideDuration={3000}
                />
            </Box>
        </>
    );
}

export default UseManag;
