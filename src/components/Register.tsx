import { SERVER_URL } from "../constants";
import { Button, Stack } from "@mui/material";
import React, { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { IUser } from "../interfaces";


export default function Register() {
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

    const handleSubmit = async () => {
        const config = {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(user)
        };
        try {
            const response = await fetch(SERVER_URL + '/register', config);
            if (response.ok) handleClose();
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Button variant="contained" sx={{ display: 'flex', marginLeft: 2 + 'px' }} onClick={handleOpen} >Register</Button>
            <Dialog open={open} onClose={handleClose} fullWidth>

                <DialogTitle>Register</DialogTitle>
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
                    <Button onClick={handleSubmit} >Register</Button>
                </DialogActions>


            </Dialog>
        </>
    )

}