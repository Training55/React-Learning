import React from 'react';
import "./styles/navbar.css"
import './App.css';
import {Route, Switch} from "react-router";
import RandomRecipePage from "./components/RandomRecipePage/RandomRecipePage";
import FavoritesPage from "./components/FavoritesPage";
import RegistryPage from "./components/RegistryPage";
import {Link} from "react-router-dom";
import NotFound from "./components/NotFoundPage";
import {IDish} from "./IDish";
import {generateHash} from "./utils/Hash";
import {RandomRecipeErrorBoundary} from "./components/RandomRecipePage/RandomRecipeErrorBoundary";
import SearchBar from "./components/SearchBar";
import SearchPage from "./components/SearchPage/SearchPage";


function App() {

    let favoriteDishes: IDish[] = [];

    const addDishToFavorite = (dish: IDish): void => {

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

    const isDishAlreadyExistent = (recipeHash: number): boolean => {

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

    const isDishMarkedAsFavorite = (recipeHash: number): boolean => {

        let favoriteStatus = false;

        favoriteDishes.forEach(dish => {
            if (generateHash(dish.recipe.join()) === recipeHash) {
                favoriteStatus = dish.liked;
                return;
            }
        })

        return favoriteStatus;
    }

    const removeDishFromFavorite = (dish: IDish): void => {
        let index = favoriteDishes.indexOf(dish);
        favoriteDishes.splice(index);
    }


    return (
        <div>

            <div className="topnav">
                <Link to="/">Random Recipe</Link>
                <Link to="/favorites">Favorites</Link>
                <Link to="/registry">Registry</Link>
                <SearchBar></SearchBar>
            </div>

            <Switch>
                <Route exact path="/"><RandomRecipeErrorBoundary>
                    <RandomRecipePage addToFavorite={addDishToFavorite}
                                      removeFromFavorite={removeDishFromFavorite}
                                      markedAsFavorite={isDishMarkedAsFavorite}/>
                </RandomRecipeErrorBoundary>
                </Route>
                <Route path="/favorites"><FavoritesPage favoriteDishes={favoriteDishes}
                                                        addToFavorite={addDishToFavorite}
                                                        removeFromFavorite={removeDishFromFavorite}
                /></Route>
                <Route path="/search"><SearchPage/></Route>
                <Route path="/registry"><RegistryPage/></Route>
                <Route><NotFound/></Route>
            </Switch>
        </div>


    );
}

export default App;
