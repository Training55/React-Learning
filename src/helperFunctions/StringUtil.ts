export let getDishNameOfUrl = (dishUrl: string | null): string => {

    if(!dishUrl){
        throw new Error("No URL was passed to getDishNameOfURL!")
    }

    //NOTE: Please use InputValidator before extracting Dishname!
    let dish: string = dishUrl;

    let slashIndex = dish.lastIndexOf("/");
    dish = dish.substring(slashIndex + 1);

    // dot of the file format for example
    let dotIndex = dish.lastIndexOf(".");

    if (dotIndex !== -1) {
        dish = dish.substring(0, dotIndex);
    }

    //replace number with empty string; the url contains numbers to count the number of dish category
    dish = dish.replace(/[0-9]/g, '');
    return dish.charAt(0).toUpperCase() + dish.substring(1).toLowerCase();
}