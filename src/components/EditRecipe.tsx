import { Button, Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { ICategory, IIngredient, IRecipe, IUnit } from "../interfaces";
import MenuItem from '@mui/material/MenuItem';
import { useState, useEffect } from 'react'

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function EditRecipe({ recipeProps, getRecipes, closeRecipeDialog }: any) {
    const [open, setOpen] = useState(false);
    const [units, setUnits] = useState<Array<IUnit>>([]);
    const [categories, setCategories] = useState<Array<ICategory>>([]);
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

    const addFields = () => {
        const newIngredient: IIngredient = {
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
        setRecipe({ ...recipe, ingredients: [...recipe.ingredients, newIngredient] })
    }


    const handleOpen = () => {
        setOpen(!open)
        setRecipe({
            recipeId: recipeProps.recipeId,
            recipeName: recipeProps.recipeName,
            instructions: recipeProps.instructions,
            source: recipeProps.source,
            category: recipeProps.category,
            ingredients: recipeProps.ingredients
        });
    }

    useEffect(() => {
        const getUnits = async () => {
            try {
                const response = await fetch(process.env.REACT_APP_SERVER_URL + '/units');
                const data = await response.json();
                setUnits(data);
            } catch (error) {
                console.log(error)
            }
        }
        const getCategories = async () => {
            try {
                const response = await fetch(process.env.REACT_APP_SERVER_URL + '/categories');
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.log(error)
            }
        }
        getUnits();
        getCategories();
    }, [])

    // Handles ingredient name in ingredients.
    const handleIngredientChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const data = [...recipe.ingredients] as IIngredient[]
        // Setting ingredient and amount to the right index from inputfields. 
        data[index].ingredientName = e.target.value as string
        setRecipe({ ...recipe, ingredients: data });
    }

    // Handles amount in ingredients.
    const handleAmountChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const data = [...recipe.ingredients] as IIngredient[]
        // Setting ingredient and amount to the right index from inputfields. 
        data[index].amount.quantity = e.target.value as string
        setRecipe({ ...recipe, ingredients: data });
    }

    // Handles unit in ingredients.
    const handleUnitChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const ingredients = [...recipe.ingredients] as IIngredient[]
        // Setting unit to the right index. Find the right object from array by unit.
        ingredients[index].amount.unit = units.find(element => element.unit === e.target.value) as IUnit;
        setRecipe({ ...recipe, ingredients: ingredients });
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRecipe({ ...recipe, [e.target.name]: e.target.value });

    }

    // Deletes ingredient from recipe.
    const deleteIngredient = (ingredientIndex: number) => {
        const updatatedIngredients = recipe.ingredients.filter((ingredient, index) => ingredientIndex !== index)
        setRecipe({ ...recipe, ingredients: updatatedIngredients });
        // If ingredient is saved to DB, delete it.
        if (recipe.ingredients[ingredientIndex].ingredientId !== -1) {
            deleteIngredientFromDB(recipe.ingredients[ingredientIndex].ingredientId);
        }

    }

    // Deletes ingredient from database.
    const deleteIngredientFromDB = async (ingredientId?: number) => {
        const config = {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(ingredientId)
        };
        try {
            const response = await fetch(process.env.REACT_APP_SERVER_URL + '/deleteingredient', config);
        } catch (error) {
            console.log(error)
        }
    }

    //Closes editform.
    const handleClose = () => setOpen(!open);

    // Handles saving recipe to database.
    const handleSave = async () => {
        const config = {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(recipe)
        };
        try {
            const response = await fetch(process.env.REACT_APP_SERVER_URL + '/updaterecipe', config);
            //TODO add if statement.
        } catch (error) {
            console.log(error)
        }
        // Fetches recipes from database.
        getRecipes();
        // Closes dialog from ShowRecipe.
        closeRecipeDialog();
        // Closes editform.
        handleClose();
    }
    return (
        <>
            <Button
                color='secondary'
                size='large'
                endIcon={<EditIcon />}
                onClick={handleOpen}
            >Edit</Button>
            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle>Edit recipe.</DialogTitle>
                <DialogContent dividers>
                    <Stack spacing={3}>
                        <TextField
                            label='Name'
                            name='recipeName'
                            value={recipe.recipeName}
                            onChange={handleChange}
                        />
                        <TextField
                            select
                            label='Category'
                            value={recipe.category.name}
                            //                                                Find the right object from array by category name.
                            onChange={(e) => setRecipe({ ...recipe, category: categories.find(element => element.name == e.target.value) as ICategory })}
                        >
                            <MenuItem value='None'>
                                <em>None</em>
                            </MenuItem>
                            {categories.map((category: ICategory) =>
                                category.name !== 'None' && <MenuItem key={category.categoryId} value={category.name} >{category.name}</MenuItem>
                            )}
                        </TextField>
                        <TextField
                            label='Instructions'
                            name='instructions'
                            value={recipe.instructions}
                            onChange={handleChange}
                            multiline
                            rows={5}
                        />
                        <TextField
                            label='Source'
                            name='source'
                            value={recipe.source}
                            onChange={handleChange}
                        />
                        {recipe.ingredients.map((ingredient, index) => {
                            return (
                                <div key={index} style={{ display: 'flex', flexDirection: 'row' }}>
                                    <TextField
                                        label='Ingredient'
                                        name='ingredientName'
                                        value={ingredient.ingredientName}
                                        onChange={(e) => handleIngredientChange(index, e)}
                                    />
                                    <TextField
                                        label='Amount'
                                        name='amount'
                                        value={ingredient.amount.quantity}
                                        onChange={(e) => handleAmountChange(index, e)}
                                    />
                                    <TextField
                                        select
                                        label='Unit'
                                        value={ingredient.amount.unit.unit}
                                        onChange={(e) => handleUnitChange(index, e)}
                                        sx={{ width: 25 + '%' }}
                                    >
                                        <MenuItem value='None'>
                                            <em>None</em>
                                        </MenuItem>
                                        {units.map((unit: IUnit) =>
                                            unit.unit !== 'None' && <MenuItem key={unit.unitId} value={unit.unit} >{unit.unit}</MenuItem>
                                        )}
                                    </TextField>
                                    {
                                        // If there is more than one ingredient, user can delete fields and ingredients.
                                        recipe.ingredients.length > 1 &&
                                        <Button
                                            size="large"
                                            color="error"
                                            startIcon={<DeleteIcon />}
                                            onClick={() => deleteIngredient(index)}
                                        />
                                    }
                                </div>
                            )
                        })}
                        <Button sx={{ width: 25 + '%', display: 'flex', alignSelf: 'flex-end' }} variant="contained" onClick={addFields} >Add new ingredient</Button>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} >Close</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>


            </Dialog>
        </>
    );
}