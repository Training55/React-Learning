import React, {useEffect, useState} from "react";
import {ReactComponent as LikedSvg} from "../resources/favorite-24px.svg";
import {ReactComponent as LikeSvg} from "../resources/favorite_border-24px.svg";
import {IDish} from "../IDish";

interface PropsInterface{
    dish: IDish,
    addToFavorite(dish: IDish): void;
    removeFromFavorite(dish: IDish): void;
}

export default function RecipeCard(props: PropsInterface) {

    const [dishState, setDishState] = useState({... props.dish})


    useEffect(() => {
        setDishState({... props.dish})
    }, [props])


    const saveAsFavorite = () : void => {

        setDishState({
            ...dishState,
            liked: !dishState.liked
        })

        if (!dishState.liked) {
            props.addToFavorite(dishState);
        } else {
            props.removeFromFavorite(dishState);
        }

    }

    return (
        <div>
                <div style={{backgroundColor: "#FFDC00", minWidth: "100rem"}}
                     className="row align-items-center justify-content-center heights">

                    <div className="col-2 ">

                        <div style={{backgroundColor: "#FFFFFF"}} className="row ">
                            <p className="textCenter"><b>{props.dish.name}</b></p>
                        </div>

                        <div style={{backgroundColor: "#FFFFFF"}} className="row align-items-center">

                            <div className="col">
                                <img alt="recipe" className="recipePicture"
                                     src={props.dish.imageUrl}/>
                            </div>
                        </div>

                        <div className="row align-items-center">
                            {dishState.liked ? <LikedSvg title="remove from favorite" onClick={() => saveAsFavorite()}/> :
                                <LikeSvg title="mark as favorite" onClick={() => saveAsFavorite()}/>}
                        </div>
                    </div>

                    <div style={{
                        minHeight: "21.35rem",
                        maxHeight: "21.35rem",
                        maxWidth: "50rem",
                        minWidth: "50rem",
                        backgroundColor: "#3D9970"
                    }}
                         className="col-4 scrollable">
                        <div className="row ">
                            <div className="col">
                                <p className="textCenter"><b>Recipe</b></p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <ul>
                                    {props.dish.recipe.map(recipe => {
                                        return <li>{recipe}</li>
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    );

}