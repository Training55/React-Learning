
export let fetchJson = async (url: string) => {
    let response = await fetch(url);

    if(!response.ok){
        throw new Error("Response was not ok!");
    }

    return await response.json();
}