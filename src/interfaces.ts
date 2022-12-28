//Interface for recipe
export interface IRecipe {
    recipeName: string
    instructions: string
    category: string
    dateCreated?: string
    dateEdited?: string
    source: string
    ingredients: IIngredient[]
}
//Interface for category
export interface ICategory {
    categoryId: number
    name: string
}

//Interface fos ingredient
export interface IIngredient {
    ingredientName: string
    amount: string
    unit: string
}

//Interface for unit
export interface IUnit {
    unitId: number
    unit: string
}