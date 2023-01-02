import Grid2 from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function UserInstructions() {
    return (
        <Grid2 width={0.5}>
            <Card>
                <CardContent>
                    <Typography variant='h4' >
                        For user
                    </Typography>
                    <Typography variant='body1' >
                        User can add a new recipe, edit a recipe, delete a recipe or watch a recipe.
                        When user clicks on a row, dialog opens that contains the recipe and edit and delete buttons.
                        User can sort and filter data on the table.
                        Right now there is no possibility for creating an account, but I am working on it. When user adds a new
                        recipe, it goes to the last page on the table.
                    </Typography>
                </CardContent>
            </Card>
        </Grid2>
    )
}