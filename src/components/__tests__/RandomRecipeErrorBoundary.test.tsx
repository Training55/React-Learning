import {render, screen, waitFor} from "@testing-library/react";
import {RandomRecipeErrorBoundary} from "../RandomRecipePage/RandomRecipeErrorBoundary";
import RandomRecipePage from "../RandomRecipePage/RandomRecipePage";

test("Error dialog is shown", async ()  => {

    let httpCall = jest.fn();
    httpCall.mockReturnValue({
        ok: false
    });

    global.fetch = httpCall;

     render(<RandomRecipeErrorBoundary><RandomRecipePage></RandomRecipePage></RandomRecipeErrorBoundary>);

     await waitFor(() => expect(screen.getByText("The recipe of the day provider sent not compliant information!")));
});
