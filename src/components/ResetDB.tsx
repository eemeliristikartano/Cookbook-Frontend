import { Button } from "@mui/material";
import { SERVER_URL } from "../constants";
import Snackbar from '@mui/material/Snackbar';
import { useState } from "react";

export default function ResetDB() {
    const [message, setMessage] = useState('');
    const [alertOpen, setAlertOpen] = useState(false);

    const handleDBReset = async () => {
        const config = {
            method: 'POST'
        };
        try {
            const response = await fetch(SERVER_URL + '/reset', config);
            if (response.ok) {
                setMessage('Database reset done!');
                handleAlertOpen();
            } else {
                setMessage('Something went wrong with resetting the database.');
                handleAlertOpen();
            }
        } catch (error) {
            console.log(error)
        }
    }

    // Alert for user.
    const handleAlertOpen = () => setAlertOpen(!alertOpen);

    const handleAlertClose = () => setAlertOpen(!alertOpen);

    return (
        <>
            <Button variant='contained' sx={{ width: 25 + '%', display: 'flex', alignSelf: 'center' }} onClick={() => handleDBReset()} >Reset database</Button>
            <Snackbar open={alertOpen} autoHideDuration={5000} message={message} onClose={handleAlertClose} />
        </>
    )
}