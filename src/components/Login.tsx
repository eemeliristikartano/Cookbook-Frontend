import { SERVER_URL } from "../constants";
import { Button, Stack } from "@mui/material";
import React, { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { IUser } from "../interfaces";

export default function Login({ handleIsAuthenticated }: any) {
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState<IUser>({
        username: '',
        password: ''
    });

    const handleOpen = () => setOpen(!open);

    const handleClose = () => setOpen(!open)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const handleLogin = async () => {
        const config = {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(user)
        };
        try {
            const response = await fetch(SERVER_URL + '/login', config);
            const jwtToken = response.headers.get("Authorization")
            if (jwtToken !== null) {
                sessionStorage.setItem('jwt-token', jwtToken); // Setting the token to session storage.
                handleIsAuthenticated(); // Set isAuthenticate to true.
                handleClose();
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Button variant="contained" sx={{ display: 'flex' }} onClick={handleOpen} >Log in</Button>
            <Dialog open={open} onClose={handleClose} fullWidth>

                <DialogTitle>Log in</DialogTitle>
                <DialogContent dividers>
                    <Stack spacing={3}>
                        <TextField
                            label='Username'
                            name='username'
                            value={user.username}
                            onChange={handleChange}
                        />
                        <TextField
                            label='Password'
                            name='password'
                            value={user.password}
                            onChange={handleChange}
                            type='password'
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                    <Button onClick={handleLogin} >Log in</Button>
                </DialogActions>


            </Dialog>
        </>
    )

}