import Grid2 from '@mui/material/Unstable_Grid2';
import ServerInstructions from './ServerInstructions';
import UserInstructions from './UserInstructions';
import { isMobile } from 'react-device-detect';

export default function Instructions() {
    if (isMobile) {
        // If the device is a mobile device --> flex direction is column.
        return (
            <Grid2 container margin={2} spacing={2} display={'flex'} flexDirection={'column'}>
                <ServerInstructions width={1} />
                <UserInstructions width={1} />
            </Grid2 >
        );

    } else {
        return (
            // If the device is not a mobile device --> flex direction is row.
            <Grid2 container margin={2} spacing={2} display={'flex'} flexDirection={'row'} >
                <ServerInstructions width={0.5} />
                < UserInstructions width={0.5} />
            </Grid2 >
        );
    }


}