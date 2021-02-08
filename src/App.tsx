import React from 'react';
import "./styles/navbar.css"
import './App.css';
import {Route, Switch} from "react-router";
import {RandomRecipePage} from "./components/RandomRecipePage";
import {FavoritesPage} from "./components/FavoritesPage";
import {RegistryPage} from "./components/RegistryPage";
import {Link} from "react-router-dom";
import {NotFound} from "./components/NotFoundPage";
import {IDish} from "./IDish";
import {generateHash} from "./utils/Hash";


function App() {

    let favoriteDishes: IDish[] = [];

    let addDishToFavorite = (dish: IDish) => {

        let joinedRecipe = dish.recipe.join();
        let recipeHash = generateHash(joinedRecipe);

        if (!isDishAlreadyExistent(recipeHash)) {

            let dishToAdd = {
                ...dish,
                liked: true
            }

            favoriteDishes.push(dishToAdd);
        }
    }

    let isDishAlreadyExistent = (recipeHash: number): boolean => {

        let dishExists = false;

        favoriteDishes.forEach(dish => {
            if (generateHash(dish.recipe.join()) === recipeHash) {
                console.log("Dish already as a favorite!");
                dishExists = true;
                return;
            }
        })

        return dishExists;
    }

    let isDishMarkedAsFavorite = (recipeHash: number): boolean => {

        let favoriteStatus = false;

        favoriteDishes.forEach(dish => {
            if (generateHash(dish.recipe.join()) === recipeHash) {
                favoriteStatus = dish.liked;
                return;
            }
        })

        return favoriteStatus;
    }

    let removeDishFromFavorite = (dish: IDish) => {
        let index = favoriteDishes.indexOf(dish);
        favoriteDishes.splice(index);
    }


    return (
        <div>

            <div className="topnav">
                <Link to="/">Random Recipe</Link>
                <Link to="/favorites">Favorites</Link>
                <Link to="/registry">Registry</Link>
            </div>

            <Switch>
                <Route exact path="/"><RandomRecipePage addToFavorite={addDishToFavorite}
                                                        removeFromFavorite={removeDishFromFavorite}
                                                        markedAsFavorite={isDishMarkedAsFavorite}/></Route>
                <Route path="/favorites"><FavoritesPage favoriteDishes={favoriteDishes}/></Route>
                <Route path="/registry"><RegistryPage/></Route>
                <Route><NotFound/></Route>
            </Switch>
        </div>


    );
}

export default App;
