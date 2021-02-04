import React from 'react';
import "../styles/favoritesPage.css"

interface PropertyInterface{
    recipes: string[];
}

export function FavoritesPage(props : PropertyInterface) {

    return (
        <div className="center-screen">
            <p>Favorites component</p>
            <div>
                {props.recipes.map((recipe) => (
                    <p>{recipe}</p>
                ))}
            </div>
        </div>
    );
}