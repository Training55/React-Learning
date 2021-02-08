import React from 'react';
import "../styles/favoritesPage.css"
import {IDish} from "../IDish";

interface IFavoriteProps{
    favoriteDishes: IDish[]
}

export function FavoritesPage({favoriteDishes}: IFavoriteProps) {

    return (
        <div className="center-screen">
            <p>Favorites component</p>
            <div>
                <ul>
                    {
                        favoriteDishes.map((dishes) => {
                            return <li>{dishes.name}</li>
                        })
                    }
                </ul>
            </div>
        </div>
    );
}