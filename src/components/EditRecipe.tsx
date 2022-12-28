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

import EditIcon from '@mui/icons-material/Edit';

export default function EditRecipe({ recipeProps }: any) {
    const [open, setOpen] = useState(false)
    const [recipe, setRecipe] = useState({
        recipeName: '',
        instructions: '',
        source: '',
        category: '',
        ingredients: [{
            name: '',
            amount: '',
            unit: ''
        }]
    });

    const handleOpen = () => {
        setOpen(!open)
        setRecipe({
            recipeName: recipeProps.name,
            instructions: recipeProps.instructions,
            source: recipeProps.source,
            category: recipeProps.category.name,
            ingredients: recipeProps.ingredients
        })
        console.log(recipe)
    }



    const [inputFields, setInputFields] = useState<any>([]);








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