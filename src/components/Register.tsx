import { SERVER_URL } from "../constants";
import { Button, Stack } from "@mui/material";
import { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import { IUser } from "../interfaces";
import Snackbar from '@mui/material/Snackbar';


export default function Register() {
    const [open, setOpen] = useState(false);
    // State for alerts.
    const [alertOpen, setAlertOpen] = useState(false);
    // State for messages.
    const [message, setMessage] = useState('');
    // State for validating password.
    const [isPasswordValid, setIsPasswordValid] = useState({
        isValid: false,
        errorMessage: ''
    });
    // State fot validating username.
    const [isUsernameValid, setIsUsernameIsValid] = useState({
        isValid: false,
        errorMessage: ''
    });
    const [user, setUser] = useState<IUser>({
        username: '',
        password: '',
        passwordCheck: ''
    });

    // Opend dialog for registering.
    const handleOpen = () => setOpen(!open);

    // Closes registering dialog.
    const handleClose = () => setOpen(!open)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        handleUsernameValidation();
        handlePassWordValidation();
    }, [user]);

    // Emptys states after successfully saving a new user to database.
    const resetStates = () => {
        setUser({
            username: '',
            password: '',
            passwordCheck: ''
        });
        setIsPasswordValid({
            isValid: false,
            errorMessage: ''
        });
        setIsUsernameIsValid({
            isValid: false,
            errorMessage: ''
        });
    }

    const handleSubmit = async () => {
        // It the passwords match and if the username is valid and if the password is valid, send data to backend. Data is also validated on the backend.
        if (user.password === user.passwordCheck && isUsernameValid.isValid && isPasswordValid.isValid) {
            const config = {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(user)
            };
            try {
                const response = await fetch(SERVER_URL + '/register', config);
                // If saving the user is success.
                if (response.ok) {
                    // Close dialog.
                    handleClose();
                    // Message for alert.
                    setMessage('Success. You can now log in!');
                    // Show alert.
                    handleAlertOpen();
                    // Empty the states.
                    resetStates();

                    // If the username is already in use.
                } else if (response.status === 409) {
                    setMessage('Username is already in use.')
                    handleAlertOpen();

                    // If the password didn't match.
                } else if (response.status === 400) {
                    setMessage("Passwords didn't match.")
                    handleAlertOpen();
                } else {
                    setMessage('Something went wrong.');
                    handleAlertOpen();
                }
            } catch (error) {
                console.log(error)
            }
        }

    }

    /* 
    * Handles username validation.
    */

    const handleUsernameValidation = () => {
        // If the username length is 0.                                                             Errormessage to the user.
        if (user.username.length === 0) setIsUsernameIsValid({ ...isUsernameValid, isValid: false, errorMessage: 'Insert an username.' });
        // If the username length is too short.                                                                                   Errormessage to the user.
        else if (user.username.length > 0 && user.username.length < 5) setIsUsernameIsValid({ ...isUsernameValid, isValid: false, errorMessage: 'Username is too short! Minium length is 5 characters.' });
        // If the username length is too long                                                          Errormessage to the user.
        else if (user.username.length > 20) setIsUsernameIsValid({ ...isUsernameValid, isValid: false, errorMessage: 'Username is too long! Maximum length is 20 characters.' });
        // If the username is valid.
        else setIsUsernameIsValid({ ...isUsernameValid, isValid: true, errorMessage: '' });
    }

    /* 
    * Handles password validation.
    */

    const handlePassWordValidation = () => {
        if (user.password !== undefined) {
            // If the password length is 0.
            if (user.password?.length === 0) setIsPasswordValid({ ...isPasswordValid, isValid: false, errorMessage: 'Insert a password.' });
            // If the password is too short.
            else if (user.password?.length > 0 && user.password?.length < 7) setIsPasswordValid({ ...isPasswordValid, isValid: false, errorMessage: 'Password is too short! Minimum length is 7 characters.' });
            // If the password is too long.
            else if (user.password.length > 32) setIsPasswordValid({ ...isPasswordValid, isValid: false, errorMessage: 'Password is too long! Maximum length is 32 characters.' });
            // If the password is valid.
            else setIsPasswordValid({ ...isUsernameValid, isValid: true, errorMessage: '' });
        }
    }

    // Alert for user.
    const handleAlertOpen = () => setAlertOpen(!alertOpen);

    const handleAlertClose = () => setAlertOpen(!alertOpen);

    return (
        <>
            <Button variant="contained" sx={{ display: 'flex', marginLeft: 2 + 'px' }} onClick={handleOpen} >Register</Button>
            <Dialog open={open} onClose={handleClose} fullWidth>

                <DialogTitle>Register</DialogTitle>
                <DialogContent dividers>
                    <Stack spacing={3}>
                        <DialogContentText>
                            Right now the database is an in-memory database, so every time server sleeps, the database resets. Saved accounts will be gone after the reset.
                            There are test accounts on 'INSTURCTIONS' tab.
                        </DialogContentText>
                        <TextField
                            label='Username'
                            name='username'
                            value={user.username}
                            onChange={handleChange}
                            error={!isUsernameValid.isValid}
                            helperText={isUsernameValid.errorMessage}
                        />
                        <TextField
                            label='Password'
                            name='password'
                            value={user.password}
                            onChange={handleChange}
                            type='password'
                            error={!isPasswordValid.isValid}
                            helperText={isPasswordValid.errorMessage}
                        />
                        <TextField
                            label='Password again'
                            name='passwordCheck'
                            value={user.passwordCheck}
                            onChange={handleChange}
                            type='password'
                            // If the passwords don't match and password is not unfedined and length of the password is greater than 0 -> error
                            error={user.password !== user.passwordCheck && user.password !== undefined && user.password?.length > 0}
                            // If the passwords don't match and password is not unfedined and length of the password is greater than 0 -> helper text for the user.
                            helperText={user.password !== user.passwordCheck && user.password !== undefined && user.password?.length > 0 && 'Password dont match'}
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                    {/*               If the passwords don't match and the username is not valid and the password is not valid -> Register-button is disabled. */}
                    <Button disabled={user.password !== user.passwordCheck || !isUsernameValid.isValid || !isPasswordValid.isValid} onClick={handleSubmit} >Register</Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={alertOpen} autoHideDuration={5000} message={message} onClose={handleAlertClose} />
        </>
    )

}