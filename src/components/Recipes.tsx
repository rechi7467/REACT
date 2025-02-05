import './HomePage.css';
import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { Button, Card } from '@mui/material';
import recipeStore from '../RecipeStore';

export type RecipeType = {
    id: string;
    title: string;
    products: string;
    description: string;
    ingredients: string;
    instructions: string;
};

const Recipes: React.FC = observer(() => {
    const [selectedRecipe, setSelectedRecipe] = useState<RecipeType | null>(null);

    useEffect(() => {
        recipeStore.fetchRecipes();
    }, []);

    const handleRecipeClick = (recipe: RecipeType) => {
        setSelectedRecipe(recipe);
    };

    return (
        <div className='bg' style={{ padding: '20px' }}>
            <h2 className="recipes" style={{ fontSize: '2em' }}>RECIPES</h2>
            {recipeStore.error && <div style={{ color: 'red' }}>{recipeStore.error}</div>}
            <ul className="recipes" style={{ listStyleType: 'none', padding: 0 }}>
                {recipeStore.recipes.map(recipe => (
                    <li key={recipe.id}>
                        <Button
                            className='recipes'
                            onClick={() => handleRecipeClick(recipe)}
                            style={{
                                border: '2px solid deeppink',
                                color: 'deeppink',
                                backgroundColor: 'transparent',
                                margin: '10px',
                                height: '50px',
                                width: '200px'
                            }}
                        >
                            <h3 style={{ margin: 0 }}>{recipe.title}</h3>
                        </Button>
                    </li>
                ))}
            </ul>
            {selectedRecipe && (
                <Card style={{
                    color: 'deeppink',
                    background: 'rgba(255, 182, 193, 0.6)',
                    marginTop: '20px',
                    marginBottom: '0px',
                    padding: '20px',
                    width: '100%',
                    height: '300px',
                    overflow: 'auto',
                    fontSize: '1.2em'
                }}>
                    <h3>{selectedRecipe.title}</h3>
                    <p><strong>Description:</strong> {selectedRecipe.description}</p>
                    <p><strong>Ingredients:</strong> {selectedRecipe.ingredients}</p>
                    <p><strong>Instructions:</strong> {selectedRecipe.instructions}</p>
                </Card>
            )}
        </div>
    );
});

export default Recipes;

