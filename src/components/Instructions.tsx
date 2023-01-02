import Grid2 from '@mui/material/Unstable_Grid2';
import ServerInstructions from './ServerInstructions';
import UserInstructions from './UserInstructions';


export default function Instructions() {

    return (
        <Grid2 container display={'flex'} flexDirection={'row'} margin={2} spacing={2} >
            <ServerInstructions />
            <UserInstructions />
        </Grid2>
    );
}