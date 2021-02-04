import React, {useEffect, useState} from 'react';
import '../styles/recipeOfTheDayPage.css'
import {ReactComponent as LikeSvg} from '../resources/favorite_border-24px (1).svg';
import {ReactComponent as LikedSvg} from "../resources/favorite-24px.svg";
import {fetchJson} from "../helperFunctions/helperBackend";
import {appId, appKey} from "../constants/API";

interface ImageAPIResponse{
    image: string
}

interface Dish{
    name: string
}


export function RecipeOfTheDayPage() {

    const [liked, setLiked] = useState(false);
    const [link, setLink] = useState("");
    const [recipe, setRecipe] = useState([""]);
    const [title, setTitle] = useState("");

    useEffect(() => {
        fetchAndSetRecipe().catch(error => console.log(error))
    }, []);

    async function fetchAndSetRecipe() {
        const IMAGE_API = "https://foodish-api.herokuapp.com/api";
        const EDAMAM_API = "https://api.edamam.com/search?";

        let recipeArray: string[] = [];


        let imageUrlObject: ImageAPIResponse = await fetchJson(IMAGE_API);


        let dish: Dish = {
            name : imageUrlObject.image
        };

        //get name of dish and remove ending like .jpg
        let slashIndex = dish.name.lastIndexOf("/");
        dish.name = dish.name.substring(slashIndex + 1);
        let dotIndex = dish.name.lastIndexOf(".");
        dish.name = dish.name.substring(0, dotIndex);
        dish.name = dish.name.replace(/[0-9]/g, '');


        let recipeResponse = await fetchJson(EDAMAM_API + `app_id=${appId}&app_key=${appKey}&q=${dish.name}`)

        let ingredients: any[] = recipeResponse?.hits[0]?.recipe?.ingredients;
        ingredients.forEach(ingr => recipeArray.push(ingr.text));

        setLink(imageUrlObject.image);
        setRecipe(recipeArray);
        setTitle(dish.name);
    }

    return (
        <div className="center-screen">
            <p>{title}</p>

            <div className="first">
                <div>
                    <img className="recipePicture"
                         src={link}/>
                    <br/>
                    {liked ? <LikedSvg onClick={() => setLiked(false)}/> : <LikeSvg onClick={() => setLiked(true)}/>}
                </div>

                <ul>
                    {recipe.map(recipe => {
                        return <li>{recipe}</li>
                    })}
                </ul>
            </div>
        </div>
    );
}