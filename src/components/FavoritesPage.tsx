import React, {useState} from 'react';
import "../styles/favoritesPage.css"
import {IDish} from "../IDish";
import {Route, Switch} from "react-router";
import {Link, useLocation} from "react-router-dom";
import NotFound from "./NotFoundPage";
import RecipeCard from "./RecipeCard";

interface IFavoriteProps {
    favoriteDishes: IDish[]

    addToFavorite(dish: IDish): void;

    removeFromFavorite(dish: IDish): void;
}

export default function FavoritesPage(props: IFavoriteProps) {

    let location = useLocation();

    console.log(location.pathname);

 /*   <ul className="list-group">
        {
            location.pathname === "/favorites" && props.favoriteDishes.map((dish) => {
                return <li className="list-group-item"><Link to={"/favorites/" + dish.name}>{dish.name}</Link></li>
            })
        }
    </ul>*/

    return <div className="center-screen">
        <div className="row">
            {
                location.pathname === "/favorites" && props.favoriteDishes.map((dish) => {

                    return <div className="card col">
                        <img src={dish.imageUrl} className="card-img-top recipePicture"/>
                        <div className="card-body">
                            <h5 className="card-title">{dish.name}</h5>
                        </div>
                        <Link to={"/favorites/" + dish.name} className="btn btn-primary">See Recipe</Link>
                    </div>


                })
            }
        </div>

        <Switch>
            {
                props.favoriteDishes.map((dish) => {
                    return <Route path={"/favorites/" + dish.name}><RecipeCard dish={dish}
                                                                     removeFromFavorite={props.removeFromFavorite}
                                                                     addToFavorite={props.addToFavorite}/></Route>
                })
            }
        </Switch>

    </div>;
}