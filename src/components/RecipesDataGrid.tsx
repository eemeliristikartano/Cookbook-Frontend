import { DataGrid, GridColDef, GridEventListener, GridRenderCellParams } from '@mui/x-data-grid';
import { ICategory, IRecipe } from "../interfaces";
import { Box } from "@mui/material";

// Interface for props.
interface IRecipesDataGrid {
    recipes: IRecipe[]
    dataIsNotReady: boolean
    handleEvent: GridEventListener<'rowClick'>
}


/* 
* Datagrid for recipes. 
*/

export default function RecipesDataGrid({ recipes, dataIsNotReady, handleEvent }: IRecipesDataGrid) {

    // Definitions for columns.
    const columnsDefs: GridColDef[] = [
        { field: 'recipeName', headerName: 'Name', flex: 1 },
        {
            field: 'category', headerName: 'Category', flex: 1,
            valueGetter: (params: GridRenderCellParams<ICategory>) => params.value != null ? params.value.name : '',
        }
    ];

    return (
        <Box sx={{ width: 100 + '%', backgroundColor: '#AAABAB' }} minHeight={100 + '%'} borderRadius={5} >
            <DataGrid
                sx={{ borderRadius: 5 }}
                getRowId={(row) => row.recipeId}
                rows={recipes}
                columns={columnsDefs}
                autoHeight
                rowsPerPageOptions={[10]}
                disableSelectionOnClick
                pageSize={10}
                onRowClick={handleEvent}
                // If the data is not ready -> show loading-icon.
                loading={dataIsNotReady}
            />
        </Box>
    );
}