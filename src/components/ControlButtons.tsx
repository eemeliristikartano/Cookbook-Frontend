import Grid2 from '@mui/material/Unstable_Grid2';
import Fab from '@mui/material/Fab';
import Login from './Login';
import Register from './Register';

interface IControlButtons {
    handleLogOut: () => void
    handleIsAuthenticated: () => void
}

export default function ControlButtons({ handleLogOut, handleIsAuthenticated }: IControlButtons) {
    if (sessionStorage.getItem('jwt-token') !== null) {
        return <Fab color='error' sx={{ position: 'fixed', bottom: 20 + 'px', left: 5 + 'px' }} onClick={handleLogOut} >Log out</Fab>;
    } else {
        return <Grid2> <Login handleIsAuthenticated={handleIsAuthenticated} /> <Register /> </Grid2>;
    }
}