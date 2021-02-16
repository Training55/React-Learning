import {getDishNameOfUrl} from "../StringUtil";

test("Should determine name of dish correctly!", () => {
    let dishName = getDishNameOfUrl("https://foodish-api.herokuapp.com/images/pizza/pizza48.jpg");

    expect(dishName).toBe("Pizza");
})


