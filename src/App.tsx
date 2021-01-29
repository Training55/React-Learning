import React from 'react';
import "./styles/navbar.css"
import './App.css';
import {Route, Switch} from "react-router";
import {RecipeOfTheDayPage} from "./components/RecipeOfTheDayPage";
import {FavoritesPage} from "./components/FavoritesPage";
import {RegistryPage} from "./components/RegistryPage";
import {Link} from "react-router-dom";
import {NotFound} from "./components/NotFoundPage";


function App() {
    return (
        <div className="topnav">
            <Link to="/">Recipe of the day</Link>
            <Link to="/favorites">Favorites</Link>
            <Link to="/registry">Registry</Link>

            <Switch>
                <Route exact path="/"><RecipeOfTheDayPage/></Route>
                <Route path="/favorites"><FavoritesPage/></Route>
                <Route path="/registry"><RegistryPage/></Route>
                <Route><NotFound/></Route>
            </Switch>
        </div>


    );
}

export default App;
