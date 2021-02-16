import {validateFoodishUrl} from "../InputValidatorUtil";

test("Expect error because URL is null!", () => {
    expect(() => validateFoodishUrl(null)).toThrowError("Did not receive URL via API!");
});

test("Expect error because not a valid domain was used!", () => {
    expect(() => validateFoodishUrl("http://www.google.com/")).toThrowError("Not a valid URL!");
});

test("Expect error because a not known food was passed!", () => {
    expect(() => validateFoodishUrl("https://foodish-api.herokuapp.com/images/pasta/spaghetti65.jpg")).toThrowError("The URL does not contain a dish!");
});

test("Expect valid return", () => {
    expect(() => validateFoodishUrl("https://foodish-api.herokuapp.com/images/pizza/pizza65.jpg")).toBeTruthy()
})



