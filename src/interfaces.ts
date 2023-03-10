//Interface for recipe
export interface IRecipe {
    recipeId?: number
    recipeName: string
    instructions: string
    category: ICategory
    dateCreated?: string
    dateEdited?: string
    user?: IUser
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
    ingredientId?: number
    ingredientName: string
    amount: IAmount
}


export interface IAmount {
    amountId?: number
    quantity: string
    unit: IUnit
}

//Interface for unit
export interface IUnit {
    unitId: number
    unit: string
}

// Interface for user
export interface IUser {
    userId?: number
    username: string
    password?: string
    passwordCheck?: string
    role?: string
}