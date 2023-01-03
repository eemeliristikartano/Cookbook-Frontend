import { Button, Stack } from "@mui/material";
import React, { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { ICategory, IIngredient, IRecipe, IUnit } from "../interfaces";
import MenuItem from '@mui/material/MenuItem';

import DeleteIcon from '@mui/icons-material/Delete';
import { SERVER_URL } from "../constants";



export default function AddRecipe({ getRecipes }: any) {
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
        ingredients: [{
            ingredientName: '',
            amount: {
                quantity: '',
                unit: {
                    unitId: -1,
                    unit: ''
                }
            }
        }]
    });

    // Input fields for new ingredients.
    const [inputFields, setInputFields] = useState<IIngredient[]>(
        [
            {
                ingredientName: '',
                amount: {
                    quantity: '',
                    unit: {
                        unitId: -1,
                        unit: ''
                    }
                }
            }
        ]
    );

    // New input field to the inputFields. 
    const addFields = () => {
        const newField: IIngredient = {
            ingredientName: "",
            amount: {
                quantity: '',
                unit: {
                    unitId: -1,
                    unit: ''
                }
            }
        }
        setInputFields([...inputFields, newField]);
    }

    const handleClickOpen = () => setOpen(!open);


    const handleClose = () => setOpen(!open);


    const handleSave = async () => {
        const token = sessionStorage.getItem('jwt-token') as string; // Token from session storage.
        const config = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(recipe)
        };
        try {
            const response = await fetch(SERVER_URL + '/saverecipe', config);
            //TODO add if statement.
        } catch (error) {
            console.log(error)
        }
        setRecipe({
            recipeName: '',
            instructions: '',
            source: '',
            category: {
                categoryId: -1,
                name: ''
            },
            ingredients: [{
                ingredientName: '',
                amount: {
                    quantity: '',
                    unit: {
                        unitId: -1,
                        unit: ''
                    }
                }
            }]
        }
        )
        setInputFields(
            [
                {
                    ingredientName: '',
                    amount: {
                        quantity: '',
                        unit: {
                            unitId: -1,
                            unit: ''
                        }
                    }
                }
            ]
        );
        getRecipes();
        handleClose();
    }

    // Handles ingredient name.
    const handleNewIngredients = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const data = [...inputFields] as IIngredient[];
        // Setting ingredient and amount to the right index from inputfields. 
        data[index].ingredientName = e.target.value as string;
        setRecipe({ ...recipe, ingredients: data });
    }

    // Handles amount.
    const handleNewAmount = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const data = [...inputFields] as IIngredient[];
        // Setting ingredient and amount to the right index from inputfields. 
        data[index].amount.quantity = e.target.value as string;
        setRecipe({ ...recipe, ingredients: data });
    }

    // Handles unit.
    const handleUnit = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const ingredients = [...inputFields] as IIngredient[];
        // Setting unit to the right index. Find the right object from array by unit name.
        ingredients[index].amount.unit = units.find(element => element.unit === e.target.value) as IUnit;
        setRecipe({ ...recipe, ingredients: ingredients });
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRecipe({ ...recipe, [e.target.name]: e.target.value });

    }


    // Units and categories for adding a new recipe.
    useEffect(() => {
        const getUnits = async () => {
            try {
                const response = await fetch(SERVER_URL + '/units');
                const data = await response.json();
                setUnits(data);
            } catch (error) {
                console.log(error);
            }
        }
        const getCategories = async () => {
            try {
                const response = await fetch(SERVER_URL + '/categories');
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.log(error);
            }
        }
        getUnits();
        getCategories();
    }, []);

    // Deletes ingredient from inputFields and from the recipe.
    const deleteIngredient = (ingredientIndex: number) => {
        const ingredients = inputFields.filter((ingredient, index) => ingredientIndex !== index);
        setRecipe({ ...recipe, ingredients: ingredients });
        setInputFields(ingredients);
    }

    return (
        <>
            <Button variant="contained" onClick={handleClickOpen} >Add recipe</Button>
            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle>Add recipe.</DialogTitle>
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
                            onChange={(e) => setRecipe({ ...recipe, category: categories.find(element => element.name === e.target.value) as ICategory })}
                        >
                            {/* MenuItems for categories.*/}
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
                        {inputFields.map((ingredient, index) => {
                            return (
                                <div key={index} style={{ display: 'flex', flexDirection: 'row' }}>
                                    <TextField
                                        label='Ingredient'
                                        name='ingredientName'
                                        value={ingredient.ingredientName}
                                        onChange={(e) => handleNewIngredients(index, e)}
                                    />
                                    <TextField
                                        label='Amount'
                                        name='amount'
                                        value={ingredient.amount.quantity}
                                        onChange={(e) => handleNewAmount(index, e)}
                                    />
                                    <TextField
                                        select
                                        label='Unit'
                                        value={ingredient.amount.unit.unit}
                                        onChange={(e) => handleUnit(index, e)}
                                        sx={{ width: 25 + '%' }}
                                    >
                                        {/* MenuItems for units.*/}
                                        <MenuItem value='None'>
                                            <em>None</em>
                                        </MenuItem>
                                        {units.map((unit: IUnit) =>
                                            unit.unit !== 'None' && <MenuItem key={unit.unitId} value={unit.unit} >{unit.unit}</MenuItem>
                                        )}
                                    </TextField>
                                    {
                                        // If there is more than one ingredient, user can delete fields and ingredients.
                                        inputFields.length > 1 &&
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