import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import App from './App';
import {BrowserRouter} from "react-router-dom";


beforeEach(() => {
    let httpCall = jest.fn();

    httpCall
        .mockReturnValueOnce({
            json: () => Promise.resolve({image: "https://foodish-api.herokuapp.com/images/biryani/biryani70.jpg"}),
            ok: true
        })
        .mockReturnValueOnce({
                json: () => Promise.resolve({
                    hits: new Array().push({
                        recipe: {
                            ingredients: new Array().push(
                                [
                                    {
                                        text: "Rice"
                                    },
                                    {
                                        text: "Chicken"
                                    }
                                ]
                            )
                        }
                    })
                }),
                ok: true
            }
        )
        .mockReturnValueOnce(
            {
                json: () => Promise.resolve({image: "https://foodish-api.herokuapp.com/images/biryani/biryani70.jpg"}),
                ok: true
            }
        )
        .mockReturnValueOnce({
            json: () => Promise.resolve({
                hits: new Array().push({
                    recipe: {
                        ingredients: new Array().push(
                            [
                                {
                                    text: "Rice"
                                },
                                {
                                    text: "Chicken"
                                }
                            ]
                        )
                    }
                })
            }),
            ok: true
        });

    global.fetch = httpCall;
})

test('Navbar is rendered properly', () => {
    render(<BrowserRouter><App/></BrowserRouter>);
    expect(screen.getByText("Random Recipe")).toBeInTheDocument();
    expect(screen.getByText("Favorites")).toBeInTheDocument();
    expect(screen.getByText("Registry")).toBeInTheDocument();
});


test("Dish is added on favorite page when marked on recipe of the day", async () => {
        render(<BrowserRouter><App></App></BrowserRouter>)

        // wait and validate that Biryani is on recipe of the day page
        await waitFor(() => expect(screen.getByText("Biryani")).toBeInTheDocument());

        fireEvent.click(screen.getByTitle("mark as favorite"));
        fireEvent.click(screen.getByText("Favorites"));

        // wait and validate that on favorites page and Biryani is shown in unordered list
        await waitFor(() => expect(screen.getByText("Favorites component")).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText("Biryani")).toBeInTheDocument());

    }
);

test("Dish is added on favorite page when marked on recipe of the day and removed properly again", async () => {
        render(<BrowserRouter><App></App></BrowserRouter>)


        // wait and validate that Biryani is on recipe of the day page
        await waitFor(() => expect(screen.getByText("Biryani")).toBeInTheDocument());

        // mark as favorite and switch page
        fireEvent.click(screen.getByTitle("mark as favorite"));
        fireEvent.click(screen.getByText("Favorites"));

        // wait and validate that on favorites page and Biryani is shown in unordered list
        await waitFor(() => expect(screen.getByText("Favorites component")).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText("Biryani")).toBeInTheDocument());

        // change back to random recipe page// it is configured that the same random recipe will be loaded
        fireEvent.click(screen.getByText("Random Recipe"));
        await waitFor(() => expect(screen.getByText("Biryani")).toBeInTheDocument());

        fireEvent.click(screen.getByTitle("remove from favorite"));
        fireEvent.click(screen.getByText("Favorites"));
        await waitFor(() => expect(screen.getByText("Favorites component")).toBeInTheDocument());
        await waitFor(() => expect(screen.queryByText("Biryani")).not.toBeInTheDocument());

    }
);
