import React from 'react';
import "./styles/navbar.css"
import './App.css';
import {Route, Switch} from "react-router";
import {RandomRecipePage} from "./components/RandomRecipePage";
import {FavoritesPage} from "./components/FavoritesPage";
import {RegistryPage} from "./components/RegistryPage";
import {Link} from "react-router-dom";
import {NotFound} from "./components/NotFoundPage";


function App() {

    let recipes: string[] = ["Spaghetti Bolognese, Pizza Franco, Salsiccia"];


    return (
        <div>

            <div className="topnav">
                <Link to="/">Random Recipe</Link>
                <Link to="/favorites">Favorites</Link>
                <Link to="/registry">Registry</Link>
            </div>

            <Switch>
                <Route exact path="/"><RandomRecipePage/></Route>
                <Route path="/favorites"><FavoritesPage recipes={recipes}/></Route>
                <Route path="/registry"><RegistryPage/></Route>
                <Route><NotFound/></Route>
            </Switch>
        </div>


    );
}

export default App;
