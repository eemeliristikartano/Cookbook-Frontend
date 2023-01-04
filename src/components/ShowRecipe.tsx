import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';
import { SERVER_URL } from '../constants';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import DeleteIcon from '@mui/icons-material/Delete';

import EditRecipe from './EditRecipe';

export default function ShowRecipe({ recipe, open, handleClose, getRecipes, }: any) {

    //TODO: Maybe own component for deleting recipe.
    const deleteRecipe = async (recipeId: number) => {
        const token = sessionStorage.getItem('jwt-token') as string; // Token from session storage.
        const config = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(recipeId)
        }
        try {
            const response = await fetch(SERVER_URL + '/deleterecipe', config)
            //TODO add if statement.
        } catch (error) {
            console.log(error)
        }
        // Fetches recipes from database.
        getRecipes();
        // Closes dialog that shows recipe.
        handleClose();
    }

    return (
        <>
            {recipe !== undefined && // If the recipe is defined, return dialog that contains recipe.
                < Dialog open={open} fullWidth maxWidth={'md'}>
                    <DialogContent>
                        <DialogTitle>{recipe.recipeName}</DialogTitle>
                        <h4>Instructions</h4>
                        <DialogContentText>{recipe.instructions}</DialogContentText>
                        <h4>Ingredients</h4>
                        <List>
                            {recipe.ingredients.map((ingredient: any, index: number) =>
                                <ListItem key={index} >
                                    {`${ingredient.ingredientName} ${ingredient.amount.quantity} ${ingredient.amount.unit.unit}`}
                                </ListItem>
                            )}
                        </List>
                        <DialogContentText>{recipe.source !== '' && `Source: ${recipe.source}`}</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <EditRecipe recipeProps={recipe} getRecipes={getRecipes} closeRecipeDialog={handleClose} />
                        <Button
                            color='error'
                            size='large'
                            endIcon={<DeleteIcon />}
                            onClick={() => deleteRecipe(recipe.recipeId)}
                        >Delete</Button>
                        <Button
                            variant='outlined'
                            onClick={() => handleClose()} >Close</Button>
                    </DialogActions>
                </Dialog>
            }
        </>
    );
}