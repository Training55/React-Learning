import React, {useEffect, useState} from 'react';
import '../styles/randomRecipe.css'
import {ReactComponent as LikeSvg} from '../resources/favorite_border-24px (1).svg';
import {ReactComponent as LikedSvg} from "../resources/favorite-24px.svg";
import {fetchJson} from "../helperFunctions/helperBackend";
import {appId, appKey} from "../constants/API";
import {IDish} from "../IDish";
import {generateHash} from "../utils/Hash";

interface ImageAPIResponse {
    image: string
}

export function RandomRecipePage(props: any) {

    const [dish, setDish] = useState<IDish>({
        name: "",
        imageUrl: "",
        recipe: [],
        liked: false
    })

    useEffect(() => {
        orchestrate().catch(error => console.log(error))
    }, []);

    let orchestrate = async (): Promise<any> => {

        let pictureObject = await fetchPicture();
        let dishUrl: string = pictureObject.image;
        let dishName = getDishName(dishUrl);
        let recipeResponse = await fetchRecipe(dishName);

        createDish(recipeResponse, dishName, pictureObject);
    }

    let fetchPicture = async (): Promise<ImageAPIResponse> => {
        const IMAGE_API = "https://foodish-api.herokuapp.com/api";
        let imageUrlObject: ImageAPIResponse = await fetchJson(IMAGE_API);

        return imageUrlObject;
    }

    let fetchRecipe = async (dishName: string): Promise<any> => {
        const EDAMAM_API = "https://api.edamam.com/search?";
        let recipeResponse = await fetchJson(EDAMAM_API + `app_id=${appId}&app_key=${appKey}&q=${dishName}`)

        return recipeResponse;
    }

    let getDishName = (dishUrl: string): string => {

        let dish: string = dishUrl;

        let slashIndex = dish.lastIndexOf("/");
        dish = dish.substring(slashIndex + 1);
        let dotIndex = dish.lastIndexOf(".");
        dish = dish.substring(0, dotIndex);
        dish = dish.replace(/[0-9]/g, '');
        return dish.charAt(0).toUpperCase() + dish.substring(1).toLowerCase();
    }

    let createDish = (recipeResponse: any, title: string, imageUrl: ImageAPIResponse) => {

        let recipeArray: string[] = [];
        let ingredients = recipeResponse?.hits[0]?.recipe?.ingredients;
        ingredients.forEach((ing: { text: string; }) => recipeArray.push(ing.text));

        let favoriteStatus = props.markedAsFavorite(generateHash(recipeArray.join()));

        let dish: IDish = {
            imageUrl: imageUrl.image,
            name: title,
            recipe: recipeArray,
            liked: favoriteStatus
        }
        
        setDish(dish);
    }

    let saveAsFavorite = () =>{

        setDish({
            ...dish,
            liked : !dish.liked
        })

        if(!dish.liked){
            props.addToFavorite(dish);
        } else{
            props.removeFromFavorite(dish);
        }

    }


    return (
        <div>
            <div className="first ">

                <div style={{backgroundColor: "#FFDC00"}}
                     className="row align-items-center justify-content-center heights">

                    <div className="col-2 ">

                        <div style={{backgroundColor: "#FFFFFF"}} className="row ">
                            <p className="textCenter"><b>{dish.name}</b></p>
                        </div>

                        <div style={{backgroundColor: "#FFFFFF"}} className="row align-items-center">

                            <div className="col">
                                <img alt="recipe" className="recipePicture"
                                     src={dish.imageUrl}/>
                            </div>
                        </div>

                        <div className="row align-items-center">
                            {dish.liked ? <LikedSvg onClick={() => saveAsFavorite()}/> :
                                <LikeSvg onClick={() => saveAsFavorite()}/>}
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
                                    {dish.recipe.map(recipe => {
                                        return <li>{recipe}</li>
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col">
                        <button style={{marginLeft: "auto", marginRight: "auto", display: "block"}} type="button"
                                className="btn btn-primary" onClick={orchestrate}>Get new recipe!
                        </button>
                    </div>
                </div>
                <br/>

            </div>
        </div>
    );
}