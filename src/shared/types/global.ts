export interface IIngredient {
	name: string;
	quantity: number;
	weight: string;
}

export interface IRecipeDetail {
	id: string;
	imageUrl: string;
	name: string;
	description: string;
	ingredients: IIngredient[];
	steps: string[];
	calories: number;
	preparationTime: string;
}

export interface IStoreState {
	dishes: IRecipeDetail[];
	isLoading: boolean;
	setDishes: (dishes: IRecipeDetail[]) => void;
	setLoading: (isLoading: boolean) => void;
}
