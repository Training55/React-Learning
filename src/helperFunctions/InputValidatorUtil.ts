export let validateFoodishUrl = (url: string | null): boolean => {

    if (!url) {
        throw new Error("Did not receive URL via API!");
    }

    let slashindex = url.lastIndexOf("/");
    let chunk = url.substring(slashindex + 1);

    if (!url.includes("https://foodish-api.herokuapp.com/images")) {
        throw new Error("Not a valid URL!");
    } else if (!chunk.toUpperCase().includes("BIRYANI") && !chunk.toUpperCase().includes("BURGER")
        && !chunk.toUpperCase().includes("DOSA") && !chunk.toUpperCase().includes("IDLY")
        && !chunk.toUpperCase().includes("PIZZA")) {
        throw new Error("The URL does not contain a dish!")
    }

    return true;
}
