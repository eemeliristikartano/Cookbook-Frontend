import Grid2 from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import ResetDB from './ResetDB';

export default function ServerInstructions() {

    return (
        <Grid2 width={0.5}>
            <Card>
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
                        <Typography variant='h5' >
                            Recipes, unit and categories are fetched from:
                        </Typography>
                        <Typography component={'span'}>
                            <List>
                                <ListItem>
                                    <Link href='https://cookbook22.herokuapp.com/recipes' >https://cookbook22.herokuapp.com/recipes</Link>
                                </ListItem>
                                <ListItem>
                                    <Link href='https://cookbook22.herokuapp.com/units'>https://cookbook22.herokuapp.com/units</Link>
                                </ListItem>
                                <ListItem>
                                    <Link href='https://cookbook22.herokuapp.com/categories'>https://cookbook22.herokuapp.com/categories</Link>
                                </ListItem>
                            </List>
                        </Typography>
                    </Stack>
                </CardContent>
            </Card>


        </Grid2>
    )
}