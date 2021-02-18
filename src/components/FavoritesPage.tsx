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

    let overviewCards = null;

    if((!props.favoriteDishes || props.favoriteDishes.length == 0) && location.pathname === "/favorites"){

        overviewCards = <div className="">
            <div>
                <div className="alert alert-info" role="alert">
                    <p>Please choose a favorite recipe!</p>
                </div>
            </div>
        </div>;

    } else if(props.favoriteDishes && props.favoriteDishes.length > 0 && location.pathname === "/favorites"){
        overviewCards = <div className="row">
            {
                props.favoriteDishes.map((dish) => {

                    return <div className="card col">
                        <img src={dish.imageUrl} className="card-img-top recipePicture"/>
                        <div className="card-body">
                            <h5 className="card-title">{dish.name}</h5>
                        </div>
                        <Link to={"/favorites/" + dish.name} className="btn btn-primary">See Recipe</Link>
                    </div>


                })
            }
        </div>;
    } else{
        overviewCards = null;
    }



    return <div className="center-screen">
        <div className="row">
            {
                overviewCards
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