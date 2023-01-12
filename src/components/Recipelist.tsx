import { useState, useEffect } from "react";
import { GridEventListener, GridRowParams, MuiEvent } from '@mui/x-data-grid';
import { IRecipe } from "../interfaces";
import AddRecipe from "./AddRecipe";
import { SERVER_URL } from "../constants";
import ShowRecipePublic from "./ShowRecipePublic";
import RecipesDataGrid from "./RecipesDataGrid";


export default function Recipelist() {
    // For loading icon.
    const [dataIsNotReady, setDataIsNotReady] = useState(true);
    const [recipes, setRecipes] = useState<Array<IRecipe>>([]);
    const [recipe, setRecipe] = useState<IRecipe>();
    const [open, setOpen] = useState(false);

    // Gets all recipes from a backend.
    const getRecipes = async () => {
        try {
            const response = await fetch(SERVER_URL + '/recipes');
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
        getRecipes();
    }, [])

    // Closes recipe-dialog.
    const handleClose = () => {
        setOpen(!open);
    };

    // Used for opening recipe-dialog when user clicks row on datagrid.
    const handleEvent: GridEventListener<'rowClick'> = (params: GridRowParams, event: MuiEvent<React.MouseEvent<HTMLElement>>) => {
        setOpen(!open);
        setRecipe(params.row);
    };

    return (
        <>
            {/* If the user is authenticated the user can add a recipe. */}
            {sessionStorage.getItem('jwt-token') !== null && <AddRecipe getRecipes={getRecipes} />}
            <ShowRecipePublic recipe={recipe} open={open} handleClose={handleClose} />
            <RecipesDataGrid recipes={recipes} dataIsNotReady={dataIsNotReady} handleEvent={handleEvent} />
        </>
    );
}