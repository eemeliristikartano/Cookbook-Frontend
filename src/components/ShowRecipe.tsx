import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';


export default function ShowRecipe({ recipe, open, handleClose }: any) {
    return (
        <>
            {recipe !== undefined && // If the recipe is defined, return dialog that contains recipe.
                < Dialog open={open} fullWidth maxWidth={'md'}>
                    <DialogContent>
                        <DialogTitle>{recipe.name}</DialogTitle>
                        <h4>Instructions</h4>
                        <DialogContentText>{recipe.instructions}</DialogContentText>
                        <h4>Ingredients</h4>
                        <List>
                            {recipe.ingredients.map((ingredient: any, index: number) =>
                                <ListItem key={index} >
                                    {/*If unit is not null, shows ingredient, amount and unit. Otherwise shows ingredient and amount.*/}
                                    {ingredient.amount.unit != null ? `${ingredient.name} ${ingredient.amount.quantity} ${ingredient.amount.unit.unit}` : `${ingredient.name} ${ingredient.amount.quantity}`}
                                </ListItem>
                            )}
                        </List>
                        <DialogContentText>{recipe.source !== '' && `Source: ${recipe.source}`}</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => handleClose()} >Close</Button>
                    </DialogActions>
                </Dialog>
            }
        </>
    );
}