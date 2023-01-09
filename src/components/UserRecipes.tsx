import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef, GridEventListener, GridRenderCellParams, GridRowParams, MuiEvent } from '@mui/x-data-grid';
import { ICategory, IRecipe } from "../interfaces";
import { Box } from "@mui/material";
import { SERVER_URL } from "../constants";
import ShowRecipeAuthenticated from "./ShowRecipeAuthenticated";

// Interface for props.
interface IUserRecipes {
    isAuthenticated: boolean
}

/* 
* User's own recipes
*/

export default function UserRecipes({ isAuthenticated }: IUserRecipes) {
    const [recipes, setRecipes] = useState<Array<IRecipe>>([]);
    const [recipe, setRecipe] = useState<IRecipe>();
    const [open, setOpen] = useState(false);

    // Definitions for columns.
    const columnsDefs: GridColDef[] = [
        { field: 'recipeName', headerName: 'Name', flex: 1 },
        {
            field: 'category', headerName: 'Category', flex: 1,
            valueGetter: (params: GridRenderCellParams<ICategory>) => params.value != null ? params.value.name : '',
        }
    ];

    // Gets all recipes from a backend.
    const getUserRecipes = async () => {
        const token = sessionStorage.getItem("jwt-token") as string;
        try {
            const response = await fetch(SERVER_URL + '/userrecipes', {
                headers: { 'Authorization': token }
            });
            const data = await response.json();
            setRecipes(data);
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
            <Box sx={{ height: 550 }}>
                <DataGrid
                    getRowId={(row) => row.recipeId}
                    rows={recipes}
                    columns={columnsDefs}
                    autoHeight
                    rowsPerPageOptions={[10]}
                    disableSelectionOnClick
                    //rowCount={10}
                    pageSize={10}
                    onRowClick={handleEvent}
                />
            </Box>
        </>
    );

}