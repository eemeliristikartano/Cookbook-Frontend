import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { IRecipe } from '../interfaces';

// Interface for props.
interface IShowRecipePublic {
    recipe: IRecipe | undefined
    open: boolean
    handleClose: () => void
}

/* 
    Similar to ShowRecipeAuthenticated-component. Difference is that in this component
    there is no buttons for editing and deleting a recipe.
*/

export default function ShowRecipePublic({ recipe, open, handleClose }: IShowRecipePublic) {
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
                        <Button
                            variant='outlined'
                            onClick={() => handleClose()} >Close</Button>
                    </DialogActions>
                </Dialog>
            }
        </>
    );
}