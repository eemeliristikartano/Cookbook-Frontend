import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';
import { SERVER_URL } from '../constants';
import { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import DeleteIcon from '@mui/icons-material/Delete';
import EditRecipe from './EditRecipe';
import { IRecipe } from '../interfaces';

// Interface for props.
interface IShowRecipeAuthenticated {
    recipe: IRecipe | undefined
    open: boolean
    handleClose: () => void
    getRecipes: () => void
}

/* 
    Similar to ShowRecipePublic-component. Difference is that in this component
    there is buttons for editing and deleting a recipe.
*/

export default function ShowRecipeAuthenticated({ recipe, open, handleClose, getRecipes, }: IShowRecipeAuthenticated) {
    // State for alerts.
    const [alertOpen, setAlertOpen] = useState(false);
    // State for messages.
    const [message, setMessage] = useState('');

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
            const response = await fetch(SERVER_URL + '/deleterecipe', config);
            if (response.ok) {
                setMessage('Recipe was deleted!');
                handleAlertOpen();
            } else {
                setMessage('Something went wrong with deleting the recipe.');
                handleAlertOpen();
            }
        } catch (error) {
            console.log(error);
        }
        // Fetches recipes from database.
        getRecipes();
        // Closes dialog that shows recipe.
        handleClose();
    }

    // Alert for user.
    const handleAlertOpen = () => setAlertOpen(!alertOpen);

    const handleAlertClose = () => setAlertOpen(!alertOpen);

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
                            onClick={() => deleteRecipe(recipe.recipeId ? recipe.recipeId : -1)}
                        >Delete</Button>
                        <Button
                            variant='outlined'
                            onClick={() => handleClose()} >Close</Button>
                    </DialogActions>
                </Dialog>
            }
            <Snackbar open={alertOpen} autoHideDuration={5000} message={message} onClose={handleAlertClose} />
        </>
    );
}