import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { IAmount, ICategory, IIngredient, IRecipe, IUnit } from "../interfaces";
import MenuItem from '@mui/material/MenuItem';
import { useState, useEffect } from 'react'

//TODO
import EditIcon from '@mui/icons-material/Edit';

export default function EditRecipe({ recipeProps }: any) {
    const [open, setOpen] = useState(false)
    const [recipe, setRecipe] = useState<IRecipe>({
        recipeName: '',
        instructions: '',
        source: '',
        category: {
            categoryId: -1,
            name: ''
        },
        ingredients: [
            {
                ingredientId: -1,
                ingredientName: '',
                amount: {
                    amountId: -1,
                    quantity: '',
                    unit: {
                        unitId: -1,
                        unit: ''
                    }
                }
            }
        ]
    });

    const handleOpen = () => {
        setOpen(!open)
        setRecipe({
            recipeName: recipeProps.recipeName,
            instructions: recipeProps.instructions,
            source: recipeProps.source,
            category: recipeProps.category != null && recipeProps.category,
            ingredients: recipeProps.ingredients
        })
        console.log(recipe)
    }












    const handleclose = () => setOpen(!open);

    return (
        <>
            <Button
                color='secondary'
                size='large'
                endIcon={<EditIcon />}
                onClick={handleOpen}
            >Edit</Button>
            <Dialog open={open} onClose={handleclose}>
                fff

            </Dialog>
        </>
    );
}