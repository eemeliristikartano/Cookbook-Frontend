import React, { useState, useEffect } from "react";
import { GridEventListener, GridRowParams, MuiEvent } from '@mui/x-data-grid';
import { IRecipe } from "../interfaces";
import { SERVER_URL } from "../constants";
import ShowRecipeAuthenticated from "./ShowRecipeAuthenticated";
import RecipesDataGrid from "./RecipesDataGrid";


/* 
* User's own recipes
*/

export default function UserRecipes() {
    const [recipes, setRecipes] = useState<Array<IRecipe>>([]);
    const [recipe, setRecipe] = useState<IRecipe>();
    const [open, setOpen] = useState(false);
    const [dataIsNotReady, setDataIsNotReady] = useState(true);

    // Gets all recipes from a backend.
    const getUserRecipes = async () => {
        const token = sessionStorage.getItem("jwt-token") as string;
        try {
            const response = await fetch(SERVER_URL + '/userrecipes', {
                headers: { 'Authorization': token }
            });
            if (response.ok) {
                const data = await response.json();
                setRecipes(data);
                setDataIsNotReady(false);
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUserRecipes();
    }, [])

    // Used for opening recipe-dialog when user clicks row on datagrid.
    const handleEvent: GridEventListener<'rowClick'> = (params: GridRowParams, event: MuiEvent<React.MouseEvent<HTMLElement>>) => {
        setOpen(!open);
        setRecipe(params.row);
    }

    // Closes recipe-dialog.
    const handleClose = () => setOpen(!open);


    return (
        <>
            <ShowRecipeAuthenticated recipe={recipe} open={open} handleClose={handleClose} getRecipes={getUserRecipes} />
            <RecipesDataGrid recipes={recipes} dataIsNotReady={dataIsNotReady} handleEvent={handleEvent} />
        </>
    );

}