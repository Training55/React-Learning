import React, {useEffect, useState} from 'react';
import {fetchRecipe} from "../../helperFunctions/helperBackend";

interface INutrientInfo{
    label: string,
    quantity: number,
    unit: string
}




interface ITotalNutrients{
    ENERC_KCAL: INutrientInfo,
    FAT: INutrientInfo
    //32 MAL
}


interface IFood{
    foodId: string,
    label: string
}


interface IMeasure{
    uri: string,
    label: string
}

interface IntIngredient{
    foodId: string,
    quantity: number,
    measure: IMeasure,
    weight: number
    food: IFood
}

interface IRecipe{
    uri: string,
    label: string,
    image: string,
    source: string,
    url: string,
    yield: number,
    calories: number,
    totalWeight: number,
    totalNutrients: string,
    totalDaily: string,
    ingredients: IntIngredient[]
}

interface IHit {
    bookmarked: boolean,
    bought: boolean,
    recipe: IRecipe
}


interface IEdamamResponse {
    q: string,
    from: number,
    to: number,
    count: number,
    more: boolean,
    hits: IHit[]
}

export default function SearchPage() {


    const [edamamResp, setEdamamResp] = useState<IEdamamResponse | undefined>(undefined);


    useEffect(
        () => {
            searchQuery();
        }, []
    )

    const searchQuery = async () => {
        const {search} = window.location;
        const query = new URLSearchParams(search).get('s');

        if (query) {
            let recipeResponse: EdamamResponse = await fetchRecipe(query);
            setEdamamResp(recipeResponse);
        }


        console.log(query);
    }


    return <div>
        {
            edamamResp && edamamResp.hits.map((hit) => {
              return <div className="card">
                    <img src={hit.recipe.image} className="card-img-top recipePicture"/>
                    <div className="card-body">
                        <h5 className="card-title">{hit.recipe.label}</h5>
                    </div>
                </div>})
        }

    </div>


}

