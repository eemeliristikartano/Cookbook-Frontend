import { Button, Stack } from "@mui/material";
import React, { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ICategory, IIngredient, IRecipe, IUnit } from "../types";
import MenuItem from '@mui/material/MenuItem';

import DeleteIcon from '@mui/icons-material/Delete';



export default function AddRecipe() {
    const [open, setOpen] = useState(false);
    const [units, setUnits] = useState<Array<IUnit>>([]);
    const [categories, setCategories] = useState<Array<ICategory>>([]);
    const [recipe, setRecipe] = useState<IRecipe>({
        recipeName: '',
        instructions: '',
        source: '',
        category: '',
        ingredients: [{
            ingredientName: '',
            amount: '',
            unit: ''
        }]
    });

    // Input fields for new ingredients.
    const [inputFields, setInputFields] = useState<IIngredient[]>(
        [
            {
                ingredientName: '',
                amount: '',
                unit: ''
            }
        ]
    );

    // New input field to the inputFields. 
    const addFields = () => {
        const newField: IIngredient = {
            ingredientName: "",
            amount: "",
            unit: ""
        }
        setInputFields([...inputFields, newField]);
    }

    const handleClickOpen = () => {
        setOpen(!open);
    }

    const handleClose = () => {
        setOpen(!open);
    }

    const handleSave = async () => {
        console.log(JSON.stringify(recipe))
        const config = {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(recipe)
        };
        try {
            const response = await fetch(process.env.REACT_APP_SERVER_URL + '/saverecipe', config)
            //TODO add if statement.
        } catch (error) {
            console.log(error)
        }

    }

    // Handles ingredientName and amount.
    const handleNewIngredients = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const data = [...inputFields] as IIngredient[]
        // Setting ingredient and amount to the right index from inputfields. 
        data[index][e.target.name as keyof IIngredient] = e.target.value;
        setRecipe({ ...recipe, ingredients: data });
    }

    // Handles unit from inputfields. Needs to be it's own funcion because property 'name' does not exist on type SelectChangeEvent.
    const handleUnit = (index: number, e: SelectChangeEvent<string>) => {
        const ingredients = [...inputFields] as IIngredient[]
        // Setting unit to the right index.
        ingredients[index]['unit' as keyof IIngredient] = e.target.value as string;
        setRecipe({ ...recipe, ingredients: ingredients });
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRecipe({ ...recipe, [e.target.name]: e.target.value });

    }


    // Units and categories for adding a new recipe.
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
    }, []);

    // Deletes ingredient from inputFields and from the recipe.
    const deleteIngredient = (ingredientIndex: number) => {
        const ingredients = inputFields.filter((ingredient, index) => ingredientIndex !== index)
        setRecipe({ ...recipe, ingredients: ingredients });
        setInputFields(ingredients)
    }

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen} >Add recipe</Button>
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

                        <Select
                            label="Category"
                            value={recipe.category}
                            onChange={(e) => setRecipe({ ...recipe, category: e.target.value })}

                        >
                            <MenuItem value='None'>
                                <em>None</em>
                            </MenuItem>
                            {categories.map((category, categoryIndex) =>
                                <MenuItem key={categoryIndex} value={category.name} >{category.name}</MenuItem>
                            )}


                        </Select>

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
                                        value={ingredient.amount}
                                        onChange={(e) => handleNewIngredients(index, e)}
                                    />
                                    <Select
                                        label='Unit'
                                        value={ingredient.unit}
                                        onChange={(e) => handleUnit(index, e)}

                                    >
                                        <MenuItem value='None'>
                                            <em>None</em>
                                        </MenuItem>
                                        {units.map((unit, unitIndex) =>
                                            <MenuItem key={unitIndex} value={unit.unit} >{unit.unit}</MenuItem>
                                        )}


                                    </Select>
                                    {
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