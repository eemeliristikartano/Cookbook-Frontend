import Grid2 from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import ResetDB from './ResetDB';

// Interface for props.
interface IServerInstructions {
    width: number
}

export default function ServerInstructions({ width }: IServerInstructions) {


    return (
        <Grid2 width={width}>
            <Card sx={{ borderRadius: 5, backgroundColor: '#AAABAB' }}>
                <CardContent>
                    <Stack spacing={3}>
                        <Typography variant='h4' >
                            Server
                        </Typography>
                        <Typography variant='body1' >
                            Backend runs on heroku.com. Please note that if there is no traffic in a 30-minute period, server sleeps so there might be a short delay.
                            Usually, it takes 15-30 seconds for recipes to appear. Right now the database is a Heroku Postgres, so data will be saved even when the server sleeps.
                            Recipes are randomized so ingredients, quantities and units doesn't always make sense. You can reset the database by pressing the button below that says "Reset database". It sends
                            POST-request to https://cookbook22.herokuapp.com/reset and deletes all the data and generates new test data.
                        </Typography>
                        <ResetDB />
                    </Stack>
                </CardContent>
            </Card>


        </Grid2>
    )
}