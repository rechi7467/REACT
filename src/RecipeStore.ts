// recipeStore.ts
import { makeAutoObservable } from 'mobx';
import axios from 'axios';
import { RecipeType } from './components/Recipes';

export class RecipeStore {
    recipes: RecipeType[] = [];
    error: string = '';

    constructor() {
        makeAutoObservable(this);
    }

    async fetchRecipes() {
        try {
            const response = await axios.get('http://localhost:3000/api/recipes');
            this.recipes = response.data;
        } catch (err) {
            this.error = 'Failed to fetch recipes';
        }
    }
}

const recipeStore = new RecipeStore();
export default recipeStore;
