import Grid2 from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

export default function UserInstructions() {
    return (
        <Grid2 width={0.5}>
            <Card>
                <CardContent>
                    <Stack spacing={3}>
                        <Typography variant='h4' >
                            For authenticated user
                        </Typography>
                        <Typography variant='body1' >
                            User can add a new recipe, edit a recipe, delete a recipe or watch a recipe. MY RECIPES-tab contains user's own recipes.
                            When user clicks on a row on MY RECIPES-tab, dialog opens that contains the recipe and edit and delete buttons.
                            User can sort and filter data on the table.
                            When user adds a new recipe, it goes to the last page on the table.
                            User can watch recipes by clicking on a row on RECIPES-tab.
                            TODO: User can only edit and delete user's own recipes. This will be secured on the backend.
                        </Typography>
                        <Typography variant='h4' >
                            Others
                        </Typography>
                        <Typography variant='body1' >
                            User can watch recipes by clicking on a row on RECIPES-tab.
                        </Typography>
                        <Typography variant='h4' >
                            For testing
                        </Typography>
                        <Typography variant='body1' >
                            There are some test users. They are Adam, John, Mike, Olivia, Emma and Ava. Password for each of them is user.
                        </Typography>
                    </Stack>
                </CardContent>
            </Card>
        </Grid2>
    )
}