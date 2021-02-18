import React, {useEffect, useState} from 'react';
import '../../styles/randomRecipe.css'
import {fetchJson} from "../../helperFunctions/helperBackend";
import {appId, appKey} from "../../constants/API";
import {IDish} from "../../IDish";
import {generateHash} from "../../utils/Hash";
import {getDishNameOfUrl} from "../../helperFunctions/StringUtil";
import {validateFoodishUrl} from "../../helperFunctions/InputValidatorUtil";
import RecipeCard from "../RecipeCard";

interface ImageAPIResponse {
    image: string | null,
}

interface PropsInterface{
    addToFavorite(dish:IDish): void;
    removeFromFavorite(dish: IDish): void;
    markedAsFavorite(recipeHash: number): boolean;
}

export default function RandomRecipePage(props: PropsInterface) {

    const [dish, setDish] = useState<IDish>({
        name: "",
        imageUrl: "",
        recipe: [],
        liked: false
    })

    const [error, setError] = useState({error: null});

    useEffect(() => {
        orchestrate().catch(error => {
            setError(error);
        });
    }, []);

    if (error.error !== null) {
        throw error;
    }

    const orchestrate = async (): Promise<any> => {

        let pictureObject = await fetchPicture();
        let dishUrl: string | null = pictureObject.image;
        let dishName = getDishNameOfUrl(dishUrl);
        let recipeResponse = await fetchRecipe(dishName);

        createDish(recipeResponse, dishName, pictureObject);
    }

    const fetchPicture = async (): Promise<ImageAPIResponse> => {
        const IMAGE_API = "https://foodish-api.herokuapp.com/api";
        let imageUrlObject: ImageAPIResponse = await fetchJson(IMAGE_API);
        validateFoodishUrl(imageUrlObject.image);

        return imageUrlObject;
    }

    const fetchRecipe = async (dishName: string): Promise<any> => {
        const EDAMAM_API = "https://api.edamam.com/search?";
        let recipeResponse = await fetchJson(EDAMAM_API + `app_id=${appId}&app_key=${appKey}&q=${dishName}`)

        return recipeResponse;
    }

    const createDish = (recipeResponse: any, title: string, imageUrl: ImageAPIResponse) : void => {

        let recipeArray: string[] = [];
        let ingredients = recipeResponse?.hits[0]?.recipe?.ingredients;
        ingredients?.forEach((ing: { text: string; }) => recipeArray.push(ing.text));

        let favoriteStatus = props.markedAsFavorite(generateHash(recipeArray.join()));

        if (imageUrl.image) {
            let dish: IDish = {
                imageUrl: imageUrl.image,
                name: title,
                recipe: recipeArray,
                liked: favoriteStatus
            }

            setDish(dish);
        }
    }

    return (
        <div>
            <div className="first ">
                <RecipeCard dish={dish} addToFavorite={props.addToFavorite} removeFromFavorite={props.removeFromFavorite}/>
                <div className="row justify-content-center">
                    <div className="col">
                        <button style={{marginLeft: "auto", marginRight: "auto", display: "block"}}
                                className="btn btn-primary" onClick={orchestrate} title="button">Get new recipe!</button>
                    </div>
                </div>
                <br/>

            </div>
        </div>
    );
}

