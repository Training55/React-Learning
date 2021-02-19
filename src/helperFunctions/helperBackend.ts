import {appId, appKey} from "../constants/API";

export const fetchJson = async (url: string) => {
    let response = await fetch(url);

    if(!response.ok){
        throw new Error("Response was not ok!");
    }

    return await response.json();
}

export const fetchRecipe = async (dishName: string): Promise<any> => {
    const EDAMAM_API = "https://api.edamam.com/search?";
    let recipeResponse = await fetchJson(EDAMAM_API + `app_id=${appId}&app_key=${appKey}&q=${dishName}`)

    return recipeResponse;
}