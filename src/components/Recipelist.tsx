import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef, GridEventListener, GridRenderCellParams, GridRowParams, MuiEvent } from '@mui/x-data-grid';
import { ICategory, IRecipe } from "../interfaces";
import { Box } from "@mui/material";
import AddRecipe from "./AddRecipe";
import ShowRecipe from "./ShowRecipe";
import { SERVER_URL } from "../constants";

export default function Recipelist({ isAuthenticated }: any) {
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
    const getRecipes = async () => {
        try {
            const response = await fetch(SERVER_URL + '/recipes');
            const data = await response.json();
            setRecipes(data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getRecipes();
    }, [])

    // Used for opening recipe-dialog when user clicks row on datagrid.
    const handleEvent: GridEventListener<'rowClick'> = (params: GridRowParams, event: MuiEvent<React.MouseEvent<HTMLElement>>) => {
        setOpen(!open);
        setRecipe(params.row);
    }

    // Closes recipe-dialog.
    const handleClose = () => {
        setOpen(!open);
    }

    return (
        <>
            {/* If the user is authenticated the user can add a recipe. */}
            {isAuthenticated && <AddRecipe getRecipes={getRecipes} />}
            <ShowRecipe recipe={recipe} open={open} handleClose={handleClose} getRecipes={getRecipes} isAuthenticated={isAuthenticated} />
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