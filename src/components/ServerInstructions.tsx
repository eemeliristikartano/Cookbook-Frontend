import Grid2 from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Link from '@mui/material/Link';

export default function ServerInstructions() {

    return (
        <Grid2 width={0.5}>
            <Card>
                <CardContent>
                    <Typography variant='h4' >
                        Server
                    </Typography>
                    <Typography variant='body1' >
                        Backend runs on heroku.com. Please note that if there is no traffic in a 30-minute period, server sleeps so there might be a short delay.
                        Usually, it takes 15-30 seconds for recipes to appear. Right now the database is a memory database, so every time server sleeps,
                        the database resets. Recipes are randomizes so ingredients, quantity's and units doesn't always make sense.
                    </Typography>
                    <Typography variant='h5' >
                        Links
                    </Typography>
                    <Typography>
                        <List>
                            <ListItem>
                                <Link href='https://cookbook22.herokuapp.com/api'>https://cookbook22.herokuapp.com/api</Link>
                            </ListItem>
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
                </CardContent>
            </Card>


        </Grid2>
    )
}